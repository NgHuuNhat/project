import axios from 'axios';
import { UserType } from '../types/User';

const API_URL = 'https://66c9d97d59f4350f064d9ef2.mockapi.io/user/users';

export const getUsers = () => {
    return axios.get(`${API_URL}`);
};

export const getUserById = (id: string) => {
    return axios.get(`${API_URL}/${id}`);
};

export const createUser = (user: UserType) => {
    return axios.post(`${API_URL}`, user);
};

export const updateUser = (id: string, user: any) => {
    return axios.put(`${API_URL}/${id}`, user);
};

export const deleteUser = (id: string) => {
    return axios.delete(`${API_URL}/${id}`);
};
