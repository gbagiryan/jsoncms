const Object = require('../Models/Object');


const createAnObject = async (req, res) => {
    try {
        const {name, fields, tags} = req.body;
        const object = new Object({
            name,
            fields,
            tags,
            createdBy: req.user._id
        });
        await object.save();
        res.status(200).json({successMessage: 'new object posted'});
    } catch (err) {
        console.log(err);
        res.status(500).json({errorMessage: 'server error'});
    }
}

const updateObject = async (req, res) => {
    try {
        const objectId = req.params.objectId;
        const {name, fields, tags} = req.body;
        const object = await Object.findOne({createdBy: req.user._id, _id: objectId});
        if (!object) {
            return res.status(400).json({errorMessage: 'object with given id not found'});
        }
        await Object.findOneAndUpdate({_id: objectId}, {
            name,
            fields,
            tags,
            createdBy: req.user._id
        });
        return res.status(200).json({successMessage: 'object updated'});
    } catch (err) {
        console.log(err);
        res.status(500).json({errorMessage: 'server error'});
    }
}

const deleteObject = async (req, res) => {
    try {
        const objectId = req.params.objectId;
        const object = await Object.findOne({createdBy: req.user._id, _id: objectId});
        if (!object) {
            return res.status(400).json({errorMessage: 'object with given id not found'});
        }
        await object.remove();

        return res.status(200).json({successMessage: 'object removed'});

    } catch (err) {
        console.log(err);
        res.status(500).json({errorMessage: 'server error'});
    }
}

const getObjects = async (req, res) => {
    try {
        const objects = await Object.find({createdBy: req.user._id});
        if (!objects) {
            return res.status(400).json({errorMessage: 'objects don\'t exist'});
        }
        return res.status(200).json(objects);
    } catch (err) {
        console.log(err);
        res.status(500).json({errorMessage: 'server error'});
    }
}

const getObjectsByTag = async (req, res) => {
    const {tags} = req.body;
    try {
        const objects = await Object.find({createdBy: req.user._id, tags});
        if (!objects) {
            return res.status(400).json({errorMessage: 'objects don\'t exist'});
        }
        return res.status(200).json(objects);
    } catch (err) {
        console.log(err);
        res.status(500).json({errorMessage: 'server error'});
    }
}
const getAnObject = async (req, res) => {
    try {
        const objectId = req.params.objectId;
        const object = await Object.findOne({createdBy: req.user._id, _id: objectId});
        if (!object) {
            return res.status(400).json({errorMessage: 'object with given id not found'});
        }
        return res.status(200).json(object);
    } catch (err) {
        console.log(err);
        res.status(500).json({errorMessage: 'server error'});
    }
}

module.exports = {
    getObjects,
    getObjectsByTag,
    getAnObject,
    createAnObject,
    updateObject,
    deleteObject
}