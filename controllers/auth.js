const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user.js");
const { envFilePath } = require("../constants.js");
require("dotenv").config({ path: envFilePath })
const { SendMail } = require("../general_functions/send_mail.js");
const { generateRandomNumber } = require("../general_functions/general_functions.js")

const jwtSecret = process.env.JWT

let resetPasswordRequests = [];

const register = (req, res) => {
  try {
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const email = req.body.email;
    const password = req.body.password;

    bcrypt.hash(password, 10, (err, hashed) => {
      if (err) {
        res.status(400).json({ code: 400, msg: "some error occured" });
        return;
      }

      const user = new User({
        firstname,
        lastname,
        email,
        password: hashed,
      });
      user.save();
      res.json({ code: 200, msg: "Data Saved" });
    });
  } catch (error) {
    res.status(400).json({ code: 400, msg: "Some error occured" });
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
              res.status(400).json({ code: 400, msg: "some error occured" });
              return
            }
          });
        } else {
          res.status(200).json({ code: 201, msg: "Wrong Email or Password" })
        }
      })
      .catch((err) => {
        res.status(400).json({ code: 400, msg: "some error occured" });
        return;
      });
  } catch (error) {
    res.status(400).json({ code: 400, msg: "Some error occured" });
  }
};

function verify_token(req, res) {
  try {
    const token = req.query.token;
    const decode = jwt.verify(token, jwtSecret);
    res.user = decode;
    res.json({ code: 200, "msg": "verified" });
  } catch (error) {
    console.log(error);
    res.status(200).json({
      code: "204",
      msg: "token expired",
    });
  }
}

async function sendPasswordResetEmail(req, res) {
  const email = req.body.email;
  const verified = await verify_email(email);

  if (verified) {
    const code = generateRandomNumber();

// Verifying if user already have code and requested a new one.
    resetPasswordRequests = resetPasswordRequests.filter((item) => item.email != email)

    resetPasswordRequests.push({
      email,
      code,
    });

    await SendMail(`
      <h1>Reset Password Request<h1>
      <h2>Your OTP Code is: ${code}</h2>
      <h4>This code is valid only for 5 minutes.<h4>
      <h4>Don't share this code.</h4>
    `, email);

    setTimeout(()=>{
      resetPasswordRequests.filter((items) => items.email != email)
    }, 300000);
    
    res.json({ code: 200, msg: "Recovery Email Sent" })
  } else {
    res.json({ code: 205, msg: "Email not found" })
  }
}

async function verify_email(email) {
  const check = await User.find({ email })
  return check.length !== 0
}

async function verifyCodeAndResetPassword(req, res) {
  const code = req.body.code;
  const email = req.body.email;
  const newPassword = req.body.newpassword;
  let matchFound = false;

  for (var i = 0; i < resetPasswordRequests.length; i++) {
    if (email == resetPasswordRequests[i].email) {
      matchFound = resetPasswordRequests[i].code === code; 
      break;
    }
  }

  if (matchFound) {
    if (newPassword !== "") {
      const response = await changePassword(email, newPassword)
      if (response === 200){
        res.json({code: 200, msg: "Password updated successfully:"})
      }else if(response === 205){
        res.json({code: 205, msg:"User not found with the provided email:"})
      }else {
        res.json({code: 400, msg: "Error updating password:"})
      }
    }else{
      res.json({code: 206, msg: "password field can't be emtpy"})
    }
  }else{
    res.json({code: 207, msg:"Wrong OTP"})
  }
}

async function changePassword(email, password) {
  try {
      const newpassword = await new Promise((resolve, reject)=>{
        bcrypt.hash(password, 10, (err, hashed) => {
          if (err) {
            console.log(`Error hasahing password ${err}`)
              reject(err);
          }
          resolve(hashed)
          })
      })

      const updatedUser = await User.findOneAndUpdate(
        { email },
        { password: newpassword },
        { new: true }
      );
    
      if (updatedUser) {
          return 200 //"Password updated successfully:"
      } else {
          return 205 //"User not found with the provided email:"
      }

  } catch (error) {
    console.log(`Error resides here: ${error}`)
      return 400 //"Error updating password:"
  }
}

module.exports = {
  register,
  login,
  verify_token,
  sendPasswordResetEmail,
  verifyCodeAndResetPassword,
}
