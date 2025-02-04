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
const searchController_1 = require("./controllers/searchController");
const authController_1 = require("./controllers/authController");
console.log("ici");
const server = hapi_1.default.server({
    port: 5000,
    host: 'localhost',
    routes: {
        cors: {
            origin: ["*"],
            headers: ["Accept", "Content-Type", "Authorization"],
            additionalHeaders: ["X-Requested-With"],
        },
    },
});
server.route({
    method: 'GET',
    path: '/',
    handler: (request, h) => {
        return 'Hello, world!';
    }
});
server.route({
    method: 'GET',
    path: '/search',
    handler: searchController_1.searchDataController.search,
});
server.route({
    method: "GET",
    path: "/protected",
    handler: authController_1.authController.validateToken,
});
server.route({
    method: "POST",
    path: "/login",
    handler: authController_1.authController.login
});
const start = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield server.start();
        console.log('Server running on %s', server.info.uri);
    }
    catch (err) {
        console.log(err);
        process.exit(1);
    }
});
start();
