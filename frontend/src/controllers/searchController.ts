import axios from 'axios';

export const searchApi = async (query: string, type?: string) => {
  try {
    const response = await axios.get('http://localhost:5000/search', {
      params: {
        q: query,
        type: type,
      },
    });
    return response.data; 
  } catch (error) {
    console.error('Erreur lors de la recherche :', error);
    throw new Error('Impossible de récupérer les résultats.');
  }
};
