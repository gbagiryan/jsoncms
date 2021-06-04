const User = require('../Models/User');
const jwt = require('jsonwebtoken');
const logger = require('../logger/logger');

const isAuthedMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      return res.status(400).json('unauthorized');
    }
    const verifiedToken = jwt.verify(token, process.env.JWT_SECRET);
    if (!verifiedToken) {
      return res.status(401).json({ message: 'unauthorized' });
    } else {
      req.app.locals.user = await User.findById(verifiedToken.userId);
      next();
    }
  } catch (err) {
    logger.error(err);
  }
};

module.exports = isAuthedMiddleware;
