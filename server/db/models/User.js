const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const jwt = require("jsonwebtoken");
const _ = require("lodash");
const bcrypt = require("bcryptjs");

const validator = require("validator");

const secret = require("../config/keys").JWT_SECRET;

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
    unique: true,
    validate: {
      validator: value => {
        return validator.isEmail(value);
      },
      message: "{VALUE} is not a valid email"
    }
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  tokens: [
    {
      access: {
        type: String,
        required: true
      },
      token: {
        type: String,
        required: true
      }
    }
  ]
});

// Instance method
// This method determine what exactly gets sent back when a mongoose model is convereted to a JSON value
UserSchema.methods.toJSON = function() {
  let user = this;
  let userObject = user.toObject(); // turns mongoose model into a regular object with the properties
  // basically removes all the methods associated to it

  return _.pick(userObject, ["_id", "email"]); // get the id and email from the user instance object and
  // send that to the user
};

// Instance method
UserSchema.methods.generateAuthToken = function() {
  let user = this;
  let access = "auth";
  let token = jwt
    .sign({ _id: user._id.toHexString(), access }, secret)
    .toString();

  user.tokens = user.tokens.concat({
    access,
    token
  });

  return user.save().then(() => {
    return token; // the token above
  });
};

// Instance method
UserSchema.methods.removeToken = function(token) {
  let user = this;

  return user.update({
    $pull: {
      tokens: {
        token
      }
    }
  });
};

// Model method
UserSchema.statics.findByToken = function(token) {
  let User = this;
  let decoded;

  try {
    decoded = jwt.verify(token, secret);
  } catch (e) {
    return Promise.reject(); // Same thing as instantiating a promise and rejecting it
  }

  return User.findOne({
    _id: decoded._id,
    "tokens.token": token,
    "tokens.access": "auth"
  });
};

// Model method
UserSchema.statics.findByCredentials = function(email, password) {
  let User = this;

  return User.findOne({ email }).then(user => {
    if (!user) {
      return Promise.reject();
    }

    return new Promise((resolve, reject) => {
      bcrypt.compare(password, user.password, (err, res) => {
        if (res) {
          resolve(user);
        } else {
          reject();
        }
      });
    });
  });
};

// Mongoose middleware - generates hashed password
UserSchema.pre("save", function(next) {
  let user = this;

  if (user.isModified("password")) {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(user.password, salt, (err, hash) => {
        user.password = hash;
        next(); // gets send to next mongoose middleware, if there is no middlware left it will get saved to // the mongo database
      });
    });
  } else {
    next();
  }
});

module.exports = User = mongoose.model("user", UserSchema);
