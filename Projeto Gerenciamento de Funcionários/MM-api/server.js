require('dotenv').config({ path: "./config.env" });
const express = require("express");
const cors = require("cors");
const FuncionarioRoutes = require("./routes/FuncionarioRoutes");
const EquipeRoutes = require("./routes/EquipeRoutes");
const UsuarioRoutes = require("./routes/UsuarioRoutes");
const { verificarToken } = require("./middlewares/authMiddleware");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/usuarios", UsuarioRoutes);
app.use("/funcionarios", verificarToken, FuncionarioRoutes);
app.use("/equipes", verificarToken, EquipeRoutes);

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});