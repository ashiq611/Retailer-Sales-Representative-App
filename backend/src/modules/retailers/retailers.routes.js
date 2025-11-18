import express from "express";
import { RetailersController } from "./retailers.controller.js";
import { auth } from "../../middleware/auth.js";

const router = express.Router();

router.get("/", auth, RetailersController.list);
router.get("/:uid", auth, RetailersController.detail);
router.patch("/:uid", auth, RetailersController.update);

export default router;
