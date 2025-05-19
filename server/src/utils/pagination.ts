// src/utils/pagination.ts

export const getPagination = (page: number, size: number): { limit: number; offset: number } => {
    const limit = size ?? 10;
    const offset = page * limit ;

    return { limit, offset };
};

export function validatePagination(pageCount: string, perpageData: string): [number, number] {
    const page = !Number.isNaN(parseInt(pageCount)) && parseInt(pageCount) > 0 ? parseInt(pageCount) : 1;
    const perpage = !Number.isNaN(parseInt(perpageData)) && parseInt(perpageData) > 0 ? parseInt(perpageData) : 10;

    return [page, perpage];
}

export const getPagingData = (
    total: number,
    page: number,
    limit: number
): {
    total: number;
    totalPages: number;
    currentPage: number;
    perpage: number;
} => {
    const currentPage: number = page ?? 1;
    const totalPages: number = Math.ceil(total / limit);

    return { total, totalPages, currentPage, perpage: limit };
};
