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
exports.searchDataController = void 0;
const axios_1 = __importDefault(require("axios"));
const searchSWAPI = (query, type) => __awaiter(void 0, void 0, void 0, function* () {
    const url = `https://swapi.dev/api/`;
    const categories = ['people', 'planets', 'films', 'species', 'starships', 'vehicles'];
    const results = {};
    try {
        if (type && categories.includes(type)) {
            const response = yield axios_1.default.get(`${url}${type}/?search=${query}`);
            results[type] = response.data.results;
        }
        else {
            for (const category of categories) {
                const response = yield axios_1.default.get(`${url}${category}/?search=${query}`);
                if (response.data.results.length > 0) {
                    results[category] = response.data.results;
                }
            }
        }
        return results;
    }
    catch (error) {
        throw new Error('Erreur lors de la récupération des données de SWAPI');
    }
});
exports.searchDataController = {
    search: (request, h) => __awaiter(void 0, void 0, void 0, function* () {
        const { q: query, type } = request.query;
        if (!query) {
            return h.response({ error: 'Aucun terme de recherche fourni' }).code(400);
        }
        try {
            const results = yield searchSWAPI(query, type);
            return h.response(results).code(200);
        }
        catch (error) {
            return h.response({ error: error.message }).code(500);
        }
    }),
};
