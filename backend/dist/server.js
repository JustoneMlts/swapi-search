"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const hapi_1 = __importDefault(require("@hapi/hapi"));
const dotenv_1 = __importDefault(require("dotenv"));
// Charger les variables d'environnement depuis `.env`
dotenv_1.default.config();
const init = () => __awaiter(void 0, void 0, void 0, function* () {
    // Création du serveur Hapi
    const server = hapi_1.default.server({
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
    yield server.start();
    console.log(`🚀 Server running on ${server.info.uri}`);
});
// Gestion des erreurs au démarrage
process.on("unhandledRejection", (err) => {
    console.error("Unhandled error:", err);
    process.exit(1);
});
// Lancer le serveur
init();
