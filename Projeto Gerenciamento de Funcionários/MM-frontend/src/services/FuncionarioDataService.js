import http from "../http-common";

const baseURL = "/api/funcionarios";

class FuncionarioDataService { 
    create(data) {
        return http.post(baseURL, data);
    }
    getAll() {
        return http.get(baseURL);
    }

    getById(id) {
        return http.get(`${baseURL}/${id}`);
    }

    getByEquipeId(id){
        return http.get(`${baseURL}/equipe/${id}`);
    }

    update(id, data){
        return http.put(`${baseURL}/${id}`, data);
    }

    delete(id){
        return http.delete(`${baseURL}/${id}`);
    }
}

export default new FuncionarioDataService();