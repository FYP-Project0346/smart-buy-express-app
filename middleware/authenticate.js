import jwt from "jsonwebtoken";
import { Constants } from "../constants.js";
const authenticate = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decode = jwt.verify(token, Constants.jwt);
    res.user = decode;
    console.log("Authentication successful!");
    next();
  } catch (error) {
    console.log("Authetication failed");
    //201 Authentication Error
    // Expired Token Sent. Login Again.
    res.status(201).json({ msg: "Authentication Failed", error });
  }
};

export default authenticate;
