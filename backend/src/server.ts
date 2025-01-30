import Hapi from '@hapi/hapi';
import axios from 'axios';

const server = Hapi.server({
  port: 3000,
  host: 'localhost',
});

const searchSWAPI = async (query: string, category: string) => {
  const url = `https://swapi.dev/api/`;
  try {
    const searchUrl = category ? `${url}${category}/?search=${query}` : `${url}${query}/`;
    
    const response = await axios.get(searchUrl);
    return response.data.results;
  } catch (error) {
    console.error('Erreur SWAPI:', error);
    throw new Error('Erreur lors de la récupération des données de SWAPI');
  }
};

server.route({
  method: 'GET',
  path: '/search',
  handler: async (request, h) => {
    const { q: query, type } = request.query;

    if (!query) {
      return h.response({ error: 'Aucun terme de recherche fourni' }).code(400);
    }

    try {

      const categories = ['people', 'planets', 'films', 'species', 'starships', 'vehicles'];
      
      const results: { [key: string]: any[] } = {};
      
      if (type) {
        results[type] = await searchSWAPI(query, type);
      } else {
        for (const category of categories) {
          const categoryResults = await searchSWAPI(query, category);
          if (categoryResults.length > 0) {
            results[category] = categoryResults;
          }
        }
      }

      return h.response(results).code(200);
    } catch (error: any) {
      return h.response({ error: error.message }).code(500);
    }
  }
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
