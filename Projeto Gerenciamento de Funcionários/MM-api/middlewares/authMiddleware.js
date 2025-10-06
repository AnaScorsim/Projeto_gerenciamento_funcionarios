const jwt = require("jsonwebtoken");

function verificarToken(req, res, next){
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if(!token){
        return res.status(401).json({ error: "Acesso negado!" });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if(err){
            return res.status(403).json({ error: "Token inválido!"});
        }

        req.userId = decoded.id;
        next();
    })
}

module.exports = { verificarToken };