import { Router } from "express";
import QuestAndValuesController from "../controllers/questValues.controller";

const router = Router();

router.get("/", QuestAndValuesController.getQuestAndValues);
router.post("/", QuestAndValuesController.createQuestAndValues);
router.put("/", QuestAndValuesController.updateQuestAndValues);

export default router;
