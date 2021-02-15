const express = require('express');
const authController = require('../Controllers/authController');
const { isValidated, validateSignIn } = require('../Middleware/Validators');

const router = express.Router();
router.post('/signIn', authController.signIn);
router.post('/signUp', validateSignIn, isValidated, authController.signUp);
router.get('/signOut', authController.signOut);
router.get('/verifyAuth', authController.verifyAuth);

module.exports = router;
