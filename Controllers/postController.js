const Post = require('../Models/Post');


const createAnObject = async (req, res) => {
    try {
        const {name, post, tags} = req.body;
        const object = new Post({
            name,
            post,
            tags,
            createdBy: req.user._id
        });
        await object.save();
        res.status(200).json('new object posted');
    } catch (err) {
        console.log(err);
        res.status(500).json('server error');
    }
}

const updateObject = async (req, res) => {
    try {
        const objectId = req.params.objectId;
        const {name, post, tags} = req.body;
        const object = await Post.findOne({createdBy: req.user._id, _id: objectId});
        if (!object) {
            return res.status(400).json('object with given id not found');
        }
        await Post.findOneAndUpdate({_id: objectId}, {
            name,
            post,
            tags,
            createdBy: req.user._id
        });
        return res.status(200).json('object updated');
    } catch (err) {
        console.log(err);
        res.status(500).json('server error');
    }
}

const deleteObject = async (req, res) => {
    try {
        const objectId = req.params.objectId;
        const object = await Post.findOne({createdBy: req.user._id, _id: objectId});
        if (!object) {
            return res.status(400).json('object with given id not found');
        }
        await object.remove();

        return res.status(200).json('object removed');

    } catch (err) {
        console.log(err);
        res.status(500).json('server error');
    }
}

const getObjects = async (req, res) => {
    try {
        const objects = await Post.find({createdBy: req.user._id});
        if (!objects) {
            return res.status(400).json('objects don\'t exist');
        }
        return res.status(200).json(objects);
    } catch (err) {
        console.log(err);
        res.status(500).json('server error');
    }
}

const getObjectsByTag = async (req, res) => {
    const {tags} = req.body;
    try {
        const objects = await Post.find({createdBy: req.user._id, tags});
        if (!objects) {
            return res.status(400).json('objects don\'t exist');
        }
        return res.status(200).json(objects);
    } catch (err) {
        console.log(err);
        res.status(500).json('server error');
    }
}
const getAnObject = async (req, res) => {
    try {
        const objectId = req.params.objectId;
        const object = await Post.findOne({createdBy: req.user._id, _id: objectId});
        if (!object) {
            return res.status(400).json('object with given id not found');
        }
        return res.status(200).json(object);
    } catch (err) {
        console.log(err);
        res.status(500).json('server error');
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