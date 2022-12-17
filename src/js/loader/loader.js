const loader = document.querySelector('.loader');

window.addEventListener('load', () =>{
    loader.classList.add('fadeOut');
    setTimeout(() => {
        loader.style.display = 'none';
    }, 1000);

})