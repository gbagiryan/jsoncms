const express = require('express');
const isAuthedMiddleware = require("../Middleware/isAuthedMiddleware");
const objectsController = require('../Controllers/objectsController')

const router = express.Router();

router.get('/getObjects', isAuthedMiddleware, objectsController.getObjects);
router.post('/getObjectsByTag', isAuthedMiddleware, objectsController.getObjectsByTag);
router.get('/getAnObject/:objectId', isAuthedMiddleware, objectsController.getAnObject);
router.patch('/updateObject/:objectId', isAuthedMiddleware, objectsController.updateObject);
router.delete('/deleteObject/:objectId', isAuthedMiddleware, objectsController.deleteObject);
router.post('/createAnObject', isAuthedMiddleware, objectsController.createAnObject);

module.exports = router;