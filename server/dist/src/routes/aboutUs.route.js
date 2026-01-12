"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const aboutUs_controller_1 = __importDefault(require("../controllers/aboutUs.controller"));
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path_1.default.extname(file.originalname));
    },
});
const upload = (0, multer_1.default)({ storage });
const router = (0, express_1.Router)();
router.get("/", aboutUs_controller_1.default.getAboutUs);
router.post("/", upload.single("aboutUsImage"), aboutUs_controller_1.default.createAboutUs);
router.put("/", upload.single("aboutUsImage"), aboutUs_controller_1.default.updateAboutUs);
exports.default = router;
