const _ = require("lodash");
const express = require("express");
const mongoose = require("mongoose");
const { ObjectID } = require("mongodb");
// Todo model
const Todo = require("../db/models/Todo");
const { authenticate } = require("../middleware/authenticate");

module.exports = app => {
  // Get - gets all todos
  app.get("/todos", authenticate, (req, res) => {
    Todo.find({
      _creator: req.user._id // Gets the todos that are linked to the currently logged in user
    })
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
  app.get("/todos/:id", authenticate, (req, res) => {
    let id = req.params.id;

    if (!ObjectID.isValid(id)) {
      return res.status(404).send();
    }

    Todo.findOne({
      _id: id,
      _creator: req.user._id
    })
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
  app.post("/todos", authenticate, (req, res) => {
    const todo = new Todo({
      text: req.body.text,
      _creator: req.user._id
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

  // Path - updated todo items
  app.patch("/todos/:id", authenticate, (req, res) => {
    let id = req.params.id;
    // the array is the properties u want to pull off if they exist, text and completed
    let body = _.pick(req.body, ["text", "completed"]);

    if (!ObjectID.isValid(id)) {
      return res.status(404).send();
    }

    if (_.isBoolean(body.completed) && body.completed) {
      body.completedAt = new Date().getTime();
    } else {
      body.completed = false;
      body.completedAt = null;
    }

    // return the newly updated todo
    Todo.findOneAndUpdate(
      { _id: id, _creator: req.user._id },
      { $set: body },
      { new: true }
    )
      .then(todo => {
        if (!todo) {
          return res.status(404).send();
        }

        res.send({ todo });
      })
      .catch(e => {
        res.status(400).send();
      });
  });

  // Delete - removes a todo
  app.delete("/todos/:id", authenticate, (req, res) => {
    let id = req.params.id;

    if (!ObjectID.isValid(id)) {
      return res.status(404).send();
    }

    Todo.findOneAndRemove({
      _id: id,
      _creator: req.user._id
    })
      .then(todo => {
        if (!todo) {
          return res.status(404).send();
        }

        res.send({ todo });
      })
      .catch(e => {
        res.status(400).send();
      });
  });
};
