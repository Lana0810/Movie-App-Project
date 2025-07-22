import React, { useState, useEffect } from "react";
import {
  Grid,
  Pagination,
  PaginationItem,
  Stack,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import getMovies, { getSearchMovie, getMoviebyGenre } from "../api/tmdb";
import { useNavigate } from "react-router-dom";
import { useFavorites } from "../contexts/FavoriteContext";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";

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

  // 🔸 Kiểm tra đăng nhập trước khi vào chi tiết
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
        {/* Search */}
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search movie..."
           style={{
            border: "1px solid",
            textAlign: "left", // chữ canh trái trong khung
            backgroundColor: "lightblue",
            marginTop: "20px",
            marginBottom: "10px",
            width: "100%",
            padding: "10px",
            borderRadius: "8px",
            cursor: "pointer",
            transition: "background-color 0.3s ease",
          }}
        />

        {/* Genre Dropdown */}
        <div style={{ marginBottom: "20px"}}>
          <select
            value={selectedGenre}
            onChange={(e) => setSelectedGenre(e.target.value)}
            style={{ padding: "8px", width: "200px", backgroundColor: "lightcoral", cursor: "pointer",
            transition: "background-color 0.3s ease"}}
          >
            <option value="all">All Genre</option>
            {genres.map((genre) => (
              <option value={genre.id} key={genre.id}>
                {genre.name}
              </option>
            ))}
          </select>
        </div>

        {/* ⭐ Movie Grid (MUI Cards) */}
        <Box sx={{ my: 4 }}>
          <Typography variant="h5" gutterBottom>
            Movie List
          </Typography>
          <Grid container spacing={2}>
            {movies.map((movie) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={movie.id}>
                <Card
                  sx={{
                    backgroundColor: "#f5f5f5",
                    borderRadius: 2,
                    boxShadow: 3,
                    cursor: "pointer",
                    height: "100%",
                  }}
                  onClick={() => handleClick(movie.id)}
                >
                  <CardMedia
                    component="img"
                    height="300"
                    image={
                      movie.poster_path
                        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                        : "https://via.placeholder.com/300x450?text=No+Image"
                    }
                    alt={movie.title}
                  />
                  <CardContent>
                    <Typography variant="subtitle1" fontWeight="bold">
                      {movie.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      ⭐ {movie.vote_average}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* ⭐ Favorite Movies (MUI Cards, khác màu) */}
        {favoriteMovies.length > 0 && (
          <Box sx={{ my: 5 }}>
            <Typography variant="h5" gutterBottom>
              My Favorite Movies
            </Typography>
            <Grid container spacing={2}>
              {favoriteMovies.map((movie) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={movie.id}>
                  <Card
                    sx={{
                      backgroundColor: "#fff3e0",
                      borderRadius: 2,
                      boxShadow: 2,
                      height: "100%",
                    }}
                  >
                    <CardMedia
                      component="img"
                      height="300"
                      image={
                        movie.poster_path
                          ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                          : "https://via.placeholder.com/300x450?text=No+Image"
                      }
                      alt={movie.title}
                    />
                    <CardContent>
                      <Typography variant="subtitle1" fontWeight="bold">
                        {movie.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        ⭐ {movie.vote_average}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        )}

        {/* Pagination */}
        <Stack spacing={2} alignItems="center" mt={4}>
          <Pagination
            count={totalPages}
            page={page}
            onChange={(event, value) => setPage(value)}
            renderItem={(item) => (
              <PaginationItem
                slots={{ previous: ArrowBackIcon, next: ArrowForwardIcon }}
                {...item}
              />
            )}
          />
        </Stack>
      </div>
    </div>
  );
};

export default Home;
