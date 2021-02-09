const Object = require('../Models/Object')
const logger = require('../logger')

const createAnObject = async (req, res) => {
  try {
    const { name, fields, tags, fileKey } = req.body
    const files = req.files

    const fieldsArr = [...fields.map((field) => JSON.parse(field))]

    if (files && files.length > 0) {
      for (let i = 0; i < files.length; i++) {
        fieldsArr.push({ Key: fileKey[i], Value: `/public/${files[i].filename}${files[i].mimetype}`, FileName: files[i].originalname })
      }
    }

    const object = new Object({
      name,
      fields: fieldsArr,
      tags,
      createdBy: req.user._id
    })
    await object.save()
    res.status(200).json({ successMessage: 'new object posted' })
  } catch (err) {
    // logger.error(err)
    console.log(err)
    res.status(500).json({ errorMessage: 'server error' })
  }
}

const updateObject = async (req, res) => {
  try {
    const objectId = req.params.objectId
    const { name, fields, tags, fileKey } = req.body
    const files = req.files

    const object = await Object.findOne({ createdBy: req.user._id, _id: objectId })
    if (!object) {
      return res.status(400).json({ errorMessage: 'object with given id not found' })
    }

    const fieldsArr = [...fields.map((field) => JSON.parse(field))]

    if (files && files.length > 0) {
      for (let i = 0; i < files.length; i++) {
        fieldsArr.push({ Key: fileKey[i], Value: `/public/${files[i].filename}${files[i].mimetype}`, FileName: files[i].originalname })
      }
    }

    await Object.findOneAndUpdate({ _id: objectId }, {
      name,
      fields: fieldsArr,
      tags,
      createdBy: req.user._id
    })
    return res.status(200).json({ successMessage: 'object updated' })
  } catch (err) {
    logger.error(err)
    res.status(500).json({ errorMessage: 'server error' })
  }
}

const deleteObject = async (req, res) => {
  try {
    const objectId = req.params.objectId
    const object = await Object.findOne({ createdBy: req.user._id, _id: objectId })
    if (!object) {
      return res.status(400).json({ errorMessage: 'object with given id not found' })
    }
    await object.remove()

    return res.status(200).json({ successMessage: 'object removed' })
  } catch (err) {
    logger.error(err)
    res.status(500).json({ errorMessage: 'server error' })
  }
}

const getObjects = async (req, res) => {
  try {
    const objects = await Object.find({ createdBy: req.user._id })
    if (!objects) {
      return res.status(400).json({ errorMessage: 'objects don\'t exist' })
    }
    return res.status(200).json(objects)
  } catch (err) {
    logger.error(err)
    res.status(500).json({ errorMessage: 'server error' })
  }
}

const getObjectsByTag = async (req, res) => {
  const { tags } = req.body
  try {
    const objects = await Object.find({ createdBy: req.user._id, tags })
    if (!objects) {
      return res.status(400).json({ errorMessage: 'objects don\'t exist' })
    }
    return res.status(200).json(objects)
  } catch (err) {
    logger.error(err)
    res.status(500).json({ errorMessage: 'server error' })
  }
}
const getAnObject = async (req, res) => {
  try {
    const objectId = req.params.objectId
    const object = await Object.findOne({ createdBy: req.user._id, _id: objectId })
    if (!object) {
      return res.status(400).json({ errorMessage: 'object with given id not found' })
    }
    return res.status(200).json(object)
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
  deleteObject
}
