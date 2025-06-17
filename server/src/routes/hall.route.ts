import { Router } from "express";
import HallController from "../controllers/hall.controller";
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
// GET /api/halls - Get all halls
router.get('/', HallController.getAllHalls);

router.get('/slug/:slug', HallController.getHallBySlug);

router.get('/:id', HallController.getHallById);

// POST /api/halls - Create a new hall
router.post('/', upload.single("hallImage"), HallController.createHall);

// PUT /api/halls/:id - Edit an existing hall
router.put('/:id', upload.single("hallImage"), HallController.editHall);

// DELETE /api/halls/:id - Delete a hall
router.delete('/:id', HallController.deleteHall);

export default router;
