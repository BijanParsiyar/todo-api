// const MongoClient = require("mongodb").MongoClient;
const { MongoClient, ObjectID } = require("mongodb");

let obj = new ObjectID();
console.log(obj);

MongoClient.connect("mongodb://localhost:27017/TodoApp", (err, client) => {
  if (err) {
    return console.log("Unable to connect to MongoDB server");
  }
  console.log("Connected to MongoDB server");
  const db = client.db("TodoApp");

  // DeleteMany
  // db
  //   .collection("Todos")
  //   .deleteMany({ text: "Eat lunch" })
  //   .then(result => {
  //     console.log(result);
  //   })
  //   .catch(err => {
  //     console.log(err);
  //   });

  // db
  //   .collection("Users")
  //   .deleteMany({ name: "Sean" })
  //   .then(result => {
  //     console.log(result);
  //   })
  //   .catch(err => {
  //     console.log(err);
  //   });

  // DeleteOne
  // db
  //   .collection("Todos")
  //   .deleteOne({ text: "Eat lunch" })
  //   .then(result => {
  //     console.log(result);
  //   })
  //   .catch(err => {
  //     console.log(err);
  //   });

  // findOneAndDelete - return the document that was deleted in the resolved promise
  // db
  //   .collection("Todos")
  //   .findOneAndDelete({ completed: false })
  //   .then(result => {
  //     console.log(result);
  //   })
  //   .catch(err => {
  //     console.log(err);
  //   });

  db
    .collection("Users")
    .findOneAndDelete({ name: "Jen" })
    .then(result => {
      console.log(JSON.stringify(result, undefined, 2));
    })
    .catch(err => {
      console.log(err);
    });

  // client.close();
});
