const User = require('../Models/User');
const bcrypt = require('bcrypt');
const jwtService = require('./jwtService');
const CustomError = require('../ErrorHandling/customErrors');
const logger = require('../logger');

const signIn = async (body) => {
  const { username, password } = body;
  logger.info(`${username} login attempt`);
  return await User.comparePasswords(username, password);
};
const signUp = async (body) => {
  const { username, password } = body;
  logger.info(`${username} signup attempt`);
  const candidate = await User.findOne({ username });
  if (candidate) {
    throw new CustomError('username already taken');
  }
  const hashedPass = await bcrypt.hash(password, 12);
  const user = new User({
    username,
    password: hashedPass
  });
  await user.save();
  return user;
};

const verifyAuth = async (cookies) => {
  const token = cookies.jwt;
  if (!token) {
    return false;
  }
  const decodedToken = await jwtService.verifyToken(token);
  const user = await User.findOne({ _id: decodedToken.userId });
  return {
    username: user.username,
    userId: user._id
  };
};

module.exports = {
  signIn,
  signUp,
  verifyAuth
};
