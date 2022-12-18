const inputEl = document.querySelector('.theme-switch__toggle');
const footer = document.querySelector('.footer-section');
const fooBtn = document.querySelector('.footer-section__btn');
const THEME = {
  LIGHT: 'light-theme',
  DARK: 'dark-theme',
};

inputEl.addEventListener('click', onSwitch);

if (localStorage.getItem('Theme') === 'dark') {
  darkThemeOn();
  inputEl.checked = true;
}
if (localStorage.getItem('Theme') === 'light') {
  lightThemeOn();
}

function onSwitch(e) {
  if (e.target.checked) {
    darkThemeOn();
    localStorage.setItem('Theme', 'dark');
  } else {
    lightThemeOn();
    localStorage.setItem('Theme', 'light');
  }
}

function lightThemeOn() {
  document.body.classList.add(THEME.LIGHT);
  document.body.classList.remove(THEME.DARK);
  footer.classList.add(THEME.LIGHT);
  footer.classList.remove(THEME.DARK);
}
function darkThemeOn() {
  document.body.classList.add(THEME.DARK);
  document.body.classList.remove(THEME.LIGHT);
  footer.classList.remove(THEME.LIGHT);
  footer.classList.add(THEME.DARK);
  fooBtn.style.backgroundColor = 'rgba(0, 0, 0, 0.01)';
}

export default onSwitch;
