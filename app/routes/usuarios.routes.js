import { Router } from "express";
import {
    obtenerUsuarios,
    obtenerUsuarioPorId,
    crearUsuario,
    actualizarUsuario,
    reemplazarUsuario,
    eliminarUsuario
} from "../controllers/usuarios.controllers.js";

const route = Router();

// Definir las rutas CRUD para /api/usuarios
route.get("/", obtenerUsuarios);
route.get("/:id", obtenerUsuarioPorId);
route.post("/", crearUsuario);
route.patch("/:id", actualizarUsuario);
route.put("/:id", reemplazarUsuario);
route.delete("/:id", eliminarUsuario);

export default route;
