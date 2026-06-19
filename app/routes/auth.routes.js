import { Router } from "express";
import { registrarUsuario, loginUsuario } from "../controllers/auth.controllers.js";

const route = Router();

// Definir las rutas de registro y login (estos endpoints seran /api/register y /api/login)
route.post("/register", registrarUsuario);
route.post("/login", loginUsuario);

export default route;
