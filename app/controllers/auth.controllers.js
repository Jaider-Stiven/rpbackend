import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

// ==========================================
// CONFIGURACIÓN DE LA BASE DE DATOS SIMULADA
// ==========================================
// Usaremos un archivo JSON local 'usuarios.json' dentro de la carpeta config/db.
// Esto permite que el proyecto funcione de inmediato en cualquier computadora
// sin requerir la instalación y configuración previa de un servidor MySQL.

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dbFilePath = path.join(__dirname, "../config/db/usuarios.json");

/**
 * Función auxiliar para leer los usuarios registrados desde el archivo JSON.
 * Si el archivo no existe, lo crea inicializándolo con una lista vacía [].
 */
async function obtenerUsuarios() {
    try {
        await fs.access(dbFilePath);
    } catch {
        // Crear la estructura de directorios y el archivo si no existen
        await fs.mkdir(path.dirname(dbFilePath), { recursive: true });
        await fs.writeFile(dbFilePath, JSON.stringify([]), "utf-8");
    }
    const data = await fs.readFile(dbFilePath, "utf-8");
    return JSON.parse(data);
}

/**
 * Función auxiliar para guardar la lista de usuarios en el archivo JSON.
 */
async function guardarUsuarios(usuarios) {
    await fs.writeFile(dbFilePath, JSON.stringify(usuarios, null, 2), "utf-8");
}


// ==========================================
// CONTROLADOR: REGISTRO DE USUARIOS
// ==========================================
/**
 * Registra un nuevo usuario en el sistema de FoodExpress.
 * POST /api/register
 */
export const registrarUsuario = async (req, res) => {
    try {
        // Acepta tanto "usuario" / "contraseña" (según la evidencia)
        // como "username" / "password" (estándar de API) para mayor flexibilidad.
        const usuario = req.body.usuario || req.body.username;
        const contrasena = req.body.contraseña || req.body.contrasena || req.body.password;

        // 1. Validar que no se envíen campos vacíos
        if (!usuario || !contrasena) {
            return res.status(400).json({
                error: "Error: El usuario y la contraseña son obligatorios para el registro."
            });
        }

        // 2. Obtener los usuarios registrados de la base de datos simulada
        const usuarios = await obtenerUsuarios();

        // 3. Verificar si el usuario ya existe (insensible a mayúsculas/minúsculas)
        const usuarioExiste = usuarios.find(u => u.usuario.toLowerCase() === usuario.toLowerCase());
        if (usuarioExiste) {
            return res.status(400).json({
                error: "Error: El nombre de usuario ya está registrado en FoodExpress."
            });
        }

        // -------------------------------------------------------------
        // GUÍA PARA INTEGRAR CON MYSQL (Igual que en la clase de Hospital):
        // -------------------------------------------------------------
        // Para implementarlo con una base de datos real MySQL, importarías tu "pool":
        // import { pool } from "../config/db/basedatos.js";
        //
        // Y en este bloque ejecutarías:
        // const result = await pool.query(
        //     "INSERT INTO usuarios (usuario, contrasena) VALUES (?, ?)", 
        //     [usuario, contrasena]
        // );
        // -------------------------------------------------------------

        // 4. Crear el nuevo registro del cliente
        const nuevoUsuario = {
            id: usuarios.length + 1,
            usuario: usuario.trim(),
            contrasena: contrasena // Guardada en texto plano para visualización en la entrega académica
        };

        // 5. Guardar en la base de datos simulada
        usuarios.push(nuevoUsuario);
        await guardarUsuarios(usuarios);

        // 6. Retornar mensaje de éxito
        return res.status(201).json({
            mensaje: "Usuario registrado de manera satisfactoria en FoodExpress",
            usuario: nuevoUsuario.usuario
        });

    } catch (error) {
        return res.status(500).json({
            error: "Error interno del servidor al registrar el usuario: " + error.message
        });
    }
};


// ==========================================
// CONTROLADOR: INICIO DE SESIÓN (LOGIN)
// ==========================================
/**
 * Autentica a un cliente de FoodExpress.
 * POST /api/login
 */
export const loginUsuario = async (req, res) => {
    try {
        // Acepta tanto "usuario" / "contraseña" como "username" / "password"
        const usuario = req.body.usuario || req.body.username;
        const contrasena = req.body.contraseña || req.body.contrasena || req.body.password;

        // 1. Validar que no se envíen campos vacíos en el login
        if (!usuario || !contrasena) {
            return res.status(400).json({
                error: "Debe ingresar usuario y contraseña para iniciar sesión."
            });
        }

        // 2. Obtener la lista de usuarios para validar credenciales
        const usuarios = await obtenerUsuarios();

        // 3. Buscar al usuario dentro del listado
        const usuarioEncontrado = usuarios.find(u => u.usuario.toLowerCase() === usuario.trim().toLowerCase());

        // -------------------------------------------------------------
        // GUÍA PARA INTEGRAR CON MYSQL (Igual que en la clase de Hospital):
        // -------------------------------------------------------------
        // Con una base de datos real MySQL, el login se haría así:
        // const [rows] = await pool.query(
        //     "SELECT * FROM usuarios WHERE usuario = ? AND contrasena = ?", 
        //     [usuario, contrasena]
        // );
        // const usuarioEncontrado = rows[0];
        // -------------------------------------------------------------

        // 4. Verificar si el usuario existe y si la contraseña coincide exactamente
        if (!usuarioEncontrado || usuarioEncontrado.contrasena !== contrasena) {
            // Requisito del caso: "en caso contrario, debe devolver error en la autenticación."
            return res.status(401).json({
                error: "error en la autenticación"
            });
        }

        // 5. Autenticación exitosa
        // Requisito del caso: "si la autenticación es correcta saldrá un mensaje de autenticación satisfactoria"
        return res.status(200).json({
            mensaje: "autenticación satisfactoria",
            usuario: usuarioEncontrado.usuario
        });

    } catch (error) {
        return res.status(500).json({
            error: "Error interno del servidor al iniciar sesión: " + error.message
        });
    }
};
