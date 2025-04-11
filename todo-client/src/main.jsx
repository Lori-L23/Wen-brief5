import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import ReactDOM from 'react-dom/client';
import React from 'react';


// import './index.css'
import { AuthProvider } from "./contexts/AuthContext"; // adapte ce chemin si nécessaire

import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);
