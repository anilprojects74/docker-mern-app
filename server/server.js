const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const authRoutes = require('./routes/auth');
const usersRoutes = require('./routes/userRoutes');
const pool = require('./db'); // Adjust path if needed

const app = express();
app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json());

// app.use('/api', authRoutes);
app.use('/api/users', usersRoutes);

// Check DB connection before starting server
async function startServer() {
  try {
    const connection = await pool.getConnection();
    console.log('✅ Connected to MySQL');
    connection.release();

    app.listen(5000, () => {
      console.log('🚀 Server running on port 5000');
    });
  } catch (err) {
    console.error('❌ Unable to connect to MySQL:', err.message);
    process.exit(1);
  }
}

startServer();
