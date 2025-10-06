import http from "../http-common";

const baseURL = "/api/equipes";

class EquipeDataService {
    getAll() {
        return http.get(baseURL);
    }

    getById(id) {
        return http.get(`${baseURL}/${id}`);
    }

    create(data) {
        return http.post(baseURL, data);
    }

    update(id, data) {
        return http.put(`${baseURL}/${id}`, data);
    }

    delete(id) {
        return http.delete(`${baseURL}/${id}`);
    }
}

export default new EquipeDataService();