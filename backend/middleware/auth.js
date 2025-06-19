const jwt = require('jsonwebtoken');
require('dotenv').config();

const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Token tidak ditemukan, silahkan login' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(403).json({ message: 'Token tidak valid atau sudah kadaluarsa' });
    }
}

const authorize = role => (req, res, next) => {
    if (typeof role === 'string') role = [role];
    
    if (!role.includes(req.user.role)) {
        return res.status(403).json({ message: 'Akses ditolak, anda tidak memiliki izin untuk mengakses resource ini' });
    }
    next();
}

module.exports = { authMiddleware, authorize };