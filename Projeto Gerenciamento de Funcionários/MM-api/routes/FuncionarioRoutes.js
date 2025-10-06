const express = require('express');
const FuncionarioController = require("../controllers/FuncionarioController");
const { validarFuncionarioPost, validarFuncionarioPut } = require("../middlewares/validacaoFuncionarioMiddleware");
const router = express.Router();

router.post('/', validarFuncionarioPost, FuncionarioController.criarFuncionario);
router.get('/', FuncionarioController.listarFuncionarios);
router.get('/:id', FuncionarioController.buscarFuncionarioPorId);
router.get('/equipe/:equipeId', FuncionarioController.listarFuncionariosPorEquipe);
router.put('/:id', validarFuncionarioPut, FuncionarioController.atualizarFuncionario);
router.delete('/:id', FuncionarioController.deletarFuncionario);

module.exports = router;