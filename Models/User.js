const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    require: true,
    unique: true
  },
  password: {
    type: String,
    require: true,
    minlength: 6
  }
});

userSchema.statics.comparePasswords = async function (username, password) {
  const user = await this.findOne({ username });
  if (user) {
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      return user;
    }
  }
  throw new Error('wrong username or password');
};

module.exports = mongoose.model('User', userSchema);
