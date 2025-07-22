import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext'; // import AuthProvider
import Home from './pages/Home';
import Login from './pages/Login';
import MovieDetails from './pages/MovieDetails';
import Header from "./components/Header";
import { GenreProvider } from "./contexts/GenreContext";
import { FavoritesProvider } from "./contexts/FavoriteContext";

const App = () => {
  return (
    <AuthProvider>
      <GenreProvider>
        <FavoritesProvider>
          <Router>
            <Header />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/movie/:id" element={<MovieDetails />} />
            </Routes>
          </Router>
        </FavoritesProvider>
      </GenreProvider>
    </AuthProvider>
  );
};

export default App;



// note: // Trong React Router, dấu : cho biết đây là route động (dynamic route).