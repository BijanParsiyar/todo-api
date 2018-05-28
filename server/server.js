const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const { ObjectID } = require("mongodb");

const todo = require("./routes/todoRoutes");

const app = express();

app.use(bodyParser.json());

// DB config
const db = require("./config/keys").mongoURI;

// Connect to MongoDb
mongoose
  .connect(db)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

require("./routes/todoRoutes")(app);

let port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Started on port ${port}`);
});
