const jwtService = require('../Service/jwtService');
const logger = require('../logger');
const authService = require('../Service/authService');
const CustomError = require('../ErrorHandling/customErrors');

const signIn = async (req, res) => {
  try {
    const user = await authService.signIn(req.body);

    const token = jwtService.signToken(user);

    res.cookie('jwt', token, {
      httpOnly: true, sameSite: true, maxAge: 60 * 60 * 1000
    });

    return res.status(200).json({
      username: user.username,
      userId: user._id
    });
  } catch (err) {
    logger.error(err);
    if (err instanceof CustomError) {
      return res.status(500).json({ errorMessage: err.message });
    } else {
      return res.status(500).json({ errorMessage: 'server error' });
    }
  }
};
const signUp = async (req, res) => {
  try {
    const user = await authService.signUp(req.body);

    const token = jwtService.signToken(user);

    res.cookie('jwt', token, {
      httpOnly: true, sameSite: true, maxAge: 60 * 60 * 1000
    });

    return res.status(200).json({
      username: user.username,
      userId: user._id
    });
  } catch (err) {
    logger.error(err);
    if (err instanceof CustomError) {
      return res.status(500).json({ errorMessage: err.message });
    } else {
      return res.status(500).json({ errorMessage: 'server error' });
    }
  }
};

const signOut = (req, res) => {
  try {
    res.clearCookie('jwt');
    res.status(200).json();
  } catch (err) {
    logger.error(err);
    return res.status(500).json({ errorMessage: 'server error' });
  }
};

const verifyAuth = async (req, res) => {
  try {
    const user = await authService.verifyAuth(req.cookies);
    res.status(200).json(user);
  } catch (err) {
    logger.error(err);
    return res.status(500).json({ errorMessage: 'server error' });
  }
};

module.exports = {
  signIn,
  signUp,
  signOut,
  verifyAuth
};
