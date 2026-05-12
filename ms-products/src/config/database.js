const mongoose = require("mongoose");
const { env } = require("./env");

function connectMongo() {
  return mongoose.connect(env.mongodbUri);
}

module.exports = { connectMongo };
