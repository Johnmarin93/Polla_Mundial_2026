import {
  crearUsuario,
  obtenerUsuarioPorEmail,
} from "../services/user.service.js";
import { hashPassword, comparePassword } from "../utils/hash.js";
import { generarToken } from "../utils/jwt.js";

export const registrarUsuario = async (req, res) => {
  try {
    const { nombre, email, password, rol_id } = req.body;

    const hashed = await hashPassword(password);

    const usuario = await crearUsuario({
      nombre,
      email,
      password: hashed,
      rol_id,
    });
    res.json(usuario);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const usuario = await obtenerUsuarioPorEmail(email);

    if (!usuario) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    const validPassword = await comparePassword(password, usuario.password);

    if (!validPassword) {
      return res.status(401).json({ error: "Credenciales inválidas" });
    }

    const token = generarToken(usuario);

    res.json({
      message: "Login exitoso",
      token,
      user: {
        id: usuario.id,
        nombre: usuario.nombre,
        email: usuario.email,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const perfil = async (req, res) => {
  res.json({ message: "Perfil del usuario", usuario: req.usuario });
};
