import http from "../http-common";

const baseURL = "/api/usuarios";

class UsuarioDataService {
    create(data){
        return http.post(baseURL, data);
    }

    async login(data){
        const response = await http.post(`${baseURL}/login`, data);
        if(response.data.token){
            localStorage.setItem('token', response.data.token);
        }
        return response.data;
    }
}

export default new UsuarioDataService();