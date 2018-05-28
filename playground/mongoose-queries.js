const { ObjectID } = require("mongodb");

const { mongoose } = require("../server/db/mongoose");
const { Todo } = require("../server/db/models/Todo");
const { User } = require("../server/db/models/User");

// var id = "5b0c32727c7ef041341edc5e111";

// if (!ObjectID.isValid(id)) {
//   console.log("ID not valid");
// }

// Todo.find({
//   _id: id
// }).then(todos => {
//   console.log("Todos", todos);
// });

// Todo.findOne({
//   _id: id
// }).then(todo => {
//   console.log("Todo", todo);
// });

// Todo.findById(id)
//   .then(todo => {
//     if (!todo) {
//       return console.log("Id not found");
//     }
//     console.log("Todo By Id", todo);
//   })
//   .catch(e => {
//     console.log(e);
//   });

let userId = "5b0bfb0708dc1f2a2861fd24";

User.findById(userId)
  .then(user => {
    if (!user) {
      return console.log("Unable to find user");
    }

    console.log(JSON.stringify(user, undefined, 2));
  })
  .catch(err => {
    console.log(err);
  });
