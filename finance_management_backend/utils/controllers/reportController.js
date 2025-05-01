const db = require('../models/db');

// Get all reports for a user
exports.getReports = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM reports WHERE user_id = ?', [req.params.userId]);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch reports' });
  }
};

// Create or update a report
exports.createOrUpdateReport = async (req, res) => {
  const { user_id, month, total_income, total_expense, savings } = req.body;

  try {
    // Check if report for this user & month exists
    const [existing] = await db.query(
      'SELECT id FROM reports WHERE user_id = ? AND month = ?',
      [user_id, month]
    );

    if (existing.length > 0) {
      // Update existing
      await db.query(
        'UPDATE reports SET total_income = ?, total_expense = ?, savings = ?, created_at = NOW() WHERE id = ?',
        [total_income, total_expense, savings, existing[0].id]
      );
      res.json({ message: 'Report updated' });
    } else {
      // Insert new
      await db.query(
        'INSERT INTO reports (user_id, month, total_income, total_expense, savings, created_at) VALUES (?, ?, ?, ?, ?, NOW())',
        [user_id, month, total_income, total_expense, savings]
      );
      res.json({ message: 'Report created' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Failed to create/update report' });
  }
};