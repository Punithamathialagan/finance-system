const db = require('../models/db');

// Get all budgets for a user
exports.getBudgets = async (req, res) => {
  try {
    const [budgets] = await db.query(
      'SELECT * FROM budgets WHERE user_id = ? ORDER BY month DESC',
      [req.params.userId]
    );
    res.json(budgets);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch budgets' });
  }
};

// Create or update a budget
exports.createOrUpdateBudget = async (req, res) => {
  const { user_id, limit_amount, month } = req.body;

  try {
    const [existing] = await db.query(
      'SELECT id FROM budgets WHERE user_id = ? AND month = ?',
      [user_id, month]
    );

    if (existing.length > 0) {
      await db.query(
        'UPDATE budgets SET limit_amount = ? WHERE id = ?',
        [limit_amount, existing[0].id]
      );
      res.json({ message: 'Budget updated' });
    } else {
      await db.query(
        'INSERT INTO budgets (user_id, limit_amount, month) VALUES (?, ?, ?)',
        [user_id, limit_amount, month]
      );
      res.json({ message: 'Budget created' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Failed to save budget' });
  }
};