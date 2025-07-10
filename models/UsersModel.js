import db from '../config/db.js';

export const User = {
  create: async (user) => {
    const sql = 'INSERT INTO users (email, password, roles, is_verified) VALUES (?, ?, ?, ?)';
    const [result] = await db.execute(sql, [user.email, user.password, user.roles, false]);
    return result;
  },

  findByEmail: async (email) => {
    const [rows] = await db.execute('SELECT * FROM users WHERE email = ?', [email]);
    return rows;
  },

  verifyUser: async (email) => {
    await db.execute('UPDATE users SET is_verified = ? WHERE email = ?', [true, email]);
  }
};