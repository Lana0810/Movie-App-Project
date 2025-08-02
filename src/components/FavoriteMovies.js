import React from "react";
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
} from "@mui/material";

const FavoriteMovies = ({ favoriteMovies }) => {
  if (favoriteMovies.length === 0) return null;

  return (
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
  );
};

export default FavoriteMovies;