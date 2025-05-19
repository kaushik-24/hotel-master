import express from "express";
import OtherPageController from "../controllers/otherPage.controller";

const router = express.Router();

router.get("/", OtherPageController.getAllPages);
router.get("/:id", OtherPageController.getPageById);
router.post("/", OtherPageController.createPage);
router.patch("/:id", OtherPageController.editPage);
router.delete("/:id", OtherPageController.deletePage);

export default router;
