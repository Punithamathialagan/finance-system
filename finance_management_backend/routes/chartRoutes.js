const express = require('express');
const router = express.Router();
const chartController = require('../controllers/chartController');
const auth = require( '../middleware/authMiddleware')
// Get all charts for a user
router.get('/:userId', auth, chartController.getCharts);

// Create or update a chart
router.post('/',auth, chartController.createOrUpdateChart);

module.exports = router;