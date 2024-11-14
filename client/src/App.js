import "./App.css";
import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import LoginForm from "./components/LoginForm";
import ProductList from "./components/ProductList";
import InventorySummary from "./components/InventorySummary";

const PrivateRoute = ({ children, role }) => {
  const { token, role: userRole } = useAuth();
  if (!token) return <Navigate to="/login" />;
  if (role && role !== userRole) return <Navigate to="/" />; 
  return children;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginForm />} />
          <Route
            path="/products"
            element={
              <PrivateRoute role="user">
                <ProductList />
              </PrivateRoute>
            }
          />
          <Route
            path="/inventory"
            element={
              <PrivateRoute role="admin">
                <InventorySummary />
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
