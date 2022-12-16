import {markupModalMovie, markupCardForMovie} from "./js/render/render.js"

const libraryRefs = {
    gallery : document.querySelector(".gallery"),
    backdropContainer : document.querySelector(".backdrop-container"),
    watchedTab : document.querySelector("#lib-watched-tab"),
    queueTab : document.querySelector("#lib-queue-tab")
};

const localStorageWatchKey = "movie-watched";
const localStorageQueueKey = "movie-queue";

libraryRefs.watchedTab.addEventListener("click", () => renderMoviesByKey(localStorageWatchKey));
libraryRefs.queueTab.addEventListener("click", () => renderMoviesByKey(localStorageQueueKey));

let watchedList = localStorageLoad(localStorageWatchKey);
let queueList = localStorageLoad(localStorageQueueKey);
let selectedTab = localStorageWatchKey;

// debug only start => (remove)
if(watchedList.length == 0)
{
    watchedList.push({
        id : 12,
        backdrop_path : "https://www.themoviedb.org/t/p/w300_and_h450_bestv2/muqDW2S3rkZKAVLv4TE47IYg3O6.jpg",
        title: "ONCE UPON A TIME... IN HOLLYWOOD",
        release_date : "2010-07-07",
        vote_average : 7.3,
        vote_count : 123,
        popularity: 12.2,
        original_title : "ONCE UPON A TIME... IN HOLLYWOOD",
        genres : [{name: "Drama"}, {name: "Comedy"}],
        overview : "movie overview"
    });
    localStorageSave(localStorageWatchKey, watchedList);
}
// debug end

function renderMoviesByKey(key){
    selectedTab = key;
    let movies = localStorageLoad(key);
    renderMovieList(movies);
}

function renderMovieList(movies){
    let moviesElements = movies.map(movie => markupCardForMovie(movie));
    libraryRefs.gallery.innerHTML = moviesElements.join("");
    libraryRefs.gallery.querySelectorAll(".gallery-list__item").forEach(item => {
        
        item.addEventListener('click', event => {
            let selectedMovieId = event.currentTarget.dataset.index;
            let movieIndex = movies.findIndex(movie => movie.id == selectedMovieId);
            if(movieIndex != -1){
                showModal(movies[movieIndex]);                                  
            }            
        });
      });
}

function showModal(movie){
    // search
    const watchedIndex = watchedList.findIndex(m => m.id == movie.id);
    const queueIndex = queueList.findIndex(m => m.id == movie.id);
        
    let modlaMarkup = markupModalMovie(movie);
    libraryRefs.backdropContainer.innerHTML = modlaMarkup;
    const backdrop = libraryRefs.backdropContainer.firstChild;
    backdrop.style.opacity = 1;

    let closeButton = backdrop.querySelector(".btn-close-modal");
    closeButton.addEventListener("click", () => {
        libraryRefs.backdropContainer.innerHTML = "";
        backdrop.style.opacity = 0;
    });

    let addWatchedButton = backdrop.querySelector("#add-to-watched");
    addWatchedButton.textContent = watchedIndex != -1 ? "remove from Watched" : "add to watched";
    addWatchedButton.addEventListener("click", () => {
        if(watchedIndex != -1){
            watchedList.splice(watchedIndex, 1);
        } else {
            watchedList.push(movie);
        }
        localStorageSave(localStorageWatchKey, watchedList);
        showModal(movie);
        renderMoviesByKey(selectedTab);
    });

    let addQueueButton = backdrop.querySelector("#add-to-queue");
    addQueueButton.textContent = queueIndex != -1 ? "remove from queue" : "add to queue";
    addQueueButton.addEventListener("click", () => {
        if(queueIndex != -1){
            queueList.splice(queueIndex, 1);
        } else {
            queueList.push(movie);
        }
        localStorageSave(localStorageQueueKey, queueList);
        showModal(movie);
        renderMoviesByKey(selectedTab);
    });
}


function localStorageLoad(key){
    let movieListValue = localStorage.getItem(key);
    let movieList = [];
    if(movieListValue !== null){
        movieList = JSON.parse(movieListValue);
    }
    return movieList;
}

function localStorageSave(key, value){
    localStorage.setItem(key, JSON.stringify(value));
}

renderMoviesByKey(selectedTab);
