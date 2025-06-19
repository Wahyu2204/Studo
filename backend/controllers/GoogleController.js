const { OAuth2Client } = require('google-auth-library');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
// const { profile } = require('./UserController');

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const googleLogin = async (req, res) => {
  const { credential } = req.body;
  try {
    // Verifikasi token Google
    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();

    // Cek user di database
    let user = await User.findByEmail(payload.email);
    if (!user) {
      // Buat user baru jika belum ada
      const userId = await User.create({
        username: payload.name,
        email: payload.email,
        password: '', // Kosongkan password untuk Google user
      });
      user = { id: userId, name: payload.name, email: payload.email, picture: payload.picture };
    }

    // Buat JWT aplikasi Anda
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({ user, token });
  } catch (err) {
    console.error('Google authentication error:', err);
    res.status(401).json({ message: 'Google authentication failed' });
  }
};

module.exports = { googleLogin };