const logger = require('../logger');
const objService = require('../Service/objService');

const createAnObj = async (req, res) => {
  try {
    await objService.createObj(req.body, req.app.locals);
    res.status(200).json({ successMessage: 'new object posted' });
  } catch (err) {
    logger.error(err);
    res.status(500).json({ errorMessage: 'server error' });
  }
};

const updateObj = async (req, res) => {
  try {
    await objService.updateObj(req.params, req.body, req.app.locals);
    return res.status(200).json({ successMessage: 'object updated' });
  } catch (err) {
    logger.error(err);
    res.status(500).json({ errorMessage: 'server error' });
  }
};

const deleteObj = async (req, res) => {
  try {
    await objService.deleteObj(req.params, req.app.locals);
    return res.status(200).json({ successMessage: 'object removed' });
  } catch (err) {
    logger.error(err);
    res.status(500).json({ errorMessage: 'server error' });
  }
};

const getObjs = async (req, res) => {
  try {
    const objs = await objService.getObjs(req.app.locals);
    return res.status(200).json(objs);
  } catch (err) {
    logger.error(err);
    res.status(500).json({ errorMessage: 'server error' });
  }
};

const getObjsByTag = async (req, res) => {
  try {
    const objs = await objService.getObjsByTag(req.body, req.app.locals);
    return res.status(200).json(objs);
  } catch (err) {
    logger.error(err);
    res.status(500).json({ errorMessage: 'server error' });
  }
};

const getAnObj = async (req, res) => {
  try {
    const obj = await objService.getAnObj(req.params, req.app.locals);
    return res.status(200).json(obj);
  } catch (err) {
    logger.error(err);
    res.status(500).json({ errorMessage: 'server error' });
  }
};
const uploadFile = async (req, res) => {
  try {
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
