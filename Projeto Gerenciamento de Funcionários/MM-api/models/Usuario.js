const nedb = require("nedb");
const bcrypt = require("bcrypt");

const db = new nedb({ filename: "usuarios.db", autoload: true });

class Usuario {
    static async criar(usuario) {
        try {
            usuario.senha = await bcrypt.hash(usuario.senha, 10);
            return new Promise((resolve, reject) => {
                db.insert(usuario, (err, newUsuario) => {
                    if (err) return reject(err);
                    resolve(newUsuario);
                });
            });
        } catch (err) {
            throw new Error("Erro ao criar usuário: " + err.message);
        } 
    }

    static encontrarPorEmail(email){
        return new Promise((resolve, reject) => {
            db.findOne({ email }, (err, usuario) => {
                if (err) return reject(err);
                resolve(usuario);
            });
        });
    }
}

module.exports = Usuario;