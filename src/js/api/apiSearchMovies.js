import axios from 'axios';

export async function apiService(searchQuery, page) {
    const API_KEY = 'f42f2f62d598d39d316744d8859de3e9';
    const BASE_URL = 'https://api.themoviedb.org/3/';

    return await axios(`${BASE_URL}search/movie?api_key=${API_KEY}&language=en-EN&query=${searchQuery}&page=${page}&include_adult=false`)
        .then(resp => {
            return resp.data;
        });
}

export async function apiGenres() {
    const API_KEY = 'f42f2f62d598d39d316744d8859de3e9';
    const BASE_URL = 'https://api.themoviedb.org/3/';

    return await axios(`${BASE_URL}genre/movie/list?api_key=${API_KEY}&language=en-EN`)
        .then(resp => {
            return resp.data.genres;
        });
}