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
import AdminLogin from "../pages/auth/adminLogin.js";
import AccountManagement from "../pages/table/plugins.js";
import TicketReopen from "../pages/ticket/reopen.js";
import EmailTemplateManagement from "../pages/email-template/index.js";
import ResetPassword from "../pages/auth/resetPassword.js";
import AdminResetPassword from "../pages/auth/adminResetPassword.js";
import TicketGroup from "./../pages/ticket-group/index.js";
import TicketTypes from "./../pages/ticket-types/index.js";

const AppRoute = [
  {
    path: "*",
    element: <App />,
    children: [
      { path: "", element: <Navigate to="/login" /> },
      {
        path: "home",
        element: (
          <ProtectedRoute>
            <Landing />
          </ProtectedRoute>
        )
      },
      { path: "register", element: <Register /> },
      { path: "admin", element: <AdminLogin /> },
      { path: "login", element: <Login /> },
      { path: "reset-password", element: <ResetPassword /> },
      { path: "admin-reset-password", element: <AdminResetPassword /> },
      {
        path: "ticket-reopen/:id",
        element: (
          <ProtectedRoute>
            <TicketReopen />
          </ProtectedRoute>
        )
      },
      {
        path: "profile",
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        )
      },
      {
        path: "account-management",
        element: (
          <ProtectedRoute>
            <AccountManagement />
          </ProtectedRoute>
        )
      },
      {
        path: "email-template",
        element: (
          <ProtectedRoute>
            <EmailTemplateManagement />
          </ProtectedRoute>
        )
      },
      {
        path: "ticket-group",
        element: (
          <ProtectedRoute>
            <TicketGroup />
          </ProtectedRoute>
        )
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
            )
          },
          {
            path: "compose",
            element: (
              <ProtectedRoute>
                <EmailCompose />
              </ProtectedRoute>
            )
          },
          {
            path: "detail",
            element: (
              <ProtectedRoute>
                <EmailDetail />
              </ProtectedRoute>
            )
          }
        ]
      },
      {
        path: "ticket-types",
        element: (
          <ProtectedRoute>
            <TicketTypes />
          </ProtectedRoute>
        )
      },
      { path: "*", element: <PagesError /> }
    ]
  }
];

export default AppRoute;
