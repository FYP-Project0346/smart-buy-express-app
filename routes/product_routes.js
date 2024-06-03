const express = require("express");
const controller = require("../controllers/product_controller.js");
const {authenticate} = require("../middleware/authenticate.js");
const { log } = require("../middleware/log_requests.js");

const ProductRouter = express.Router();

ProductRouter.post("/save", log, authenticate, controller.save);
ProductRouter.get("/get", log, controller.get);
ProductRouter.get("/getById", log, controller.getById);
ProductRouter.get("/saveanarray", log, authenticate, controller.saveAnArray);
ProductRouter.delete("/deleteAllProducts", log, authenticate, controller.deleteAllProducts);
ProductRouter.get(
  "/uploadproductsdatafromlocaldirectory",
  log,
  authenticate,
  controller.uploadAllData
);

ProductRouter.get("/updateCategories", log, authenticate, controller.updateCategories);
ProductRouter.get("/getCategories", log, controller.getCategories);
ProductRouter.get("/getByCategory", log, controller.getByCategory);
ProductRouter.delete("/delete-product", log, controller.deleteProduct);

module.exports = { ProductRouter };
