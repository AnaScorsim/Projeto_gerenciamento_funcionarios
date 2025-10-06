const express = require("express");
const UsuarioController = require("../controllers/UsuarioController");
const { validarUsuarioCadastro, validarUsuarioLogin } = require("../middlewares/validacaoUsuarioMiddleware");
const router = express.Router();

router.post("/", validarUsuarioCadastro, UsuarioController.cadastrarUsuario);
router.post("/login", validarUsuarioLogin, UsuarioController.login);

module.exports = router;