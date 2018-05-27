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

  // db
  //   .collection("Todos")
  //   .find({
  //     _id: new ObjectID("5b0abad26617cb6d8baf267d")
  //   })
  //   .toArray()
  //   .then(
  //     docs => {
  //       console.log("Todos");
  //       console.log(JSON.stringify(docs, undefined, 2));
  //     },
  //     err => {
  //       console.log("Unable to fetch todos", err);
  //     }
  //   );

  // db
  //   .collection("Todos")
  //   .find()
  //   .count()
  //   .then(
  //     count => {
  //       console.log(`Todos Count: ${count}`);
  //     },
  //     err => {
  //       console.log("Unable to fetch todos", err);
  //     }
  //   );

  // db
  //   .collection("Users")
  //   .find()
  //   .count()
  //   .then(count => {
  //     console.log("Users Count: ", count);
  //   })
  //   .catch(err => {
  //     console.log("Unable to fetch Users", err);
  //   });

  db
    .collection("Users")
    .find({ name: "Sean" })
    .count()
    .then(count => {
      console.log("Sean user objects: ", count);
    })
    .catch(err => {
      console.log("Unable to fetch Sean Objects");
    });

  // client.close();
});
