import { Router } from "express";
import authRoutes from "./auth.routes.js";

const route = Router();

// Enrutar todas las peticiones de autenticacion bajo el prefijo "/api"
route.use("/api", authRoutes);

export default route;
