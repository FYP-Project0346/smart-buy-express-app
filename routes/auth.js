const Router = require("express");
const {
    register, 
    login, 
    verify_token, 
    sendPasswordResetEmail, 
    verifyCodeAndResetPassword 
} = require("../controllers/auth.js");

const authRouter = Router();

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.get("/verify_token", verify_token);
authRouter.post("/request-forgot-password", sendPasswordResetEmail);
authRouter.post("/verify-code-reset-password", verifyCodeAndResetPassword);

module.exports = {
    authRouter
} 
