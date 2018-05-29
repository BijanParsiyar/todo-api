const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    minlength: 1
  }
});

module.exports = User = mongoose.model("user", UserSchema);
