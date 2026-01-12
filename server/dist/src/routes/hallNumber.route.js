"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const hallNumber_controller_1 = __importDefault(require("../controllers/hallNumber.controller"));
const router = (0, express_1.Router)();
// GET /api/hallNumbers - Get all hallNumbers
router.get('/', hallNumber_controller_1.default.getAllHallNumbers);
// GET /api/hallNumbers/:id - Get a hallNumber by ID
router.get('/:id', hallNumber_controller_1.default.getHallNumberById);
// POST /api/hallNumbers - Create a new hallNumber
router.post('/', hallNumber_controller_1.default.createHallNumber);
// PUT /api/hallNumbers/:id - Edit an existing hallNumber
router.put('/:id', hallNumber_controller_1.default.editHallNumber);
// DELETE /api/hallNumbers/:id - Delete a hallNumber
router.delete('/:id', hallNumber_controller_1.default.deleteHallNumber);
exports.default = router;
