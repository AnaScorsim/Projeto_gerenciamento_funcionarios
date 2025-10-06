const Joi = require("joi");

const funcionarioPostSchema = Joi.object({
    nome: Joi.string().pattern(/^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/).min(3).max(100).required(),
    email: Joi.string().email().required(),
    telefone: Joi.string().pattern(/^[0-9]{9,11}$/).required(),
    equipeId: Joi.string().allow(null, ""),
});

const funcionarioPutSchema = Joi.object({
    nome: Joi.string().pattern(/^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/).min(3).max(100).optional(),
    email: Joi.string().email().optional(),
    telefone: Joi.string().pattern(/^[0-9]{9,11}$/).optional(),
    equipeId: Joi.string().allow(null, "", "none"),
});

const validarFuncionarioPost = async (req, res, next) => {
    const { error } = funcionarioPostSchema.validate(req.body, {abortEarly: false}); 

    if(error) {
        return res.status(400).json({errors: error.details.map(err => err.message)});
    }

    next();
};

const validarFuncionarioPut = (req, res, next) => {
    const { error } = funcionarioPutSchema.validate(req.body, {abortEarly: false});

    if(error) {
        return res.status(400).json({errors: error.details.map(err => err.message)});
    }

    next();
};

module.exports = { validarFuncionarioPost, validarFuncionarioPut };