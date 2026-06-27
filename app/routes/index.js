import { Router } from "express";
import authRoutes from "./auth.routes.js";
import usuariosRoutes from "./usuarios.routes.js";

const route = Router();

// Enrutar todas las peticiones de autenticacion bajo el prefijo "/api"
route.use("/api", authRoutes);
// Enrutar las peticiones CRUD de usuarios bajo el prefijo "/api/usuarios"
route.use("/api/usuarios", usuariosRoutes);

export default route;
