export function markupCardMovie({id, poster_path, title, release_date, vote_average, stringGenres}) {
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
            ${stringGenres} | ${release_date.substr(
      0,
      4
    )} <span class="movie-info__rate">${vote_average.toFixed(1)}</span>
          </p>
        </div>
      </li>`;
  }