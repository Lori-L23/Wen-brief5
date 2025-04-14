import { createContext, useContext, useState, useEffect } from "react";
import Api from "../services/Api"; // Assure-toi d'utiliser Api et non axios directement
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const token = localStorage.getItem("token"); // Même clé que login()
        if (token) {
          Api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
          const { data } = await Api.get("/user");
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

  // const login = async (email, password) => {
  //   try {
  //     const response = await axios.post(
  //       "http://127.0.0.1:8000/api/auth/login",
  //       {
  //         email,
  //         password,
  //       }
  //     );
  //     console.log("Réponse complète de l'API:", response.data); // Debug

  //     // Extrait le token selon le format de l'API
  //     const token =
  //       response.data.token ||
  //       response.data.access_token ||
  //       response.data.data?.token;

  //     if (!token) {
  //       console.error("Token missing in response:", response.data);
  //       return { success: false, error: "Token missing in server response" };
  //     }

  //     localStorage.setItem("token", token);
  //     Api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  //     // Si l'API ne renvoie pas l'utilisateur, vous devrez peut-être faire un appel supplémentaire
  //     if (!user) {
  //       const userResponse = await Api.get("/user");
  //       setUser(userResponse.data);
  //     } else {
  //       setUser(response.data.user || response.data.data.user);
  //     }

  //     return { success: true };
  //   } catch (err) {
  //     const errorMsg =
  //       err.response?.data?.message || err.response?.data?.error || err.message;
  //     return { success: false, error: errorMsg };
  //   }
  // };

  const login = async (email, password) => {
    try {
      const { data } = await Api.post("/auth/login", { email, password });

      localStorage.setItem("token", data.token);
      setUser(data.user);

      return { success: true };
    } catch (error) {
      let errorMsg = "Erreur de connexion";

      if (error.response?.status === 422) {
        errorMsg = Object.values(error.response.data.errors).flat().join("\n");
      } else if (error.response?.data?.message) {
        errorMsg = error.response.data.message;
      }

      return { success: false, error: errorMsg };
    }
  };

  const register = async (userData) => {
    try {
      const response = await Api.post("/auth/register", userData); // Utilise Api ici

      // Sauvegarder le token
      // localStorage.setItem('token', response.data.token);

      // Mettre à jour l'utilisateur courant
      setUser(response.data.user);

      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || "Registration failed",
        errors: error.response?.data?.errors || {},
      };
    }
  };

  const logout = async () => {
    try {
      await Api.post("/auth/logout"); // Utilise Api ici
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
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
