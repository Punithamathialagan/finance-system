const db = require('../models/db');

// Get all charts for a user
exports.getCharts = async (req, res) => {
  try {
    const [charts] = await db.query('SELECT * FROM charts WHERE user_id = ?', [req.params.userId]);
    res.json(charts);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch charts' });
  }
};

// Create or update a chart entry
exports.createOrUpdateChart = async (req, res) => {
  const { user_id, type, data, month } = req.body;

  try {
    const [existing] = await db.query(
      'SELECT id FROM charts WHERE user_id = ? AND type = ? AND month = ?',
      [user_id, type, month]
    );

    const jsonData = JSON.stringify(data);

    if (existing.length > 0) {
      // Update existing chart
      await db.query(
        'UPDATE charts SET data = ? WHERE id = ?',
        [jsonData, existing[0].id]
      );
      res.json({ message: 'Chart updated' });
    } else {
      // Insert new chart
      await db.query(
        'INSERT INTO charts (user_id, type, data, month) VALUES (?, ?, ?, ?)',
        [user_id, type, jsonData, month]
      );
      res.json({ message: 'Chart created' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Failed to save chart data' });
  }
};