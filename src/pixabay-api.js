import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';
const API_KEY = '41264259-067abafdaae4a687f3d4190c8';
export const perPage = 40;
export async function fetchPhotos(request, page = 1) {
  const params = {
    method: 'GET',
    params: {
      key: API_KEY,
      q: request,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: 'true',
      page: page,
      per_page: perPage,
    },
  };
  try {
    const response = await axios(params);
    return response.data;
  } catch (error) {
    console.error('Error', error);
  }
}
