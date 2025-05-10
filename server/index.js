const express = require('express');
const mysql = require('mysql2');
const app = express();

// Middleware to parse JSON requests
app.use(express.json());

// Create MySQL connection pool
const pool = mysql.createPool({
  host: 'localhost',      // Database host
  user: 'anil',           // Database user
  password: '123456',           // Database password (if any)
  database: 'testdb',     // Database name
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Test the database connection
pool.getConnection((err, connection) => {
  if (err) {
    console.error('Error connecting to the database: ', err);
  } else {
    console.log('Connected to MySQL database');
    connection.release();
  }
});

// Create a simple route
app.get('/', (req, res) => {
  res.send('Hello, Express & MySQL!');
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

