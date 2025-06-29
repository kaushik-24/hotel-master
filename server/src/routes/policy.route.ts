import { Router } from "express";
import PolicyController from "../controllers/policy.controller";
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
// GET /api/policies - Get all policies
router.get('/', PolicyController.getAllPolicies);

router.get('/slug/:slug', PolicyController.getPolicyBySlug);

router.get('/:id', PolicyController.getPolicyById);

// POST /api/policies - Create a new policy
router.post('/', upload.single("image"), PolicyController.createPolicy);

// PUT /api/policies/:id - Edit an existing policy
router.put('/:id', upload.single("image"), PolicyController.editPolicy);

// DELETE /api/policies/:id - Delete a policy
router.delete('/:id', PolicyController.deletePolicy);

export default router;
