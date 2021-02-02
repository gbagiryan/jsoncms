const express = require('express');
const authController = require('../Controllers/authController');

const router = express.Router();
router.post('/signIn', authController.signIn);
router.post('/signUp', authController.signUp);
router.get('/signOut', authController.signOut);
router.get('/verifyAuth', authController.verifyAuth);

module.exports = router;