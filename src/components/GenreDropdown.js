import React from "react";

const GenreDropdown = ({ genres, selectedGenre, setSelectedGenre }) => {
  return (
    <div style={{ marginBottom: "20px" }}>
      <select
        value={selectedGenre}
        onChange={(e) => setSelectedGenre(e.target.value)}
        style={{
          padding: "8px",
          width: "200px",
          backgroundColor: "lightcoral",
          cursor: "pointer",
          transition: "background-color 0.3s ease",
        }}
      >
        <option value="all">All Genre</option>
        {genres.map((genre) => (
          <option value={genre.id} key={genre.id}>
            {genre.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default GenreDropdown;