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

module.exports = {getByEmail, getUserById}
