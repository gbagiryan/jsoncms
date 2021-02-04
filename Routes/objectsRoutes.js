const {isValidated, validateCreateUpdateObject} = require("../Middleware/Validators");
const express = require('express');
const isAuthedMiddleware = require("../Middleware/isAuthedMiddleware");
const objectsController = require('../Controllers/objectsController');

const router = express.Router();

router.use(isAuthedMiddleware);

router.get('/getObjects', objectsController.getObjects);
router.post('/getObjectsByTag', objectsController.getObjectsByTag);
router.get('/getAnObject/:objectId', objectsController.getAnObject);
router.patch('/updateObject/:objectId', validateCreateUpdateObject, isValidated, objectsController.updateObject);
router.delete('/deleteObject/:objectId', objectsController.deleteObject);
router.post('/createAnObject', validateCreateUpdateObject, isValidated, objectsController.createAnObject);

module.exports = router;