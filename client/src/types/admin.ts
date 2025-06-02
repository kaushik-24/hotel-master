export enum ROLE {
  USER = 'USER',
  ADMIN = 'ADMIN'
}

export interface Admin {
  _id: string;
  name: string;
  email: string;
  phoneNumber: string;
  role: ROLE;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateAdminDTO {
  name: string;
  email: string;
  phoneNumber: string;
  password: string;
}

export interface UpdateAdminDTO {
  name: string;
  phoneNumber: string;
  password?: string;
}

export interface PaginatedAdmins {
  data: Admin[];
  pagination: {
    total: number;
    page: number;
    perpage: number;
    totalPages: number;
  };
}
