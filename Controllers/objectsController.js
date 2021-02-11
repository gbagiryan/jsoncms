const logger = require('../logger')
const objetService = require('../Service/objectService')

const createAnObject = async (req, res) => {
  try {
    await objetService.createObject(req.body, req.files, req.local)
    res.status(200).json({ successMessage: 'new object posted' })
  } catch (err) {
    logger.error(err.message)
    res.status(500).json({ errorMessage: 'server error' })
  }
}

const updateObject = async (req, res) => {
  try {
    await objetService.updateObject(req.params, req.body, req.files, req.local)
    return res.status(200).json({ successMessage: 'object updated' })
  } catch (err) {
    logger.error(err.message)
    res.status(500).json({ errorMessage: 'server error' })
  }
}

const deleteObject = async (req, res) => {
  try {
    await objetService.deleteObject(req.params, req.local)
    return res.status(200).json({ successMessage: 'object removed' })
  } catch (err) {
    logger.error(err.message)
    res.status(500).json({ errorMessage: 'server error' })
  }
}

const getObjects = async (req, res) => {
  try {
    const objects = await objetService.getObjects(req.local)
    return res.status(200).json(objects)
  } catch (err) {
    logger.error(err.message)
    res.status(500).json({ errorMessage: 'server error' })
  }
}

const getObjectsByTag = async (req, res) => {
  try {
    const objects = await objetService.getObjectsByTag(req.body, req.local)
    return res.status(200).json(objects)
  } catch (err) {
    logger.error(err.message)
    res.status(500).json({ errorMessage: 'server error' })
  }
}

const getAnObject = async (req, res) => {
  try {
    const object = await objetService.getAnObject(req.params, req.local)
    return res.status(200).json(object)
  } catch (err) {
    logger.error(err.message)
    res.status(500).json({ errorMessage: 'server error' })
  }
}

const download = (req, res) => {
  try {
    const fileName = req.params.fileName
    const directoryPath = 'uploads/'
    res.status(200).download(directoryPath + fileName)
  } catch (err) {
    logger.error(err.message)
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
  download
}
