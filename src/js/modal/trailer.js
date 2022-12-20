import * as basicLightbox from 'basiclightbox';
// import 'basicLightbox/dist/basicLightbox.min.css';

import axios from 'axios';

let trailer;

function creatTrailerLink(key) {
  if(!key) {
    return ;
  }
  trailer = basicLightbox.create(`
    <iframe width="320" height="240" src='https://www.youtube.com/embed/${key}'frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen class="trailer_video"></iframe>
  `);
  trailer.show();
}

export function closeTrailerByEsc(e) {
  e.stopImmediatePropagation();
  if (e.code === 'Escape') {
    trailer.close();
    document.removeEventListener('keydown', closeTrailerByEsc);
  }
}

const fetchTrailer = async movieId => {
  try {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=f42f2f62d598d39d316744d8859de3e9`
    );
    return data.results;
  } catch (e) {
    console.error(e);
  }
};

export const renderTrailer = async movieId => {
  const trailerBtn = document.querySelector('.btn-trailer');
  let data = await fetchTrailer(movieId);

  // const { key } = data.find(t => t.name.includes('Official'));
  // const key  = data.find(t => {
  //   if (!t.name.includes('Official')){
  //     return;
  //   }else {
  //     return t.name.includes('Official')
  //   }
  // })
  let key = '';
  data.forEach(obj => {
    if (!obj.name.includes('Official')) {
      return;
    } else {
      key = obj.key;
    }

  });

  trailerBtn.addEventListener('click', () => creatTrailerLink(key));
  document.addEventListener('keydown', closeTrailerByEsc);
};
