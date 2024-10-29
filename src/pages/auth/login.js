import React, { useEffect, useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { AppSettings } from "./../../config/app-settings.js";
import { useAuth } from "../../context/authProvider.js";
import AuthService from "../../sevices/auth-service.js";
import { ToastContainer, toast } from "react-toastify";

function PagesLogin() {
  const context = useContext(AppSettings);
  const { setIsAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [redirect, setRedirect] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Validate form data
  const validateForm = () => {
    const { email, password } = formData;
    if (!email || !password) {
      return "All fields are required";
    }

    return "";
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      const response = await AuthService.login(formData);
      if (response?.success) {
        successNotify("Login is successfully.");

        const bearToken = response?.token;
        const token = bearToken.slice(7);

        localStorage.setItem("token", token);
        localStorage.setItem("isAuthenticated", true);

        const userData = JSON.stringify(response?.userData);
        localStorage.setItem("userData", userData);

        handleProfileNavigation();

        setIsAuthenticated(true);
      }
      setError("");
    } catch (err) {
      errorNotify(err?.message);
    }
  };

  const handleProfileNavigation = () => {
    setTimeout(() => {
      navigate("/profile", { replace: true });
    }, 2000);
  };

  const successNotify = (msg) => {
    toast.info(msg, {
      autoClose: 5000, // Duration in milliseconds
    });
  };

  const errorNotify = (msg) => {
    toast.warning(msg, {
      autoClose: 5000, // Duration in milliseconds
    });
  };

  useEffect(() => {
    context.setAppHeaderNone(true);
    context.setAppSidebarNone(true);
    context.setAppContentClass("p-0");

    return function cleanUp() {
      context.setAppHeaderNone(false);
      context.setAppSidebarNone(false);
      context.setAppContentClass("");
    };

    // eslint-disable-next-line
  }, []);

  return (
    <div className="login">
      <div className="login-content">
        <ToastContainer />
        <form onSubmit={handleSubmit}>
          <h1 className="text-center">Sign In</h1>
          <div className="text-inverse text-opacity-50 text-center mb-4">
            For your protection, please verify your identity.
          </div>
          {error && (
            <p style={{ color: "red" }}>
              <i className="bi bi-exclamation-triangle me-2"></i>
              {error}
            </p>
          )}
          <div className="mb-3">
            <label className="form-label">
              Email Address <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              name="email"
              onChange={handleChange}
              value={formData.email}
              className="form-control form-control-lg bg-white bg-opacity-5"
              placeholder=""
            />
          </div>
          <div className="mb-3">
            <div className="d-flex">
              <label className="form-label">
                Password <span className="text-danger">*</span>
              </label>
              <a
                href="#/"
                className="ms-auto text-inverse text-decoration-none text-opacity-50"
              >
                Forgot password?
              </a>
            </div>
            <input
              type="password"
              name="password"
              onChange={handleChange}
              value={formData.password}
              className="form-control form-control-lg bg-white bg-opacity-5"
              placeholder=""
            />
          </div>
          <div className="mb-3">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                id="customCheck1"
              />
              <label className="form-check-label" htmlFor="customCheck1">
                Remember me
              </label>
            </div>
          </div>
          <button
            type="submit"
            className="btn btn-outline-theme btn-lg d-block w-100 fw-500 mb-3"
          >
            Sign In
          </button>
          <div className="text-center text-inverse text-opacity-50">
            Don't have an account yet? <Link to="/register">Sign up</Link>.
          </div>
        </form>
      </div>
    </div>
  );
}

export default PagesLogin;
