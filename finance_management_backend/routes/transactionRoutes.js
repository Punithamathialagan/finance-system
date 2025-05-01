const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transactionController');
const auth = require('../middleware/authMiddleware');
// CRUD for transactions
router.get('/:userId', auth, transactionController.getAllTransactions);
router.post('/', auth, transactionController.createTransaction);
router.put('/:id', auth, transactionController.updateTransaction);
router.delete('/:id', auth, transactionController.deleteTransaction);

module.exports = router;