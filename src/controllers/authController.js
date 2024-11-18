const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

const secretKey = process.env.SECRET_KEY;

const login = (request, response) => {
  const { username, password } = request.body;

  if (username === "professor.lucas" && password === "1234") {
    const payload = {
      sub: username,
      name: "Lucas José de Souza",
      iat: Math.floor(Date.now() / 1000),
    };

    const token = jwt.sign(payload, secretKey, { expiresIn: "1d" });
    return response.json({ message: "Login bem-sucedido!", token });
  }

  response.status(401).json({ message: "Credenciais inválidas" });
};

const protectedContent = (request, response) => {
  const token = request.headers["authorization"];

  if (!token) {
    return response.status(403).json({ message: "Token não fornecido" });
  }

  try {
    const bearerToken = token.split(" ")[1];
    const decoded = jwt.verify(bearerToken, secretKey);

    response.json({ message: "Conteúdo protegido acessado!", user: decoded });
  } catch (error) {
    return response.status(403).json({ message: "Token inválido ou expirado" });
  }
};

const conteudoProtegido = (request, response) => {
  const token = request.headers["authorization"];

  if (!token) {
    return response.status(403).json({ message: "Token não fornecido" });
  }

  try {
    const bearerToken = token.split(" ")[1];

    const respJson = {
      "Banco": "Itaú",
      "CC": "4535-3",
      "pass-phrase": "A ave voava.",
      "saldo": "15000.00"

    }
    response.json({ message: "Essa área é restrita!", respJson });
  } catch (error) {
    return response.status(403).json({ message: "Token inválido ou expirado" });
  }
};
const conteudoProtegido2 = (request, response) => {
  const token = request.headers["authorization"];

  if (!token) {
    return response.status(403).json({ message: "Token não fornecido" });
  }

  try {
    const bearerToken = token.split(" ")[1];

    const respJson = {
      "Banco": "Itaú",
      "CC": "4535-3",
      "bar-code": "1234666893123124566690",
      "valor": "5000.00",
      "data-vencimento": "12/12/2024"

    }
    response.json({ message: "Boleto gerado com sucesso", respJson });
  } catch (error) {
    return response.status(403).json({ message: "Token inválido ou expirado" });
  }
};

module.exports = { login, protectedContent, conteudoProtegido, conteudoProtegido2 };
