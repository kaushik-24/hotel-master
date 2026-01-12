"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const hero_controller_1 = __importDefault(require("../controllers/hero.controller"));
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
router.get("/", hero_controller_1.default.getHero);
router.post("/", upload.single("heroImage"), hero_controller_1.default.createHero);
router.put("/", upload.single("heroImage"), hero_controller_1.default.updateHero);
exports.default = router;
