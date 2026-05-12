require("dotenv").config();

const env = {
  port: process.env.PORT || 4001,
  mongodbUri: process.env.MONGODB_URI
};

module.exports = { env };
