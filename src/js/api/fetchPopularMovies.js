import axios from 'axios';

const apiKey = 'f42f2f62d598d39d316744d8859de3e9';

export async function fetchPop(page) {
  try {
    const resp = await axios.get(
      `https://api.themoviedb.org/3/trending/movie/day?api_key=${apiKey}&page=${page}`
    );
    return resp;
  } catch (e) {
    return Error;
  }
}

export async function fetchGenre() {
  try {
    const resp = await axios.get(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=en-US`
    );
    return resp.data.genres;
  } catch (e) {
    Error;
  }
}
