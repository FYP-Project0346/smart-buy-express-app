import express from "express";
import * as controller from "../controllers/product_controller.js";

const router = express.Router();

router.post("/save", controller.save);
router.get("/get", controller.get);
router.get("/getById", controller.getById);
router.get("/saveanarray", controller.saveAnArray);
router.delete("/deleteAllProducts", controller.deleteAllProducts);
router.get("/uploadproductsdatafromlocaldirectory", controller.uploadAllData);

export default router;
