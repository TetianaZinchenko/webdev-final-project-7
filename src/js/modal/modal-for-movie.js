
const closeModalMovieBtn = document.querySelector('.btn-close-js');
const backdrop = document.querySelector('.backdrop');
const galleryItem = document.querySelector('.gallery-js')
const modal = document.querySelector('.modal-movie-detail');

galleryItem.addEventListener('click', openModal);

function openModal(evt) {
    evt.preventDefault();
    backdrop.classList.toggle("modal—movie-is-hidden")
    // функция запроса данных

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


