// данные для запроса
import { renderTrailer, closeTrailerByEsc } from './trailer';
import { movieLocalStorage } from '../local-storage/local-storage.js';
import { modalSettings } from './modalSettings.js';

const BASE_URL = 'https://api.themoviedb.org/3/movie/';
const apiKey = 'f42f2f62d598d39d316744d8859de3e9';

// общие данные
const galleryItem = document.querySelector('.gallery-js');

// данные для действий с модалкой
const closeModalMovieBtn = document.querySelector('.btn-close-js');
const backdrop = document.querySelector('.backdrop');
const modal = document.querySelector('.modal-movie-detail');

// елементы для создания разметки
const about = document.querySelector('.about-desc');
const title = document.querySelector('.movie-title');
const posterImg = document.querySelector('.thumb-movie-poster');

// buttons functionality

let selectedMovie = { id: 0 };
let modalButtonsContainer = document.querySelector('.movie-btn-container');
export let buttonAddWatch = modalButtonsContainer.children[0];
export let buttonAddQueue = modalButtonsContainer.children[1];

buttonAddWatch.addEventListener('click', event => {
  if (movieLocalStorage.watchedExists(selectedMovie.id)) {
    movieLocalStorage.removeWatched(selectedMovie.id);
  } else {
    movieLocalStorage.addWatched(selectedMovie);
  }
  redrawButtonText();
});

buttonAddQueue.addEventListener('click', event => {
  if (movieLocalStorage.queueExists(selectedMovie.id)) {
    movieLocalStorage.removeQueue(selectedMovie.id);
  } else {
    movieLocalStorage.addQueue(selectedMovie);
  }
  redrawButtonText();
});

//получаем ИД фильма
function getId(evt) {
  if (evt.target.offsetParent.nodeName !== 'LI') {
    return;
  }
  return evt.target.offsetParent.dataset.id;
}

//открытые-рендер модалки
galleryItem.addEventListener('click', openModal);
async function openModal(evt) {
  let movieId = getId(evt);
  if (!movieId) {
    return;
  }

  document.body.style.maxHeight = '100vh';
  document.body.style.overflow = 'hidden';

  backdrop.classList.toggle('modal—movie-is-hidden'); //меняет видимость модалки

  selectedMovie = await movieDatabaseApi(movieId); //отправляет запрос по ИД для получения данных о фильме
  createMarkup(selectedMovie);

  await renderTrailer(movieId);

  document.addEventListener('keydown', checkClick);
  document.addEventListener('click', checkClick);
  closeModalMovieBtn.addEventListener('click', checkClickBtn);
}

async function movieDatabaseApi(movieId) {
  try {
    const response = await fetch(`${BASE_URL}${movieId}?api_key=${apiKey}`);
    if (!response.ok) {
      throw new Error('RESP NOT OK!');
    }
    let data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}
const renderDetailInfo = document.querySelector('.render-detail-info');
function createMarkup(data) {
  posterImg.innerHTML = `
        <picture>
          <source srcset="https://image.tmdb.org/t/p/w500${data.poster_path}" media="(min-width: 1280px)" />
          <source srcset="https://image.tmdb.org/t/p/w300${data.poster_path}" media="(max-width: 1279px)" />

          <img src="https://image.tmdb.org/t/p/w154${data.poster_path}" alt="poster for movie" />
        </picture>

        <button class="btn-trailer">
        <svg
          class="btn-trailer__svg"
          width="68"
          height="48"
          viewBox="0 0 68 48"
        >
          <path
            class="btn-trailer__path"
            d="M66.52,7.74c-0.78-2.93-2.49-5.41-5.42-6.19C55.79,.13,34,0,34,0S12.21,.13,6.9,1.55 C3.97,2.33,2.27,4.81,1.48,7.74C0.06,13.05,0,24,0,24s0.06,10.95,1.48,16.26c0.78,2.93,2.49,5.41,5.42,6.19 C12.21,47.87,34,48,34,48s21.79-0.13,27.1-1.55c2.93-0.78,4.64-3.26,5.42-6.19C67.94,34.95,68,24,68,24S67.94,13.05,66.52,7.74z"
            fill="#212121"
          ></path>
          <path d="M 45,24 27,14 27,34" fill="#fff"></path>
        </svg>
        </button>
        `;

  title.innerHTML = `${data.title}`;

  const genresArr = data.genres;
  const genres = genresArr.map(genre => genre.name).join(', ');

  renderDetailInfo.innerHTML = `<table class="detail-info-movie">
              <tr>
                <td class="category-item">Vote / Votes</td>
                <td><span class="vote">${data.vote_average}</span> / <span class="votes">${data.vote_count}</span></td>
              </tr>
              <tr>
                <td class="category-item ">Popularity</td>
                <td >${data.popularity}</td>
              </tr>
              <tr>
                <td class="category-item ">Original Title</td>
                <td>${data.original_title}</td>
              </tr>
              <tr>
                <td class="category-item ">Genre</td>
                <td>${genres}</td>
              </tr>
            </table>`;

  about.innerHTML = `<p class="about-desc">
        ${data.overview}
      </p>`;

  redrawButtonText(data.id);
}

export function redrawButtonText() {
  let isWatched = movieLocalStorage.watchedExists(selectedMovie.id);
  let isQueue = movieLocalStorage.queueExists(selectedMovie.id);
  
  // config 
  const settings = modalSettings.buttons;

  // reset attributes
  buttonAddQueue.removeAttribute(settings.disableAttribute);
  buttonAddWatch.removeAttribute(settings.disableAttribute);

  // button watched
  buttonAddWatch.textContent = settings.watched.getText(isWatched);
  buttonAddWatch.classList.toggle(settings.activeClass, isWatched);
  if(isWatched){
    buttonAddQueue.setAttribute(settings.disableAttribute, 1);
  }
  
  // button queue
  buttonAddQueue.textContent = modalSettings.buttons.queue.getText(isQueue);
  buttonAddQueue.classList.toggle(settings.activeClass, isQueue);
  if(isQueue){
    buttonAddWatch.setAttribute(settings.disableAttribute, 1);
  }
}

//закрытие модалки и удаление слушателей
function checkClickBtn() {
  backdrop.classList.toggle('modal—movie-is-hidden');
  removeEventListener();
}

function checkClick(evt) {
  if (evt.target.className === 'backdrop') {
    backdrop.classList.toggle('modal—movie-is-hidden');
    removeEventListener();
    return;
  }
  // console.log(evt.code);
  if (evt.code === 'Escape') {
    backdrop.classList.toggle('modal—movie-is-hidden');
    removeEventListener();
  }
}

function removeEventListener() {
  document.removeEventListener('keydown', checkClick);
  document.removeEventListener('click', checkClick);
  closeModalMovieBtn.removeEventListener('click', checkClickBtn);

  document.body.style.maxHeight = '';
  document.body.style.overflow = '';
}
