const mongoose = require("mongoose");

const schema = mongoose.Schema({
  firstname: String,
  lastname: String,
  email: String,
  password: String,
});

const Admin = mongoose.model("Admins", schema);

module.exports= Admin;
