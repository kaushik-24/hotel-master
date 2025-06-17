import { Router } from "express";
import BlogPostController from "../controllers/blogPost.controller";
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
router.get('/', BlogPostController.getAllBlogPosts);

router.get('/slug/:slug', BlogPostController.getBlogPostBySlug);

router.get('/:id', BlogPostController.getBlogPostById);

// POST /api/rooms - Create a new room
router.post('/', upload.single("image"), BlogPostController.createBlogPost);

// PUT /api/rooms/:id - Edit an existing room
router.put('/:id', upload.single("image"), BlogPostController.editBlogPost);

// DELETE /api/rooms/:id - Delete a room
router.delete('/:id', BlogPostController.deleteBlogPost);


export default router;

