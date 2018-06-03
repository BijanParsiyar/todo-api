const express = require("express");
const mongoose = require("mongoose");
const _ = require("lodash");

const User = require("../db/models/User");
const { authenticate } = require("../middleware/authenticate");

const secret = require("../db/config/keys").JWT_SECRET;

module.exports = app => {
  // Post - new user - signing up
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

  // Post - logging in
  app.post("/users/login", (req, res) => {
    let body = _.pick(req.body, ["email", "password"]);

    User.findByCredentials(body.email, body.password)
      .then(user => {
        return user.generateAuthToken().then(token => {
          res.header("x-auth", token).send(user);
        });
      })
      .catch(e => {
        res.status(400).send();
      });
  });

  // Verify x-auth token and send user back
  app.get("/users/me", authenticate, (req, res) => {
    res.send(req.user);
  });

  // Delete token from user - logout user
  app.delete("/users/me/token", authenticate, (req, res) => {
    req.user
      .removeToken(req.token)
      .then(() => {
        res.status(200).send();
      })
      .catch(e => res.status(400).send());
  });
};
