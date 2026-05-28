import express from "express";
import {
  registrarUsuario,
  login,
  perfil,
  getUserStats,
  changePassword,
} from "../controllers/user.controller.js";
import { verificarToken } from "../middlewares/auth.middleware.js";

const router = express.Router();

// Ruta para registrar un nuevo usuario
router.post("/register", registrarUsuario);

// Ruta para iniciar sesión
router.post("/login", login);

// Ruta protegida para obtener el perfil del usuario
router.get("/perfil", verificarToken, perfil);

router.get(
  "/stats",

  verificarToken,

  getUserStats,
);
router.put(
  "/change-password",

  verificarToken,

  changePassword,
);

export default router;
