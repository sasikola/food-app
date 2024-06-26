const mongoose = require("mongoose");

const dotenv = require("dotenv");
const initializeAdmin = require("./controllers/adminController/admin");
dotenv.config();

const mongoUrl = process.env.MONGO_URL;

mongoose.connect(mongoUrl);

const db = mongoose.connection;

db.on("connected", function () {
  console.log("Mongoose default connection open to ");
  initializeAdmin();
});

db.on("disconnected", function () {
  console.log("Mongoose default connection disconnected");
});

db.on("reconnected", function () {
  console.log("Mongoose default connection reconnected");
});

db.on("close", function () {
  console.log("Mongoose default connection closed");
});

db.on("error", console.error.bind(console, "connection error:"));

db.once("open", function () {
  console.log("Connected to MongoDB");
});

module.exports = db;
