import axios from 'axios';

const BASE_URL = 'https://mern-server-58qj.onrender.com/api';

const TOKEN = localStorage.getItem('token');

export const publicRequest = axios.create({ baseURL: BASE_URL });

export const userRequest = axios.create({
  baseURL: BASE_URL,
  headers: { token: `${TOKEN}` },
});
