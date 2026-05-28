import express from "express";
import "dotenv/config";
import cors from "cors";
import userRoutes from "./routes/user.routes.js";
import matchRoutes from "./routes/match.routes.js";
import predictionRoutes from "./routes/prediction.routes.js";
import rankingRoutes from "./routes/ranking.routes.js";
import adminRoutes from "./routes/admin.routes.js";

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

// Rutas de partidos
app.use("/api/matches", matchRoutes);

// Rutas de pronósticos
app.use("/api/predictions", predictionRoutes);

// Rutas de ranking
app.use("/api/ranking", rankingRoutes);

// Rutas de administración
app.use("/api/admin", adminRoutes);

app.use(
  cors({
    origin: "http://localhost:5173", // Reemplaza con la URL de tu frontend
    origin: "https://polla-mundial-2026-74cb.onrender.com",
  }),
);
