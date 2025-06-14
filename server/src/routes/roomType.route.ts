import { Router } from "express";
import RoomTypeController from "../controllers/roomType.controller";
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
router.get('/', RoomTypeController.getAllRoomsType);

router.get('/slug/:slug', RoomTypeController.getRoomTypeBySlug);

router.get('/:id', RoomTypeController.getRoomTypeById);

// POST /api/rooms - Create a new room
router.post('/', upload.single("roomImage"), RoomTypeController.createRoomType);

// PUT /api/rooms/:id - Edit an existing room
router.put('/:id', upload.single("roomImage"), RoomTypeController.editRoomType);

// DELETE /api/rooms/:id - Delete a room
router.delete('/:id', RoomTypeController.deleteRoomType);


export default router;
