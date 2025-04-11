import { createContext, useContext, useState, useEffect } from "react";
// import {register,login,getUser,isAuthenticated,logout} from '../services/api';
import api from "../services/Api"; // Adjust the import based on your project structure
import axios from "axios";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          const { data } = await api.get("/user");
          setUser(data.user);
        }
      } catch (error) {
        localStorage.removeItem("token");
      } finally {
        setLoading(false);
      }
    };
    loadUser();
  }, []);

  const login = async (email, password) => {
    try {
      const response = await axios.post('http://localhost:8000/api/auth/login', {
        email,
        password,
      });
  
      console.log("Login success:", response.data);
  
      // sauvegarde le token si nécessaire
      setUser(response.data.user);
      localStorage.setItem('token', response.data.token);
  
      return { success: true };
    } catch (error) {
      console.error("Login failed:", error.response?.data || error.message);
      return {
        success: false,
        error: error.response?.data?.message || 'Login failed',
        errors: error.response?.data?.errors || null
      };
    }
  };



  const register = async (userData) => {
    try {
      const response = await axios.post('http://localhost:8000/api/auth/register', userData);
      console.log("Registration success:", response.data);
      return { success: true, data: response.data };
    } catch (error) {
      console.error("Registration failed:", error.response?.data || error.message);
      return {
        success: false,
        error: error.response?.data?.message || 'Registration failed',
        errors: error.response?.data?.errors || null
      };
    }
  };

  const logout = async () => {
    try {
      await api.post("auth/logout");
    } finally {
      localStorage.removeItem("token");
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};