
export interface LoginFormProps {
    email: string,
    password: string,
}

export interface SignUpFormProps {
    name: string,
    email: string,
    phoneNumber: string,
    password: string,
    confirmPassword: string
}

export interface IPagination {
    total: number,
    totalPages: number,
    currentPage: number,
    perpage: number
}

export interface GetUserListProp {
    id: string
    name: string
    email: string
    phoneNumber: string
}
