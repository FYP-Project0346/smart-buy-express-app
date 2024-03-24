const express = require("express");
const controller = require("../controllers/product_controller.js");
const authenticate = require("../middleware/authenticate.js");
const { log } = require("../middleware/log_requests.js");

const ProductRouter = express.Router();

ProductRouter.post("/save", authenticate, controller.save);
ProductRouter.get("/get", controller.get);
ProductRouter.get("/getById", controller.getById);
ProductRouter.get("/saveanarray", authenticate, controller.saveAnArray);
ProductRouter.delete("/deleteAllProducts", authenticate, controller.deleteAllProducts);
ProductRouter.get(
  "/uploadproductsdatafromlocaldirectory",
  authenticate,
  controller.uploadAllData
);

ProductRouter.get("/updateCategories", authenticate, controller.updateCategories);
ProductRouter.get("/getCategories", controller.getCategories);
ProductRouter.get("/getByCategory", controller.getByCategory);

module.exports = {ProductRouter};
