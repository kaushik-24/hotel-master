import { Router } from "express";
import AboutUsController from "../controllers/aboutUs.controller";
import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

const router = Router();

router.get("/", AboutUsController.getAboutUs);
router.post("/", upload.single("aboutUsImage"), AboutUsController.createAboutUs);
router.put("/", upload.single("aboutUsImage"), AboutUsController.updateAboutUs);

export default router;
