const db = require('../models/db');

// Get all transactions for a user
exports.getAllTransactions = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM transactions WHERE user_id = ?', [req.params.userId]);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch transactions' });
  }
};

// Create a transaction
exports.createTransaction = async (req, res) => {
  const { user_id, category, type, decimal, date, description } = req.body;
  try {
    const [result] = await db.query(
      'INSERT INTO transactions (user_id, category, type, decimal, date, description) VALUES (?, ?, ?, ?, ?, ?)',
      [user_id, category, type, decimal, date, description]
    );
    res.json({ id: result.insertId, message: 'Transaction created' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to create transaction' });
  }
};

// Update a transaction
exports.updateTransaction = async (req, res) => {
  const { category, type, decimal, date, description } = req.body;
  try {
    await db.query(
      'UPDATE transactions SET category = ?, type = ?, decimal = ?, date = ?, description = ? WHERE id = ?',
      [category, type, decimal, date, description, req.params.id]
    );
    res.json({ message: 'Transaction updated' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update transaction' });
  }
};

// Delete a transaction
exports.deleteTransaction = async (req, res) => {
  try {
    await db.query('DELETE FROM transactions WHERE id = ?', [req.params.id]);
    res.json({ message: 'Transaction deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete transaction' });
  }
};