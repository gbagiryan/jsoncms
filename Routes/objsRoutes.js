const express = require('express');
const isAuthedMiddleware = require('../Middleware/isAuthedMiddleware');
const objsController = require('../Controllers/objsController');
const upload = require('../Middleware/Multer');

const router = express.Router();

router.use(isAuthedMiddleware);

router.get('/getObjs', objsController.getObjs);
router.post('/getObjsByTag', objsController.getObjsByTag);
router.get('/getAnObj/:objId', objsController.getAnObj);
router.patch('/updateObj/:objId', objsController.updateObj);
router.delete('/deleteObj/:objId', objsController.deleteObj);
router.post('/createAnObj', objsController.createAnObj);
router.post('/uploadFile', upload.single('uploadedFile'), objsController.uploadFile);

module.exports = router;
