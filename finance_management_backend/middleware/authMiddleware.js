const jwt = require('jsonwebtoken');
require('dotenv').config();
// Replace with your secret key used to sign the token
const JWT_SECRET = process.env.JWT_SECRET; 

module.exports = function (req, res, next) {
  const authHeader = req.headers['authorization'];

  if (!authHeader) {
    return res.status(401).json({ message: 'Authorization header missing' });
  }

  // Bearer <token>
  const token = authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Token missing from header' });
  }

  try {
    // Verify the token and attach user data to request
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // You can access req.user in your route handlers
    next();
  } catch (err) {
    console.error('JWT verification failed:', err.message);
    return res.status(403).json({ message: 'Invalid or expired token' });
  }
};