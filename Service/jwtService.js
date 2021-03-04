const jwt = require('jsonwebtoken');

const signToken = (user) => {
  return jwt.sign(
    { userId: user._id },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );
};

const verifyToken = async (token) => {
  return await jwt.verify(token, process.env.JWT_SECRET);
};

module.exports = {
  verifyToken,
  signToken
};
