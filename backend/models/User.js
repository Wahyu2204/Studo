const db = require('../config/database');

const User = {
    async create(data) {
        const result = await db.query('INSERT INTO users SET ?', [data]);
        return result;
    },
    async findByEmail(email) {
        const rows = await db.query('SELECT * FROM users WHERE email = ?', [email]);
        return rows[0];
    },
    async updatePassword(email, hashedPassword) {
        const result = await db.query('UPDATE users SET password = ? WHERE email = ?', [hashedPassword, email]);
        return result;
    },
    async getById(id) {
        const rows = await db.query('SELECT * FROM users WHERE id = ?', [id]);
        return rows[0];
    },
    async update(id, data) {
        const result = await db.query('UPDATE users SET ? WHERE id = ?', [data, id]);
        return result;
    },
}

module.exports = User;