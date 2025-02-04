import { Request, ResponseToolkit } from "@hapi/hapi";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const SECRET_KEY: string = process.env.JWT_SECRET || "supersecretkey";

export const authController = {
  login: async (request: Request, h: ResponseToolkit) => {
    const { username, password } = request.payload as { username: string; password: string };
    if (username !== "Luke" || password !== "DadSucks") {
      return h.response({ error: "Identifiants incorrects" }).code(401);
    }

    const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: "1h" });

    return h.response({ message: "Connexion réussie", token }).code(200);
  },

  validateToken: async (request: Request, h: ResponseToolkit) => {
    const authHeader = request.headers.authorization;

    if (!authHeader) {
      return h.response({ error: "Token manquant" }).code(401);
    }

    const token = authHeader.split(" ")[1];

    try {
      const decoded = jwt.verify(token, SECRET_KEY) as { username: string };
      return h.response({ message: "Token valide", user: decoded }).code(200);
    } catch (err) {
      return h.response({ error: "Token invalide" }).code(403);
    }
  },
};
