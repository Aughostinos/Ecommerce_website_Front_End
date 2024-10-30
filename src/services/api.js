import axios from 'axios';
import BACKEND_URL from '../config';

const API_URL = `${BACKEND_URL}/products`;

export const getProducts = async () => {
    const response = await axios.get(`${API_URL}/get-products`);
    return response.data;
};

export const getProductById = async (id) => {
    const response = await axios.get(`${API_URL}/get-product/${id}`);
    return response.data;
};

export const login = async (credentials) => {
    const response = await axios.post(`${BACKEND_URL}/auth/login`, credentials);
    return response.data;
};
