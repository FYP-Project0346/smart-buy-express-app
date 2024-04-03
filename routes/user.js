const { Router } = require("express");
const {getByEmail} = require("../controllers/user.js");
const {log} = require("../middleware/log_requests.js")
const {authenticate} = require("../middleware/authenticate.js")

const user_router = Router();

// user_router.get("/", log, authenticate, getByEmail);
user_router.get("/", log, authenticate, getByEmail);

module.exports = {user_router};
