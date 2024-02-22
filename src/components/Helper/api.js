import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';

export const getGalleryItemsAPI = async (query, page) => {
  let queries = {
    key: '40976601-7e2fe02ca8efc6be3b00881e0',
    per_page: 12,
    q: query,
    page: page,
  };
  const { data } = await axios('', { params: queries });
  return data;
};
