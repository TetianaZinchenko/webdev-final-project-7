//FT-10 Реалізувати пошук та відображення фільмів за ключовим словом
import { apiService, apiGenres } from '../api/apiSearchMovies';

const searchForm = document.querySelector('.search-form');
const createGallery = document.querySelector('.gallery-list');
const span = document.querySelector('.error-js');

searchForm.addEventListener('submit', onSearch);
// searchForm.addEventListener('input', inputValue);

let page = 1;
let genres = [];

apiGenres()
  .then(data => {
    genres = data;
  })
  .catch(err => console.log(err));

// function inputValue(event) {
//   const searchValue = event.target.value;
//   if (!searchValue) {
//     createGallery.innerHTML = '';
//     return;
//   }
// }

function onSearch(event) {
  event.preventDefault();
  // searchQuery = event.target.searchQuery.value;
  searchQuery = searchForm.searchQuery.value.trim();
  page = 1;

  if (!searchQuery) {
    // return (createGallery.innerHTML = '');
    span.insertAdjacentHTML(
      'beforeend',
      `Search result not successful. Enter the correct movie name and`
    );
    setTimeout(() => {
      span.textContent = ' ';
      event.target.reset();
    }, 1500);
    return;
  }

  apiService(searchQuery, page).then(data => {
    if (!data.results.length) {
      span.insertAdjacentHTML(
        'beforeend',
        `Search result not successful. Enter the correct movie name and`
      );
      setTimeout(() => {
        span.textContent = ' ';
        event.target.reset();
      }, 1500);
      return;
    } else {
      createGallery.innerHTML = '';
      createGallery.insertAdjacentHTML(
        'beforeend',
        data.results.map(element => createMarkup(element)).join('')
      );
    }
  });
}

function createMarkup({
  poster_path,
  title,
  genre_ids,
  id,
  release_date,
  vote_average,
}) {
  let genresName = [];
  for (let genre_id of genre_ids) {
    let reqGenre = genres.find(genre => genre.id === genre_id);
    genresName.push(reqGenre.name);
  }
  if (!genresName.length) {
    genresName = 'No genre';
  } else if (genresName.length > 2) {
    genresName = genresName.slice(0, 1);
  }
  return `<li class="gallery-list__item" data-id="${id}">
    <div class="gallery-thumb">
        <picture>
        <source srcset="https://image.tmdb.org/t/p/w500${poster_path}" media="(min-width: 1280px)" />
        <source srcset="https://image.tmdb.org/t/p/w300${poster_path}" media="(min-width: 768px)" />
        <source srcset="https://image.tmdb.org/t/p/w185${poster_path}" media="(max-width: 767px)" />
        <img class="gallery-img" src="https://image.tmdb.org/t/p/w154${poster_path}" alt="no poster" style="text-align: left; color: #545454; font-size: 22px;"/>
        </picture>
    </div>
    <div class="movie-info">
        <h2 class="movie-info__name">${title}</h2>
        <p class="movie-info__about">
        ${genresName} | ${new Date(
    release_date
  ).getFullYear()} <span class="movie-info__rate">${vote_average.toFixed(
    1
  )}</span>
        </p>
    </div>
    </li>`;
}
