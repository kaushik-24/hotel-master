"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const history_controller_1 = __importDefault(require("../controllers/history.controller"));
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(null, `${uniqueSuffix}${path_1.default.extname(file.originalname)}`);
    },
});
const upload = (0, multer_1.default)({ storage, limits: { files: 2 } });
const router = (0, express_1.Router)();
router.get("/", history_controller_1.default.getHistory);
router.post("/", upload.array("images", 2), history_controller_1.default.createHistory);
router.put("/", upload.array("images", 2), history_controller_1.default.updateHistory);
exports.default = router;
