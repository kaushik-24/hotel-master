import  CountController from "../controllers/count.controller";
import { Router }from "express";
import { catchAsync } from "../utils/CatchAsync.utils";

const router = Router();
const countController =new CountController(); 

router.get(
  '/',
  catchAsync(countController.getDashboardStats)
);

export default router;
