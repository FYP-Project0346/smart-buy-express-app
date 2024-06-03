const Admin = require("../models/admin.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { envFilePath } = require("../constants.js");
require("dotenv").config({ path: envFilePath })

const jwtSecret = process.env.JWT

const register = (req, res) => {
  try {
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const email = req.body.email;
    const password = req.body.password;

    bcrypt.hash(password, 10, (err, hashed) => {
      if (err) {
        res.status(401).json({ code: 400, msg: "some error occured" });
        return;
      }

      const admin = new Admin({
        firstname,
        lastname,
        email,
        password: hashed,
      });
      admin.save();
      res.json({ code: 200, msg: "Data Saved" });
    });
  } catch (error) {
    res.status(300).json({ code: 400, msg: "Some error occured" });
  }
};

const login = (req, res) => {
  try {
    const username = req.body.username;
    const password = req.body.password;

    Admin.findOne({ $or: [{ email: username }, { phone: username }] })
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

const getByEmail = async (req, res) => {
  try {
    const email = req.query.email;
    const data = await Admin.find({
      email,
    });
    res.status(200).json({ code: 200, data: data[0] });
  } catch (error) {
    res.status(400).json({ code: 400, error });
  }
};

async function getAdminById(id) {
  try {
    const data = await Admin.find({ _id: id });
    return data;
  } catch (error) {
    return null;
  }
};

const getAllAdmins = async (req, res)=> {
  try {
    const data = await Admin.find();
    res.json({ admins: data })
  } catch (e) {
    res.json({ code: 400, error });
  }
}

const deleteAdmin = async (req, res)=> {
  try {
    const id = req.query.id;
    await Admin.findOneAndDelete({ _id: id });
    res.status(200).json({code:200, msg: "Admin Deleted" });
  } catch (error) {
    res.status(400).json({code:400, msg: "Operation Failed!", error: error.message });
  }
}

module.exports = {
  getByEmail, 
  getAdminById, 
  getAllAdmins, 
  register,
  login,
  deleteAdmin,
}