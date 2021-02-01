const express = require('express');
const isAuthedMiddleware = require("../Middleware/isAuthedMiddleware");
const postController = require('../Controllers/postController')

const router = express.Router();

router.get('/getObjects', isAuthedMiddleware, postController.getObjects);
router.post('/getObjectsByTag', isAuthedMiddleware, postController.getObjectsByTag);
router.get('/getAnObject/:objectId', isAuthedMiddleware, postController.getAnObject);
router.patch('/updateObject/:objectId', isAuthedMiddleware, postController.updateObject);
router.delete('/deleteObject/:objectId', isAuthedMiddleware, postController.deleteObject);
router.post('/createAnObject', isAuthedMiddleware, postController.createAnObject);

module.exports = router;