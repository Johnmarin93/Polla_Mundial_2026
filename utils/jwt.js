import jwt from "jsonwebtoken";
import dotenv from "dotenv";

const secretKey = process.env.SECRET_KEY; // Clave secreta para firmar los tokens

export const generarToken = (usuario) => {
  return jwt.sign(
    {
      id: usuario.id,
      email: usuario.email,
      nombre: usuario.nombre,
      rol_id: usuario.rol_id,
    },
    secretKey,
    { expiresIn: "1h" }, // El token expirará en 1 hora
  );
};
