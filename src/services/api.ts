import axios from "axios";

const api = axios.create({
    baseURL:
        import.meta.env.VITE_APP_ENV === 'local'
            ? 'http://localhost:3333'
            : 'http://54.89.253.57',
});

axios.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response && error.response.status === 401) {
            const token = localStorage.getItem("@web:token");
            if (!token) {
                window.location.href = "/login";
            } else {
                const { exp } = JSON.parse(window.atob(token.split(".")[1]));
                if (exp && Date.now() >= exp * 1000) {
                    window.location.href = "/login";
                }
            }
        }

        return Promise.reject(error);
    }
);
export default api;