import { fetchPhotos } from './pixabay-api';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const searchField = document.getElementById('search-form');
const gallery = document.querySelector('.gallery');
searchField.addEventListener('submit', handleSearch);

function handleSearch(event) {
  event.preventDefault();
  const request = event.target.elements.searchQuery.value;
  fetchPhotos(request)
    .then(response => {
      markupPhotos(response.hits);
    })
    .catch(error => {
      console.log('error', error);
    });
}

function markupPhotos(photos) {
  const markup = photos
    .map(
      photo => `<div class="photo-card">
      <a href="${photo.largeImageURL}">
    <img class="img-item" src="${photo.webformatURL}" alt="${photo.tags}" loading="lazy" /></a>
    <div class="info">
          <p class="info-item"><b>Likes:</b> ${photo.likes}</p>
          <p class="info-item"><b>Views:</b> ${photo.views}</p>
          <p class="info-item"><b>Comments:</b> ${photo.comments}</p>
          <p class="info-item"><b>Downloads:</b> ${photo.downloads}</p>
        </div>
  </div>`
    )
    .join('');
  gallery.innerHTML = markup;
}
