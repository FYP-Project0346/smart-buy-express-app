import mongoose from "mongoose";

const schema = mongoose.Schema({
  firstname: String,
  lastname: String,
  email: String,
  password: String,
});

const User = mongoose.model("Users", schema);

export default User;
