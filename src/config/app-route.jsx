import React from "react";
import App from "./../app.jsx";
import { Navigate } from "react-router-dom";

import Landing from "./../pages/landing/landing.js";
import PagesError from "./../pages/pages/error.js";
import Register from "./../pages/auth/register.js";
import Login from "./../pages/auth/login.js";
const AppRoute = [
  {
    path: "*",
    element: <App />,
    children: [
      { path: "", element: <Navigate to="/home" /> },
      { path: "home", element: <Landing /> },
      { path: "register", element: <Register /> },
      { path: "login", element: <Login /> },
      { path: "*", element: <PagesError /> },
    ],
  },
];

export default AppRoute;
