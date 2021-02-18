const jwt = require('jsonwebtoken');

const signToken = (user) => {
  try {
    return jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );
  } catch (err) {
    throw new Error(err);
  }
};

const verifyToken = async (token) => {
  try {
    return await jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    throw new Error(err);
  }
};

module.exports = {
  verifyToken,
  signToken
};
