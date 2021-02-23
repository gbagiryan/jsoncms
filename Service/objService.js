const Obj = require('../Models/Obj');
const logger = require('../logger');
const fs = require('fs');

const findObj = (obj, key, value) => {
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

const createObj = async (body, locals) => {
  try {
    const { name, objs, tags } = body;

    const files = findObj(objs, '__type', '__file');

    files.forEach((file) => {
      const filename = file.subObjValue.fileName.replace('/public/', '');
      if (fs.existsSync(`./uploads/${filename}`)) {
        fs.rename(`./uploads/${filename}`, `./uploadsFinal/${filename}`, function (err) {
          if (err) {
            throw new Error(err);
          }
        });
      }
    });

    const obj = new Obj({
      name,
      objs,
      tags,
      createdBy: locals.user._id
    });
    await obj.save();
  } catch (err) {
    throw new Error(err);
  }
};

const updateObj = async (params, body, locals) => {
  try {
    const { name, objs, tags } = body;
    const objId = params.objId;

    const obj = await Obj.findOne({ createdBy: locals.user._id, _id: objId });
    if (!obj) {
      throw new Error('object with given id not found');
    }

    const files = findObj(objs, 'type', '__file');

    files.forEach((file) => {
      const filename = file.fileName.replace('/public/', '');
      if (fs.existsSync(`./uploads/${filename}`)) {
        fs.rename(`./uploads/${filename}`, `./uploadsFinal/${filename}`, function (err) {
          if (err) {
            throw new Error(err);
          }
          ;
        });
      }
    });

    await Obj.findOneAndUpdate({ _id: objId }, {
      name,
      objs,
      tags,
      createdBy: locals.user._id
    });
  } catch (err) {
    throw new Error(err);
  }
};

const deleteObj = async (params, locals) => {
  try {
    const objId = params.objId;
    const obj = await Obj.findOne({ createdBy: locals.user._id, _id: objId });
    if (!obj) {
      throw new Error('object with given id not found');
    }
    await obj.remove();

    const files = findObj(obj, 'type', 'file');
    files.forEach((file) => {
      const filename = file.subObjValue.fileName.replace('/public/', '');
      fs.unlink(`./uploadsFinal/${filename}`, (err) => {
        if (err) {
          logger.error(err);
        }
      });
    });
  } catch (err) {
    throw new Error(err);
  }
};

const getObjs = async (locals) => {
  try {
    const objs = await Obj.find({ createdBy: locals.user._id });
    if (!objs) {
      throw new Error('objects don\'t exist');
    }
    return objs;
  } catch (err) {
    throw new Error(err);
  }
};

const getObjsByTag = async (body, locals) => {
  try {
    const { tags } = body;
    const objs = await Obj.find({ createdBy: locals.user._id, tags: { $in: tags } });
    if (!objs) {
      throw new Error('objects don\'t exist');
    }
  } catch (err) {
    throw new Error(err);
  }
};

const getAnObj = async (params, locals) => {
  try {
    const objId = params.objId;
    const obj = await Obj.findOne({ createdBy: locals.user._id, _id: objId });
    if (!obj) {
      throw new Error('object with given id not found');
    }
  } catch (err) {
    throw new Error(err);
  }
};

module.exports = {
  createObj,
  updateObj,
  deleteObj,
  getObjs,
  getObjsByTag,
  getAnObj
};
