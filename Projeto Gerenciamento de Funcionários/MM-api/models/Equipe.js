const nedb = require("nedb");

const db = new nedb({filename: "equipes.db", autoload: true});

class Equipe {
    static cadastrar(equipe){
        return new Promise((resolve, reject) => {
            db.insert(equipe, (err, newEquipe) => {
                if(err) return reject(err);
                resolve(newEquipe);
            });
        });
    }

    static listar(){
        return new Promise((resolve, reject) => {
            db.find({}, (err, equipes) => {
                if(err) return reject(err);
                resolve(equipes);
            });
        });
    }

    static buscarPorId(id){
        return new Promise((resolve, reject) => {
            db.findOne({_id: id}, (err, equipe) => {
                if(err) return reject(err);
                resolve(equipe);
            });
        });
    }

    static buscarPorLiderId(liderId){
        return new Promise((resolve, reject) => {
            db.findOne({ liderId }, (err, equipe) => {
                if(err) return reject(err);
                resolve(equipe);
            });
        });
    }

    static buscarPorNome(nome){
        return new Promise((resolve, reject) => {
            db.findOne({ nome }, (err, equipe) => {
                if(err) return reject(err);
                resolve(equipe);
            });
        });
    }

    static atualizar(id, equipe){
        return new Promise((resolve, reject) => {
            db.update(
                {_id: id}, 
                {$set: equipe}, 
                {returnUpdatedDocs: true},
            (err, updatedEquipe) => {
                if(err) return reject(err);
                resolve(updatedEquipe);
            });
        });
    }

    static deletar(id){
        return new Promise((resolve, reject) => {
            db.remove({_id: id}, {}, (err, equipeRemoved) => {
                if(err) return reject(err);
                resolve(equipeRemoved);
            });
        });
    }
}

module.exports = Equipe;