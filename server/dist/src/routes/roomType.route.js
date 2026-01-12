"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const roomType_controller_1 = __importDefault(require("../controllers/roomType.controller"));
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
router.get('/', roomType_controller_1.default.getAllRoomsType);
router.get('/slug/:slug', roomType_controller_1.default.getRoomTypeBySlug);
router.get('/:id', roomType_controller_1.default.getRoomTypeById);
// POST /api/rooms - Create a new room
router.post('/', upload.single("roomImage"), roomType_controller_1.default.createRoomType);
// PUT /api/rooms/:id - Edit an existing room
router.put('/:id', upload.single("roomImage"), roomType_controller_1.default.editRoomType);
// DELETE /api/rooms/:id - Delete a room
router.delete('/:id', roomType_controller_1.default.deleteRoomType);
exports.default = router;
