const express = require('express');
const router = express.Router();
const { authMiddleware, authorize } = require('../middleware/auth');

const UserController = require('../controllers/UserController');
const GoogleController = require('../controllers/GoogleController');

// Login biasa
router.post('/login', UserController.login);
router.post('/register', UserController.register);
router.get('/profile', authMiddleware, UserController.profile);
router.post('/reset-password', UserController.resetPassword);

// Login dengan Google
router.post('/google', GoogleController.googleLogin);

module.exports = router;