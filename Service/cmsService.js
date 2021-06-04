const Obj = require('../Models/Obj');
const CustomError = require('../ErrorHandling/customErrors');
const logger = require('../logger/logger');

const formatObj = (objs) => {
  let result = {};
  Object.keys(objs).forEach((k) => {
    if (objs[k].__type === 'object') {
      const key = objs[k].__key;
      const val = formatObj(objs[k].__value);
      if (key && key !== '') {
        result = { ...result, ...{ [key]: val } };
      } else {
        result = [...Object.values(result), val];
      }
      // result = { ...result, ...{ [key]: val } };
    } else if (objs[k].__type === 'array') {
      const key = objs[k].__key;
      const arr = Object.values(formatObj(objs[k].__value));
      if (key && key !== '') {
        result = { ...result, ...{ [key]: arr } };
      } else {
        result = [...Object.values(result), arr];
      }
    } else {
      const key = objs[k].__key;
      let val;
      if (objs[k].__type === 'file') {
        val = objs[k].__value.fileName;
      } else {
        val = objs[k].__value;
      }
      if (key && key !== '') {
        result = { ...result, ...{ [key]: val } };
      } else {
        result = [...Object.values(result), val];
      }
    }
  });
  return result;
};

const getObj = async (query) => {
  const createdBy = query.accountId;
  const name = query.objectName;

  logger.info(`Client get object request for ${query}`);

  let formattedObj;
  logger.info(`Formatting ${query} query object`);

  if (!name) {
    const objs = await Obj.find({ createdBy });
    if (!objs) {
      throw new CustomError('object not found check user and object name');
    }
    formattedObj = objs.map(obj => formatObj(obj.objs));
  } else {
    const name = query.objectName.split('.')[0];
    const objPath = query.objectName.split('.');
    objPath.splice(0, 1);
    const obj = await Obj.findOne({ createdBy, name });
    if (!obj) {
      throw new CustomError('object not found check user and object name');
    }
    formattedObj = formatObj(obj.objs);

    if (objPath.length > 0) {
      let objs = formattedObj;
      for (let i = 0; i < objPath.length; i++) {
        objs = objs[objPath[i]];
      }
      if (objs) {
        formattedObj = objs;
      }
    }
  }
  return formattedObj;
};

module.exports = {
  getObj
};
