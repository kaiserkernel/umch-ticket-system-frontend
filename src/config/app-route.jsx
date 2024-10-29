import React from "react";
import App from "./../app.jsx";
import { Navigate } from "react-router-dom";
import ProtectedRoute from "../components/protectedRoute/protectedRoute.js";

import Landing from "./../pages/landing/landing.js";
import PagesError from "./../pages/error.js";
import Register from "./../pages/auth/register.js";
import Login from "./../pages/auth/login.js";
import Profile from "./../pages/profile/profile.js";
import EmailInbox from "./../pages/email/inbox.js";
import EmailCompose from "./../pages/email/compose.js";
import EmailDetail from "./../pages/email/detail.js";

const AppRoute = [
  {
    path: "*",
    element: <App />,
    children: [
      { path: "", element: <Navigate to="/home" /> },
      { path: "home", element: <Landing /> },
      { path: "register", element: <Register /> },
      { path: "login", element: <Login /> },
      {
        path: "profile",
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ),
      },
      {
        path: "email/*",
        children: [
          {
            path: "inbox",
            element: (
              <ProtectedRoute>
                <EmailInbox />
              </ProtectedRoute>
            ),
          },
          {
            path: "compose",
            element: (
              <ProtectedRoute>
                <EmailCompose />
              </ProtectedRoute>
            ),
          },
          {
            path: "detail",
            element: (
              <ProtectedRoute>
                <EmailDetail />
              </ProtectedRoute>
            ),
          },
        ],
      },
      { path: "*", element: <PagesError /> },
    ],
  },
];

export default AppRoute;
