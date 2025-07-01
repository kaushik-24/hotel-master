import { Router } from "express";
import AboutUsController from "../controllers/aboutUs.controller";
import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Save files to 'Uploads' directory
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
  },
});

const upload = multer({ storage });

const router = Router();

router.get("/", AboutUsController.getAboutUs);
router.post("/", upload.single("image"), AboutUsController.createAboutUs);
router.put("/", upload.single("image"), AboutUsController.updateAboutUs);
router.delete("/", AboutUsController.deleteAboutUs);

export default router;
