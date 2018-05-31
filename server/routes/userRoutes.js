const express = require("express");
const mongoose = require("mongoose");
const _ = require("lodash");

const User = require("../db/models/User");

module.exports = app => {
  // Post - new user
  app.post("/users", (req, res) => {
    let body = _.pick(req.body, ["email", "password"]);

    const user = new User(body);

    user
      .save()
      .then(() => {
        return user.generateAuthToken();
      })
      .then(token => {
        res.header("x-auth", token).send(user);
      })
      .catch(e => res.status(400).send(e));
  });
};
