import { Router } from "express";
import HistoryController from "../controllers/history.controller";
import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, `${uniqueSuffix}${path.extname(file.originalname)}`);
  },
});

const upload = multer({ storage, limits: { files: 2 } });

const router = Router();

router.get("/", HistoryController.getHistory);
router.post("/", upload.array("images", 2), HistoryController.createHistory);
router.put("/", upload.array("images", 2), HistoryController.updateHistory);

export default router;
