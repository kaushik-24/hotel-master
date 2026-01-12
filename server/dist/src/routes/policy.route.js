"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const policy_controller_1 = __importDefault(require("../controllers/policy.controller"));
const path_1 = __importDefault(require("path"));
const multer_1 = __importDefault(require("multer"));
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/"); // Save files to 'uploads' directory
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path_1.default.extname(file.originalname)); // Unique filename
    },
});
const upload = (0, multer_1.default)({ storage });
const router = (0, express_1.Router)();
// GET /api/policies - Get all policies
router.get('/', policy_controller_1.default.getAllPolicies);
router.get('/slug/:slug', policy_controller_1.default.getPolicyBySlug);
router.get('/:id', policy_controller_1.default.getPolicyById);
// POST /api/policies - Create a new policy
router.post('/', upload.single("image"), policy_controller_1.default.createPolicy);
// PUT /api/policies/:id - Edit an existing policy
router.put('/:id', upload.single("image"), policy_controller_1.default.editPolicy);
// DELETE /api/policies/:id - Delete a policy
router.delete('/:id', policy_controller_1.default.deletePolicy);
exports.default = router;
