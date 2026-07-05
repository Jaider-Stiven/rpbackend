import { pool } from "../config/db/basedatos.js";

// ==========================================
// CONTROLADOR: REGISTRO DE USUARIOS (MYSQL)
// ==========================================
/**
 * Registra un nuevo usuario en la base de datos MySQL 'foodexpressdb'.
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

        // 2. Verificar si el usuario ya está registrado en la base de datos
        // Ejecutamos una consulta SELECT buscando coincidencia del nombre de usuario
        const [usuariosExistentes] = await pool.query(
            "SELECT * FROM usuarios WHERE usuario = ?",
            [usuario.trim()]
        );

        if (usuariosExistentes.length > 0) {
            return res.status(400).json({
                error: "Error: El nombre de usuario ya está registrado en FoodExpress."
            });
        }

        // 3. Registrar el nuevo usuario en MySQL
        // Nota: La columna en tu phpMyAdmin se llama 'contraseña' (con ñ)
        const [result] = await pool.query(
            "INSERT INTO usuarios (usuario, contraseña) VALUES (?, ?)",
            [usuario.trim(), contrasena]
        );

        // 4. Retornar mensaje de éxito de manera satisfactoria
        return res.status(201).json({
            mensaje: "Usuario registrado de manera satisfactoria en FoodExpress",
            usuario: usuario.trim()
        });

    } catch (error) {
        return res.status(500).json({
            error: "Error interno del servidor al registrar el usuario: " + error.message
        });
    }
};


// ==========================================
// CONTROLADOR: INICIO DE SESIÓN (LOGIN MYSQL)
// ==========================================
/**
 * Autentica a un cliente de FoodExpress utilizando la base de datos MySQL.
 * POST /api/login
 */
export const loginUsuario = async (req, res) => {
    try {
        // Acepta tanto "usuario" / "contraseña" como "username" / "password"
        const usuario = req.body.usuario || req.body.username;
        const contrasena = req.body.contraseña || req.body.contrasena || req.body.password;

        // 1. Validar que no se envíen campos vacíos
        if (!usuario || !contrasena) {
            return res.status(400).json({
                error: "Debe ingresar usuario y contraseña para iniciar sesión."
            });
        }

        // 2. Buscar al usuario y verificar credenciales directamente en MySQL
        // Hacemos un SELECT comparando el usuario y la contraseña
        const [rows] = await pool.query(
            "SELECT * FROM usuarios WHERE usuario = ? AND contraseña = ?",
            [usuario.trim(), contrasena]
        );

        // 3. Si no hay registros coincidentes, la autenticación falló
        if (rows.length === 0) {
            // Requisito del caso: "en caso contrario, debe devolver error en la autenticación."
            return res.status(401).json({
                error: "error en la autenticación"
            });
        }

        // 4. Si coincide, la autenticación es correcta
        // Requisito del caso: "si la autenticación es correcta saldrá un mensaje de autenticación satisfactoria"
        return res.status(200).json({
            mensaje: "autenticación satisfactoria",
            usuario: rows[0].usuario
        });

    } catch (error) {
        return res.status(500).json({
            error: "Error interno del servidor al iniciar sesión: " + error.message
        });
    }
};
