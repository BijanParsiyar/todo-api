const { SHA256 } = require("crypto-js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

let password = "aasdfabc143";

// bcrypt.genSalt(10, (err, salt) => {
//   bcrypt.hash(password, salt, (err, hash) => {
//     console.log(hash);
//   });
// });

let hashedPassword =
  "$2a$10$za.qQi3/JVyTIcwnCXDPG.x8niP9oXYcPyjgPCW2O3m6nW0elBdLS";

bcrypt.compare("123abc!", hashedPassword, (err, result) => {
  console.log(result);
});

// let data = {
//   id: 10
// };

// let token = jwt.sign(data, "123abc");

// let decoded = jwt.verify(token, "123abc");
// console.log("decoded", decoded);

// let message = "I am user number 3";

// let hash = SHA256(message).toString();

// console.log(`Message: ${message}`);
// console.log(`Hash: ${hash}`);

// // From server to client
// let data = {
//   id: 4
// };

// let token = {
//   data,
//   hash: SHA256(JSON.stringify(data) + "someSecret").toString()
// };

// // token.data.id = 5;
// // token.hash = SHA256(JSON.stringify(token.data)).toString();

// let resultHash = SHA256(JSON.stringify(token.data) + "someSecret").toString();

// if (resultHash === token.hash) {
//   console.log("Data was not changed");
// } else {
//   console.log("Data was changed. Do not trust!");
// }
