"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const env_config_1 = require("../config/env.config");
const messages_1 = require("../constant/messages");
const errorHandler = (error, req, res, next) => {
    let statusCode = 500;
    let data = {
        success: false,
        message: messages_1.Message.error,
        ...(env_config_1.DotenvConfig.DEBUG_MODE === "true" && {
            originalError: error.message,
        }),
    };
    if (error?.isOperational || error?.isCustom) {
        statusCode = error.statusCode;
        data = {
            ...data,
            message: error.message,
        };
    }
    return res.status(statusCode).json(data);
};
exports.errorHandler = errorHandler;
