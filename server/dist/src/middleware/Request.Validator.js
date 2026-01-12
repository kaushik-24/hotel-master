"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const HttpException_utils_1 = __importDefault(require("../utils/HttpException.utils"));
const titleToCase_1 = require("../utils/titleToCase");
// * to get the nested object error
const getValidationMessage = (errors, message) => {
    errors.forEach((err) => {
        if (err.children && err.children?.length > 0) {
            getValidationMessage(err.children, message);
        }
        else {
            if (err.constraints) {
                Object.values(err.constraints).forEach((value) => {
                    const caseValue = (0, titleToCase_1.titleNameToCase)(value);
                    message.push(caseValue);
                });
            }
        }
    });
};
class RequestValidator {
}
_a = RequestValidator;
RequestValidator.validate = (classInstance) => {
    return async (req, res, next) => {
        const convertedObject = (0, class_transformer_1.plainToClass)(classInstance, req.body);
        const validationMessage = [];
        const response = await (0, class_validator_1.validate)(convertedObject, {
            whitelist: true,
            forbidNonWhitelisted: true,
        });
        if (response.length !== 0) {
            getValidationMessage(response, validationMessage);
            next(HttpException_utils_1.default.forbidden(validationMessage[0]));
        }
        next();
    };
};
exports.default = RequestValidator;
