import React, { useEffect, useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { AppSettings } from "./../../config/app-settings.js";
import { useAuth } from "../../context/authProvider.js";
import AuthService from "../../sevices/auth-service.js";
import { ToastContainer, toast } from "react-toastify";
import { Form } from "react-bootstrap";
import Header from "../landing/header/index.js";
import BannerSection from "../landing/banner/index.js";
import BeatLoader from "react-spinners/BeatLoader";
import BlockUI from "react-block-ui";
import "react-block-ui/style.css";

function PagesLogin() {
  const navigate = useNavigate();
  const context = useContext(AppSettings);
  const { setIsAuthenticated } = useAuth();
  const [redirect, setRedirect] = useState(false);

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    enrollmentNumber: "",
    password: "",
    role: "2",
    rememberMe: false
  });

  const [rememberMe, setRememberMe] = useState(false);

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
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
      rememberMe: rememberMe
    });

    try {
      setLoading(true);
      const response = await AuthService.login(formData);
      setLoading(false);
      if (response?.success) {
        successNotify("Login is successfully.");

        const bearToken = response?.token;
        const token = bearToken.slice(7);

        if (rememberMe) {
          localStorage.setItem("token", token);
        } else {
          localStorage.setItem("token", token);
        }

        localStorage.setItem("isAuthenticated", true);

        const userData = JSON.stringify(response?.userData);
        localStorage.setItem("userData", userData);

        handleProfileNavigation();

        setIsAuthenticated(true);
      }
      setError("");
    } catch (err) {
      setLoading(false);
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
    setLoading(false);
  };

  const handleProfileNavigation = () => {
    setTimeout(() => {
      navigate("/profile", { replace: true });
    }, 2000);
  };

  const successNotify = (msg) => {
    toast.info(msg, {
      autoClose: 5000 // Duration in milliseconds
    });
  };

  const errorNotify = (msg) => {
    toast.warning(msg, {
      autoClose: 5000 // Duration in milliseconds
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
      <BlockUI blocking={loading}>
        <Header />
        <BannerSection />
        <div className="login mt-3 mt-md-5">
          <div className="login-content">
            <form onSubmit={handleSubmit} className="bg-gray p-3 p-md-5">
              <h1 className="text-center">
                Sign in for the UMCH Ticket System
              </h1>
              <div className="text-inverse text-opacity-50 text-center mb-5 mt-3 mt-md-5">
                <p className="text-inverse text-opacity-50 text-center sm-font">
                  Dear Students,
                </p>
                <p className="text-inverse text-opacity-50 text-center sm-font">
                  the UMCH Ticket System is here to ensure you can easily reach
                  our team for assistance with requests and complaints. Please
                  sign in and provide the details of your inquiry so we can
                  address it promptly and effectively.
                </p>
              </div>

              <Form.Group controlId="enrollmentNumber">
                <Form.Label className="input-label">
                  Enrollment Number{" "}
                  <span className="ms-1 required-label">*</span>
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
              {/* <div className="mb-3">
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
            </div> */}
              <button
                type="submit"
                className="btn btn-primary btn-lg d-block w-100 fw-500 mb-3"
              >
                {loading ? (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center"
                    }}
                  >
                    <BeatLoader color="white" size={10} />
                  </div>
                ) : (
                  <span>Sign In</span>
                )}
              </button>

              <p className="sm-font mt-3 text-center">
                For any questions regarding the ticket system, we offer you the
                following assistance:
              </p>
              <p className="sm-font text-center">
                Content-related questions:{" "}
                <a
                  href="mailto:secretary@edu.umch.de"
                  className="default-color text-decoration-none"
                >
                  secretary@edu.umch.de
                </a>
              </p>

              <p className="sm-font text-center">
                Technical questions:
                <a
                  href="mailto:secretary@edu.umch.de"
                  className="default-color text-decoration-none"
                >
                  marketing@edu.umch.de
                </a>
              </p>
              <div className="text-center text-inverse text-opacity-50">
                Don't have an account yet?{" "}
                <Link to="/register" className="default-color">
                  Sign up
                </Link>
                .
              </div>
              <div className="text-inverse text-opacity-50 text-center mt-3">
                Forget your password?{" "}
                <Link to="/#" className="default-color">
                  Reset Password
                </Link>
              </div>
            </form>
          </div>
        </div>
      </BlockUI>
    </>
  );
}

export default PagesLogin;
