const mongoose = require('mongoose');

const objSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxLength: 20,
    unique: true
  },
  objs: {
    type: {},
    required: true
  },
  tags: [{
    type: String
  }],
  createdBy: {
    type: mongoose.Schema.Types.ObjectID,
    ref: 'User',
    required: true
  }
});

module.exports = mongoose.model('Obj', objSchema);
