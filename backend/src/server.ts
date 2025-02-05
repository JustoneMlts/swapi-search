import Hapi from '@hapi/hapi';
import { searchDataController } from './controllers/searchController';
import { authController } from './controllers/authController'

const server = Hapi.server({
  port: process.env.PORT || 5000, 
  host: "0.0.0.0",
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
  handler: searchDataController.search,  
});

server.route({
  method: "GET",
  path: "/protected",
  handler: authController.validateToken,
});

server.route({
  method: "POST",
  path: "/login",
  handler: authController.login
})

const start = async () => {
  try {
    await server.start();
    console.log('Server running on %s', server.info.uri);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

start();
