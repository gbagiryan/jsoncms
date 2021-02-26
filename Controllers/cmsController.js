const cmsService = require('../Service/cmsService');
const logger = require('../logger');

const getObj = async (req, res) => {
  try {
    const obj = await cmsService.getObj(req.params.objId);
    return res.status(200).json(obj);
  } catch (err) {
    logger.error(err);
    res.status(500).json({ errorMessage: 'server error' });
  }
};

module.exports = {
  getObj
};
