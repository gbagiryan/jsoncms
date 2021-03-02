const express = require('express');
const cmsController = require('../Controllers/cmsController');

const router = express.Router();

router.get('/getObj', cmsController.getObj);

module.exports = router;