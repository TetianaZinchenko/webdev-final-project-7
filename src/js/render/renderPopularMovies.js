import { fetchPop, fetchGenre } from '../api/fetchPopularMovies';
import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';

const popList = document.querySelector('.gallery-list');

let page = 1;
let allGenres = [];

//отримує список всіх доступних жанрів в форматі {код: назва жанру}
//
fetchGenre()
  .then(resp => {
    allGenres = resp;
  })
  .catch(err => console.log(err));

//отримує список популярних фыльмів
//
fetchPop(page).then(onSuccess).catch(onError);

//обробка успішної відповіді
//
function onSuccess(resp) {
  //рендер популярних фільмів
  //
  const arr = resp.data.results;
  let markup = arr.map(el => createMarkup(el)).join('');
  popList.innerHTML = markup;

  //створює інстанс пагінації
  //
  const options = {
    totalItems: resp.data.total_results,
    itemsPerPage: arr.length,
    visiblePages: 5,
    page: page,
    centerAlign: true,
  };
  const pagination = new Pagination('pagination', options);

  //додає слухача пагінації і рендерить нові фільми
  //
  pagination.on('beforeMove', evt => {
    const { page } = evt;
    fetchPop(page)
      .then(resp => {
        const arr = resp.data.results;
        let markup = arr.map(el => createMarkup(el)).join('');
        popList.innerHTML = markup;
      })
      .catch(err => console.log(err));
  });
}

//обробка помилки
//
export function onError(error) {
  console.error(error);

  popList.innerHTML = `<p style="margin: 0 auto; text-align: center; color: #545454; font-size: 18px;">Oops..something went wrong. Please try again later.</p>`;
}

//перетворює в стрінгу масив жанрів що приходить у вигляді кодів, для вставки в макет
//
function convertGenresToString(genre_ids) {
  let genresName = [];
  for (let oneGenreId of genre_ids) {
    let requiredGenre = allGenres.find(genre => genre.id === oneGenreId);
    genresName.push(requiredGenre.name);
  }
  if (genresName.length > 2) {
    genresName = genresName.slice(0, 2);
    genresName.push('Other');
  } else if (genresName.length < 1) {
    genresName.push('Other');
  }
  return genresName.join(', ');
}

//створює макет карточки одного фільму
//
function createMarkup({
  genre_ids,
  poster_path,
  id,
  title,
  vote_average,
  release_date,
}) {
  let genres = convertGenresToString(genre_ids);
  return `<li class="gallery-list__item" data-id="${id}">
      <div class="gallery-thumb">
        <picture>
          <source srcset="https://image.tmdb.org/t/p/w500${poster_path}" media="(min-width: 1280px)" />
          <source srcset="https://image.tmdb.org/t/p/w300${poster_path}" media="(min-width: 768px)" />
          <source srcset="https://image.tmdb.org/t/p/w185${poster_path}" media="(max-width: 767px)" />
          <img class="gallery-img" src="https://image.tmdb.org/t/p/w154${poster_path}" alt="${title}" />
        </picture> 
      </div>
      <div class="movie-info">
        <h2 class="movie-info__name">${title}</h2>
        <p class="movie-info__about">
          ${genres} | ${release_date.substr(
    0,
    4
  )} <span class="movie-info__rate">${vote_average.toFixed(1)}</span>
        </p>
      </div>
    </li>`;
}
