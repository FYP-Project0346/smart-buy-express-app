const jwt = require("jsonwebtoken");
const { envFilePath } = require("../constants.js");
require("dotenv").config({path:envFilePath})
const authenticate = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    console.log(`Here is token: ${token}`)
    const decode = jwt.verify(token, process.env.JWT);
    res.user = decode;
    console.log("Authentication successful!");
    next();
  } catch (error) {
    // console.log("Authetication failed");
    //201 Authentication Error
    // Expired Token Sent. Login Again.
    res.status(200).json({code:204, msg: "Token Expired"});
  }
};

module.exports = {authenticate};
