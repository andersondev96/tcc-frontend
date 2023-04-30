import axios from "axios";

const api = axios.create({
    baseURL: 'http://localhost:3333',
    headers: {
        "Content-Type": "application/json",
    }
});

api.interceptors.response.use(
    (config) => {
        const token = localStorage.getItem("@web:token");
        if (token) {
            config.headers["x-access-token"] = token;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

api.interceptors.response.use(
    (res) => {
        return res
    },

    async (err) => {
        const originalConfig = err.config;
        const token = localStorage.getItem("@web:token");

        if (originalConfig.url !== "/login" && err.response) {
            if (err.response.status === 401 && !originalConfig.retry) {
                originalConfig._retry = true;

                try {
                    const response = await api.post("/sessions/refresh-token", {
                        token
                    });

                    const { refresh_token } = response.data;
                    localStorage.setItem("@web:token", refresh_token);

                    return api(originalConfig);
                } catch (err) {
                    return Promise.reject(err);
                }
            }
        }
    }
)


export default api;