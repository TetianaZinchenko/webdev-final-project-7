const goItBtn = document.querySelector('.footer-section__btn');
const teamModal = document.querySelector('.backdrop-team');
const modalBtn = document.querySelector('.modal-team-btn');
window.addEventListener('keydown', closeEscape);
goItBtn.addEventListener('click', openTeam);
modalBtn.addEventListener('click', closeTeam);
teamModal.addEventListener('click', closeClick);

export function openTeam(e) {
  e.preventDefault();
  teamModal.classList.remove('is-hidden-team');
}

export function closeTeam(e) {
  e.preventDefault();
  teamModal.classList.add('is-hidden-team');
}

export function closeEscape(e) {
  if (e.key === 'Escape') {
    closeTeam(e);
    return;
  }
}

export function closeClick(e) {
  if (e.target === teamModal) {
    closeTeam(e);
    return;
  }
}
