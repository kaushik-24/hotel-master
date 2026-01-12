"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const accommodation_controller_1 = __importDefault(require("../controllers/accommodation.controller"));
const router = (0, express_1.Router)();
router.get("/", accommodation_controller_1.default.getAccommodation);
router.post("/", accommodation_controller_1.default.createAccommodation);
router.put("/", accommodation_controller_1.default.updateAccommodation);
exports.default = router;
