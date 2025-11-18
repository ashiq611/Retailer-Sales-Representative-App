import express from "express";
import multer from "multer";
import { AdminController } from "./admin.controller.js";
import { auth } from "../../middleware/auth.js";
import { requireRole } from "../../middleware/role.js";

const upload = multer(); // in-memory

const router = express.Router();

// All admin routes protected + admin-only
router.use(auth, requireRole("ADMIN"));

// ----- Master Data -----
router.get("/regions", AdminController.getRegions);
router.post("/regions", AdminController.createRegion);
router.patch("/regions/:id", AdminController.updateRegion);
router.delete("/regions/:id", AdminController.deleteRegion);

router.get("/areas", AdminController.getAreas);
router.post("/areas", AdminController.createArea);
router.patch("/areas/:id", AdminController.updateArea);
router.delete("/areas/:id", AdminController.deleteArea);

router.get("/distributors", AdminController.getDistributors);
router.post("/distributors", AdminController.createDistributor);
router.patch("/distributors/:id", AdminController.updateDistributor);
router.delete("/distributors/:id", AdminController.deleteDistributor);

router.get("/territories", AdminController.getTerritories);
router.post("/territories", AdminController.createTerritory);
router.patch("/territories/:id", AdminController.updateTerritory);
router.delete("/territories/:id", AdminController.deleteTerritory);

// ----- Bulk Assign / Unassign -----
router.post("/assignments/bulk", AdminController.bulkAssign);
router.post("/assignments/unassign-bulk", AdminController.bulkUnassign);

// ----- CSV Import -----
router.post(
  "/retailers/import",
  upload.single("file"),
  AdminController.importRetailers
);

export default router;
