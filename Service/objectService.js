const Object = require('../Models/Object');
const fs = require('fs');

const findObject = (obj, key, value) => {
  const result = [];
  const recursiveSearch = (obj) => {
    if (!obj || typeof obj !== 'object') {
      return;
    }
    if (obj[key] === value) {
      result.push(obj);
    }
    Object.keys(obj).forEach(function (k) {
      recursiveSearch(obj[k]);
    });
  };
  recursiveSearch(obj);
  return result;
};

const createObject = async (body, locals) => {
  try {
    const { name, fields, tags } = body;
    const files = findObject(fields, 'type', 'file');

    files.forEach((file) => {
      if (fs.existsSync(`./uploads/${file.fileName}`)) {
        fs.rename(`./uploads/${file.fileName}`, `./uploadsFinal/${file.fileName}`, function (err) {
          if (err) {
            console.log(err);
          }
          console.log('Successfully renamed - AKA moved!');
        });
      }else{
        console.log('not found');
      }
    });

    const object = new Object({
      name,
      fields,
      tags,
      createdBy: locals.user._id
    });
    await object.save();
  } catch (err) {
    throw Error(err);
  }
};

const updateObject = async (params, body, files, locals) => {
  try {
    const { name, fields, tags, fileKey } = body;
    const objectId = params.objectId;

    const object = await Object.findOne({ createdBy: locals.user._id, _id: objectId });
    if (!object) {
      throw Error('object with given id not found');
    }

    const fieldsArr = [];
    if (fields && fields.length > 0) {
      fieldsArr.push(...fields.map((field) => JSON.parse(field)));
    }

    if (files && files.length > 0) {
      for (let i = 0; i < files.length; i++) {
        fieldsArr.push({
          Key: fileKey[i],
          Value: files[i].filename,
          FileName: files[i].originalname
        });
      }
    }

    await Object.findOneAndUpdate({ _id: objectId }, {
      name,
      fields: fieldsArr,
      tags,
      createdBy: locals.user._id
    });
  } catch (err) {
    throw Error(err);
  }
};

const deleteObject = async (params, locals) => {
  try {
    const objectId = params.objectId;
    const object = await Object.findOne({ createdBy: locals.user._id, _id: objectId });
    if (!object) {
      throw Error('object with given id not found');
    }
    await object.remove();
  } catch (err) {
    throw Error(err);
  }
};

const getObjects = async (locals) => {
  try {
    const objects = await Object.find({ createdBy: locals.user._id });
    if (!objects) {
      throw Error('objects don\'t exist');
    }
    return objects;
  } catch (err) {
    throw Error(err);
  }
};

const getObjectsByTag = async (body, locals) => {
  try {
    const { tags } = body;
    const objects = await Object.find({ createdBy: locals.user._id, tags: { $in: tags } });
    if (!objects) {
      throw Error('objects don\'t exist');
    }
  } catch (err) {
    throw Error(err);
  }
};

const getAnObject = async (params, locals) => {
  try {
    const objectId = params.objectId;
    const object = await Object.findOne({ createdBy: locals.user._id, _id: objectId });
    if (!object) {
      throw Error('object with given id not found');
    }
  } catch (err) {
    throw Error(err);
  }
};

module.exports = {
  createObject,
  updateObject,
  deleteObject,
  getObjects,
  getObjectsByTag,
  getAnObject
};
