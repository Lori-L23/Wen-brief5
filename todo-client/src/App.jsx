import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { AuthProvider } from "./contexts/AuthContext";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Dashboard from "./Pages/Dashboard";
import PrivateRoute from "./composants/PrivateRoute";
import { AuthProvider } from "./contexts/AuthContext"; // adapte si le dossier s'appelle "context" ou "contexts"

// import 'App/css';

function App() {
  return (
    <AuthProvider>

<BrowserRouter>

      <Routes>
        {/* <Route path="/" element={<Login />} /> */}
        <Route path="/Login" element={<Login />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/register" element={<Register />} />
        {/* <Route element={<PrivateRoute />}>
      </Route> */}
      </Routes>
    </BrowserRouter>

    </AuthProvider>

    


  )
}

export default App;
