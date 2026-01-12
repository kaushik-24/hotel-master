"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const room_controller_1 = __importDefault(require("../controllers/room.controller"));
const router = (0, express_1.Router)();
// GET /api/rooms - Get all rooms
router.get('/', room_controller_1.default.getAllRooms);
router.get('/:id', room_controller_1.default.getRoomById);
// POST /api/rooms - Create a new room
router.post('/', room_controller_1.default.createRoom);
// PUT /api/rooms/:id - Edit an existing room
router.put('/:id', room_controller_1.default.editRoom);
// DELETE /api/rooms/:id - Delete a room
router.delete('/:id', room_controller_1.default.deleteRoom);
exports.default = router;
