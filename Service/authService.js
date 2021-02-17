const User = require('../Models/User');
const bcrypt = require('bcrypt');
const jwtService = require('./jwtService');

const signIn = async (body) => {
  try {
    const { username, password } = body;
    return await User.comparePasswords(username, password);
  } catch (err) {
    throw new Error(err);
  }
};
const signUp = async (body) => {
  try {
    const { username, password } = body;
    const candidate = await User.findOne({ username });
    if (candidate) {
      throw Error('username already taken');
    }
    const hashedPass = await bcrypt.hash(password, 12);
    const user = new User({
      username,
      password: hashedPass
    });
    await user.save();
    return user;
  } catch (err) {
    throw Error(err);
  }
};

const verifyAuth = async (cookies) => {
  try {
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
  } catch (err) {
    throw Error(err);
  }
};

module.exports = {
  signIn,
  signUp,
  verifyAuth
};
