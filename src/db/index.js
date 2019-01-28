const mongoose = require("mongoose");
const environment = require("../config/environment");

mongoose.connect(
  environment.DATABASE_URL,
  { useNewUrlParser: true }
);
mongoose.Promise = global.Promise;

module.exports = mongoose;
