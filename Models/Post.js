const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    post: [{
        key: {
            type: String,
            required: true
        },
        value: {
            type: String,
            required: true
        },
    }],
    tags: [{
        type: String
    }],
    createdBy: {
        type: mongoose.Schema.Types.ObjectID, ref: 'User',
        required: true
    }
});

module.exports = mongoose.model('Post', postSchema);