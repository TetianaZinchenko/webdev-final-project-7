const goItBtn = document.querySelector('.footer-section__btn');
const teamModal = document.querySelector('.backdrop-team');
const modalBtn = document.querySelector('.modal-team-btn');

goItBtn.addEventListener('click', openTeam);
modalBtn.addEventListener('click', closeTeam);

export function openTeam(e) {
  e.preventDefault();
  teamModal.classList.remove('is-hidden-team');
}

export function closeTeam(e) {
  e.preventDefault();
  teamModal.classList.add('is-hidden-team');
}
