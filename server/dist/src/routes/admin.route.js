"use strict";
// src/routes/admin.routes.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const admin_controller_1 = __importDefault(require("../controllers/admin.controller"));
const admin_dto_1 = require("../dto/admin.dto");
const auth_middleware_1 = require("../middleware/auth.middleware"); // Ensure user is authenticated
const Request_Validator_1 = __importDefault(require("../middleware/Request.Validator"));
const role_middleware_1 = require("../middleware/role.middleware"); // Ensure user has admin privileges
const CatchAsync_utils_1 = require("../utils/CatchAsync.utils");
const adminController = admin_controller_1.default;
const router = (0, express_1.Router)();
// Admin routes
router.get('/', auth_middleware_1.isAuthenticated, role_middleware_1.isAdmin, (0, CatchAsync_utils_1.catchAsync)((req, res) => adminController.getAllUsers(req, res)) // Fix: Pass req and res here
); // Get all admins
router.get('/:id', auth_middleware_1.isAuthenticated, role_middleware_1.isAdmin, adminController.getOne); // Get one admin by ID
router.post('/', auth_middleware_1.isAuthenticated, role_middleware_1.isAdmin, Request_Validator_1.default.validate(admin_dto_1.CreateAdminDTO), adminController.create); // Create an admin
router.put('/:id', auth_middleware_1.isAuthenticated, role_middleware_1.isAdmin, Request_Validator_1.default.validate(admin_dto_1.UpdateAdminDTO), adminController.update); // Update admin
router.delete('/:id', auth_middleware_1.isAuthenticated, role_middleware_1.isAdmin, adminController.delete); // Delete admin by ID
exports.default = router;
