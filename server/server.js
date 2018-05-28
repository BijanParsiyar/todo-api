const express = require("express");
const bodyParser = require("body-parser");

const { mongoose } = require("./db/mongoose");
const { Todo } = require("./db/models/Todo");
const { User } = require("./db/models/User");

const app = express();

app.use(bodyParser.json());

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
