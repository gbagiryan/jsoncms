const { isValidated, validateCreateUpdateObject } = require('../Middleware/Validators')
const express = require('express')
const isAuthedMiddleware = require('../Middleware/isAuthedMiddleware')
const objectsController = require('../Controllers/objectsController')
const upload = require('../Middleware/Multer')

const router = express.Router()

router.use(isAuthedMiddleware)

router.get('/getObjects', objectsController.getObjects)
router.post('/getObjectsByTag', objectsController.getObjectsByTag)
router.get('/getAnObject/:objectId', objectsController.getAnObject)
router.patch('/updateObject/:objectId', upload.array('fileValue'),
  // validateCreateUpdateObject, isValidated,
  objectsController.updateObject)
router.delete('/deleteObject/:objectId', objectsController.deleteObject)
router.post('/createAnObject', upload.array('fileValue'),
  // validateCreateUpdateObject, isValidated,
  objectsController.createAnObject)
router.get('/download/:fileName', objectsController.download)

module.exports = router
