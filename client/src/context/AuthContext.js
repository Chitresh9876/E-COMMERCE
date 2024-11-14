import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      const decodedToken = jwtDecode(token);
      setUser(decodedToken);
      setRole(decodedToken.role);
      setUserId(decodedToken._id);
    }
  }, [token]);

  const loginAction = (authToken) => {
    const decodedToken = jwtDecode(authToken);
    setToken(authToken);
    setRole(decodedToken.role);
    setUserId(decodedToken._id);

    // Store the token in localStorage
    localStorage.setItem("token", authToken);

    // Redirect based on role
    decodedToken.role === "admin"
      ? navigate("/inventory")
      : navigate("/products");
  };

  const logoutAction = () => {
    setToken(null);
    setRole(null);
    setUserId(null);
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <AuthContext.Provider
      value={{ token, role, userId, loginAction, logoutAction }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
