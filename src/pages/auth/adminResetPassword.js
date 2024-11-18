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

function AdminResetPassword() {
  const navigate = useNavigate();
  const context = useContext(AppSettings);

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: ""
  });

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
    const { email } = formData;
    if (!email) {
      return "Email Address is required";
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
      setLoading(true);
      const response = await AuthService.adminResetPassword(formData);

      setLoading(false);
      successNotify(response?.message);
      setError("");
    } catch (err) {
      setLoading(false);
      errorNotify(err?.message);
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
            <form className="bg-gray p-3 p-md-5">
              <h1 className="text-center">
                Reset Password for the UMCH Ticket System
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

              <Form.Group controlId="email">
                <Form.Label className="input-label">
                  Email <span className="ms-1 required-label">*</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  name="email"
                  onChange={handleChange}
                  value={formData.email}
                  placeholder="Email Address"
                  className="custom-input"
                />
              </Form.Group>
              {error && <p className="error-content">{error}</p>}
              <button
                type="submit"
                onClick={handleSubmit}
                className="btn btn-primary btn-lg d-block w-100 fw-500 my-3"
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
                  <span>Reset Password</span>
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

              <div className="text-inverse text-opacity-50 text-center">
                Please login here{" "}
                <Link to="/admin" className="default-color">
                  Sign In
                </Link>
              </div>
            </form>
          </div>
        </div>
      </BlockUI>
    </>
  );
}

export default AdminResetPassword;
