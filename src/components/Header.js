import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { Button } from "@mui/material";

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header
      style={{
        backgroundColor: "#222",
        color: "white",
        padding: "10px 20px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap", // Để responsive nếu màn nhỏ
      }}
    >
      {/* Logo */}
      <div>
        <Link to="/" style={{ color: "white", textDecoration: "none", fontSize: "24px" }}>
          🎬 MovieApp
        </Link>
      </div>

      {/* Login/Logout */}
      <div>
        {user ? (
          <>
            <span style={{ marginRight: "10px" }}>👤 {user.username}</span>
            <Button variant="contained" color="secondary" onClick={handleLogout}>
              Logout
            </Button>
          </>
        ) : (
          <Link to="/login" style={{ color: "white", textDecoration: "none" }}>
            Login
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
