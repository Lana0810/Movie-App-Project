const API_KEY = "e5bcafb4e37c7330240162382ccb67bb";

const getMovies = async (page = 1) => {
  try {
    const url = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&page=${page}`;
    const res = await fetch(url);
    const data = await res.json();
    return data;
  } catch (error) {
    return [];
  }
};

export const getMovieDetails = async (id) => {
  const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`;
  const res = await fetch(url);
  const data = await res.json();
  return data;
};

export const getSearchMovie = async (searchTerm) => {
  const url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${searchTerm}`;
  const res = await fetch(url);
  const data = await res.json();
  return data;
};

export const getMoviebyGenre = async (genreId) => {
  const url = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=${genreId}`;
  const res = await fetch(url);
  const data = await res.json();
  return data;
};

export const getGenres = async () => {
  const url = `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`;
  const res = await fetch(url);
  const data = await res.json();
  return data.genres; // array of {id, name}
};

export default getMovies;
