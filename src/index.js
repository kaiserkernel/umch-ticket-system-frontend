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

const container = document.getElementById("root");
const root = createRoot(container);

function App() {
  let element = useRoutes(AppRoute);
  let location = useLocation();
  const navigate = useNavigate();

  // Memoize the token validity check
  const tokenInfo = () => {
    const jwtToken = localStorage.getItem("token");
    try {
      if (!jwtToken) return false;

      const decoded = jwtDecode(jwtToken);

      if (!decoded.exp) return false;

      const currentTime = Date.now() / 1000; // Current time in seconds
      return decoded.exp > currentTime;
    } catch (error) {
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

    if (location.pathname === "/admin") {
      navigate('/admin');
      return;
    }

    // Redirect based on token state
    if (tokenInfo() && (location.pathname == "/" || location.pathname == "/login")) {
      navigate("/profile", { replace: true });
    } else {
      navigate("/login", { replace: true });
    }
  }, [location.pathname]);

  return element;
}

root.render(
  <HashRouter >
    <App />
  </HashRouter >
);
