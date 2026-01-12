"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const hall_controller_1 = __importDefault(require("../controllers/hall.controller"));
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
// GET /api/halls - Get all halls
router.get('/', hall_controller_1.default.getAllHalls);
router.get('/slug/:slug', hall_controller_1.default.getHallBySlug);
router.get('/:id', hall_controller_1.default.getHallById);
// POST /api/halls - Create a new hall
router.post('/', upload.single("hallImage"), hall_controller_1.default.createHall);
// PUT /api/halls/:id - Edit an existing hall
router.put('/:id', upload.single("hallImage"), hall_controller_1.default.editHall);
// DELETE /api/halls/:id - Delete a hall
router.delete('/:id', hall_controller_1.default.deleteHall);
exports.default = router;
