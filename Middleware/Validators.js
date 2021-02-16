const { validationResult, check } = require('express-validator');

const validateSignIn = [
  check('username')
    .notEmpty()
    .withMessage('Username is required'),
  check('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long')
];

const validateCreateUpdateObject = async (req, res, next) => {
  if (!req.body.name) {
    return res.status(400).json({ errorMessage: 'Name is required' });
  }
  if (Object.keys(req.body.fields).length === 0) {
    return res.status(400).json({ errorMessage: 'At least 1 field is required' });
  }
  next();
};

const isValidated = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.array().length > 0) {
    return res.status(400).json({ errorMessage: errors.array()[0].msg });
  }
  next();
};

module.exports = {
  validateSignIn,
  validateCreateUpdateObject,
  isValidated
};
