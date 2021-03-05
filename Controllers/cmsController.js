const cmsService = require('../Service/cmsService');
const logger = require('../logger');
const CustomError = require('../ErrorHandling/customErrors');

const getObj = async (req, res) => {
  try {
    const obj = await cmsService.getObj(req.query);
    logger.info(`Successful ${obj} response`);

    return res.status(200).json(obj);
  } catch (err) {
    logger.error(err);
    if (err instanceof CustomError) {
      return res.status(500).json({ errorMessage: err.message });
    } else {
      return res.status(500).json({ errorMessage: 'server error' });
    }
  }
};

module.exports = {
  getObj
};
