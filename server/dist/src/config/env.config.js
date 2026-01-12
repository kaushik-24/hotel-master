"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DotenvConfig = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config({ path: path_1.default.resolve(process.cwd(), ".env") });
class DotenvConfig {
}
exports.DotenvConfig = DotenvConfig;
DotenvConfig.NODE_ENV = process.env.NODE_ENV;
DotenvConfig.PORT = Number(process.env.PORT) || 3000;
// *Database Configurations
DotenvConfig.DATABASE_HOST = process.env.DATABASE_HOST;
// JWT SECRET
DotenvConfig.JWT_SECRET = process.env.JWT_SECRET;
DotenvConfig.JWT_TOKEN_EXPIRE = process.env.JWT_TOKEN_EXPIRE;
//ADMIN SEED PASSWORD
DotenvConfig.ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
//add the custom admin path
DotenvConfig.ADMIN_PATH = process.env.ADMIN_PATH;
DotenvConfig.EMAIL_USER = process.env.EMAIL_USER;
DotenvConfig.EMAIL_PASS = process.env.EMAIL_PASS;
// DEBUG_MODE
DotenvConfig.DEBUG_MODE = process.env.DEBUG_MODE;
// CORS LIST
DotenvConfig.CORS_ORIGIN = process.env.CORS_ORIGIN?.split(",") || [];
DotenvConfig.API_KEY = process.env.API_KEY;
