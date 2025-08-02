import axios from "axios";

const API_KEY = "e5bcafb4e37c7330240162382ccb67bb";
const BASE_URL = "https://api.themoviedb.org/3";

const getMovies = async (page = 1) => {
  try {
    const res = await axios.get(`${BASE_URL}/movie/popular`, {
      params: { api_key: API_KEY, page },
    });
    return res.data;
  } catch (error) {
    return [];
  }
};

export const getMovieDetails = async (id) => {
  const res = await axios.get(`${BASE_URL}/movie/${id}`, {
    params: { api_key: API_KEY },
  });
  return res.data;
};

export const getSearchMovie = async (searchTerm) => {
  const res = await axios.get(`${BASE_URL}/search/movie`, {
    params: { api_key: API_KEY, query: searchTerm },
  });
  return res.data;
};

export const getMoviebyGenre = async (genreId) => {
  const res = await axios.get(`${BASE_URL}/discover/movie`, {
    params: { api_key: API_KEY, with_genres: genreId },
  });
  return res.data;
};

export const getGenres = async () => {
  const res = await axios.get(`${BASE_URL}/genre/movie/list`, {
    params: { api_key: API_KEY },
  });
  return res.data.genres;
};

export default getMovies;