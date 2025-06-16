import { Router } from 'express';
import BlogPostController from '../controllers/blogPost.controller';
import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

const router = Router();

router.get('/', BlogPostController.getBlogPosts);
router.get('/:id', BlogPostController.getBlogPost);
router.post('/', upload.single('image'), BlogPostController.createBlogPost);
router.put('/:id', upload.single('image'), BlogPostController.updateBlogPost);
router.delete('/:id', BlogPostController.deleteBlogPost);

export default router;
