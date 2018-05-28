const mongoose = require("mongoose");

const keys = require("./keys/keys");

mongoose.Promise = global.Promise;

mongoose.connect(process.env.MONGO_URI || "mongodb://localhost:27017/TodoApp");

module.exports = {
  mongoose
};
