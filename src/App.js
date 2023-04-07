import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import SignUp from "pages/SignUp/SignUp";
import SignIn from "pages/SignIn/SignIn";
import { createContext, useState } from "react";
import ToDoList from "./pages/ToDoList/ToDoList";
import PropTypes from "prop-types";

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
    if (!access_token) {
      return <Navigate to="/signin" replace />;
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
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
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
