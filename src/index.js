import React, { useEffect, useMemo } from "react";
import { createRoot } from "react-dom/client";
import { HashRouter, useRoutes, useLocation, useNavigate } from "react-router-dom";
import AppRoute from "./config/app-route.jsx";
import { slideToggle } from "./composables/slideToggle.js";
import { jwtDecode } from "jwt-decode";

// bootstrap
import "bootstrap";

// css
import "bootstrap-icons/font/bootstrap-icons.css";
import "@fortawesome/fontawesome-free/css/all.css";
import "react-perfect-scrollbar/dist/css/styles.css";
import "./index.css";
import "./scss/styles.scss";
import AuthService from "./sevices/auth-service.js";

const container = document.getElementById("root");
const root = createRoot(container);

function App() {
  let element = useRoutes(AppRoute);
  let location = useLocation();
  const navigate = useNavigate();

  // Memoize the token validity check
  const tokenInfo = async () => {
    const jwtToken = localStorage.getItem("token");
    try {
      if (!jwtToken) return false;

      const decoded = jwtDecode(jwtToken);
      if (!decoded || !decoded.exp) return false;

      const currentTime = await AuthService.fetchServerTime();

      return decoded.exp > currentTime;
    } catch (error) {
      console.log(error, 'token info fetch error')
      return false;
    }
  };

  // Handle route changes
  useEffect(() => {
    const elm = document.querySelector(".app");
    if (elm) elm.classList.remove("app-sidebar-mobile-toggled");

    const elm2 = document.querySelector(".app-top-nav");
    if (elm2 && elm2.style.display === "block") {
      slideToggle(document.querySelector(".app-top-nav"));
    }

    if (location.pathname === "/admin" || location.pathname === "/register" || location.pathname === "/reset-password") {
      navigate(location.pathname);
      return;
    }

    if (!tokenInfo()) {
      navigate("/login");
      return;
    }

    // Redirect based on token state
    if (tokenInfo() && (location.pathname == "/")) {
      navigate("/profile");
      return;
    }

  }, [location.pathname]);

  return element;
}

root.render(
  <HashRouter >
    <App />
  </HashRouter >
);
