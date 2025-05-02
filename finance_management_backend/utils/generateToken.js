const jwt = require('jsonwebtoken');

const generateToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name
    },
    process.env.JWT_SECRET || 'defaultsecret',
    { expiresIn: '7d' }
  );
};

module.exports = generateToken;