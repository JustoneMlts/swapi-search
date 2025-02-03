import Hapi from '@hapi/hapi';
import { searchDataController } from './controllers/searchController';

console.log("ici")

const server = Hapi.server({
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
  handler: searchDataController.search,  
});

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
