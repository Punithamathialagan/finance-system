const db = require('../models/db');

// Register a new user
const registerUser = (req, res) => {
  const { email, password, first_name, last_name } = req.body;

  if (!email || !password || !first_name || !last_name) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  const checkUserQuery = 'SELECT * FROM users WHERE email = ?';
  db.query(checkUserQuery, [email], (err, results) => {
    if (err) {
      console.error('Error checking user:', err);
      return res.status(500).json({ error: 'Database error' });
    }

    if (results.length > 0) {
      return res.status(409).json({ error: 'Email already exists' });
    }

    const insertQuery = `
      INSERT INTO users (email, password, first_name, last_name, created_at, updated_at)
      VALUES (?, ?, ?, ?, NOW(), NOW())
    `;
    db.query(insertQuery, [email, password, first_name, last_name], (err, result) => {
      if (err) {
        console.error('Error inserting user:', err);
        return res.status(500).json({ error: 'Registration failed' });
      }

      res.status(201).json({ message: 'User registered successfully' });
    });
  });
};

// Login user
const loginUser = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  const query = 'SELECT * FROM users WHERE email = ?';
  db.query(query, [email], (err, results) => {
    if (err) {
      console.error('Error fetching user:', err);
      return res.status(500).json({ error: 'Database error' });
    }

    if (results.length === 0 || results[0].password !== password) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    res.status(200).json({ message: 'Login successful', user: results[0] });
  });
};

module.exports = { registerUser, loginUser };