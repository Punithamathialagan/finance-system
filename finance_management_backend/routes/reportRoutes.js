const express = require('express');
const router = express.Router();
const reportController = require('../controllers/reportController');
const auth = require('../middleware/authMiddleware');
// Get reports by user ID
router.get('/:userId',auth, reportController.getReports);

// Create or update monthly report
router.post('/', auth, reportController.createOrUpdateReport);

module.exports = router;