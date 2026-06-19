import { createPool } from "mysql2/promise";
import config from "../enviroments/index.js";

// ==============================================================
// CONFIGURACIÓN DE CONEXIÓN A MYSQL (Para uso real futuro)
// ==============================================================
// Esta clase inicializa el pool de conexiones usando los datos
// de configuración cargados desde el archivo .env correspondiente.

export const pool = createPool({
    user: config.db.user,
    password: config.db.password,
    host: config.db.host,
    port: config.db.port,
    database: config.db.database
});

// Nota: Puedes importar "pool" en tus controladores para realizar consultas
// reales a la base de datos MySQL cuando desees migrar desde la simulación JSON.
