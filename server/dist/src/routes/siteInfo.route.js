"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/infoSection.routes.ts
const express_1 = require("express");
const siteInfo_controller_1 = __importDefault(require("../controllers/siteInfo.controller"));
const auth_middleware_1 = require("../middleware/auth.middleware");
const role_middleware_1 = require("../middleware/role.middleware");
const router = (0, express_1.Router)();
// GET /api/info-section - Get info section details
router.get("/", siteInfo_controller_1.default.getInfoSection);
// PUT /api/info-section - Update info section details (Admin only)
router.put("/", auth_middleware_1.isAuthenticated, role_middleware_1.isAdmin, siteInfo_controller_1.default.updateInfoSection);
exports.default = router;
