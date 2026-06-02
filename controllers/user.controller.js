import {
  crearUsuario,
  obtenerUsuarioPorEmail,
  getUserStatsService,
  resetUserPassword,
  updatePassword,
} from "../services/user.service.js";
import { hashPassword, comparePassword } from "../utils/hash.js";
import { generarToken } from "../utils/jwt.js";

export const registrarUsuario = async (req, res) => {
  try {
    const { nombre, email, password } = req.body;

    const hashed = await hashPassword(password);

    const usuario = await crearUsuario({
      nombre,
      email,
      password: hashed,
    });
    res.json(usuario);
  } catch (error) {
    if (error.code === "23505") {
      return res.status(400).json({
        error: "El correo ya está registrado",
      });
    }

    res.status(500).json({
      error: error.message,
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const usuario = await obtenerUsuarioPorEmail(email);

    if (!usuario) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    if (!usuario.is_active) {
      return res.status(403).json({
        error: "Usuario bloqueado",
      });
    }

    const validPassword = await comparePassword(password, usuario.password);

    if (!validPassword) {
      return res.status(401).json({ error: "Correo o contraseña incorrectos" });
    }

    const token = generarToken(usuario);

    res.json({
      message: "Login exitoso",
      token,
      user: {
        id: usuario.id,
        nombre: usuario.nombre,
        email: usuario.email,
        rol_id: usuario.rol_id,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const perfil = async (req, res) => {
  res.json({ message: "Perfil del usuario", usuario: req.usuario });
};

export const getUserStats = async (req, res) => {
  try {
    const userId = req.usuario.id;

    const stats = await getUserStatsService(userId);

    res.json(stats);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      error: "Error obteniendo estadísticas",
    });
  }
};

export const adminResetPassword = async (req, res) => {
  try {
    const { id } = req.params;

    const { newPassword } = req.body;

    if (!newPassword) {
      return res.status(400).json({
        error: "Nueva contraseña requerida",
      });
    }

    const hashed = await hashPassword(newPassword);

    const user = await resetUserPassword(
      id,

      hashed,
    );

    res.json({
      message: "Contraseña reseteada",

      user,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      error: "Error reseteando contraseña",
    });
  }
};

export const changePassword = async (req, res) => {
  try {
    const userId = req.usuario.id;

    const {
      currentPassword,

      newPassword,
    } = req.body;

    const user = await obtenerUsuarioPorEmail(req.usuario.email);

    const validPassword = await comparePassword(
      currentPassword,

      user.password,
    );

    if (!validPassword) {
      return res.status(401).json({
        error: "Contraseña actual incorrecta",
      });
    }

    const hashed = await hashPassword(newPassword);

    await updatePassword(
      userId,

      hashed,
    );

    res.json({
      message: "Contraseña actualizada",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      error: "Error cambiando contraseña",
    });
  }
};
