import { Router } from "express";
import PageController from "../controllers/otherPage.controller";
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
router.get('/', PageController.getAllPages);

router.get('/slug/:slug', PageController.getPageBySlug);

router.get('/:id', PageController.getPageById);

// POST /api/rooms - Create a new room
router.post('/', upload.single("pageImage"), PageController.createPage);

// PUT /api/rooms/:id - Edit an existing room
router.put('/:id', upload.single("pageImage"), PageController.editPage);

// DELETE /api/rooms/:id - Delete a room
router.delete('/:id', PageController.deletePage);


export default router;

