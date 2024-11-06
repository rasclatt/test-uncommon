import axios from "axios";

const http = () => {
  const http = axios.create({
    baseURL: import.meta.env.VITE_API_HOST,
    headers: {
      'Content-type': 'application/json',
    },
  });

  http.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  return http;
}

export default http;

export const query = async <T, Z>(type: 'POST' | 'GET' | 'DELETE' | 'PATCH' | 'PUT', service: string, data?: Z) => {
    try {
        let resp: Awaited<{ data: T, status: number, statusText: string }>;
        switch (type) {
            case 'POST':
                resp = await http().post(service, data);
                return resp;
            case 'GET':
                resp = await http().get(service);
                return resp;
            case 'DELETE':
                resp = await http().delete(service);
                return resp;
            case 'PATCH':
                resp = await http().patch(service, data);
                return resp;
            case 'PUT':
                resp = await http().put(service, data);
                return resp;
            default:
                throw new Error('Invalid HTTP method');
        }
    } catch (error) {
        console.error('Error creating item:', error);
        throw error;
    }
}