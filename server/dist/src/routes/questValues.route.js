"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const questValues_controller_1 = __importDefault(require("../controllers/questValues.controller"));
const router = (0, express_1.Router)();
router.get("/", questValues_controller_1.default.getQuestAndValues);
router.post("/", questValues_controller_1.default.createQuestAndValues);
router.put("/", questValues_controller_1.default.updateQuestAndValues);
exports.default = router;
