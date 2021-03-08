const Obj = require('../Models/Obj');
const CustomError = require('../ErrorHandling/customErrors');
const logger = require('../logger');

const formatObj = (objs) => {
  let result = {};
  Object.keys(objs).forEach((k) => {
    if (objs[k].__type === 'object') {
      const key = objs[k].__key;
      const val = formatObj(objs[k].__value);
      result = { ...result, ...{ [key]: val } };
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
      const val = objs[k].__value;
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
    objs.objs = objs.map(obj => formatObj(obj.objs));
    formattedObj = objs;
  } else {
    const obj = await Obj.findOne({ createdBy, name });
    if (!obj) {
      throw new CustomError('object not found check user and object name');
    }
    obj.objs = formatObj(obj.objs);
    formattedObj = obj;
  }
  return formattedObj;
};

module.exports = {
  getObj
};
