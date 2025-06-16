import { Router } from "express";
import PlacesSightsController from "../controllers/placesSights.controller";
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

router.get("/", PlacesSightsController.getPlacesSights);
router.post("/", upload.single("placesSightsImage"), PlacesSightsController.createPlacesSights);
router.put("/", upload.single("placesSightsImage"), PlacesSightsController.updatePlacesSights);

export default router;

