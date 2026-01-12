"use strict";
// src/routes/socialMedia.routes.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const socialMedia_controller_1 = __importDefault(require("../controllers/socialMedia.controller"));
const auth_middleware_1 = require("../middleware/auth.middleware");
const role_middleware_1 = require("../middleware/role.middleware");
const router = (0, express_1.Router)();
// GET /api/social-media - Get social media links
router.get("/", socialMedia_controller_1.default.getSocialMedia);
// PUT /api/social-media - Update social media links (Admin only)
router.put("/", auth_middleware_1.isAuthenticated, role_middleware_1.isAdmin, socialMedia_controller_1.default.updateSocialMedia);
exports.default = router;
