const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user.js");
const { envFilePath } = require("../constants.js");
require("dotenv").config({path:envFilePath})

const jwtSecret = process.env.JWT

const register = (req, res) => {
  try {
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const email = req.body.email;
    const password = req.body.password;

    bcrypt.hash(password, 10, (err, hashed) => {
      if (err) {
        res.status(400).json({code:400, msg: "some error occured"});
        return;
      }

      const user = new User({
        firstname,
        lastname,
        email,
        password: hashed,
      });
      user.save();
      res.json({code:200, msg:"Data Saved"});
    });
  } catch (error) {
    res.status(400).json({code: 400, msg: "Some error occured"});
  }
};

const login = (req, res) => {
  try {
    const username = req.body.username;
    const password = req.body.password;

    User.findOne({ $or: [{ email: username }, { phone: username }] })
      .then((user) => {
        if (user) {
          bcrypt.compare(password, user.password, (err, result) => {
            if (result) {
              const token = jwt.sign({ name: user.name }, jwtSecret, {
                expiresIn: "1h",
              });

              res.json({ 
                code: 200,
                id: user.id,
                firstname: user.firstname,
                lastname: user.lastname,
                email: user.email, 
                token 
              });
              return
            } else {
              res.status(400).json({code: 400, msg: "some error occured"});
              return
            }
          });
        }else{
          res.status(200).json({code: 201, msg: "Wrong Email or Password"})
        }
      })
      .catch((err) => {
        res.status(400).json({code: 400, msg: "some error occured"});
        return;
      });
  } catch (error) {
    res.status(400).json({code: 400, msg: "Some error occured"});
  }
};

function verify_token(req, res) {
  try {
    const token = req.query.token;
    const decode = jwt.verify(token, jwtSecret);
    res.user = decode;
    res.json({code:200,"msg": "verified"});
  } catch (error) {
    console.log(error);
    res.status(200).json({
      code: "204",
      msg: "token expired",
    });
  }
}

module.exports = {
  register,
  login,
  verify_token,
}
