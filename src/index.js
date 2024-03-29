import { perPage } from './pixabay-api';
import { fetchPhotos } from './pixabay-api';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const searchField = document.getElementById('search-form');
const gallery = document.querySelector('.gallery');
const loadMore = document.querySelector('.load-more');
searchField.addEventListener('submit', handleSearch);
loadMore.addEventListener('click', handleSearchMore);
let currentRequest;
let currentPage;
let lightbox = new SimpleLightbox('.gallery a');

async function handleSearch(event) {
  event.preventDefault();
  currentRequest = event.target.elements.searchQuery.value;

  if (!currentRequest || currentRequest.trim() === '') {
    Notify.failure('Please enter a name of image.');
    searchField.reset();
    return;
  }
  currentPage = 1;
  try {
    const response = await fetchPhotos(currentRequest);

    if (response.hits.length === 0) {
      Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      gallery.innerHTML = '';
      hideButton();
      return;
    }
    const markup = markupPhotos(response.hits);

    if (currentPage * response.hits.length < response.totalHits) {
      showButton();
    } else {
      hideButton();
      Notify.info("We're sorry, but you've reached the end of search results.");
    }

    Notify.info(`Hooray! We found ${response.totalHits} images.`);
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
    gallery.innerHTML = markup;
    lightbox.refresh();
  } catch (error) {
    console.log('error', error);
  }
}

async function handleSearchMore() {
  try {
    currentPage += 1;
    const response = await fetchPhotos(currentRequest, currentPage);
    const markup = markupPhotos(response.hits);
    gallery.insertAdjacentHTML('beforeend', markup);

    if (response.hits.length < perPage) {
      hideButton();
      Notify.info("We're sorry, but you've reached the end of search results.");
    }

    lightbox.refresh();
    smoothScroll();
  } catch (error) {
    console.log(error);
  }
}

function markupPhotos(photos) {
  return photos
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
}

function showButton() {
  loadMore.classList.remove('hide');
}

function hideButton() {
  loadMore.classList.add('hide');
}

function smoothScroll() {
  const { height: cardHeight } = document
    .querySelector('.gallery')
    .firstElementChild.getBoundingClientRect();
  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}
