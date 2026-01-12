"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const count_controller_1 = __importDefault(require("../controllers/count.controller"));
const express_1 = require("express");
const CatchAsync_utils_1 = require("../utils/CatchAsync.utils");
const router = (0, express_1.Router)();
const countController = new count_controller_1.default();
router.get('/', (0, CatchAsync_utils_1.catchAsync)(countController.getDashboardStats));
exports.default = router;
