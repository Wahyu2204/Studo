const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User');
require('dotenv').config();

const UserController = {
    async register(req,res) {
        const { email, password, username } = req.body;
        
        const exitingUser = await User.findByEmail(email);
        if (exitingUser) {
            return res.status(400).json({ message: "Email sudah digunakan" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        try {
            const result = await User.create({ 
                username,
                email, 
                password: hashedPassword,
             });
            res.status(201).json({
                message: "User berhasil dibuat",
                data: result
            });
        } catch (error) {
            console.error("Register error:", error);
            res.status(400).json({
                message: "Gagal membuat user",
            });
        }
    },

    async login(req, res) {
        try {
            const { email, password } = req.body;
            const user = await User.findByEmail(email);
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }

            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                return res.status(401).json({ message: "Invalid password" });
            }

            const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
            res.json ({
                message: "Login successful",
                token: token
            });
        } catch (error) {
            res.status(500).json({ message: "Internal server error" });
        }
    },

    async profile(req, res) {
        const userId = req.user.id;
        const user = await User.getById(userId);
        if (user) {
            res.status(200).json({
                message: "User found",
                data: user
            });
        } else {
            res.status(404).json({
                message: "User not found"
            });
        }
    },
    async resetPassword(req, res) {
        const { email, newPassword } = req.body;
        try {
            const user = await User.findByEmail(email);
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }

            const hashedPassword = await bcrypt.hash(newPassword, 10);
            await User.updatePassword(email, hashedPassword);

            res.status(200).json({
                message: "Password berhasil diubah"
            });
        } catch (error) {
            res.status(400).json({
                message: "Gagal mengubah password",
            });
        }
    }
}

module.exports = UserController;