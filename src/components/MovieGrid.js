import React from "react";
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
} from "@mui/material";

const MovieGrid = ({ movies, handleClick }) => {
  return (
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
  );
};

export default MovieGrid;