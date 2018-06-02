const User = require("../db/models/User");

let authenticate = (req, res, next) => {
  let token = req.header("x-auth");

  User.findByToken(token)
    .then(user => {
      if (!user) {
        return Promise.reject(); // will go to the catch block
      }

      // attach to user to request object
      req.user = user;
      req.token = token;
      next(); // go to next middleware
    })
    .catch(e => {
      res.status(401).send();
    });
};

module.exports = {
  authenticate
};
