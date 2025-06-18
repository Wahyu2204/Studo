// Filename: server.js
// Backend Express.js yang terhubung ke AWS RDS (MySQL).
// Pastikan Anda sudah menjalankan: npm install express mysql2 bcryptjs cors dotenv

const express = require('express');
const mysql = require('mysql2');
const bcrypt = require('bcryptjs');
const cors = require('cors');
require('dotenv').config(); // Memuat environment variables dari file .env

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Ubah dari createPool ke createConnection untuk testing koneksi
const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Ganti db.connect dengan getConnection untuk pool
db.getConnection((err, connection) => {
  if (err) {
    console.error('Error connecting to RDS database:', err);
    return;
  }
  console.log('Successfully connected to the RDS database.');
  connection.release(); // Jangan lupa release connection
});

// // Coba koneksi ke database
// db.connect((err) => {
//   if (err) {
//     // Error ini akan sangat membantu untuk debugging masalah koneksi antara EC2 dan RDS
//     console.error('Error connecting to RDS database:', err);
//     // Detail error seringkali terkait masalah security group atau VPC.
//     // Pesan error seperti "connect ETIMEDOUT" biasanya berarti EC2 tidak bisa menjangkau RDS.
//     return;
//   }
//   console.log('Successfully connected to the RDS database.');
// });

// Route untuk Registrasi User (Logikanya tetap sama)
app.post('/api/register', async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Please fill all fields.' });
  }

  db.query('SELECT email FROM users WHERE email = ?', [email], async (err, results) => {
    if (err) {
      console.error('DB Error:', err);
      return res.status(500).json({ message: 'Database error.' });
    }

    if (results.length > 0) {
      return res.status(409).json({ message: 'Email is already registered.' });
    }
    
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    // Pastikan Anda sudah punya tabel 'users' di database RDS Anda
    const newUser = { name, email, password: hashedPassword };
    db.query('INSERT INTO users SET ?', newUser, (err, result) => {
      if (err) {
        console.error('DB Insert Error:', err);
        return res.status(500).json({ message: 'Could not register user.' });
      }

      console.log('User registered with ID:', result.insertId);
      res.status(201).json({ message: 'User registered successfully!', userId: result.insertId });
    });
  });
});

// Route untuk Login bisa Anda kembangkan di sini

// Menjalankan server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
