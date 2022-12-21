//FT-10 Реалізувати пошук та відображення фільмів за ключовим словом
import { apiService, apiGenres } from '../api/apiSearchMovies';
// import { onError } from './renderPopularMovies';
import Pagination from 'tui-pagination';

const searchForm = document.querySelector('.search-form');
const createGallery = document.querySelector('.gallery-list');
const spanForm = document.querySelector('.error-js');

searchForm.addEventListener('submit', onSearch);
searchForm.addEventListener('input', inputValue);

let page = 1;
let allGenres = [];

apiGenres()
  .then(data => {
    allGenres = data;
  })
  .catch(err => console.log(err));

function inputValue(event) {
  const searchValue = event.target.value;
  if (!searchValue) {
    createGallery.innerHTML = '';
    return;
  }
}

function onSearch(event) {
  event.preventDefault();
  const searchQuery = event.target.searchQuery.value;
  page = 1;
  // apiService(searchQuery, page).then(data => console.log(data));
  apiService(searchQuery, page).then(data => {
    if (!data.results.length) {
      spanForm.insertAdjacentHTML(
        'beforeend',
        `Search result not successful. Enter the correct movie name and`
      );
      setTimeout(() => {
        spanForm.textContent = ' ';
        event.target.reset();
      }, 1500);
      return;
    } else {
      createGallery.innerHTML = '';
      createGallery.insertAdjacentHTML(
        'beforeend',
        data.results.map(element => createMarkup(element)).join('')
      );

      const options = {
        totalItems: data.total_results,
        itemsPerPage: data.results.length,
        visiblePages: 5,
        page: page,
        centerAlign: true,
      };
      const pagination = new Pagination('pagination', options);

      pagination.on('beforeMove', event => {
        const { page } = event;
        apiService(searchQuery, page)
          .then(data => {
            createGallery.innerHTML = '';
            createGallery.insertAdjacentHTML(
              'beforeend',
              data.results.map(element => createMarkup(element)).join('')
            );
          })
          .catch(err => console.log(err));
      });
    }
  });
}

// onError();

function convertGenresToString(genre_ids) {
  let genresName = [];
  for (let oneGenreId of genre_ids) {
    let requiredGenre = allGenres.find(genre => genre.id === oneGenreId);
    genresName.push(requiredGenre.name);
  }
  if (genresName.length > 2) {
    genresName = genresName.slice(0, 2);
    genresName.push('Other');
  } else if (!genresName.length) {
    genresName.push('Other');
  }
  return genresName.join(', ');
}

function formatingPoster(poster_path, title) {
  if (!poster_path) {
    return `<img class="gallery-img" src="https://www.edu.goit.global/_next/image?url=https%3A%2F%2Fs3.eu-north-1.amazonaws.com%2Flms.goit.files%2F0618d8e0-2652-3e30-ae44-fd6ff17d55a1.png&w=3840&q=75" style="object-fit: contain;" alt="${title}" />`;
  }
  return `<picture>
        <source srcset="https://image.tmdb.org/t/p/w500${poster_path}" media="(min-width: 1280px)" />
        <source srcset="https://image.tmdb.org/t/p/w300${poster_path}" media="(min-width: 768px)" />
        <source srcset="https://image.tmdb.org/t/p/w185${poster_path}" media="(max-width: 767px)" />
        <img class="gallery-img" src="https://image.tmdb.org/t/p/w154${poster_path}" alt="no poster" style="text-align: left; color: #545454; font-size: 22px;"/>
        </picture>`;
}

function formatingYear(release_date) {
  if (!release_date) {
    return `----`;
  }
  return `${release_date.substr(0, 4)}`;
}

function createMarkup({
  poster_path,
  title,
  genre_ids,
  id,
  release_date,
  vote_average,
}) {
  let genres = convertGenresToString(genre_ids);
  let poster = formatingPoster(poster_path, title);
  let year = formatingYear(release_date);

  return `<li class="gallery-list__item" data-id="${id}">
    <div class="gallery-thumb">
        ${poster} 
    </div>
    <div class="movie-info">
        <h2 class="movie-info__name">${title}</h2>
        <p class="movie-info__about">
        ${genres} | ${year} <span class="movie-info__rate">${vote_average.toFixed(
    1
  )}</span>
        </p>
    </div>
    </li>`;
}
