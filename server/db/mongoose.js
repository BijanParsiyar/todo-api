const mongoose = require("mongoose");

const keys = require("./keys/keys");

mongoose.Promise = global.Promise;

mongoose.connect("mongodb://test:test@ds237770.mlab.com:37770/todo-app");

module.exports = {
  mongoose
};
