const Obj = require('../Models/Obj');

const formatObj = (objs) => {
  let result = {};
  Object.keys(objs).forEach((k) => {
    if (objs[k].__type === 'object') {
      const key = objs[k].__key;
      const val = formatObj(objs[k].__value);
      const innerObj = { [key]: val };
      result = { ...result, ...innerObj };
    } else if (objs[k].__type === 'array') {
      const key = objs[k].__key;
      // const forArr = objs[k].__value.map((arrItem) => arrItem.__type === 'string' ? arrItem.__value : formatObj(arrItem.__value));
      // const arr = formatArr(objs[k].__value);
      const arr = [];
      objs[k].__value.forEach((arrItem) => {
        console.log(arrItem);
        if (arrItem.__type === 'object' || arrItem.__type === 'array') {
          formatObj(arrItem.__value);
        } else {
          arr.push(arrItem.__value);
        }
      });
      result = { ...result, ...{ [key]: arr } };
    } else {
      const key = objs[k].__key;
      const val = objs[k].__value;
      result = { ...result, ...{ [key]: val } };
    }
  });
  return { ...result };
};

// const formatArr = (arr) => {
//   const result = [];
//   arr.forEach((arrItem) => {
//     if (arrItem.__type === 'object') {
//       formatObj(arrItem.__value);
//     } else if (arrItem.__type === 'array') {
//       formatArr(arrItem.__value);
//     } else {
//       result.push(arrItem.__value);
//     }
//   });
//   return result;
// };

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
