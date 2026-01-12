"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const sectionSchema = new mongoose_1.Schema({
    topic: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
}, { _id: false });
const questAndValuesSchema = new mongoose_1.Schema({
    questAndVision: {
        title: { type: String, required: true, default: "Our Quest & Vision" },
        mainDescription: { type: String, required: true, default: "Offering rest, recovery, and introspection with outstanding hospitality." },
        sections: {
            type: [sectionSchema],
            required: true,
            validate: {
                validator: (sections) => sections.length >= 1 && sections.length <= 2,
                message: "Quest and Vision must have 1 to 2 sections",
            },
        },
    },
    coreValues: {
        title: { type: String, required: true, default: "Core Values" },
        mainDescription: { type: String, required: true, default: "Below are its core values that serve as the pillars of its identity." },
        sections: {
            type: [sectionSchema],
            required: true,
            validate: {
                validator: (sections) => sections.length >= 1 && sections.length <= 2,
                message: "Core Values must have 1 to 2 sections",
            },
        },
    },
}, { timestamps: true });
const QuestAndValues = mongoose_1.default.model("QuestAndValues", questAndValuesSchema);
exports.default = QuestAndValues;
