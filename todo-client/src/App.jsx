import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { AuthProvider } from "./contexts/AuthContext";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Dashboard from "./Pages/Dashboard";
import PrivateRoute from "./composants/PrivateRoute";
// import 'App/css';

function App() {
  return (
    <AuthProvider>
      {/* <TaskProvider> */}
        <BrowserRouter>

          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/Dashboard" element={<Dashboard />} />
            <Route path="/register" element={<Register />} />
            {/* <Route element={<PrivateRoute />}>
          </Route> */}
          </Routes>
        </BrowserRouter>
      {/* </TaskProvider> */}
    </AuthProvider>

    // <BrowserRouter> {/* Enveloppez votre <Routes> avec <Router> */}
    // <Routes>
    //     <Route path="/register" element={<Register />} />
    //     <Route path="/Login" element={<Login />} />
    //     <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
    //     <Route path="/" element={<PrivateRoute><Dashboard /></PrivateRoute>} /> {/* Redirect root to dashboard if logged in */}
    // </Routes>
    // </BrowserRouter>
  );
}

export default App;
