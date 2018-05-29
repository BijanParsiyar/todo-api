const mongoose = require("mongoose");
const { ObjectID } = require("mongodb");

const Todo = require("../server/db/models/Todo");
const User = require("../server/db/models/User");

// DB config
const db = require("../server/db/config/keys").mongoURI;

// Connect to MongoDb
mongoose
  .connect(db)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

Todo.remove({}).then(result => {
  console.log(result);
});
