const express = require('express');
const cors = require('cors');
const app = express();
const db = require('./models/db'); // MySQL connection

// Middleware
app.use(cors());
app.use(express.json());

// Route files
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const transactionRoutes = require('./routes/transactionRoutes');
const reportRoutes = require('./routes/reportRoutes');
const budgetRoutes = require('./routes/budgetRoutes');
const chartRoutes = require('./routes/chartRoutes');
const emailPreferencesRoutes = require('./routes/emailPreferencesRoutes');
// Mount routes
app.use('/api/auth', authRoutes);         // register, login
app.use('/api/users', userRoutes);        // profile, update profile
app.use('/api/transactions', transactionRoutes);
app.use('/api/reports', reportRoutes);
app.use('/api/budgets', budgetRoutes);
app.use('/api/charts', chartRoutes);
app.use('/api/email', emailPreferencesRoutes);
// Test DB connection
db.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err);
    process.exit(1);
  }
  console.log('Connected to MySQL database');
});

// Default route
app.get('/', (req, res) => {
  res.send('Finance Management API is running');
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log('Server is running on http://localhost:5000/api');
});