const express = require("express");
const { login, protectedContent, conteudoProtegido, conteudoProtegido2 } = require("./controllers/authController");

const router = express.Router();

// Rota pública
router.get("/", (request, response) => {
  response.json({ message: "Endpoint que não exige autenticação!" });
});

// Rota de login
router.post("/login", login);

// Rotas protegidas
router.get("/protected", protectedContent);
router.get("/banco", conteudoProtegido);
router.get("/gerarBoleto", conteudoProtegido2);

module.exports = router;
