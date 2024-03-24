const { Router } = require("express");
const {get} = require("../controllers/user.js");

const user_router = Router();

user_router.get("/", get);

module.exports = {user_router};
