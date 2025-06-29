import { Router } from "express";
import GalleryController from "../controllers/gallery.controller";
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

// GET /api/gallerys - Get all gallery images
router.get('/', GalleryController.getAllGallerys);

// POST /api/gallerys - Create a new gallery image
router.post('/', upload.single("image"), GalleryController.createGallery);

// PUT /api/gallerys/:id - Edit an existing gallery image
router.put('/:id', upload.single("image"), GalleryController.editGallery);

// DELETE /api/gallerys/:id - Delete a gallery image
router.delete('/:id', GalleryController.deleteGallery);

export default router;

