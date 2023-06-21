import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import SignUp from "pages/SignUp/SignUp";
import SignIn from "pages/SignIn/SignIn";
import { createContext, useState } from "react";
import ToDoList from "./pages/ToDoList/ToDoList";
import PropTypes from "prop-types";
import Home from "pages/Home/Home";

export const AuthContext = createContext(null);
function App() {
  const [access_token, setAccessToken] = useState(localStorage.getItem("access_token"));

  const handleLogin = (newAccessToken) => {
    setAccessToken(newAccessToken);
    localStorage.setItem("access_token", newAccessToken);
  };
  const handleLogout = () => {
    setAccessToken(null);
  };
  const value = {
    access_token,
    onLogin: handleLogin,
    onLogout: handleLogout,
  };

  const ProtectedRoute = ({ children }) => {
    const current_location = window.location.pathname;
    if (current_location == "/todo") {
      if (!access_token) {
        return <Navigate to="/signin" replace />;
      }
    } else {
      if (access_token) {
        return <Navigate to="/todo" replace />;
      }
    }
    return children;
  };

  ProtectedRoute.propTypes = {
    children: PropTypes.node.isRequired,
  };
  return (
    <Router>
      <AuthContext.Provider value={value}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/signup"
            element={
              <ProtectedRoute>
                <SignUp />
              </ProtectedRoute>
            }
          />
          <Route
            path="/signin"
            element={
              <ProtectedRoute>
                <SignIn />
              </ProtectedRoute>
            }
          />
          <Route
            path="/todo"
            element={
              <ProtectedRoute>
                <ToDoList />
              </ProtectedRoute>
            }
          />
        </Routes>
      </AuthContext.Provider>
    </Router>
  );
}

export default App;
