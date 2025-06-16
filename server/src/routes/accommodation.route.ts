import { Router } from "express";
import AccommodationController from "../controllers/accommodation.controller";

const router = Router();

router.get("/", AccommodationController.getAccommodation);
router.post("/", AccommodationController.createAccommodation);
router.put("/", AccommodationController.updateAccommodation);

export default router;
