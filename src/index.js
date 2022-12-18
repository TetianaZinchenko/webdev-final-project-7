import './js/render/renderPopularMovies';

import './js/modal/team-modal';

import './js/modal/modal-for-movie';

//FT-10 Реалізувати пошук та відображення фільмів за ключовим словом
import apiService from './api-service.js';
import Notiflix from 'notiflix';

const searchForm = document.querySelector('.search-form');
const createGallery = document.querySelector('.gallery');
console.log(createGallery);
console.log(searchForm);

searchForm.addEventListener('submit', onSearch);
searchForm.addEventListener('input', inputValue);

let searchQuery = '';
let page = 1;

function inputValue(event) {
  const searchValue = event.target.value;
  if (!searchValue) {
    createGallery.innerHTML = '';
    return;
  }
}

function onSearch(event) {
  event.preventDefault();
  searchQuery = event.target.searchQuery.value;
  page = 1;
  apiService(searchQuery, page).then(data => console.log(data));

  apiService(searchQuery, page).then(data => {
    if (!data.results.length) {
      Notiflix.Notify.failure(
        `Sorry, there are no movies matching your search query. Please try again.`
      );
    } else {
      createGallery.innerHTML = '';
      createGallery.insertAdjacentHTML('beforeend', createMarkup(data.results));
    }
  });
}

function createMarkup(arr) {
  return arr
    .map(
      ({
        poster_path,
        original_title,
        genre_name,
        release_date,
      }) => `<div class="video-card" >
    <div class="thumb" width>
        <img src="https://image.tmdb.org/t/p/original${poster_path}" alt="no poster"/>
    </div>
    <div class="info">
        <p class="info-item">
            <b>${original_title}</b>
        </p>
        <p class="info-item">
            <b>${genre_name}</b>
            <b>${new Date(release_date).getFullYear()}</b>
        </p>
    </div>
</div>`
    )
    .join('');
}
