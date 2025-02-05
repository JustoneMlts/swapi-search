import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import DetailPage from "./pages/DetailPage";
import { clearSearchResults } from "./redux/slices/searchSlice";
import { useDispatch } from "react-redux";

export const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const dispatch = useDispatch();
  
  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    dispatch(clearSearchResults());
  }

  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={isAuthenticated ? <Navigate to="/home" /> : <Login handleLogin={handleLogin} />}
        />
        <Route path="/home" element={isAuthenticated ? <Home handleLogout={handleLogout} /> : <Navigate to="/login" />} />
        <Route path="/" element={<Navigate to={isAuthenticated ? "/home" : "/login"} />} />
        <Route path="/:category/:id" element={<DetailPage />} />
      </Routes>
    </Router>
  );
};

export default App;
