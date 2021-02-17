const Obj = require('../Models/Obj');
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
    const files = findObj(objs, 'type', 'file');

    files.forEach((file) => {
      if (fs.existsSync(`./uploads/${file.fileName}`)) {
        fs.rename(`./uploads/${file.fileName}`, `./uploadsFinal/${file.fileName}`, function (err) {
          if (err) throw err;
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
    throw Error(err);
  }
};

const updateObj = async (params, body, files, locals) => {
  try {
    const { name, objs, tags } = body;
    const objId = params.objId;

    const obj = await Obj.findOne({ createdBy: locals.user._id, _id: objId });
    if (!obj) {
      throw Error('object with given id not found');
    }

    const objsArr = [];
    if (objs && objs.length > 0) {
      objsArr.push(...objs.map((obj) => JSON.parse(obj)));
    }

    await Obj.findOneAndUpdate({ _id: objId }, {
      name,
      objs: objsArr,
      tags,
      createdBy: locals.user._id
    });
  } catch (err) {
    throw Error(err);
  }
};

const deleteObj = async (params, locals) => {
  try {
    const objId = params.objId;
    const obj = await Obj.findOne({ createdBy: locals.user._id, _id: objId });
    if (!obj) {
      throw Error('object with given id not found');
    }
    await obj.remove();
  } catch (err) {
    throw Error(err);
  }
};

const getObjs = async (locals) => {
  try {
    const objs = await Obj.find({ createdBy: locals.user._id });
    if (!objs) {
      throw Error('objects don\'t exist');
    }
    return objs;
  } catch (err) {
    throw Error(err);
  }
};

const getObjsByTag = async (body, locals) => {
  try {
    const { tags } = body;
    const objs = await Obj.find({ createdBy: locals.user._id, tags: { $in: tags } });
    if (!objs) {
      throw Error('objects don\'t exist');
    }
  } catch (err) {
    throw Error(err);
  }
};

const getAnObj = async (params, locals) => {
  try {
    const objId = params.objId;
    const obj = await Obj.findOne({ createdBy: locals.user._id, _id: objId });
    if (!obj) {
      throw Error('object with given id not found');
    }
  } catch (err) {
    throw Error(err);
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
