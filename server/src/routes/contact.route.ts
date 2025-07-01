import { Router } from "express";
import ContactController from "../controllers/contact.controller";
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

router.get("/", ContactController.getContact);
router.post("/", upload.single("contactImage"), ContactController.createContact);
router.put("/", upload.single("contactImage"), ContactController.updateContact);

export default router;
