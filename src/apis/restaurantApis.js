import axios from "axios";

export const restaurantApis = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
});

restaurantApis.interceptors.request.use(config => {
    config.headers = { ...config.headers, "Authorization": sessionStorage.getItem("token"), };
    return config;
})
