const Usuario = require("../models/Usuario");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

class UsuarioController {
    static async cadastrarUsuario(req, res){
        try {
            const { nome, email, senha } = req.body;
        
            if(!nome || nome.trim().length < 3){
                return res.status(400).json({ error: "O nome deve ter pelo menos 3 caracteres." });
            }

            const conferirNome = /^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/;
            if (!conferirNome.test(nome)) {
                return res.status(400).json({ error: "O nome deve conter apenas letras e espaços." });
            }

            const conferirEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
            if (!conferirEmail.test(email)) {
                return res.status(400).json({ error: "Insira um email válido." });
            }

            if(!senha || senha.trim().length < 6){
                return res.status(400).json({ error: "A senha deve ter pelo menos 6 caracteres." });
            }

            const usuarioExistente = await Usuario.encontrarPorEmail(email);
            if(usuarioExistente){
                return res.status(409).json({ error: "Email já cadastrado." });
            }

            await Usuario.criar({ nome, email, senha });
            res.status(200).json({ message: "Usuário cadastrado com sucesso!" });
        } catch (err) {
            res.status(500).json({ error: err.message || "Erro ao cadastrar usuário" });
        }
    }

    static async login(req, res){
        try {
            const { email, senha } = req.body;

            if(!email ||!senha){
                return res.status(400).json({ error: "Preencha todos os campos." });
            }

            const usuario = await Usuario.encontrarPorEmail(email);
            if(!usuario){
                return res.status(404).json({ error: "Email não encontrado." });
            }

            const senhaCorreta = await bcrypt.compareSync(senha, usuario.senha);
            if(!senhaCorreta){
                return res.status(401).json({ error: "Senha inválida." });
            }

            const token = jwt.sign({ id: usuario._id}, process.env.JWT_SECRET, { expiresIn: "3h" });

            res.status(200).json({ token });
        } catch (err) {
            res.status(500).json({ error: err.message || "Erro ao realizar login" });
        }
    }
}

module.exports = UsuarioController;