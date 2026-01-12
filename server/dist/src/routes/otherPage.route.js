"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const otherPage_controller_1 = __importDefault(require("../controllers/otherPage.controller"));
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
router.get('/', otherPage_controller_1.default.getAllPages);
router.get('/slug/:slug', otherPage_controller_1.default.getPageBySlug);
router.get('/:id', otherPage_controller_1.default.getPageById);
// POST /api/rooms - Create a new room
router.post('/', upload.single("pageImage"), otherPage_controller_1.default.createPage);
// PUT /api/rooms/:id - Edit an existing room
router.put('/:id', upload.single("pageImage"), otherPage_controller_1.default.editPage);
// DELETE /api/rooms/:id - Delete a room
router.delete('/:id', otherPage_controller_1.default.deletePage);
exports.default = router;
