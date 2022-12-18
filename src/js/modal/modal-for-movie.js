// данные для запроса
const BASE_URL = "https://api.themoviedb.org/3/movie/";
const apiKey = 'f42f2f62d598d39d316744d8859de3e9';

// общие данные
const galleryItem = document.querySelector('.gallery-js')

// данные для действий с модалкой
const closeModalMovieBtn = document.querySelector('.btn-close-js');
const backdrop = document.querySelector('.backdrop');
const modal = document.querySelector('.modal-movie-detail');

// елементы для создания разметки 
const listRender = document.querySelector('.movie-detail-info-category-render');
const about = document.querySelector('.about-desc');
const title = document.querySelector('.movie-title');
const posterImg = document.querySelector('.thumb-movie-poster')

//получаем ИД фильма
function getId(evt) {
    if (evt.target.offsetParent.nodeName !== "LI") {
        return;
    }
    return evt.target.offsetParent.dataset.id;
}

//открытые-рендер модалки
galleryItem.addEventListener('click', openModal);

async function openModal(evt) {
    let movieId = getId(evt);
    if (!movieId) {
        return
    }
    backdrop.classList.toggle("modal—movie-is-hidden"); //меняет видимость модалки
    
    let data = await movieDatabaseApi(movieId); //отправляет запрос по ИД для получения данных о фильме
    createMarkup(data);

    document.addEventListener("keydown", checkClick);
    document.addEventListener("click", checkClick);
    closeModalMovieBtn.addEventListener('click', checkClickBtn);
}

async function movieDatabaseApi(movieId) {
    try {
        const response = await fetch(`${BASE_URL}${movieId}?api_key=${apiKey}`);
        if (!response.ok) {
            throw new Error('RESP NOT OK!')
        }
        let data = await response.json();
        return data;
    }
    catch (error) {
        console.log(error);
    }
}

function createMarkup(data) {
    posterImg.innerHTML = `<picture>
          <source srcset="https://image.tmdb.org/t/p/w500${data.poster_path}" media="(min-width: 1280px)" />
          <source srcset="https://image.tmdb.org/t/p/w300${data.poster_path}" media="(max-width: 1279px)" />
         
          <img src="https://image.tmdb.org/t/p/w154${data.poster_path}" alt="poster for movie" />
        </picture> `;

        title.innerHTML = `${data.title}`;
        
        const genresArr = data.genres;
        const genres = genresArr.map(genre => genre.name).join(', ');

        const markupList = `<li class="list-item"><span class="vote">${data.vote_average}</span> / <span class="votes">${data.vote_count}</span></li>
        <li class="list-item">${data.popularity}</li>
        <li class="list-item">${data.original_title}</li>
        <li class="list-item">${genres}</li>`;

        listRender.innerHTML = markupList;
        about.innerHTML = `<p class="about-desc">
        ${data.overview}
      </p>`
}

 //закрытие модалки и удаление слушателей
function checkClickBtn() {
    backdrop.classList.toggle("modal—movie-is-hidden");
    removeEventListener()
}

function checkClick(evt) {
    if (evt.code === "Escape" || evt.target.className === "backdrop") {
        backdrop.classList.toggle("modal—movie-is-hidden");
        removeEventListener()
    }
}

function removeEventListener() {
    document.removeEventListener("keydown", checkClick);
    document.removeEventListener("click", checkClick);
    closeModalMovieBtn.removeEventListener("click", checkClickBtn)
}

