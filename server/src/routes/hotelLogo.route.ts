import HotelLogoController from "../controllers/hotelLogo.controller";
import { Router } from "express";
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

router.get("/", HotelLogoController.getHero);
router.post("/", upload.single("path"), HotelLogoController.createHero);
router.put("/", upload.single("path"), HotelLogoController.updateHero);

export default router;

