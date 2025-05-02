const db = require('../models/db');

// Get email preferences for a user
exports.getPreferences = async (req, res) => {
  try {
    const [prefs] = await db.query('SELECT * FROM email_preferences WHERE user_id = ?', [req.params.userId]);
    res.json(prefs[0] || {});
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch email preferences' });
  }
};

// Create or update email preferences
exports.createOrUpdatePreferences = async (req, res) => {
  const { user_id, report_frequency, send_notifications } = req.body;

  try {
    const [existing] = await db.query(
      'SELECT id FROM email_preferences WHERE user_id = ?',
      [user_id]
    );

    if (existing.length > 0) {
      await db.query(
        'UPDATE email_preferences SET report_frequency = ?, send_notifications = ? WHERE id = ?',
        [report_frequency, send_notifications, existing[0].id]
      );
      res.json({ message: 'Preferences updated' });
    } else {
      await db.query(
        'INSERT INTO email_preferences (user_id, report_frequency, send_notifications) VALUES (?, ?, ?)',
        [user_id, report_frequency, send_notifications]
      );
      res.json({ message: 'Preferences created' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Failed to save preferences' });
  }
};