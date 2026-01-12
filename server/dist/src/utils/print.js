"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = __importDefault(require("chalk"));
const env_config_1 = require("../config/env.config");
const enum_1 = require("../constant/enum");
const log = console.log;
class Print {
    static error(message) {
        if (env_config_1.DotenvConfig.NODE_ENV === enum_1.Environment.DEVELOPMENT)
            log(chalk_1.default.red("ERROR", message));
    }
    static info(message) {
        if (env_config_1.DotenvConfig.NODE_ENV === enum_1.Environment.DEVELOPMENT)
            log(chalk_1.default.green("INFO", message));
    }
}
exports.default = Print;
