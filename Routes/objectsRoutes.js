const {isValidated, validateCreateUpdateObject} = require("../Middleware/Validators");
const express = require('express');
const isAuthedMiddleware = require("../Middleware/isAuthedMiddleware");
const objectsController = require('../Controllers/objectsController')
const upload = require("../Middleware/Multer");

const router = express.Router();

router.get('/getObjects', isAuthedMiddleware, objectsController.getObjects);
router.post('/getObjectsByTag', isAuthedMiddleware, objectsController.getObjectsByTag);
router.get('/getAnObject/:objectId', isAuthedMiddleware, objectsController.getAnObject);
router.patch('/updateObject/:objectId', isAuthedMiddleware, validateCreateUpdateObject, isValidated, objectsController.updateObject);
router.delete('/deleteObject/:objectId', isAuthedMiddleware, objectsController.deleteObject);
router.post('/createAnObject', isAuthedMiddleware, validateCreateUpdateObject, isValidated, objectsController.createAnObject);

module.exports = router;