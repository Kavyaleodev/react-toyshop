import axios from 'axios';

const API_URL = 'http://localhost:4000/api';

export const registerUser = (userData) => {
  return axios.post(`${API_URL}/register`, userData);
};

export const loginUser = (userData) => {
  return axios.post(`${API_URL}/login`, userData);
};
