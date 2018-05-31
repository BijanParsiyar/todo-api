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

// We do not get the doc back only tells us how many was removed
// Todo.remove({}).then(result => {
//   console.log(result);
// });

// Sends the doc back to us
Todo.findOneAndRemove({ _id: "5b0d7c5d6617cb6d8bb0ab9c" }).then(todo => {
  console.log(todo);
});

// Todo.findByIdAndRemove()

// Todo.findByIdAndRemove('5b0d7c5d6617cb6d8bb0ab9c')
//   .then(todo => {
//     console.log(todo);
//   })
