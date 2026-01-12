"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const blogPost_controller_1 = __importDefault(require("../controllers/blogPost.controller"));
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
// GET /api/rooms - Get all rooms
router.get('/', blogPost_controller_1.default.getAllBlogPosts);
router.get('/slug/:slug', blogPost_controller_1.default.getBlogPostBySlug);
router.get('/:id', blogPost_controller_1.default.getBlogPostById);
// POST /api/rooms - Create a new room
router.post('/', upload.single("image"), blogPost_controller_1.default.createBlogPost);
// PUT /api/rooms/:id - Edit an existing room
router.put('/:id', upload.single("image"), blogPost_controller_1.default.editBlogPost);
// DELETE /api/rooms/:id - Delete a room
router.delete('/:id', blogPost_controller_1.default.deleteBlogPost);
exports.default = router;
