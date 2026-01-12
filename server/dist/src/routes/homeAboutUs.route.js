"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const homeAboutUs_controller_1 = __importDefault(require("../controllers/homeAboutUs.controller"));
const router = (0, express_1.Router)();
router.get("/", homeAboutUs_controller_1.default.getAboutUs);
router.post("/", homeAboutUs_controller_1.default.createAboutUs);
router.put("/", homeAboutUs_controller_1.default.updateAboutUs);
exports.default = router;
