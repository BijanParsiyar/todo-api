const express = require("express");
const bodyParser = require("body-parser");
const { ObjectID } = require("mongodb");

const { mongoose } = require("./db/mongoose");
const { Todo } = require("./db/models/Todo");
const { User } = require("./db/models/User");

const app = express();

app.use(bodyParser.json());

// Get - gets all todos
app.get("/todos", (req, res) => {
  Todo.find()
    .then(todos => {
      res.send({
        todos
      });
    })
    .catch(err => {
      res.status(400).send(err);
    });
});

// Get - get todo by id
app.get("/todos/:id", (req, res) => {
  let id = req.params.id;

  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  Todo.findById(id)
    .then(todo => {
      if (!todo) {
        return res.status(404).send();
      }

      res.send({ todo });
    })
    .catch(err => {
      res.status(400).send();
    });
});

// Post - add todo to db
app.post("/todos", (req, res) => {
  const todo = new Todo({
    text: req.body.text
  });

  todo
    .save()
    .then(doc => {
      res.send(doc);
    })
    .catch(err => {
      res.status(400).send(err);
    });
});

let port = 3000 || process.env.PORT;
app.listen(port, () => {
  console.log(`Started on port ${port}`);
});

module.exports = {
  app
};
