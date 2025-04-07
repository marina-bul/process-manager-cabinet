import axios, { AxiosInstance } from 'axios';

import type { 
  CompanyInfoResponse, 
  ContactInfoResponse, 
  ContactInfo,
  CompanyInfo  
} from 'types/general';

class ApiService {
    private api: AxiosInstance;
    private baseUrl: string = 'https://test-task-api.allfuneral.com';
    private userName: string = 'MarinaBul'

    constructor() {
        this.api = axios.create({
            baseURL: this.baseUrl,
        });

        this.api.interceptors.request.use(config => {
            const token = localStorage.getItem('auth_token');
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        });
    }


    async getToken(): Promise<void> {
        try {
            const response = await this.api.get(`/auth?user=${this.userName}`);
            const authHeader = response.headers['authorization'];

            if (authHeader && authHeader.startsWith('Bearer ')) {
                const token = authHeader.replace('Bearer ', '');
                localStorage.setItem('auth_token', token);
            } else {
                throw new Error('Authorization header not found');
            }
        } catch (error) {
            console.error('Auth error:', error);
            throw error;
        }
    }

    async getCompany(id: string): Promise<CompanyInfoResponse> {
        const res = await this.api.get(`/companies/${id}`);
        return res.data
    }

    updateCompany(id: string, data: Partial<CompanyInfo>) {
        return this.api.patch(`/companies/${id}`, data);
    }

    deleteCompany(id: string) {
        return this.api.delete(`/companies/${id}`);
    }

    uploadCompanyImage(id: string, imageFile: File) {
        const formData = new FormData();
        formData.append('file', imageFile);

        return this.api.post(`/companies/${id}/image`, formData);
    }

    deleteCompanyImage(id: string, imageName: string) {
        return this.api.delete(`/companies/${id}/image/${imageName}`);
    }


    async getContact(id: string): Promise<ContactInfoResponse> {
      const res = await this.api.get(`/contacts/${id}`);
      return res.data
    }

    updateContact(id: string, data: Partial<ContactInfo>) {
        return this.api.patch(`/contacts/${id}`, data);
    }
}

export const apiService = new ApiService();
