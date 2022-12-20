import './js/modal/team-modal';
import onSwitch from './js/api/theme.js';

import { movieLocalStorage } from './js/local-storage/local-storage.js';
import { markupCardForMovie } from './js/render/render.js';

const eventClick = 'click';
const gallery = document.querySelector('.gallery-js');
const watchedTab = document.querySelector('#lib-watched-tab');
const queueTab = document.querySelector('#lib-queue-tab');

let selectedTab = 'watched';
let selectedMovieIndex = 0;
let modalButtonsContainer = document.querySelector('.movie-btn-container');
let buttonAddWatch = modalButtonsContainer.children[0];
let buttonAddQueue = modalButtonsContainer.children[1];

watchedTab.addEventListener(eventClick, () => renderMoviesByTab('watched'));
queueTab.addEventListener(eventClick, () => renderMoviesByTab('queue'));

gallery.addEventListener(eventClick, event => {
  let elementIndex = event.path.findIndex(e => e.dataset.index != null);
  if (elementIndex != -1) {
    selectedMovieIndex = event.path[elementIndex].dataset.index;
    redrawButtonText();
  }
});

buttonAddWatch.addEventListener(eventClick, event => {
  if (movieLocalStorage.watchedExists(selectedMovieIndex)) {
    movieLocalStorage.removeWatched(selectedMovieIndex);
  } else {
    console.log('TODO: add movie');
    // get movie info by index (selectedMovieIndex)
    // let movie = globalMovieArray[index];
    // movieLocalStorage.addWatched(movie);
  }
  renderMoviesByTab(selectedTab);
  redrawButtonText();
});

buttonAddQueue.addEventListener(eventClick, event => {
  if (movieLocalStorage.queueExists(selectedMovieIndex)) {
    movieLocalStorage.removeQueue(selectedMovieIndex);
  } else {
    console.log('TODO: add queue');
    // get movie info by index (selectedMovieIndex)
    // let movie = globalMovieArray[index];
    // movieLocalStorage.addQueue(movie);
  }
  renderMoviesByTab(selectedTab);
  redrawButtonText();
});

function redrawButtonText() {
  buttonAddWatch.textContent = movieLocalStorage.watchedExists(
    selectedMovieIndex
  )
    ? 'remove from watched'
    : 'add to watched';
  buttonAddQueue.textContent = movieLocalStorage.queueExists(selectedMovieIndex)
    ? 'remove from queue'
    : 'add to queue';
}

function renderMoviesByTab(key) {
  selectedTab = key;
  let movieList = [];
  switch (selectedTab) {
    case 'watched':
      movieList = movieLocalStorage.watchedArray;
      break;
    case 'queue':
      movieList = movieLocalStorage.queueArray;
      break;
  }
  let moviesElements = movieList.map(movie => markupCardForMovie(movie));
  gallery.innerHTML = moviesElements.join('');
}

renderMoviesByTab(selectedTab);
