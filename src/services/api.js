import axios from 'axios';

export const fetchArticles = async (query) => {
  try {
    const response = await axios.get(`${BASE_URL}?q=${query}&api-key=${API_KEY}`);
    return response.data.response.docs;
  } catch (error) {
    console.error('Error fetching articles:', error);
    return [];
  }
};
