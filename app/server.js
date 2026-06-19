import express from "express";
import cors from "cors";
import config from "./config/enviroments/index.js";
import ruta from "./routes/index.js";

// INICIALIZAR
const app = express();

// CONFIGURACIONES
app.set("port", config.port);

// MIDDLEWARES
app.use(cors()); // Permitir conexiones desde cualquier origen (ej. frontend)
app.use(express.json()); // Permitir que Express entienda el formato JSON
app.use(express.static("public")); // Servir la interfaz web de pruebas en la raiz "/"

// RUTAS
app.use(ruta);

export default app;
