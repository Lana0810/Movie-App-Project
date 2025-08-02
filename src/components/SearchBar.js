import React from "react";

const SearchBar = ({ searchTerm, setSearchTerm }) => {
  return (
    <input
      type="text"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      placeholder="Search movie..."
      style={{
        border: "1px solid",
        textAlign: "left",
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
  );
};

export default SearchBar;