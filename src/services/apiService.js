const API_KEY = 'twetArxt5425AgesR'; // IMPORTANT: DO NOT DO THIS IN PRODUCTION!
const BASE_URL = 'https://dbatx57diay0.cloudfront.net'; //AWS CloudFront for backend

export const fetchStockData = async (ticker) => {
  try {
    const response = await fetch(`${BASE_URL}/data/${ticker}?api_key=${API_KEY}`);
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || 'Failed to fetch stock data.');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching stock data:', error);
    throw error;
  }
};

export const fetchStockList = async () => {
  try {
    const response = await fetch(`${BASE_URL}/stock?api_key=${API_KEY}`);
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || 'Failed to fetch stock list.');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching stock list:', error);
    throw error;
  }
};

export const fetchRecommendations = async () => {
  try {
    const response = await fetch(`${BASE_URL}/recommendations?api_key=${API_KEY}`);
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || 'Failed to recommendations.');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching recommendations: ', error);
    throw error;
  }
};