const mongoose = require("mongoose");

const schema = mongoose.Schema({
  firstname: String,
  lastname: String,
  email: String,
  password: String,
});

const User = mongoose.model("Users", schema);

module.exports= User;
