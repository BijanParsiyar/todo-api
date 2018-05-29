const express = require("express");
const mongoose = require("mongoose");
const { ObjectID } = require("mongodb");
// Todo model
const Todo = require("../db/models/Todo");

module.exports = app => {
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

  // Delete - removes a todo
  app.delete("/todos/:id", (req, res) => {
    let id = req.params.id;

    if (!ObjectID.isValid(id)) {
      return res.status(404).send();
    }

    Todo.findByIdAndRemove(id)
      .then(todo => {
        if (!todo) {
          return res.status(404).send();
        }

        res.send(todo);
      })
      .catch(e => {
        res.status(400).send();
      });
  });
};
