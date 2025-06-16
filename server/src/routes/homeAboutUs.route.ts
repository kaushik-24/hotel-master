import { Router } from "express";
import HomeAboutUsController from "../controllers/homeAboutUs.controller";


const router = Router();

router.get("/", HomeAboutUsController.getAboutUs);
router.post("/",  HomeAboutUsController.createAboutUs);
router.put("/",  HomeAboutUsController.updateAboutUs);

export default router;
