// данные для запроса
const BASE_URL = "https://api.themoviedb.org/3/movie/";
const apiKey = 'f42f2f62d598d39d316744d8859de3e9';

const galleryListItem = document.querySelector('.gallery-list__item');
galleryListItem.addEventListener('click', getId);

function getId(evt) {
    console.log(evt.currentTarget)
}








const listRender = document.querySelector('.movie-detail-info-category-render');
const about = document.querySelector('.about');
const title = document.querySelector('.movie-title');
const posterImg = document.querySelector('.thumb-movie-poster')

// данные для действий с модалкой

const closeModalMovieBtn = document.querySelector('.btn-close-js');
const backdrop = document.querySelector('.backdrop');
const galleryItem = document.querySelector('.gallery-js')
const modal = document.querySelector('.modal-movie-detail');

galleryItem.addEventListener('click', openModal);

let movieId;


// function getIdMovie(evt) {
//     console.log(evt.target)
// }  

function openModal(evt) {
    evt.preventDefault();
    console.dir(evt.target); // тут ищи как получить ИД

    backdrop.classList.toggle("modal—movie-is-hidden")
    getIdMovie();

    
    document.addEventListener("keydown", checkClick);
    document.addEventListener("click", checkClick);
    closeModalMovieBtn.addEventListener('click', checkClickBtn);
}

function checkClickBtn() {
    backdrop.classList.toggle("modal—movie-is-hidden");
    removeEventListener()
}

function checkClick(evt) {
    if (evt.code === "Escape") {
        backdrop.classList.toggle("modal—movie-is-hidden");
        removeEventListener()
    } else if(evt.target.className === "backdrop"){
        backdrop.classList.toggle("modal—movie-is-hidden");
         removeEventListener()
    }
}

function removeEventListener() {
    document.removeEventListener("keydown", checkClick);
    document.removeEventListener("click", checkClick);
    closeModalMovieBtn.removeEventListener("click", checkClickBtn)
}


async function movieDatabaseApi() {
    try {
        const response = await fetch(`${BASE_URL}${movieId}?api_key=${apiKey}`);
        const data = await response.json();

        posterImg.insertAdjacentHTML('beforeend', `<picture>
          <source srcset="https://image.tmdb.org/t/p/w500${data.poster_path}" media="(min-width: 1280px)" />
          <source srcset="https://image.tmdb.org/t/p/w300${data.poster_path}" media="(max-width: 1279px)" />
         
          <img src="https://image.tmdb.org/t/p/w154${data.poster_path}" alt="poster for movie" />
        </picture> `)

        title.insertAdjacentHTML('beforeend', `${data.title}`)

        const genres = data.genres;
        const genresArr = genres.map(genre => genre.name).join(', ');

        const markupList = `<li class="list-item"><span class="vote">${data.vote_average}</span> / <span class="votes">${data.vote_count}</span></li>
        <li class="list-item">${data.popularity}</li>
        <li class="list-item">${data.original_title}</li>
        <li class="list-item">${genresArr}</li>`;
                console.log(data.overview);

        listRender.insertAdjacentHTML('beforeend', markupList);
              about.insertAdjacentHTML('afterend', `<p class="about-desc">
        ${data.overview}
      </p>`)

    }
    catch {
        
    }
}


// movieDatabaseApi()