const express = require('express');
const router = express.Router();
const emailPreferencesController = require('../controllers/emailPreferencesController');
const auth = require('../middleware/authMiddleware');
// Get preferences for a user
router.get('/:userId', auth, emailPreferencesController.getPreferences);

// Create or update preferences
router.post('/', auth, emailPreferencesController.createOrUpdatePreferences);

module.exports = router;