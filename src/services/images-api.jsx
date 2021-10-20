const API_KEY = '23027480-c70d45ac3781d0e477b4a7117';
const BASE_URL = 'https://pixabay.com/api/';

function fetchImages(query, page) {
  const url = `${BASE_URL}?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`;
  return fetch(url).then(response => response.json());
}

const api = { fetchImages };

export default api;

// .then(response => {
//     if (response.ok) {
//         return response.json();
//     }
//     return Promise.reject(new Error(`Reload your page`))
// })
