import { Router } from "express";
import { get } from "../controllers/user.js";

const user_router = Router();

user_router.get("/", get);

export default user_router;
