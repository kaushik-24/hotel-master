"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = require("http");
const mongoose_1 = __importDefault(require("mongoose"));
const app_config_1 = __importDefault(require("./config/app.config"));
const env_config_1 = require("./config/env.config");
const print_1 = __importDefault(require("./utils/print"));
function listen() {
    const PORT = env_config_1.DotenvConfig.PORT || 3000;
    const httpServer = (0, http_1.createServer)(app_config_1.default);
    httpServer.listen(PORT);
    print_1.default.info(`🚀 Server is listening on port ${PORT}`);
}
mongoose_1.default
    .connect(env_config_1.DotenvConfig.DATABASE_HOST, {
    serverSelectionTimeoutMS: 5000, // Timeout after 5s
    maxPoolSize: 5, // Limit to 5 connections
    bufferCommands: false, // Disable Mongoose buffering
})
    .then(() => {
    listen();
    print_1.default.info("Connected to mongoDB");
})
    .catch(() => {
    print_1.default.error("Couldn't connect to database");
});
