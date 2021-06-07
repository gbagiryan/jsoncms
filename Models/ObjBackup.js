const mongoose = require('mongoose');

const objBackupSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxLength: 20
  },
  objs: {
    type: {},
    required: true
  },
  tags: [{
    type: String
  }],
  mainObj: {
    type: mongoose.Schema.Types.ObjectID,
    ref: 'Obj',
    required: true
  },
  backupVersion: {
    type: Number,
    max: 5
  }
}, { timestamps: true });

module.exports = mongoose.model('ObjBackup', objBackupSchema);
