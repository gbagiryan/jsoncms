const Obj = require('../Models/Obj');
const ObjBackup = require('../Models/ObjBackup');
const logger = require('../logger/logger');
const fs = require('fs');
const CustomError = require('../ErrorHandling/customErrors');

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
  const { name, objs, tags } = body;

  logger.info(`UserId: ${locals.user._id}, object creation attempt`);

  if (!name) {
    throw new CustomError('Object name is required');
  }
  const nameExists = await Obj.findOne({ createdBy: locals.user._id, name });
  if (nameExists) {
    throw new CustomError(`Object with ${name} name already exists`);
  }

  logger.info(`UserId: ${locals.user._id}, adding uploaded files to new object `);
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

  const objBackup = new ObjBackup({
    name: obj.name,
    objs: obj.objs,
    tags: obj.tags,
    mainObj: obj._id,
    backupVersion: 1
  });
  await objBackup.save();
};

const updateObj = async (params, body, locals) => {
  const { name, objs, tags } = body;
  const objId = params.objId;

  logger.info(`UserId: ${locals.user._id}, ObjectId: ${objId} object update attempt`);

  const nameExists = await Obj.findOne({ createdBy: locals.user._id, name });
  if (nameExists && JSON.stringify(objId) !== JSON.stringify(nameExists._id)) {
    throw new CustomError(`Object with ${name} name already exists`);
  }

  const obj = await Obj.findOne({ createdBy: locals.user._id, _id: objId });
  if (!obj) {
    throw new CustomError('object with given id not found');
  }

  logger.info(`UserId: ${locals.user._id}, ObjectId: ${objId} adding uploaded files to updated object `);
  const files = findObj(objs, 'type', '__file');

  files.forEach((file) => {
    const filename = file.fileName.replace('/public/', '');
    if (fs.existsSync(`${process.env.TEMP_UPLOAD_DIR}${filename}`)) {
      fs.rename(`./uploads/${filename}`, `${process.env.FINAL_UPLOAD_DIR}${filename}`, function (err) {
        if (err) {
          throw new Error(err);
        }
      });
    }
  });

  const updatedObj = await Obj.findOneAndUpdate({ _id: objId }, {
    name,
    objs,
    tags,
    createdBy: locals.user._id
  }, { new: true });

  const latestBackupObj = await ObjBackup.findOne({ mainObj: objId }).sort('-backupVersion');

  if (latestBackupObj.backupVersion < 5) {
    console.log(latestBackupObj.backupVersion);
    const objBackup = new ObjBackup({
      name: updatedObj.name,
      objs: updatedObj.objs,
      tags: updatedObj.tags,
      mainObj: updatedObj._id,
      backupVersion: latestBackupObj.backupVersion + 1
    });
    await objBackup.save();
  } else {
    await ObjBackup.findOneAndUpdate({ mainObj: objId }, {
      name: updatedObj.name,
      objs: updatedObj.objs,
      tags: updatedObj.tags
    }).sort('updatedAt');
  }
};

const deleteObj = async (params, locals) => {
  const objId = params.objId;

  logger.info(`Attempting to delete ObjectId: ${objId} `);
  const obj = await Obj.findOne({ createdBy: locals.user._id, _id: objId });
  if (!obj) {
    throw new CustomError('object with given id not found');
  }
  await obj.remove();

  const files = findObj(obj, 'type', 'file');
  files.forEach((file) => {
    const filename = file.subObjValue.fileName.replace('/public/', '');
    fs.unlink(`${process.env.TEMP_UPLOAD_DIR}${filename}`, (err) => {
      if (err) {
        logger.error(err);
      }
    });
  });
};

const getObjs = async (locals) => {
  logger.info(`Requesting all objects by ${locals.user._id}`);
  const objs = await Obj.find({ createdBy: locals.user._id });
  if (!objs) {
    throw new CustomError('objects don\'t exist');
  }
  return objs;
};

const getObjsByTag = async (body, locals) => {
  const { tags } = body;
  logger.info(`Requesting objects by ${locals.user._id} with ${tags} tags`);

  const objs = await Obj.find({ createdBy: locals.user._id, tags: { $in: tags } });
  if (!objs) {
    throw new CustomError('objects don\'t exist');
  }
};

const getAnObj = async (params, locals) => {
  const objId = params.objId;
  logger.info(`Requesting objects by ${objId} id`);
  const obj = await Obj.findOne({ createdBy: locals.user._id, _id: objId });
  if (!obj) {
    throw new CustomError('object with given id not found');
  }
  return obj;
};

module.exports = {
  createObj,
  updateObj,
  deleteObj,
  getObjs,
  getObjsByTag,
  getAnObj
};
