import Hapi from "@hapi/hapi";
import dotenv from "dotenv";

// Charger les variables d'environnement depuis `.env`
dotenv.config();

const init = async () => {
    const server = Hapi.server({
        port: process.env.PORT || 3000, // Utilise la variable d'env PORT ou 3000 par défaut
        host: "localhost"
    });

    // Route de test
    server.route({
        method: "GET",
        path: "/api",
        handler: (request, h) => {
            return h.response({ message: "Server is running 🚀" }).code(200);
        }
    });

    // Démarrer le serveur
    await server.start();
    console.log(`🚀 Server running on ${server.info.uri}`);
};

// Gestion des erreurs au démarrage
process.on("unhandledRejection", (err) => {
    console.error("Unhandled error:", err);
    process.exit(1);
});

// Lancer le serveur
init();
