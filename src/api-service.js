import axios from 'axios';

export default async function apiService(searchQuery, page) {
    const API_KEY = 'f42f2f62d598d39d316744d8859de3e9';
    const BASE_URL = 'https://api.themoviedb.org/3/';

    return await axios(`${BASE_URL}search/movie?api_key=${API_KEY}&language=ru-RU&query=${searchQuery}&page=${page}&include_adult=false`)
        .then(resp => {
            return resp.data;
        });
}