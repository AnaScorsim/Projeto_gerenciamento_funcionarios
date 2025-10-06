const nedb = require("nedb");

const db = new nedb({ filename: "funcionarios.db", autoload: true });

class Funcionario {
    static criar(funcionario) {
        return new Promise((resolve, reject) => {
            db.insert(funcionario, (err, newFuncionario) => {
                if (err) return reject(err);
                resolve(newFuncionario);
            });
        });
    }

    static listar() {
        return new Promise((resolve, reject) => {
            db.find({}, (err, funcionarios) => {
                if (err) return reject(err);
                resolve(funcionarios);
            });
        });
    }

    static buscarPorId(id) {
        return new Promise((resolve, reject) => {
            db.findOne({ _id: id }, (err, funcionario) => {
                if (err) return reject(err);
                resolve(funcionario);
            });
        });
    }

    static buscarPorEmail(email) {
        return new Promise((resolve, reject) => {
            db.findOne({ email }, (err, funcionario) => {
                if (err) return reject(err);
                resolve(funcionario);
            });
        });
    }

    static listarPorEquipe(equipeId) {
        return new Promise((resolve, reject) => {
            db.find({ equipeId }, (err, funcionarios) => {
                if (err) return reject(err);
                resolve(funcionarios);
            });
        });
    }

    static atualizar(id, funcionario) {
        return new Promise((resolve, reject) => {
            db.update(
                { _id: id },
                { $set: funcionario },
                { multi: false, returnUpdatedDocs: true },
                (err, updatedFuncionario) => {
                    if (err) return reject(err);
                    resolve(updatedFuncionario);
                }
            );
        });
    }

    static atualizarVarios(filtro, novosDados) {
        return new Promise((resolve, reject) => {
            db.update(
                filtro,
                { $set: novosDados },
                { multi: true, returnUpdatedDocs: true },
                (err, updatedFuncionarios) => {
                    if (err) return reject(err);
                    resolve(updatedFuncionarios);
                }
            );
        });
    }

    static deletar(id) {
        return new Promise((resolve, reject) => {
            db.remove({ _id: id }, {}, (err, funcionarioRemoved) => {
                if (err) return reject(err);
                resolve(funcionarioRemoved);
            });
        });
    }
}

module.exports = Funcionario;
