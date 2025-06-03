import { Router } from "express";
import RoomController from "../controllers/room.controller";
import path from "path";
import multer from "multer";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Save files to 'uploads' directory
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
  },
});

const upload = multer({ storage });

const router = Router();
// GET /api/rooms - Get all rooms
router.get('/', RoomController.getAllRooms);

router.get('/slug/:slug', RoomController.getRoomBySlug);

router.get('/:id', RoomController.getRoomById);

// POST /api/rooms - Create a new room
router.post('/', upload.single("roomImage"), RoomController.createRoom);

// PUT /api/rooms/:id - Edit an existing room
router.put('/:id', upload.single("roomImage"), RoomController.editRoom);

// DELETE /api/rooms/:id - Delete a room
router.delete('/:id', RoomController.deleteRoom);


export default router;
