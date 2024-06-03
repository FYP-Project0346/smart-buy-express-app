const { Router } = require("express");
const {
    getByEmail, 
    getAllAdmins,
    register,
    login,
    deleteAdmin,
} = require("../controllers/admin.js");


const {addSite, removeSite, getSites} = require("../controllers/sites.js")

const {log} = require("../middleware/log_requests.js")
const {authenticate} = require("../middleware/authenticate.js");
const { addCategory, deleteCategory } = require("../controllers/category_controller.js");
const { getCategories } = require("../controllers/product_controller.js");

const admin_route = Router();

// admin_route.get("/", log, authenticate, getByEmail);
admin_route.get("/", log, authenticate, getByEmail);
admin_route.get("/get-all-admins", getAllAdmins);
admin_route.post("/register", register);
admin_route.post("/login", login);
admin_route.delete("/remove-admin", deleteAdmin);

// Sites
admin_route.post("/add-site", addSite);
admin_route.delete("/delete-site", removeSite)
admin_route.get("/get-all-sites", getSites)

// Category
admin_route.post("/add-category", addCategory)
admin_route.delete("/remove-category", deleteCategory)
admin_route.get("/get-category", getCategories)


module.exports = {admin_route};
