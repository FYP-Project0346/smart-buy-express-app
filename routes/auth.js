import Router from "express";
import { register, login, verify_token } from "../controllers/auth.js";

const authRouter = Router();

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.get("/verify_token", verify_token);

export default authRouter;
