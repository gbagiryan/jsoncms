const Object = require('../Models/Object')

const createObject = async (body, files, local) => {
  try {
    const { name, fields, tags, fileKey } = body

    const fieldsArr = []
    if (fields && fields.length > 0) {
      fieldsArr.push(...fields.map((field) => JSON.parse(field)))
    }

    if (files && files.length > 0) {
      for (let i = 0; i < files.length; i++) {
        fieldsArr.push({
          Key: fileKey[i],
          Value: files[i].filename,
          FileName: files[i].originalname
        })
      }
    }

    const object = new Object({
      name,
      fields: fieldsArr,
      tags,
      createdBy: local.user._id
    })
    await object.save()
  } catch (err) {
    throw Error(err)
  }
}

const updateObject = async (params, body, files, local) => {
  try {
    const { name, fields, tags, fileKey } = body
    const objectId = params.objectId

    const object = await Object.findOne({ createdBy: local.user._id, _id: objectId })
    if (!object) {
      throw Error('object with given id not found')
    }

    const fieldsArr = []
    if (fields && fields.length > 0) {
      fieldsArr.push(...fields.map((field) => JSON.parse(field)))
    }

    if (files && files.length > 0) {
      for (let i = 0; i < files.length; i++) {
        fieldsArr.push({
          Key: fileKey[i],
          Value: files[i].filename,
          FileName: files[i].originalname
        })
      }
    }

    await Object.findOneAndUpdate({ _id: objectId }, {
      name,
      fields: fieldsArr,
      tags,
      createdBy: local.user._id
    })
  } catch (err) {
    throw Error(err)
  }
}

const deleteObject = async (params, local) => {
  try {
    const objectId = params.objectId
    const object = await Object.findOne({ createdBy: local.user._id, _id: objectId })
    if (!object) {
      throw Error('object with given id not found')
    }
    await object.remove()
  } catch (err) {
    throw Error(err)
  }
}

const getObjects = async (local) => {
  try {
    const objects = await Object.find({ createdBy: local.user._id })
    if (!objects) {
      throw Error('objects don\'t exist')
    }
    return objects
  } catch (err) {
    throw Error(err)
  }
}

const getObjectsByTag = async (body, local) => {
  try {
    const { tags } = body
    const objects = await Object.find({ createdBy: local.user._id, tags: { $in: tags } })
    if (!objects) {
      throw Error('objects don\'t exist')
    }
  } catch (err) {
    throw Error(err)
  }
}

const getAnObject = async (params, local) => {
  try {
    const objectId = params.objectId
    const object = await Object.findOne({ createdBy: local.user._id, _id: objectId })
    if (!object) {
      throw Error('object with given id not found')
    }
  } catch (err) {
    throw Error(err)
  }
}

module.exports = {
  createObject,
  updateObject,
  deleteObject,
  getObjects,
  getObjectsByTag,
  getAnObject
}
