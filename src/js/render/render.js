export function markupCardForMovie(movie) {
  let genres = movie.genres.map(genre => genre.name).join(', ');
  let releaseDate = new Date(movie.release_date).getFullYear();

  return `
    <li class="gallery-list__item" data-index="${movie.id}">
        <div class="gallery-thumb">
            <picture>
                <source srcset="${movie.backdrop_path}" media="(min-width: 1280px)" />
                <source srcset="${movie.backdrop_path}" media="(min-width: 768px)" />
                <source srcset="${movie.backdrop_path}" media="(max-width: 767px)" />
                <img class="gallery-img' src="${movie.backdrop_path}" alt="" />
            </picture>
        </div>
        <div class="movie-info">
            <h2 class="movie-info__name">${movie.title}</h2>
            <p class="movie-info__about">
                ${genres} | ${releaseDate} <span class="movie-info__rate">${movie.vote_average}</span>
            </p>
        </div>
    </li>`;
}
