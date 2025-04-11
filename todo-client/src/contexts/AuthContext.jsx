import { createContext, useContext, useState, useEffect } from "react";
// import {register,login,getUser,isAuthenticated,logout} from '../services/api';
import api from "../services/Api"; // Adjust the import based on your project structure

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

  const login = async (credentials) => {
    try {
      const { data } = await api.post('auth/login', credentials);
      localStorage.setItem('token', data.token);
      setUser(data.user);
      return { success: true, user: data.user }; // Retourne explicitement un objet
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Login failed' 
      };
    }
  };


  const register = async (credentials) => {
    const { data } = await api.post("auth/register", credentials);
    localStorage.setItem("token", data.token);
    setUser(data.user);
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