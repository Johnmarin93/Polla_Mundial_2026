import express from "express";
import {
  registrarUsuario,
  login,
  perfil,
} from "../controllers/user.controller.js";
import { verificarToken } from "../middlewares/auth.middleware.js";

const router = express.Router();

// Ruta para registrar un nuevo usuario
router.post("/register", registrarUsuario);

// Ruta para iniciar sesión
router.post("/login", login);

// Ruta protegida para obtener el perfil del usuario
router.get("/perfil", verificarToken, perfil);

export default router;
