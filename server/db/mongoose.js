const mongoose = require("mongoose");

const keys = require("./keys/keys");

mongoose.Promise = global.Promise;
if (process.env.NODE_ENV === "production") {
  mongoose.connect("mongodb://test:test@ds237770.mlab.com:37770/todo-app");
} else {
  mongoose.connect("mongodb://localhost:27017/TodoApp");
}

module.exports = {
  mongoose
};
