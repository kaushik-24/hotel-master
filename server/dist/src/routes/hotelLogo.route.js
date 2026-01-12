"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const hotelLogo_controller_1 = __importDefault(require("../controllers/hotelLogo.controller"));
const express_1 = require("express");
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
router.get("/", hotelLogo_controller_1.default.getHero);
router.post("/", upload.single("path"), hotelLogo_controller_1.default.createHero);
router.put("/", upload.single("path"), hotelLogo_controller_1.default.updateHero);
exports.default = router;
