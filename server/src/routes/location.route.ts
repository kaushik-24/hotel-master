import { Router } from "express";
import LocationController from "../controllers/location.controller";

const router = Router();

router.get("/", LocationController.getLocation);
router.post("/", LocationController.createLocation);
router.put("/", LocationController.updateLocation);

export default router;
