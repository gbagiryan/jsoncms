const mongoose = require("mongoose");

const objectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxLength: 20
    },
    fields: [{
        Key: {
            type: String,
            required: true
        },
        Value: {
            type: {},
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

module.exports = mongoose.model('Object', objectSchema);