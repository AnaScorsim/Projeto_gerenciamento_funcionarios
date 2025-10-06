const Equipe = require("../models/Equipe");
const Funcionario = require("../models/Funcionario");

class EquipeController {
    static async criarEquipe(req, res){
        try {
            let {nome, descricao, liderId} = req.body;

            if(nome && nome.trim().length < 3) {
                return res.status(400).json({ error: "O nome deve ter pelo menos 3 caracteres." });
            }

            if(descricao && descricao.trim().length < 10) {
                return res.status(400).json({ error: "A descrição deve ter pelo menos 10 caracteres." });
            }

            const equipeExistente = await Equipe.buscarPorNome(nome);
            if(equipeExistente){
                return res.status(409).json({ error: "Nome de equipe já cadastrado." });
            }
        
            const newEquipe = Equipe.cadastrar({nome, descricao, liderId});
            res.starus(201).json(newEquipe);
        } catch (err) {
            res.status(500).json({ error: err.message || err });
        }
        
    }

    static async listarEquipes(req, res){
        try {
            const equipes = await Equipe.listar();
            res.status(200).json(equipes);
        } catch (err) {
            res.status(500).json({ error: err.message || err });
        }
    }

    static async buscarEquipePorId(req, res){
        try {
            const { id } = req.params;
            const equipe = await Equipe.buscarPorId(id);
            if(!equipe){
                return res.status(404).json({ error: "Equipe não encontrada." });
            }
            res.status(200).json(equipe);
        } catch (err) {
            res.status(500).json({ error: err.message || err });
        }
    }

    static async atualizarEquipe(req, res){
        try {
            const { id } = req.params;
            let { nome, descricao, liderId } = req.body;

            const equipeAtualizada = { nome, descricao, liderId};

            Object.keys(equipeAtualizada).forEach(key => {
                if(!equipeAtualizada[key]){
                    delete equipeAtualizada[key];
                }
            });

            if(equipeAtualizada.liderId === "none") equipeAtualizada.liderId = null;

            const equipeAntiga = await Equipe.buscarPorId(id);
            if(!equipeAntiga){
                return res.status(404).json({ error: "Equipe não encontrada." });
            }

            if(equipeAtualizada.nome && equipeAtualizada.nome.trim().length < 3) {
                return res.status(400).json({ error: "O nome deve ter pelo menos 3 caracteres." });
            }

            if(equipeAtualizada.descricao && equipeAtualizada.descricao.trim().length < 10) {
                return res.status(400).json({ error: "A descrição deve ter pelo menos 10 caracteres." });
            }

            if(equipeAtualizada.nome && equipeAtualizada.nome !== equipeAntiga.nome) {
                const equipeExistente = await Equipe.buscarPorNome(equipeAtualizada.nome);
                if(equipeExistente){
                    return res.status(409).json({ error: "Nome de equipe já cadastrado." });
                }
            }

            if(equipeAtualizada.liderId){
                const funcionario = await Funcionario.buscarPorId(equipeAtualizada.liderId);
                if(!funcionario){
                    return res.status(404).json({ error: "Líder da equipe não encontrado." });
                }
            }

            await Equipe.atualizar(id, equipeAtualizada);
            res.status(200).json({ message: "Equipe atualizada com sucesso." });
        } catch (err) {
            res.status(500).json({ error: err.message || err });
        }
    }

    static async deletarEquipe(req, res){
        try {
            const { id } = req.params;
            const equipe = await Equipe.buscarPorId(id);
            if(!equipe){
                return res.status(404).json({ error: "Equipe não encontrada." });
            }

            await Funcionario.atualizarVarios({ equipeId: id}, {equipeId: null});

            await Equipe.deletar(id);
            res.status(200).json({ message: "Equipe deletada com sucesso." });
        } catch (err) {
            res.status(500).json({ error: err.message || err });
        }
    }
}

module.exports = EquipeController;