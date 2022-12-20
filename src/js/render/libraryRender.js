import { movieLocalStorage } from '../local-storage/local-storage.js';
import { buttonAddWatch, buttonAddQueue } from '../modal/modal-for-movie.js';
import { markupCardMovie } from './render.js';

const eventClick = 'click';
const gallery = document.querySelector('.gallery-js');
const watchedTab = document.querySelector('#lib-watched-tab');
const queueTab = document.querySelector('#lib-queue-tab');

let selectedTab = 'watched';

buttonAddWatch.addEventListener(eventClick, () => renderByTab(selectedTab));
buttonAddQueue.addEventListener(eventClick, () => renderByTab(selectedTab));

watchedTab.addEventListener(eventClick, () => renderByTab('watched'));
queueTab.addEventListener(eventClick, () => renderByTab('queue'));

function renderByTab(key) {
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
  let moviesElements = movieList.map(movie => {
    movie.stringGenres = movie.genres.map(genre => genre.name).join(', ');
    return markupCardMovie(movie);
  });
  gallery.innerHTML = moviesElements.join('');
}

renderByTab(selectedTab);
