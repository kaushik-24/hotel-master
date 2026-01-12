"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const hotelLogoSchema = new mongoose_1.default.Schema({
    path: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});
const HotelLogo = mongoose_1.default.model("hotelLogo", hotelLogoSchema);
exports.default = HotelLogo;
