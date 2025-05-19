// src/routes/socialMedia.routes.ts

import { Router } from "express";
import SocialMediaController from "../controllers/socialMedia.controller";
import { isAuthenticated } from "../middleware/auth.middleware";
import { isAdmin } from "../middleware/role.middleware";

const router = Router();

// GET /api/social-media - Get social media links
router.get("/", SocialMediaController.getSocialMedia);

// PUT /api/social-media - Update social media links (Admin only)
router.put("/", isAuthenticated, isAdmin, SocialMediaController.updateSocialMedia);

export default router;