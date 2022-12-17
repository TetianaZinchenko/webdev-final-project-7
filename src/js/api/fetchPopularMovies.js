import axios from 'axios';

export async function fetchPop(page) {
  const resp = await axios.get(
    `https://api.themoviedb.org/3/trending/movie/day?api_key=f42f2f62d598d39d316744d8859de3e9&page=${page}`
  );
  return resp;
}

export async function fetchGenre() {
  const resp = await axios.get(
    `https://api.themoviedb.org/3/genre/movie/list?api_key=f42f2f62d598d39d316744d8859de3e9&language=en-US`
  );
  return resp.data.genres;
}
