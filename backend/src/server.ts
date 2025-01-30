import Hapi from '@hapi/hapi';
import { searchDataController } from './controllers/searchController';

const server = Hapi.server({
  port: 3000,
  host: 'localhost',
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
