"use strict";
// src/utils/pagination.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPagingData = exports.getPagination = void 0;
exports.validatePagination = validatePagination;
const getPagination = (page, size) => {
    const limit = size ?? 10;
    const offset = page * limit;
    return { limit, offset };
};
exports.getPagination = getPagination;
function validatePagination(pageCount, perpageData) {
    const page = !Number.isNaN(parseInt(pageCount)) && parseInt(pageCount) > 0 ? parseInt(pageCount) : 1;
    const perpage = !Number.isNaN(parseInt(perpageData)) && parseInt(perpageData) > 0 ? parseInt(perpageData) : 10;
    return [page, perpage];
}
const getPagingData = (total, page, limit) => {
    const currentPage = page ?? 1;
    const totalPages = Math.ceil(total / limit);
    return { total, totalPages, currentPage, perpage: limit };
};
exports.getPagingData = getPagingData;
