import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getMovieDetails } from "../api/tmdb";
import { useAuth } from "../contexts/AuthContext";  // import hook useAuth

const MovieDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();  // lấy trạng thái đăng nhập từ hook

  const [movie, setMovie] = useState(null);
  const [isFavorite, setIsFavorite] = useState(() => {
    return localStorage.getItem(id) === "true";
  });

  useEffect(() => {
    // Nếu chưa đăng nhập thì chuyển hướng về trang login
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }

    const fetchMovie = async () => {
      try {
        const data = await getMovieDetails(id);
        setMovie(data);
      } catch (err) {
        console.error("Error fetching movie details:", err);
      }
    };

    fetchMovie();
  }, [id, isLoggedIn, navigate]);

  if (!movie) {
    return <p>Loading...</p>;
  }

  const handleFavoriteClick = () => {
    const favoriteStatus = !isFavorite;
    setIsFavorite(favoriteStatus);
    localStorage.setItem(movie.id, favoriteStatus.toString());

    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];

    if (favoriteStatus) {
      if (!favorites.includes(movie.id)) {
        favorites.push(movie.id);
      }
    } else {
      const index = favorites.indexOf(movie.id);
      if (index > -1) {
        favorites.splice(index, 1);
      }
    }

    localStorage.setItem("favorites", JSON.stringify(favorites));
  };

  return (
  <div style={{ textAlign: "center", color: "#333" }}>
    <img
      src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
      alt={movie.title}
      style={{
        display: "block",
        margin: "16px auto",
        borderRadius: "8px",
      }}
    />
    <h2 style={{ color: "darkred" }}>{movie.title}</h2>
    <div
      style={{
        border: "5px solid grey",  // viền màu xám nhạt
        padding: "12px",           // khoảng cách bên trong
        borderRadius: "8px",       // bo góc
        margin: "12px auto",       // khoảng cách phía trên dưới và căn giữa nếu muốn
        textAlign: "left",          // chữ canh trái trong khung
        backgroundColor: "#ccc",
      }}
    >
      <h3>Description:</h3>
      <p>{movie.overview}</p>
      <p><strong>Release Date:</strong> {movie.release_date}</p>
      <p><strong>Genres:</strong> {movie.genres.map((genre) => genre.name).join(", ")}</p>
    </div>
    <button onClick={handleFavoriteClick} style={{
        border: "1px solid",
        padding: "12px",           // khoảng cách bên trong
        borderRadius: "8px",       // bo góc
        margin: "12px auto",       // khoảng cách phía trên dưới và căn giữa nếu muốn
        textAlign: "left",          // chữ canh trái trong khung
        backgroundColor: "yellowgreen",
      }}>
      {isFavorite ? "💖 Unfavorite" : "🤍 Favorite"}
    </button>
  </div>
);
};

export default MovieDetails;
