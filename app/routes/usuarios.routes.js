import { Router } from "express";
import {
    obtenerUsuarios,
    obtenerUsuarioPorId,
    crearUsuario,
    actualizarUsuario,
    reemplazarUsuario,
    eliminarUsuario
} from "../controllers/usuarios.controllers.js";
import { verificarToken } from "../middlewares/auth.middleware.js";

const route = Router();

// Proteger todas las rutas de /api/usuarios con el middleware de autenticación por Token
route.use(verificarToken);

// Definir las rutas CRUD para /api/usuarios
route.get("/", obtenerUsuarios);
route.get("/:id", obtenerUsuarioPorId);
route.post("/", crearUsuario);
route.patch("/:id", actualizarUsuario);
route.put("/:id", reemplazarUsuario);
route.delete("/:id", eliminarUsuario);

export default route;
