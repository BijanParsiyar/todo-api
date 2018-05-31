const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const todo = require("./routes/todoRoutes");

const app = express();

app.use(bodyParser.json());

// DB config
const db = require("./db/config/keys").mongoURI;

// Connect to MongoDb
mongoose
  .connect(db)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// Api routes
require("./routes/todoRoutes")(app);
require("./routes/userRoutes")(app);

let port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Started on port ${port}`);
});

// For testing purposes
module.exports = {
  app
};
