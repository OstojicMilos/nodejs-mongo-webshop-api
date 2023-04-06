const jwt = require('jsonwebtoken');

function generateToken({userId, role}) {
  const payload = { userId, role };

  const secret = process.env.JWT_SECRET || 'some_jwt_secret';
  const options = { expiresIn: '1h' };

  return jwt.sign(payload, secret, options);
}

module.exports = {
  generateToken,
};