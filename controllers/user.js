const User = require("../models/user.js");
const getByEmail = async (req, res) => {
  try {
    const email = req.query.email;
    const data = await User.find({
      email,
    });
    res.status(200).json({code:200, data: data[0] });
  } catch (error) {
    res.status(400).json({code:400, error });
  }
};

async function getUserById(id) {
  try {
    const data = await User.find({_id: id});
    return data;
  } catch (error) {
    return null;
  }
};

async function getAllUsers(req, res){
  try{
    const data = await User.find();
    return res.json({users: data})
  }catch(e){
    res.json({code: 400, error});
  }
}


async function deleteUser(req, res){
  try{
    const id = req.query.id
    const result = await User.findOneAndDelete({_id: id})
    res.json({code: 200, msg: "User deleted"})
  }catch(e){
    res.json({code: 400, msg: "Couldn't delete user"})
  }
}

module.exports = {getByEmail, getUserById, getAllUsers, deleteUser}
