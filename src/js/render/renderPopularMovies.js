import { fetchPop, fetchGenre } from '../api/fetchPopularMovies';
import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';

const popList = document.querySelector('.gallery-list');

let page = 1;
let genres = [];

fetchGenre()
  .then(resp => {
    genres = resp;
  })
  .catch(err => console.log(err));

fetchPop(page).then(onSuccess).catch(onError);

function onSuccess(resp) {
  const arr = resp.data.results;
  let markup = arr.map(el => createMarkup(el)).join('');
  popList.innerHTML = markup;

  const options = {
    totalItems: resp.data.total_results,
    itemsPerPage: arr.length,
    visiblePages: 5,
    page: page,
    centerAlign: true,
  };
  const pagination = new Pagination('pagination', options);

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

function onError(error) {
  console.error(error);

  popList.insertAdjacentHTML(
    'beforebegin',
    `<p style="text-align: center; color: #545454; font-size: 18px;">Oops..something went wrong. Please try again later.</p>`
  );
}

function createMarkup({
  genre_ids,
  poster_path,
  id,
  title,
  vote_average,
  release_date,
}) {
  let genresName = [];
  for (let genre_id of genre_ids) {
    let reqGenre = genres.find(genre => genre.id === genre_id);
    genresName.push(reqGenre.name);
  }
  if (genresName.length > 2) {
    genresName = genresName.slice(0, 2);
    genresName.push('Other');
  } else if (genresName.length < 1) {
    genresName.push('Other');
  }
  return `<li class="gallery-list__item" data-id="${id}">
      <div class="gallery-thumb">
        <picture>
          <source srcset="https://image.tmdb.org/t/p/w500${poster_path}" media="(min-width: 1280px)" />
          <source srcset="https://image.tmdb.org/t/p/w300${poster_path}" media="(min-width: 768px)" />
          <source srcset="https://image.tmdb.org/t/p/w185${poster_path}" media="(max-width: 767px)" />
          <img class="gallery-img" src="https://image.tmdb.org/t/p/w154${poster_path}" alt="" />
        </picture> 
      </div>
      <div class="movie-info">
        <h2 class="movie-info__name">${title}</h2>
        <p class="movie-info__about">
          ${genresName.join(', ')} | ${release_date.substr(
    0,
    4
  )} <span class="movie-info__rate">${vote_average.toFixed(1)}</span>
        </p>
      </div>
    </li>`;
}
