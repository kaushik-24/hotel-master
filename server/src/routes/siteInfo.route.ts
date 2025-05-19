// src/routes/infoSection.routes.ts
import { Router } from "express";
import InfoSectionController from "../controllers/siteInfo.controller";
import { isAuthenticated } from "../middleware/auth.middleware";
import { isAdmin } from "../middleware/role.middleware";

const router = Router();

// GET /api/info-section - Get info section details
router.get("/", InfoSectionController.getInfoSection);

// PUT /api/info-section - Update info section details (Admin only)
router.put("/", isAuthenticated, isAdmin, InfoSectionController.updateInfoSection);

export default router;
