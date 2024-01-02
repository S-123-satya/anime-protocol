const mongoose = require("mongoose");

const mongodb = async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/order");
};
module.exports = mongodb;
