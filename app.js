import express from "express";
import "dotenv/config";
import cors from "cors";
import userRoutes from "./routes/user.routes.js";

const app = express();

// Middleware
app.use(express.json());
// Habilitar CORS
app.use(cors());

// Puerto de escucha
const PORT = process.env.PORTSERVIDOR || 3000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});

// Rutas
app.use("/api/users", userRoutes);

// Ruta base
app.get("/", (req, res) => {
  res.send("API funcionando 🚀");
});
