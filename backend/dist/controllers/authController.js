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
exports.authController = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const SECRET_KEY = process.env.JWT_SECRET || "supersecretkey";
exports.authController = {
    login: (request, h) => __awaiter(void 0, void 0, void 0, function* () {
        const { username, password } = request.payload;
        if (username !== "Luke" || password !== "DadSucks") {
            return h.response({ error: "Identifiants incorrects" }).code(401);
        }
        const token = jsonwebtoken_1.default.sign({ username }, SECRET_KEY, { expiresIn: "1h" });
        return h.response({ message: "Connexion réussie", token }).code(200);
    }),
    validateToken: (request, h) => __awaiter(void 0, void 0, void 0, function* () {
        const authHeader = request.headers.authorization;
        if (!authHeader) {
            return h.response({ error: "Token manquant" }).code(401);
        }
        const token = authHeader.split(" ")[1];
        try {
            const decoded = jsonwebtoken_1.default.verify(token, SECRET_KEY);
            return h.response({ message: "Token valide", user: decoded }).code(200);
        }
        catch (err) {
            return h.response({ error: "Token invalide" }).code(403);
        }
    }),
};
