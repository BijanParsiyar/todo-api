const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const jwt = require("jsonwebtoken");
const _ = require("lodash");

const validator = require("validator");

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

  return _.pick(userObject, ["_id", "email"]); // get the id and email from the user instance object and
  // send that to the user
};

// Instance method
UserSchema.methods.generateAuthToken = function() {
  let user = this;
  let access = "auth";
  let token = jwt
    .sign({ _id: user._id.toHexString(), access }, "abc123")
    .toString();

  user.tokens = user.tokens.concat({
    access,
    token
  });

  return user.save().then(() => {
    return token; // the token above
  });
};

// Model method
UserSchema.statics.findByToken = function(token) {
  let User = this;
  let decoded;

  try {
    decoded = jwt.verify(token, "abc123");
  } catch (e) {
    return Promise.reject(); // Same thing as instantiating a promise and rejecting it
  }

  return User.findOne({
    _id: decoded._id,
    "tokens.token": token,
    "tokens.access": "auth"
  });
};

module.exports = User = mongoose.model("user", UserSchema);
