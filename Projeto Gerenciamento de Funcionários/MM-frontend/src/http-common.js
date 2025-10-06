import axios from "axios";

const http = axios.create({
    headers: {
        "Content-type": "application/json"
    },
});

http.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if(token){
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    }, (error) => {
        return Promise.reject(error);
    }
);

http.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response && error.response.status === 401) {
            console.error('Token expirado ou inválido. Faça login novamente.');
        }
        return Promise.reject(error);
    }
);

export default http;