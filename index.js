import app from "./app/server.js";

// Escuchar en el puerto configurado e imprimir mensaje por consola
app.listen(app.get("port"), () => {
    console.log(`[Servidor FoodExpress] Corriendo en el puerto ${app.get("port")}`);
});
