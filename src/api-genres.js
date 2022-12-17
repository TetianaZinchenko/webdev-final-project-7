import axios from 'axios';

const API_KEY = 'f42f2f62d598d39d316744d8859de3e9';
const BASE_URL = 'https://api.themoviedb.org/3/';

export default async function apiGenres() {

    return await axios(`${BASE_URL}genre/movie/list?api_key=${API_KEY}&language=en-US`)
        .then(resp => {
            return resp.data;
        });
}