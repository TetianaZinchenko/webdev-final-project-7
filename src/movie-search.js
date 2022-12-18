
//FT-10 Реалізувати пошук та відображення фільмів за ключовим словом
import apiService from './api-service.js';

const searchForm = document.querySelector('.search-form');
const createGallery = document.querySelector('.gallery');
const errorMovies=document.querySelector('.error-js');


searchForm.addEventListener('submit', onSearch);
searchForm.addEventListener('input', inputValue);

let searchQuery = '';
let page = 1;

function inputValue(event) {
    const searchValue = event.target.value;
    if (!searchValue) {
        createGallery.innerHTML = '';
        return;
    }
}

function onSearch(event) {
    event.preventDefault();
    searchQuery = event.target.searchQuery.value;
    page = 1;
    apiService(searchQuery, page).then(data => console.log(data));

    apiService(searchQuery, page)
        .then(data => {
            if (!data.results.length) {
                errorMovies.insertAdjacentHTML('beforeend', `<span class="error-js">Search result not successful. Enter the correct movie name and</span>`);
            } else {createGallery.innerHTML = '';
            createGallery.insertAdjacentHTML('beforeend', createMarkup(data.results));}
        });
}


function createMarkup(arr) {
    return arr.map(({
        poster_path, original_title, genre_ids, release_date
    }) => `<div class="video-card" >
    <div class="thumb" width='395px'>
        <img src="https://image.tmdb.org/t/p/original${poster_path}" alt="no poster"/>
    </div>
    <div class="info">
        <p class="info-item">
            <b>${original_title}</b>
        </p>
        <p class="info-item">
            <b>${genre_ids}</b>
            <b>${(new Date(release_date).getFullYear())}</b>
        </p>
    </div>
</div>`).join('');
}