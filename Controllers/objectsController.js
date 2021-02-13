const logger = require('../logger')
const objetService = require('../Service/objectService')

const createAnObject = async (req, res) => {
  try {
    await objetService.createObject(req.body, req.app.locals)
    res.status(200).json({ successMessage: 'new object posted' })
  } catch (err) {
    logger.error(err)
    res.status(500).json({ errorMessage: 'server error' })
  }
}

const updateObject = async (req, res) => {
  try {
    await objetService.updateObject(req.params, req.body, req.files, req.app.locals)
    return res.status(200).json({ successMessage: 'object updated' })
  } catch (err) {
    logger.error(err)
    res.status(500).json({ errorMessage: 'server error' })
  }
}

const deleteObject = async (req, res) => {
  try {
    await objetService.deleteObject(req.params, req.app.locals)
    return res.status(200).json({ successMessage: 'object removed' })
  } catch (err) {
    logger.error(err)
    res.status(500).json({ errorMessage: 'server error' })
  }
}

const getObjects = async (req, res) => {
  try {
    const objects = await objetService.getObjects(req.app.locals)
    return res.status(200).json(objects)
  } catch (err) {
    logger.error(err)
    res.status(500).json({ errorMessage: 'server error' })
  }
}

const getObjectsByTag = async (req, res) => {
  try {
    const objects = await objetService.getObjectsByTag(req.body, req.app.locals)
    return res.status(200).json(objects)
  } catch (err) {
    logger.error(err)
    res.status(500).json({ errorMessage: 'server error' })
  }
}

const getAnObject = async (req, res) => {
  try {
    const object = await objetService.getAnObject(req.params, req.app.locals)
    return res.status(200).json(object)
  } catch (err) {
    logger.error(err)
    res.status(500).json({ errorMessage: 'server error' })
  }
}

const download = (req, res) => {
  try {
    const fileName = req.params.fileName
    const directoryPath = 'uploads/'
    res.status(200).download(directoryPath + fileName)
  } catch (err) {
    logger.error(err)
    res.status(500).json({ errorMessage: 'server error' })
  }
}
const uploadFile = async (req, res) => {
  try {
    res.status(200).json({
      fileName: `/public/${req.file.filename}`,
      originalName: req.file.originalname
    })
  } catch (err) {
    logger.error(err)
    res.status(500).json({ errorMessage: 'server error' })
  }
}

module.exports = {
  getObjects,
  getObjectsByTag,
  getAnObject,
  createAnObject,
  updateObject,
  deleteObject,
  download,
  uploadFile
}
