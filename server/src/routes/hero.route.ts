import { Router } from "express";
import HeroController from "../controllers/hero.controller";
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

router.get("/", HeroController.getHero);
router.post("/", upload.single("heroImage"), HeroController.createHero);
router.put("/", upload.single("heroImage"), HeroController.updateHero);

export default router;
