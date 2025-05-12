const db = require('../db');
const bcrypt = require('bcryptjs');

const UserModel = {
  // Create a new user
  create: (email, password, callback) => {
    // Hash the password before saving it
    bcrypt.hash(password, 10, (err, hashedPassword) => {
      if (err) {
        return callback(err, null);
      }

      const sql = 'INSERT INTO users (email, password) VALUES (?, ?)';
      db.query(sql, [email, hashedPassword], callback);
    });
  },

  // Find a user by email
  findByEmail: (email, callback) => {
    const sql = 'SELECT * FROM users WHERE email = ?';
    db.query(sql, [email], callback);
  },

  // Get all users (for admin or debug purposes)
  getAll: (callback) => {
    const sql = 'SELECT * FROM users';
    db.query(sql, callback);
  },

  // Verify the password during login
  verifyPassword: (email, password, callback) => {
    // Find the user by email
    this.findByEmail(email, (err, results) => {
      if (err || results.length === 0) {
        return callback(new Error('User not found'), null);
      }

      const user = results[0];

      // Compare the stored hashed password with the input password
      bcrypt.compare(password, user.password, (err, isMatch) => {
        if (err) {
          return callback(err, null);
        }
        if (isMatch) {
          return callback(null, user);
        } else {
          return callback(new Error('Incorrect password'), null);
        }
      });
    });
  }
};

module.exports = UserModel;
