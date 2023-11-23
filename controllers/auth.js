import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.js";
import { Constants } from "../constants.js";
export const register = (req, res) => {
  try {
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const email = req.body.email;
    const password = req.body.password;

    bcrypt.hash(password, 10, (err, hashed) => {
      if (err) {
        res.status(400).json({ msg: "Registration Failed", err });
        return;
      }

      const user = new User({
        firstname,
        lastname,
        email,
        password: hashed,
      });
      user.save();
      res.json({ msg: "true" });
    });
  } catch (error) {
    res.status(400).json({ msg: "false", error });
  }
};

export const login = (req, res) => {
  try {
    const username = req.body.username;
    const password = req.body.password;

    User.findOne({ $or: [{ email: username }, { phone: username }] })
      .then((user) => {
        if (user) {
          bcrypt.compare(password, user.password, (err, result) => {
            if (result) {
              const token = jwt.sign({ name: user.name }, Constants.jwt, {
                expiresIn: "1h",
              });

              res.json({ status: true, email: user.email, token });
            } else {
              res.status(400).json({ status: false, error: err });
            }
          });
        }
      })
      .catch((err) => {
        res.status(400).json({ msg: "Login Failed!", error: err });
      });
  } catch (error) {
    res.status(400).json({ msg: "Login Failed!", error });
  }
};

export function verify_token(req, res) {
  try {
    const token = req.query.token;
    const decode = jwt.verify(token, Constants.jwt);
    res.user = decode;
    res.status(200).json({ status: true });
  } catch (error) {
    console.log(error);
    res.status(400).json({ status: false, error });
  }
}
