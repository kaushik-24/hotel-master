"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const gallery_controller_1 = __importDefault(require("../controllers/gallery.controller"));
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
// GET /api/gallerys - Get all gallery images
router.get('/', gallery_controller_1.default.getAllGallerys);
// POST /api/gallerys - Create a new gallery image
router.post('/', upload.single("image"), gallery_controller_1.default.createGallery);
// PUT /api/gallerys/:id - Edit an existing gallery image
router.put('/:id', upload.single("image"), gallery_controller_1.default.editGallery);
// DELETE /api/gallerys/:id - Delete a gallery image
router.delete('/:id', gallery_controller_1.default.deleteGallery);
exports.default = router;
