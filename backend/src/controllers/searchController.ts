import axios from 'axios';

const searchSWAPI = async (query: string, type: string | undefined) => {
  const url = `https://swapi.dev/api/`;

  const categories = ['people', 'planets', 'films', 'species', 'starships', 'vehicles'];
  const results: { [key: string]: any[] } = {};

  try {
    if (type && categories.includes(type)) {
      const response = await axios.get(`${url}${type}/?search=${query}`);
      results[type] = response.data.results;
    } else {
      for (const category of categories) {
        const response = await axios.get(`${url}${category}/?search=${query}`);
        if (response.data.results.length > 0) {
          results[category] = response.data.results;
        }
      }
    }

    return results;
  } catch (error) {
    throw new Error('Erreur lors de la récupération des données de SWAPI');
  }
};

export const searchDataController = {
  search: async (request: any, h: any) => {
    const { q: query, type } = request.query;

    if (!query) {
      return h.response({ error: 'Aucun terme de recherche fourni' }).code(400);
    }

    try {
      const results = await searchSWAPI(query, type);  
      return h.response(results).code(200);  
    } catch (error: any) {
      return h.response({ error: error.message }).code(500);  
    }
  }
};
