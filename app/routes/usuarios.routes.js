import { Router } from "express";
import {
    obtenerUsuarios,
    obtenerUsuarioPorId,
    crearUsuario,
    actualizarUsuario,
    eliminarUsuario
} from "../controllers/usuarios.controllers.js";

const route = Router();

// Definir las rutas CRUD para /api/usuarios
route.get("/", obtenerUsuarios);
route.get("/:id", obtenerUsuarioPorId);
route.post("/", crearUsuario);
route.patch("/:id", actualizarUsuario);
route.delete("/:id", eliminarUsuario);

export default route;
