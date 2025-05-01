const db = require('../models/db');

// Get user profile
const getUserProfile = (req, res) => {
  const userId = req.user.id; // Assuming you use authMiddleware and JWT

  const query = 'SELECT id, email, first_name, last_name, created_at FROM users WHERE id = ?';
  db.query(query, [userId], (err, results) => {
    if (err) {
      console.error('Error fetching user profile:', err);
      return res.status(500).json({ error: 'Database error' });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json(results[0]);
  });
};

// Update user profile
const updateUserProfile = (req, res) => {
  const userId = req.user.id;
  const { first_name, last_name } = req.body;

  const query = 'UPDATE users SET first_name = ?, last_name = ?, updated_at = NOW() WHERE id = ?';
  db.query(query, [first_name, last_name, userId], (err, result) => {
    if (err) {
      console.error('Error updating profile:', err);
      return res.status(500).json({ error: 'Database error' });
    }

    res.status(200).json({ message: 'Profile updated successfully' });
  });
};

module.exports = { getUserProfile, updateUserProfile };