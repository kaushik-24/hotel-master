"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const location_controller_1 = __importDefault(require("../controllers/location.controller"));
const router = (0, express_1.Router)();
router.get("/", location_controller_1.default.getLocation);
router.post("/", location_controller_1.default.createLocation);
router.put("/", location_controller_1.default.updateLocation);
exports.default = router;
