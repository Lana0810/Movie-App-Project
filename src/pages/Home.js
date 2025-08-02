import React, { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import getMovies, { getSearchMovie, getMoviebyGenre } from "../api/tmdb";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useFavorites } from "../contexts/FavoriteContext";
import { useAuth } from "../contexts/AuthContext";

import SearchBar from "../components/SearchBar";
import GenreDropdown from "../components/GenreDropdown";
import MovieGrid from "../components/MovieGrid";
import FavoriteMovies from "../components/FavoriteMovies";
import PaginationControls from "../components/PaginationControls";

const API_KEY = "e5bcafb4e37c7330240162382ccb67bb";

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("all");
  const [favoriteMovies, setFavoriteMovies] = useState([]);

  const navigate = useNavigate();
  const { favorites } = useFavorites();
  const { user } = useAuth();
  const isLoggedIn = !!user;

  const handleClick = (id) => {
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }
    navigate(`/movie/${id}`);
  };

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const res = await axios.get(
          `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=en-US`
        );
        setGenres(res.data.genres);
      } catch (err) {
        console.error("Failed to load genres", err);
      }
    };

    fetchGenres();
  }, []);

  useEffect(() => {
    const fetchMovies = async () => {
      let data;
      if (searchTerm.trim() !== "") {
        data = await getSearchMovie(searchTerm);
      } else if (selectedGenre !== "all") {
        data = await getMoviebyGenre(selectedGenre);
      } else {
        data = await getMovies(page);
      }

      setMovies(data.results || []);
      setTotalPages(data.total_pages || 1);
    };

    fetchMovies();
  }, [page, searchTerm, selectedGenre]);

  useEffect(() => {
    const fetchFavoriteMovies = async () => {
      const favoriteIds = JSON.parse(localStorage.getItem("favorites")) || [];

      try {
        const requests = favoriteIds.map((id) =>
          axios.get(
            `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`
          )
        );
        const responses = await Promise.all(requests);
        setFavoriteMovies(responses.map((res) => res.data));
      } catch (err) {
        console.error("Error fetching favorite movies", err);
      }
    };

    fetchFavoriteMovies();
  }, [favorites]);

  return (
    <div style={{ display: "flex" }}>
      <div style={{ flexGrow: 1, padding: "0 20px" }}>
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <GenreDropdown
          genres={genres}
          selectedGenre={selectedGenre}
          setSelectedGenre={setSelectedGenre}
        />
        <Box sx={{ my: 4 }}>
          <Typography variant="h5" gutterBottom>
            Movie List
          </Typography>
          <MovieGrid movies={movies} handleClick={handleClick} />
        </Box>
        <FavoriteMovies favoriteMovies={favoriteMovies} />
        <PaginationControls page={page} setPage={setPage} totalPages={totalPages} />
      </div>
    </div>
  );
};

export default Home;
