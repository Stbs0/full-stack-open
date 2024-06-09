require("dotenv").config();
let PORT = process.env.PORT;

const MONGODB_URI = process.env.TEST_MONGODB_URI;

module.exports = {
  MONGODB_URI,
  PORT,
};
