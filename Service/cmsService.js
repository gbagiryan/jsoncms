const Obj = require('../Models/Obj');

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

const getObj = async (objId) => {
  try {
    const obj = await Obj.findById(objId);
    if (!obj) {
      throw new Error('object with given id not found');
    }
    const formattedObj = formatObj(obj.objs);
    return formattedObj;
  } catch (err) {
    throw new Error(err);
  }
};

module.exports = {
  getObj
};
