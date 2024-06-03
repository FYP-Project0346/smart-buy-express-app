const { Router } = require("express");
const {getByEmail, getAllUsers, deleteUser} = require("../controllers/user.js");
const {log} = require("../middleware/log_requests.js")
const {authenticate} = require("../middleware/authenticate.js")

const user_router = Router();

// user_router.get("/", log, authenticate, getByEmail);
user_router.get("/", log, authenticate, getByEmail);
user_router.get("/get-all-users", getAllUsers);
user_router.delete("/delete-user", deleteUser);

module.exports = {user_router};
