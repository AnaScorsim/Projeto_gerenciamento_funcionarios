const Joi = require("joi");

const UsuarioCadastroSchema = Joi.object({
    nome: Joi.string().pattern(/^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/).min(3).max(100).required(),
    email: Joi.string().email().required(),
    senha: Joi.string().required(),
});

const UsuarioLoginSchema = Joi.object({
    email: Joi.string().email().required(),
    senha: Joi.string().required(),
});

const validarUsuarioCadastro = async (req, res, next) => {
    const { error } = UsuarioCadastroSchema.validate(req.body, {abortEarly: false}); 

    if(error) {
        return res.status(400).json({errors: error.details.map(err => err.message)});
    }

    next();
};

const validarUsuarioLogin = (req, res, next) => {
    const { error } = UsuarioLoginSchema.validate(req.body, {abortEarly: false});

    if(error) {
        return res.status(400).json({errors: error.details.map(err => err.message)});
    }

    next();
};

module.exports = { validarUsuarioCadastro, validarUsuarioLogin };