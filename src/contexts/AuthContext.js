import React, { createContext, useState, useContext } from 'react';

// Tạo Context
const AuthContext = createContext();

// Tạo Provider bao quanh app hoặc một phần app
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // user null nghĩa chưa login

  // Khai bao login va logout dong thoi kiem tra username/password
  const login = (username, password) => {
    if (username === 'admin' && password === '123456') {
      setUser({ username });
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook dùng trong component khác để lấy dữ liệu
export const useAuth = () => useContext(AuthContext);
