import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// Obtener la ruta del archivo y directorio actual para ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Determinar qué archivo .env cargar según el entorno actual (por defecto developer)
const envFile = process.env.NODE_ENV ? `${process.env.NODE_ENV}.env` : "developer.env";

// Cargar la configuración desde el archivo correspondiente (.env)
dotenv.config({
    path: path.resolve(path.join(__dirname, envFile))
});

// Configuración general del sistema
const config = {
    port: process.env.PORT || 3000,
    db: {
        user: process.env.DB_USER || "root",
        password: process.env.DB_PASSWORD || "",
        host: process.env.DB_HOST || "localhost",
        port: process.env.DB_PORT || 3306,
        database: process.env.DB_NAME || "foodexpressdb"
    },
    jwt: {
        secret: process.env.JWT_SECRET || "secreto_super_seguro_foodexpress",
        expiresIn: process.env.JWT_EXPIRES_IN || "2h"
    }
};

export default config;
