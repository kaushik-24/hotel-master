import { Router } from "express";
import RoomController from "../controllers/room.controller";

const router = Router();
// GET /api/rooms - Get all rooms
router.get('/', RoomController.getAllRooms);


router.get('/:id', RoomController.getRoomById);

// POST /api/rooms - Create a new room
router.post('/', RoomController.createRoom);

// PUT /api/rooms/:id - Edit an existing room
router.put('/:id', RoomController.editRoom);

// DELETE /api/rooms/:id - Delete a room
router.delete('/:id', RoomController.deleteRoom);

export default router;
