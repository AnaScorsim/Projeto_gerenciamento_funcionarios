const express = require('express');
const EquipeController = require("../controllers/EquipeController");
const { validarEquipePost, validarEquipePut } = require("../middlewares/validacaoEquipeMiddleware");
const router = express.Router();

router.post('/', validarEquipePost, EquipeController.criarEquipe);
router.get('/', EquipeController.listarEquipes);
router.get('/:id', EquipeController.buscarEquipePorId);
router.put('/:id', validarEquipePut, EquipeController.atualizarEquipe);
router.delete('/:id', EquipeController.deletarEquipe);

module.exports = router;