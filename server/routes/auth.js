const express = require('express');
const router = express.Router();
const UserModel = require('../models/UserModel');

// Registration endpoint
router.post('/register', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  // Check if user already exists
  UserModel.findByEmail(email, (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }

    if (results.length > 0) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Create new user
    UserModel.create(email, password, (err, result) => {
      if (err) {
        return res.status(500).json({ error: 'Failed to create user' });
      }

      res.status(201).json({ message: 'User registered successfully' });
    });
  });
});

module.exports = router;
