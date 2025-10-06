const Funcionario = require("../models/Funcionario");
const Equipe = require("../models/Equipe");

class FuncionarioController {
    static async criarFuncionario(req, res) {
        try {
            let { nome, email, telefone, equipeId } = req.body;
            if (equipeId === "none") equipeId = null;

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

            const conferirTelefone = /^[0-9]{9,11}$/;
            if (!conferirTelefone.test(telefone)) {
                return res.status(400).json({ error: "Insira um telefone válido (9 ou 11 dígitos, apenas números)." });
            }

            const emailExistente = await Funcionario.buscarPorEmail(email);
            if (emailExistente) {
                return res.status(409).json({ error: "Este email já está em uso." });
            }

            if (equipeId) {
                const equipe = await Equipe.buscarPorId(equipeId);
                if (!equipe) {
                    return res.status(404).json({ error: "Equipe não encontrada." });
                }
            }

            const newFuncionario = await Funcionario.criar({ nome, email, telefone, equipeId });
            res.status(201).json(newFuncionario);
        } catch (err) {
            res.status(500).json({ error: err.message || err });
        }
    }

    static async listarFuncionarios(req, res) {
        try {
            const funcionarios = await Funcionario.listar();
            res.status(200).json(funcionarios);
        } catch (err) {
            res.status(500).json({ error: err.message || err });
        }
    }

    static async buscarFuncionarioPorId(req, res) {
        try {
            const { id } = req.params;
            const funcionario = await Funcionario.buscarPorId(id);
            if (!funcionario) {
                return res.status(404).json({ error: "Funcionário não encontrado." });
            }
            res.status(200).json(funcionario);
        } catch (err) {
            res.status(500).json({ error: err.message || err });
        }
    }

    static async listarFuncionariosPorEquipe(req, res) {
        try {
            const { equipeId } = req.params;
            const funcionarios = await Funcionario.listarPorEquipe(equipeId);
            res.status(200).json(funcionarios);
        } catch (err) {
            res.status(500).json({ error: err.message || err });
        }
    }

    static async atualizarFuncionario(req, res) {
        try {
            const { id } = req.params;
            let { nome, email, telefone, equipeId } = req.body;

            const funcionarioAtualizado = { nome, email, telefone, equipeId };

            Object.keys(funcionarioAtualizado).forEach(key => {
                if (!funcionarioAtualizado[key]) {
                    delete funcionarioAtualizado[key];
                }
            });

            if (funcionarioAtualizado.equipeId === "none") funcionarioAtualizado.equipeId = null;

            const funcionarioAntigo = await Funcionario.buscarPorId(id);
            if (!funcionarioAntigo) {
                return res.status(404).json({ error: "Funcionário não encontrado." });
            }

            if(funcionarioAtualizado.nome && funcionarioAtualizado.nome.trim().length < 3) {
                return res.status(400).json({ error: "O nome deve ter pelo menos 3 caracteres." });
            }

            if(funcionarioAtualizado.email){
                const conferirEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
                if (!conferirEmail.test(funcionarioAtualizado.email)) {
                    return res.status(400).json({ error: "Insira um email válido." });
                }
            }
            
            if(funcionarioAtualizado.telefone){
                const conferirTelefone = /^[0-9]{9,11}$/;
                if (!conferirTelefone.test(funcionarioAtualizado.telefone)) {
                    return res.status(400).json({ error: "Insira um telefone válido (9 ou 11 dígitos, apenas números)." });
                }
            }

            if (funcionarioAtualizado.email && email !== funcionarioAntigo.email) {
                const emailExistente = await Funcionario.buscarPorEmail(funcionarioAtualizado.email);
                if (emailExistente) {
                    return res.status(409).json({ error: "Este email já está em uso." });
                }
            }

            if (funcionarioAtualizado.equipeId) {
                const equipe = await Equipe.buscarPorId(funcionarioAtualizado.equipeId);
                if (!equipe) {
                    return res.status(404).json({ error: "Equipe não encontrada." });
                }
            }

            await Funcionario.atualizar(id, funcionarioAtualizado);

            if (funcionarioAntigo.equipeId && funcionarioAntigo.equipeId !== funcionarioAtualizado.equipeId) {
                const equipeAnterior = await Equipe.buscarPorId(funcionarioAntigo.equipeId);
                if (equipeAnterior?.liderId === id) {
                    await Equipe.atualizar(funcionarioAntigo.equipeId, { liderId: null });
                }
            }

            res.status(200).json({ message: "Funcionário atualizado com sucesso." });
        } catch (err) {
            res.status(500).json({ error: err.message || err });
        }
    }

    static async deletarFuncionario(req, res) {
        try {
            const { id } = req.params;
            const funcionario = await Funcionario.buscarPorId(id);
            if (!funcionario) {
                return res.status(404).json({ error: "Funcionário não encontrado." });
            }

            if (funcionario.equipeId) {
                const equipe = await Equipe.buscarPorId(funcionario.equipeId);
                if (equipe?.liderId === id) {
                    await Equipe.atualizar(funcionario.equipeId, { liderId: null });
                }
            }

            await Funcionario.deletar(id);
            res.status(200).json({ message: "Funcionário deletado com sucesso" });
        } catch (err) {
            res.status(500).json({ error: err.message || err });
        }
    }
}

module.exports = FuncionarioController;
