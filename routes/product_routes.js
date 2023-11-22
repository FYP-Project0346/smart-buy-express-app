import express from "express";
import * as controller from "../controllers/product_controller.js";
import authenticate from "../middleware/authenticate.js";
import { log } from "../middleware/log_requests.js";

const router = express.Router();

router.post("/save", authenticate, controller.save);
router.get("/get", controller.get);
router.get("/getById", controller.getById);
router.get("/saveanarray", authenticate, controller.saveAnArray);
router.delete("/deleteAllProducts", authenticate, controller.deleteAllProducts);
router.get(
  "/uploadproductsdatafromlocaldirectory",
  authenticate,
  controller.uploadAllData
);

export default router;
