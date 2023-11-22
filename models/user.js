import mongoose from "mongoose";

const schema = mongoose.Schema({
  pic: String,
  firstname: String,
  lastname: String,
  phone: String,
  email: String,
  password: String,
});

const User = mongoose.model("Users", schema);

export default User;
