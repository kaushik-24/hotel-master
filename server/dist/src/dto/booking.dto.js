"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SendBookingEmailDTO = exports.UpdateBookingDTO = exports.CreateBookingDTO = void 0;
const class_validator_1 = require("class-validator");
class CreateBookingDTO {
}
exports.CreateBookingDTO = CreateBookingDTO;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.Length)(2, 30),
    __metadata("design:type", String)
], CreateBookingDTO.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateBookingDTO.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1, { message: "Number of rooms must be at least 1" }),
    __metadata("design:type", Number)
], CreateBookingDTO.prototype, "numberOfRoom", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ArrayNotEmpty)({ message: "Rooms array cannot be empty" }),
    (0, class_validator_1.IsString)({ each: true, message: "Each value in rooms must be a string" }),
    __metadata("design:type", String)
], CreateBookingDTO.prototype, "rooms", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ArrayNotEmpty)({ message: "Rooms array cannot be empty" }),
    (0, class_validator_1.IsString)({ each: true, message: "Each value in rooms must be a string" }),
    __metadata("design:type", String)
], CreateBookingDTO.prototype, "roomNames", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)({}, { message: "Invalid Check-In Date format" }),
    __metadata("design:type", String)
], CreateBookingDTO.prototype, "checkInDate", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)({}, { message: "Invalid Check-Out Date format" }),
    __metadata("design:type", String)
], CreateBookingDTO.prototype, "checkOutDate", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreateBookingDTO.prototype, "roomPrice", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateBookingDTO.prototype, "idImage", void 0);
class UpdateBookingDTO {
}
exports.UpdateBookingDTO = UpdateBookingDTO;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.Length)(2, 30),
    __metadata("design:type", String)
], UpdateBookingDTO.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateBookingDTO.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1, { message: "Number of rooms must be at least 1" }),
    __metadata("design:type", Number)
], UpdateBookingDTO.prototype, "numberOfRoom", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ArrayNotEmpty)({ message: "Rooms array cannot be empty" }),
    (0, class_validator_1.IsString)({ each: true, message: "Each value in rooms must be a string" }),
    __metadata("design:type", String)
], UpdateBookingDTO.prototype, "rooms", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ArrayNotEmpty)({ message: "Rooms array cannot be empty" }),
    (0, class_validator_1.IsString)({ each: true, message: "Each value in rooms must be a string" }),
    __metadata("design:type", String)
], UpdateBookingDTO.prototype, "roomNames", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)({}, { message: "Invalid Check-In Date format" }),
    __metadata("design:type", String)
], UpdateBookingDTO.prototype, "checkInDate", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)({}, { message: "Invalid Check-Out Date format" }),
    __metadata("design:type", String)
], UpdateBookingDTO.prototype, "checkOutDate", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], UpdateBookingDTO.prototype, "roomPrice", void 0);
class SendBookingEmailDTO {
}
exports.SendBookingEmailDTO = SendBookingEmailDTO;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SendBookingEmailDTO.prototype, "bookingId", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.Length)(2, 30),
    __metadata("design:type", String)
], SendBookingEmailDTO.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], SendBookingEmailDTO.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SendBookingEmailDTO.prototype, "roomNames", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsDateString)({}, { message: "Invalid Check-In Date format" }),
    __metadata("design:type", String)
], SendBookingEmailDTO.prototype, "checkInDate", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsDateString)({}, { message: "Invalid Check-Out Date format" }),
    __metadata("design:type", String)
], SendBookingEmailDTO.prototype, "checkOutDate", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1, { message: "Number of rooms must be at least 1" }),
    __metadata("design:type", Number)
], SendBookingEmailDTO.prototype, "numberOfRooms", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], SendBookingEmailDTO.prototype, "roomPrice", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], SendBookingEmailDTO.prototype, "idImage", void 0);
