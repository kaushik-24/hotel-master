import axios from 'axios';
import { Admin, CreateAdminDTO, PaginatedAdmins, UpdateAdminDTO } from '../types/admin';
import encryptDecrypt from 'function/encryptDecrypt';

const API_URL = import.meta.env.VITE_APP_BASE_URL;

const getAuthHeader = () => {
  const encryptedToken =
    localStorage.getItem('accessTokenHotelVenus') ||
    sessionStorage.getItem('accessTokenHotelVenus');
    
  const token = encryptedToken ? encryptDecrypt.decrypt(encryptedToken) : null;
  
  const headers = {
    headers: {
      Authorization: token ? `Bearer ${token}` : ''
    }
  };
  
  return headers;
};

export const fetchAdmins = async (
  page: number = 1,
  perPage: number = 10,
  search: string = ''
): Promise<PaginatedAdmins> => {
  const response = await axios.get(`${API_URL}/api/admins`, {
    params: { page, perpage: perPage, search },
    ...getAuthHeader()
  });
  return response.data;
};

export const fetchAdminById = async (id: string): Promise<Admin> => {
  const response = await axios.get(`${API_URL}/api/admins/${id}`, getAuthHeader());
  return response.data.data;
};

export const createAdmin = async (adminData: CreateAdminDTO): Promise<void> => {
  await axios.post(`${API_URL}/api/admins`, adminData, getAuthHeader());
};

export const updateAdmin = async (id: string, adminData: UpdateAdminDTO): Promise<void> => {
  
  const url = `${API_URL}/api/admins/${id}`;
  
  const authHeader = getAuthHeader();
  try {
    const response = await axios.put(url, adminData, authHeader);
    return response.data;
  } catch (error: any) {
    throw error;
  }
};

export const deleteAdmin = async (id: string): Promise<void> => {
  await axios.delete(`${API_URL}/api/admins/${id}`, getAuthHeader());
};
