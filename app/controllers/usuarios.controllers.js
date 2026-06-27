import { pool } from "../config/db/basedatos.js";

// ==========================================
// 1. GET: OBTENER TODOS LOS USUARIOS
// ==========================================
export const obtenerUsuarios = async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT id, usuario FROM usuarios");
        return res.status(200).json(rows);
    } catch (error) {
        return res.status(500).json({
            error: "Error al obtener la lista de usuarios: " + error.message
        });
    }
};

// ==========================================
// 2. GET: OBTENER UN USUARIO POR ID
// ==========================================
export const obtenerUsuarioPorId = async (req, res) => {
    try {
        const { id } = req.params;
        const [rows] = await pool.query("SELECT id, usuario FROM usuarios WHERE id = ?", [id]);
        
        if (rows.length === 0) {
            return res.status(404).json({
                error: "Usuario no encontrado"
            });
        }
        
        return res.status(200).json(rows[0]);
    } catch (error) {
        return res.status(500).json({
            error: "Error al obtener el usuario: " + error.message
        });
    }
};

// ==========================================
// 3. POST: CREAR UN NUEVO USUARIO
// ==========================================
export const crearUsuario = async (req, res) => {
    try {
        const usuario = req.body.usuario || req.body.username;
        const contrasena = req.body.contraseña || req.body.contrasena || req.body.password;

        if (!usuario || !contrasena) {
            return res.status(400).json({
                error: "El usuario y la contraseña son obligatorios."
            });
        }

        // Verificar duplicados
        const [existente] = await pool.query("SELECT * FROM usuarios WHERE usuario = ?", [usuario.trim()]);
        if (existente.length > 0) {
            return res.status(400).json({
                error: "El nombre de usuario ya está registrado."
            });
        }

        // Insertar usuario
        const [result] = await pool.query(
            "INSERT INTO usuarios (usuario, contraseña) VALUES (?, ?)",
            [usuario.trim(), contrasena]
        );

        return res.status(201).json({
            mensaje: "Usuario creado exitosamente",
            id: result.insertId,
            usuario: usuario.trim()
        });
    } catch (error) {
        return res.status(500).json({
            error: "Error al crear el usuario: " + error.message
        });
    }
};

// ==========================================
// 4. PATCH: ACTUALIZAR UN USUARIO EXISTENTE
// ==========================================
export const actualizarUsuario = async (req, res) => {
    try {
        const { id } = req.params;
        const usuario = req.body.usuario || req.body.username;
        const contrasena = req.body.contraseña || req.body.contrasena || req.body.password;

        if (!usuario && !contrasena) {
            return res.status(400).json({
                error: "Debe proporcionar al menos un campo a actualizar (usuario o contraseña)."
            });
        }

        // Verificar si el usuario existe
        const [rows] = await pool.query("SELECT * FROM usuarios WHERE id = ?", [id]);
        if (rows.length === 0) {
            return res.status(404).json({
                error: "Usuario no encontrado"
            });
        }

        // Construir la consulta de actualización dinámicamente
        const fieldsToUpdate = [];
        const values = [];

        if (usuario) {
            // Verificar si el nuevo nombre de usuario ya está tomado por otro usuario
            const [duplicado] = await pool.query("SELECT * FROM usuarios WHERE usuario = ? AND id != ?", [usuario.trim(), id]);
            if (duplicado.length > 0) {
                return res.status(400).json({
                    error: "El nombre de usuario ya está en uso."
                });
            }
            fieldsToUpdate.push("usuario = ?");
            values.push(usuario.trim());
        }

        if (contrasena) {
            fieldsToUpdate.push("contraseña = ?");
            values.push(contrasena);
        }

        // Agregar ID al final de los parámetros
        values.push(id);

        const sql = `UPDATE usuarios SET ${fieldsToUpdate.join(", ")} WHERE id = ?`;
        await pool.query(sql, values);

        return res.status(200).json({
            mensaje: "Usuario actualizado exitosamente"
        });
    } catch (error) {
        return res.status(500).json({
            error: "Error al actualizar el usuario: " + error.message
        });
    }
};

// ==========================================
// 5. DELETE: ELIMINAR UN USUARIO
// ==========================================
export const eliminarUsuario = async (req, res) => {
    try {
        const { id } = req.params;

        // Verificar si el usuario existe
        const [rows] = await pool.query("SELECT * FROM usuarios WHERE id = ?", [id]);
        if (rows.length === 0) {
            return res.status(404).json({
                error: "Usuario no encontrado"
            });
        }

        // Eliminar usuario
        await pool.query("DELETE FROM usuarios WHERE id = ?", [id]);

        return res.status(200).json({
            mensaje: "Usuario eliminado exitosamente"
        });
    } catch (error) {
        return res.status(500).json({
            error: "Error al eliminar el usuario: " + error.message
        });
    }
};
