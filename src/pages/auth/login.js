import React, { useEffect, useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { AppSettings } from "./../../config/app-settings.js";
import { useAuth } from "../../context/authProvider.js";
import AuthService from "../../sevices/auth-service.js";
import { ToastContainer, toast } from "react-toastify";
import { Form } from "react-bootstrap";
import Header from "../landing/header/index.js";

function PagesLogin() {
  const navigate = useNavigate();
  const context = useContext(AppSettings);
  const { setIsAuthenticated } = useAuth();
  const [redirect, setRedirect] = useState(false);

  const [formData, setFormData] = useState({
    enrollmentNumber: "",
    password: "",
    role: "2",
    rememberMe: false,
  });

  const [rememberMe, setRememberMe] = useState(false);

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
    const { enrollmentNumber, password } = formData;
    if (!enrollmentNumber || !password) {
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

    setFormData({
      ...formData,
      rememberMe: rememberMe,
    });

    try {
      const response = await AuthService.login(formData);
      if (response?.success) {
        successNotify("Login is successfully.");

        const bearToken = response?.token;
        const token = bearToken.slice(7);

        if (rememberMe) {
          localStorage.setItem("token", token);
        } else {
          sessionStorage.setItem("token", token);
        }

        localStorage.setItem("isAuthenticated", true);

        const userData = JSON.stringify(response?.userData);
        localStorage.setItem("userData", userData);

        handleProfileNavigation();

        setIsAuthenticated(true);
      }
      setError("");
    } catch (err) {
      const errors = err?.errors ? err?.errors : err?.message;

      if (typeof errors != "object") {
        errorNotify(errors);
      } else {
        console.log(typeof errors);
        errors.map((error) => {
          errorNotify(error.msg);
        });
      }
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
    <>
      <Header />

      <div className="login mt-3 mt-md-5">
        <div className="login-content">
          <ToastContainer />
          <form onSubmit={handleSubmit} className="bg-gray p-3 p-md-5">
            <h1 className="text-center">Sign In</h1>
            <div className="text-inverse text-opacity-50 text-center mb-4">
              For your protection, please verify your identity.
            </div>
            {/* {error && (
            <p style={{ color: "red" }}>
              <i className="bi bi-exclamation-triangle me-2"></i>
              {error}
            </p>
          )} */}
            {/* <div className="mb-3">
            <label className="form-label">
              Enrollment Number <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              name="enrollmentNumber"
              onChange={handleChange}
              value={formData.enrollmentNumber}
              className="form-control form-control-lg bg-white bg-opacity-5"
              placeholder=""
            />
          </div> */}

            <Form.Group controlId="enrollmentNumber">
              <Form.Label className="input-label">
                Enrollment Number <span className="ms-1 required-label">*</span>
              </Form.Label>
              <Form.Control
                type="text"
                name="enrollmentNumber"
                onChange={handleChange}
                value={formData.enrollmentNumber}
                placeholder="Enrollment Number"
                className="custom-input"
              />
            </Form.Group>
            <div className="mb-3 mt-4">
              {/* <div className="d-flex">
              <label className="form-label">
                Password <span className="text-danger">*</span>
              </label>
            </div>
            <input
              type="password"
              name="password"
              onChange={handleChange}
              value={formData.password}
              className="form-control form-control-lg bg-white bg-opacity-5"
              placeholder=""
            /> */}

              <Form.Group controlId="password">
                <Form.Label className="input-label">
                  Password <span className="ms-1 required-label">*</span>
                </Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  onChange={handleChange}
                  value={formData.password}
                  placeholder="Password"
                  className="custom-input"
                />
              </Form.Group>
            </div>
            <div className="mb-3">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="customCheck1"
                  value={rememberMe}
                  onClick={(e) => setRememberMe(e.target.checked)}
                />
                <label className="form-check-label" htmlFor="customCheck1">
                  Remember me
                </label>
              </div>
            </div>
            <button
              type="submit"
              className="btn btn-primary btn-lg d-block w-100 fw-500 mb-3"
            >
              Sign In
            </button>
            <div className="text-center text-inverse text-opacity-50">
              Don't have an account yet?{" "}
              <Link to="/register" className="default-color">
                Sign up
              </Link>
              .
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default PagesLogin;
