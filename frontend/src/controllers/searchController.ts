import axios from 'axios';

require('dotenv').config();

export const searchApi = async (query: string, type?: string) => {
  const API_URL = process.env.REACT_APP_BASE_URL;

  try {
    const response = await axios.get(`${API_URL}/search`, {
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
