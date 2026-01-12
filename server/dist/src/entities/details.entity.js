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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthDetails = void 0;
const typeorm_1 = require("typeorm");
const base_entity_1 = __importDefault(require("./base.entity"));
// import Media from '../med'
const auth_entity_1 = require("./auth.entity");
let AuthDetails = class AuthDetails extends base_entity_1.default {
};
exports.AuthDetails = AuthDetails;
__decorate([
    (0, typeorm_1.Column)({ name: 'name', type: 'json' }),
    __metadata("design:type", String)
], AuthDetails.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'phone_number', nullable: true }),
    __metadata("design:type", String)
], AuthDetails.prototype, "phoneNumber", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => auth_entity_1.Auth, (auth) => auth.details, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'auth_id' }),
    __metadata("design:type", auth_entity_1.Auth)
], AuthDetails.prototype, "auth", void 0);
exports.AuthDetails = AuthDetails = __decorate([
    (0, typeorm_1.Entity)('auth_details')
], AuthDetails);
