// src/routes/admin.routes.ts

import { Router } from "express";
import AdminController from "../controllers/admin.controller";
import { CreateAdminDTO } from "../dto/admin.dto";
import { isAuthenticated } from "../middleware/auth.middleware"; // Ensure user is authenticated
import RequestValidator from "../middleware/Request.Validator";
import { isAdmin } from "../middleware/role.middleware"; // Ensure user has admin privileges
import { catchAsync } from "../utils/CatchAsync.utils";

const adminController = AdminController;
const router = Router();

// Admin routes
router.get(
    '/',
    isAuthenticated,
    isAdmin,
    catchAsync((req, res) => adminController.getAllUsers(req, res)) // Fix: Pass req and res here
); // Get all admins

router.get(
    '/:id',
    isAuthenticated,
    isAdmin,
    catchAsync(adminController.getOne)
); // Get one admin by ID

router.post(
    '/',
    isAuthenticated,
    isAdmin,
    RequestValidator.validate(CreateAdminDTO),
    catchAsync(adminController.create)
); // Create an admin

// router.put(
//     '/:id',
//     isAuthenticated,
//     isAdmin,
//     RequestValidator.validate(UpdateAdminDTO),
//     catchAsync(adminController.update)
// ); // Update admin

router.delete(
    '/:id',
    isAuthenticated,
    isAdmin,
    catchAsync(adminController.delete)
); // Delete admin by ID
export default router;
