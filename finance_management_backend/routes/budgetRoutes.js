const express = require('express');
const router = express.Router();
const budgetController = require('../controllers/budgetController');
const auth = require('../middleware/authMiddleware');
// Get budgets by user
router.get('/:userId', auth, budgetController.getBudgets);

// Create or update budget
router.post('/', auth, budgetController.createOrUpdateBudget);

module.exports = router;