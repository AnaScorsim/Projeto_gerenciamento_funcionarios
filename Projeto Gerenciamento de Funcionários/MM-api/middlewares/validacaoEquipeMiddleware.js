const Joi = require("joi");

const equipePostSchema = Joi.object({
    nome: Joi.string().min(3).max(100).required(),
    descricao: Joi.string().required(),
    liderId: Joi.string().allow(null, ""),
});

const equipePutSchema = Joi.object({
    nome: Joi.string().min(3).max(100).optional(),
    descricao: Joi.string().optional(),
    liderId: Joi.string().allow(null, "", "none"),
});

const validarEquipePost = (req, res, next) => {
    const { error } = equipePostSchema.validate(req.body, {abortEarly: false}); 

    if(error) {
        return res.status(400).json({errors: error.details.map(err => err.message)});
    }

    next();
};

const validarEquipePut = (req, res, next) => {
    const { error } = equipePutSchema.validate(req.body, {abortEarly: false});

    if(error) {
        return res.status(400).json({errors: error.details.map(err => err.message)});
    }

    next();
};

module.exports = { validarEquipePost, validarEquipePut };