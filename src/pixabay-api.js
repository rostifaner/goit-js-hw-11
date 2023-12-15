import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';
const API_KEY = '41264259-067abafdaae4a687f3d4190c8';

export function fetchPhotos(request) {
  const settings = {
    method: 'GET',
    params: {
      key: API_KEY,
      q: request,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: 'true',
    },
  };
  return axios(settings)
    .then(response => {
      return response.data;
    })
    .catch(error => {
      console.error('Error', error);
    });
}

// var API_KEY = '41264259-067abafdaae4a687f3d4190c8';
// var URL =
//   'https://pixabay.com/api/?key=' +
//   API_KEY +
//   '&q=' +
//   encodeURIComponent('red roses');
// $.getJSON(URL, function (data) {
//   if (parseInt(data.totalHits) > 0)
//     $.each(data.hits, function (i, hit) {
//       console.log(hit.pageURL);
//     });
//   else console.log('No hits');
// });
