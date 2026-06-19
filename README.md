# FoodExpress - Servicio Web de Autenticación (GA7-220501096-AA5-EV01)

Este proyecto corresponde al desarrollo del backend de autenticación (Registro e Inicio de Sesión) para la plataforma de pedidos de comida a domicilio **FoodExpress**.

El desarrollo adopta la arquitectura modular vista en la clase `hospital/backend` (SENA), estructurando el código de manera limpia, comentada y utilizando herramientas de versionamiento (Git).

---

## 🚀 Características del Proyecto

- **Estructura Modular:** Servidor Express configurado en `app/server.js`, variables de entorno administradas en `app/config/enviroments`, controladores en `app/controllers` y enrutador en `app/routes`.
- **Base de Datos Simulada (JSON):** Por defecto, guarda y lee usuarios de forma inmediata en `app/config/db/usuarios.json`. Esto permite que funcione sin requerir configurar un servidor MySQL local de inmediato.
- **Soporte Completo para MySQL:** Incluye el archivo de conexión `app/config/db/basedatos.js` y guías en los comentarios del controlador para migrar a base de datos real cuando lo desees.
- **Interfaz Web Premium Integrada:** Servidor estático en la raíz `/` con un portal dinámico, glassmorphism en modo oscuro y efectos temáticos de comida para probar el registro y login en tiempo real desde el navegador.

---

## 📂 Estructura de Archivos

```text
proyectofoodend/
├── app/
│   ├── config/
│   │   ├── db/
│   │   │   ├── basedatos.js      # Conexión opcional a MySQL (Pool)
│   │   │   └── usuarios.json     # Base de datos simulada (Autogenerada)
│   │   └── enviroments/
│   │       ├── developer.env     # Variables de desarrollo
│   │       ├── index.js          # Cargador de variables de entorno
│   │       └── production.env    # Variables de producción
│   ├── controllers/
│   │   └── auth.controllers.js   # Lógica de registro y login (Comentada)
│   ├── routes/
│   │   ├── auth.routes.js        # Rutas de autenticación (/api/register, /api/login)
│   │   └── index.js              # Enrutador principal de la app
│   └── server.js                 # Inicialización de Express, CORS y Middlewares
├── .gitignore                    # Reglas de exclusión de Git
├── index.js                      # Punto de entrada (Listen en puerto)
├── package.json                  # Dependencias del proyecto
└── README.md                     # Documentación general
```

---

## 🛠️ Instalación y Uso

### 1. Requisitos Previos
Tener instalado [Node.js](https://nodejs.org/) (versión 16 o superior).

### 2. Instalar Dependencias
Abre una terminal dentro de la carpeta `proyectofoodend` e instala los paquetes necesarios:
```bash
npm install
```

### 3. Ejecutar en Desarrollo
Inicia el servidor usando Nodemon (el cual recargará el servidor automáticamente al detectar cambios):
```bash
npm run dev
```

El servidor imprimirá en consola:
```text
[Servidor FoodExpress] Corriendo en el puerto 3000
```

---

## 🖥️ Interfaz Web de Pruebas (Frontend Separado)

El frontend de pruebas interactivo está alojado en una carpeta separada llamada `proyectofoodfront` con su propio repositorio de Git. Para probar la autenticación de **FoodExpress**:
1. Asegúrate de tener el servidor backend corriendo con `npm run dev` en el puerto 3000.
2. Abre la carpeta `proyectofoodfront`.
3. Abre el archivo `index.html` en tu navegador web preferido (haciendo doble clic en él o sirviéndolo localmente).
4. Podrás interactuar con los formularios de registro y login de forma fluida. Los datos se enviarán a la API local (`http://localhost:3000`) y se almacenarán en `proyectofoodend/app/config/db/usuarios.json`.

---

## 🔌 Documentación de la API

La API cuenta con dos endpoints que reciben peticiones en formato JSON:

### 1. Registro de Usuario
- **Ruta:** `POST /api/register`
- **Cuerpo de la Petición (JSON):**
  ```json
  {
    "usuario": "nuevoCliente",
    "contraseña": "miContraseñaSegura"
  }
  ```
- **Respuesta Exitosa (201 Created):**
  ```json
  {
    "mensaje": "Usuario registrado de manera satisfactoria en FoodExpress",
    "usuario": "nuevoCliente"
  }
  ```

### 2. Inicio de Sesión (Login)
- **Ruta:** `POST /api/login`
- **Cuerpo de la Petición (JSON):**
  ```json
  {
    "usuario": "nuevoCliente",
    "contraseña": "miContraseñaSegura"
  }
  ```
- **Respuesta Exitosa (200 OK):**
  ```json
  {
    "mensaje": "autenticación satisfactoria",
    "usuario": "nuevoCliente"
  }
  ```
- **Respuesta Fallida (401 Unauthorized - Credenciales Incorrectas):**
  ```json
  {
    "error": "error en la autenticación"
  }
  ```

---

## 🔄 Conexión a Base de Datos MySQL Real (Opcional)

Si deseas conectar el proyecto a MySQL:
1. Crea tu base de datos local (ej. `foodexpress`) y agrega una tabla para usuarios:
   ```sql
   CREATE TABLE usuarios (
       id INT AUTO_INCREMENT PRIMARY KEY,
       usuario VARCHAR(100) NOT NULL UNIQUE,
       contrasena VARCHAR(255) NOT NULL
   );
   ```
2. Modifica el archivo `app/config/enviroments/developer.env` con tus datos locales de conexión (usuario, contraseña y base de datos).
3. En el controlador `app/controllers/auth.controllers.js`, desmarca/descomenta el código de MySQL señalado en la guía y comenta el código de almacenamiento JSON local.

---

## 📁 Control de Versiones (Git)

El proyecto se ha desarrollado siguiendo prácticas profesionales de control de versiones. Se utilizaron los siguientes comandos para registrar el progreso:

1. **Inicialización:**
   ```bash
   git init
   ```
2. **Commit Inicial (.gitignore y package.json):**
   ```bash
   git add .gitignore package.json
   git commit -m "chore: setup initial files and gitignore"
   ```
3. **Commit de Variables de Entorno y Configuración de Express:**
   ```bash
   git add app/config/enviroments/ app/server.js index.js
   git commit -m "feat: add environment config and server setup"
   ```
4. **Commit de Enrutadores y Endpoints:**
   ```bash
   git add app/routes/
   git commit -m "feat: implement auth routes"
   ```
5. **Commit de Controladores y Base de Datos:**
   ```bash
   git add app/controllers/ app/config/db/
   git commit -m "feat: implement auth controllers and database config"
   ```
6. **Limpieza del Backend y Desacoplamiento del Frontend:**
   ```bash
   git add -A
   git commit -m "cleanup: remove public frontend folder and static middleware"
   ```
