import axios from "axios";

const api = axios.create({
    baseURL: 'http://localhost:3333',
});

const token = localStorage.getItem('@web:token');

if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}

export default api;