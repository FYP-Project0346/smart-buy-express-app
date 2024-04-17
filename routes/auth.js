const Router = require("express");
const { register, login, verify_token, sendPasswordResetEmail } = require("../controllers/auth.js");

const authRouter = Router();

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.get("/verify_token", verify_token);
authRouter.post("/sendPasswordResetEmail", sendPasswordResetEmail);

module.exports = {
    authRouter
} 
