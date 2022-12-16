export function markupModalMovie(movie){
    let genres = movie.genres.map(genre => genre.name)
        .join(", ");
    return `<div class="backdrop">
        <div class="modal-movie-detail">
            <button class="btn-close-modal" type="button">
                <svg class="icon-close" width="34" height="34" viewBox="0 0 32 32">
                <use xlink:href="#icon-close"></use>
                <symbol id="icon-close">
                    <path
                    stroke-linejoin="miter"
                    stroke-linecap="butt"
                    stroke-miterlimit="4"
                    stroke-width="2.1333"
                    d="M8.533 8.533l14.933 14.933"
                    ></path>
                    <path
                    stroke-linejoin="miter"
                    stroke-linecap="butt"
                    stroke-miterlimit="4"
                    stroke-width="2.1333"
                    d="M8.533 23.467l14.933-14.933"
                    ></path>
                </symbol>
                </svg>
            </button>
            <div class="thumb-movie-poster">
                <picture>
                    <source srcset="${movie.backdrop_path}" media="(min-width: 1280px)" />
                    <source srcset="${movie.backdrop_path}" media="(min-width: 768px)" />
                    <source srcset="${movie.backdrop_path}" media="(max-width: 767px)" />
                    <img src="${movie.backdrop_path}" alt="${movie.title}" />
                </picture>
            </div>
            <div class="movie-detail">
                <h2 class="movie-title">${movie.title}</h2>
                <div class="movie-detail-info">
                    <ul class="movie-detail-info-category list">
                        <li class="category-item list-item">Vote / Votes</li>
                        <li class="category-item list-item">Popularity</li>
                        <li class="category-item list-item">Original Title</li>
                        <li class="category-item list-item">Genre</li>
                    </ul>
                    <ul class="movie-detail-info-category-render list">
                        <li class="list-item">
                        <span class="vote">${movie.vote_average}</span> / <span class="votes">${movie.vote_count}</span>
                        </li>
                        <li class="list-item">${movie.popularity}</li>
                        <li class="list-item">${movie.original_title}</li>
                        <li class="list-item">${genres}</li>
                    </ul>
                </div>

                <h3 class="about">About</h3>
                <p class="about-desc">${movie.overview}</p>
                <div class="movie-btn-container">
                    <button id="add-to-watched" class="modal-btn" type="button">add to Watched</button>
                    <button id="add-to-queue" class="modal-btn" type="button">add to queue</button>
                </div>
            </div>
        </div>
    </div>`;
}

export function markupCardForMovie(movie){
    let genres = movie.genres.map(genre => genre.name)
        .join(", ");
    let releaseDate = new Date(movie.release_date)
        .getFullYear();
    return `
    <li class="gallery-list__item" data-index="${movie.id}">
        <div class="gallery-thumb">
            <picture>
                <source srcset="${movie.backdrop_path}" media="(min-width: 1280px)" />
                <source srcset="${movie.backdrop_path}" media="(min-width: 768px)" />
                <source srcset="${movie.backdrop_path}" media="(max-width: 767px)" />
                <img src="${movie.backdrop_path}" alt="${movie.title}" />
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
