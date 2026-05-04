import jwt from "jsonwebtoken";
import dotenv from "dotenv";

const secretKey = process.env.SECRET_KEY; // Clave secreta para verificar los tokens

export const verificarToken = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ error: "Token requerido" });
    }

    const token = authHeader.split(" ")[1];

    const verificado = jwt.verify(token, secretKey);
    req.usuario = verificado;
    next();
  } catch (error) {
    res.status(401).json({ error: "Token inválido" });
  }
};
