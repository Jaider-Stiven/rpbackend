import jwt from "jsonwebtoken";
import config from "../config/enviroments/index.js";

/**
 * Middleware para validar el token JWT en las solicitudes protegidas.
 * Si no se incluye el encabezado Authorization o el token es inválido,
 * devuelve un código de estado 401 Unauthorized.
 */
export const verificarToken = (req, res, next) => {
    try {
        const authHeader = req.headers["authorization"] || req.headers["Authorization"];

        // 1. Validar si el encabezado Authorization fue enviado
        if (!authHeader) {
            return res.status(401).json({
                error: "Acceso denegado. No se proporcionó el token de autenticación (Header Authorization requerido)."
            });
        }

        // 2. Extraer el token si viene en formato "Bearer <token>" o token plano
        const token = authHeader.startsWith("Bearer ")
            ? authHeader.slice(7).trim()
            : authHeader.trim();

        if (!token) {
            return res.status(401).json({
                error: "Acceso denegado. Formato de token inválido o token vacío."
            });
        }

        // 3. Verificar la validez del token con la clave secreta
        const decoded = jwt.verify(token, config.jwt.secret);

        // Adjuntar los datos decodificados del usuario en la solicitud
        req.usuario = decoded;

        // Permitir el paso al siguiente controlador
        next();
    } catch (error) {
        return res.status(401).json({
            error: "Acceso denegado. Token inválido o expirado: " + error.message
        });
    }
};
