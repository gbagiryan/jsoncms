const logger = require('../logger/logger');
const objService = require('../Service/objService');
const CustomError = require('../ErrorHandling/customErrors');

const createAnObj = async (req, res) => {
  try {
    await objService.createObj(req.body, req.app.locals);
    logger.info('Successful object creation');
    res.status(200).json({ successMessage: 'new object posted' });
  } catch (err) {
    logger.error(err);
    if (err instanceof CustomError) {
      return res.status(500).json({ errorMessage: err.message });
    } else {
      return res.status(500).json({ errorMessage: 'server error' });
    }
  }
};

const updateObj = async (req, res) => {
  try {
    await objService.updateObj(req.params, req.body, req.app.locals);
    logger.info('Successful object update');
    return res.status(200).json({ successMessage: 'object updated' });
  } catch (err) {
    logger.error(err);
    if (err instanceof CustomError) {
      return res.status(500).json({ errorMessage: err.message });
    } else {
      return res.status(500).json({ errorMessage: 'server error' });
    }
  }
};

const deleteObj = async (req, res) => {
  try {
    await objService.deleteObj(req.params, req.app.locals);
    logger.info('Successful object delete');
    return res.status(200).json({ successMessage: 'object removed' });
  } catch (err) {
    logger.error(err);
    if (err instanceof CustomError) {
      return res.status(500).json({ errorMessage: err.message });
    } else {
      return res.status(500).json({ errorMessage: 'server error' });
    }
  }
};

const getObjs = async (req, res) => {
  try {
    const objs = await objService.getObjs(req.app.locals);
    logger.info('Successful get all objects response');
    return res.status(200).json(objs);
  } catch (err) {
    logger.error(err);
    if (err instanceof CustomError) {
      return res.status(500).json({ errorMessage: err.message });
    } else {
      return res.status(500).json({ errorMessage: 'server error' });
    }
  }
};

const getObjsByTag = async (req, res) => {
  try {
    const objs = await objService.getObjsByTag(req.body, req.app.locals);
    logger.info('Successful get object by tags response');
    return res.status(200).json(objs);
  } catch (err) {
    logger.error(err);
    if (err instanceof CustomError) {
      return res.status(500).json({ errorMessage: err.message });
    } else {
      return res.status(500).json({ errorMessage: 'server error' });
    }
  }
};

const getAnObj = async (req, res) => {
  try {
    const obj = await objService.getAnObj(req.params, req.app.locals);
    logger.info('Successful get single object response');
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
const uploadFile = async (req, res) => {
  try {
    logger.info(`Uploading ${req.file.filename} file`);
    res.status(200).json({
      fileName: `/public/${req.file.filename}`,
      originalName: req.file.originalname
    });
  } catch (err) {
    logger.error(err);
    res.status(500).json({ errorMessage: 'server error' });
  }
};

module.exports = {
  getObjs,
  getObjsByTag,
  getAnObj,
  createAnObj,
  updateObj,
  deleteObj,
  uploadFile
};
