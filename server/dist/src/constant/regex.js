"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.passwordRegex = exports.phoneRegex = exports.DATE = exports.FISCAL_YEAR = exports.emailRegex = exports.NEPALI_REGEX = void 0;
exports.NEPALI_REGEX = /^[\u0900-\u097F\s]+$/;
exports.emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// export const phoneRegex = /^([\s\\(\\)\\-]*\d[\s\\(\\)\\-]*){10}$/
// export const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#%&])(?=.{8,})/
exports.FISCAL_YEAR = /^\d{4}\/\d{2}$/g;
exports.DATE = /^(?:(?:1[6-9]|[2-9]\d)\d{2}-(?:0[1-9]|1[0-2])-(?:0[1-9]|[12]\d|3[0-2]))$/;
exports.phoneRegex = /^[0-9]{5,15}$/;
exports.passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#\$%\^&\*])[A-Za-z\d!@#\$%\^&\*]{8,}$/;
