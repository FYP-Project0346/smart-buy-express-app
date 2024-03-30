const { Router } = require("express");
const {get} = require("../controllers/user.js");
const {log} = require("../middleware/log_requests.js")
const {authenticate} = require("../middleware/authenticate.js")

const user_router = Router();

user_router.get("/", log, authenticate, get);

module.exports = {user_router};
