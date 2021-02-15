const mongoose = require('mongoose')

const objectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxLength: 20,
    unique: true
  },
  fields: {
    type:{}
  },
  tags: [{
    type: String
  }],
  createdBy: {
    type: mongoose.Schema.Types.ObjectID,
    ref: 'User',
    required: true
  }
})

module.exports = mongoose.model('Object', objectSchema)
