import express from "express";
import "dotenv/config";

const app = express();
app.use(express.json());

// Puerto de escucha
const PORT = process.env.PORTSERVIDOR || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});

// Rutas
import userRoutes from "./routes/user.routes.js";
app.use("/api/users", userRoutes);
