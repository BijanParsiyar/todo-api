const { ObjectID } = require("mongodb");
const jwt = require("jsonwebtoken");

const Todo = require("../../db/models/Todo");
const User = require("../../db/models/User");

const userOneId = new ObjectID();
const userTwoId = new ObjectID();

const secret = require("../../db/config/keys").JWT_SECRET;

const users = [
  {
    _id: userOneId,
    email: "andrew@example.com",
    password: "userOnePass",
    tokens: [
      {
        access: "auth",
        token: jwt.sign({ _id: userOneId, access: "auth" }, secret).toString()
      }
    ]
  },
  {
    _id: userTwoId,
    email: "jen@example.com",
    password: "userTwoPass",
    tokens: [
      {
        access: "auth",
        token: jwt.sign({ _id: userTwoId, access: "auth" }, secret).toString()
      }
    ]
  }
];

const todos = [
  {
    _id: new ObjectID(),
    text: "First test todo",
    _creator: userOneId
  },
  {
    _id: new ObjectID(),
    text: "Second test todo",
    completed: true,
    completedAt: 333,
    _creator: userTwoId
  }
];

const populateTodos = done => {
  Todo.remove({})
    .then(() => {
      return Todo.insertMany(todos);
    })
    .then(() => done());
};

const populateUsers = done => {
  User.remove({})
    .then(() => {
      let userOne = new User(users[0]).save();
      let userTwo = new User(users[1]).save();

      // Wait for all promises to complete
      return Promise.all([userOne, userTwo]);
    })
    .then(() => done());
};

module.exports = {
  todos,
  populateTodos,
  users,
  populateUsers
};
