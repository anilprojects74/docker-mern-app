// User Creation Tested 
const bcrypt = require('bcryptjs'); //encryption of password
const crypto = require('crypto'); // confirmation token generators
const db = require('../db'); 

const generateToken = () => crypto.randomBytes(32).toString('hex');

// Get all users
exports.getAllUsers = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM users');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching users', error: err });
  }
};

// Get user by ID
exports.getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await db.query('SELECT * FROM users WHERE id = ?', [id]);
    if (rows.length === 0) return res.status(404).json({ message: 'User not found' });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching user', error: err });
  }
};

// Create new user

exports.createUser = async (req, res) => {
    const { email, password } = req.body;
    const token = crypto.randomBytes(32).toString('hex');
  
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required.' });
    }
  
    try {
      const [existingRows] = await db.query(
        'SELECT id FROM users WHERE email = ?',
        [email]
      );
  
      if (existingRows.length > 0) {
        return res.status(409).json({ message: 'Email already in use.' });
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);
      const [insertResult] = await db.query(
        'INSERT INTO users (email, password, confirmation_token, is_confirmed) VALUES (?, ?, ?, ?)',
        [email, hashedPassword, token, false]
      );
      res.status(201).json({
        id: insertResult,
        message: 'User created. Confirmation email sent.'
      });
  
    } catch (err) {
      console.error('❌ User creation failed:', err);
      res.status(500).json({
        message: 'Error creating user',
        error: err.message || 'Unknown error'
      });
    }
  };
  

// Update user
exports.updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;
  try {
    const [result] = await db.query('UPDATE users SET name = ?, email = ? WHERE id = ?', [name, email, id]);
    if (result.affectedRows === 0) return res.status(404).json({ message: 'User not found' });
    res.json({ message: 'User updated' });
  } catch (err) {
    res.status(500).json({ message: 'Error updating user', error: err });
  }
};

// Delete user
exports.deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await db.query('DELETE FROM users WHERE id = ?', [id]);
    if (result.affectedRows === 0) return res.status(404).json({ message: 'User not found' });
    res.json({ message: 'User deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting user', error: err });
  }
};

exports.loginUser = async (req, res) => {
    const { email, password } = req.body;
  
    console.log("looog in")
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required.' });
    }
  
    try {
      const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
  
      if (rows.length === 0) {
        return res.status(401).json({ message: 'Invalid email or password.' });
      }
  
      const user = rows[0];
  
      if (!user.is_confirmed) {
        return res.status(403).json({ message: 'Please confirm your email before logging in.' });
      }
  
      const isMatch = await bcrypt.compare(password, user.password);
  
      if (!isMatch) {
        return res.status(401).json({ message: 'Invalid email or password.' });
      }
  
      // Optional: generate JWT here if you're using sessions or auth tokens
  
      res.status(200).json({
        message: 'Login successful',
        user: {
          id: user.id,
          email: user.email,
          created_at: user.created_at
        }
      });
  
    } catch (err) {
      console.error('Login failed:', err);
      res.status(500).json({ message: 'Internal server error', error: err.message });
    }
  };
