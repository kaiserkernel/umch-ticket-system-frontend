import React, { useEffect, useContext, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { AppSettings } from "./../../config/app-settings.js";
import { useAuth } from "../../context/authProvider.js";
import AuthService from "../../sevices/auth-service.js";
import { toast } from "react-toastify";
import { Form } from "react-bootstrap";
import Header from "../landing/header/index.js";
import BannerSection from "../landing/banner/index.js";
import BeatLoader from "react-spinners/BeatLoader";
import BlockUI from "react-block-ui";
import "react-block-ui/style.css";
import {
  GoogleReCaptchaProvider,
  useGoogleReCaptcha
} from 'react-google-recaptcha-v3';
import { jwtDecode } from "jwt-decode";


const PagesLogin = () => (
  <GoogleReCaptchaProvider reCaptchaKey={process.env.REACT_APP_SITE_KEY || ''}>
    <ReCaptchaComponent />
  </GoogleReCaptchaProvider>
)

function ReCaptchaComponent() {
  const navigate = useNavigate();
  const context = useContext(AppSettings);
  const { setIsAuthenticated } = useAuth();
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [error, setError] = useState({
    enrollmentNumber: true,
    password: true
  })

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    enrollmentNumber: "",
    password: "",
    role: "2"
  });

  const [rememberMe, setRememberMe] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    setError(prev => ({
      ...prev,
      [name]: true
    }))
  };

  // Validate form data
  const validateForm = () => {
    const { enrollmentNumber, password } = formData;
    if (enrollmentNumber && password) {
      return true;
    } else {
      const _error = {}
      if (!enrollmentNumber) {
        _error.enrollmentNumber = false
      }
      if (!password) {
        _error.password = false;
      }
      setError(prev => ({ ...prev, ..._error }));
      return false;
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationResult = validateForm();
    if (!validationResult) {
      return;
    }

    try {
      setLoading(true);

      if (!executeRecaptcha) {
        errorNotify('reCAPTCHA is not ready. Please try again');
        setLoading(false)
        return;
      }

      // Fecth the reCAPTCHA token dynamically at submission time
      const recaptChatoken = await executeRecaptcha('user_login_action')

      const response = await AuthService.login({ ...formData, recaptChatoken });
      setLoading(false);

      if (response?.success) {

        if (rememberMe) {
          localStorage.setItem('enrollmentNumber', formData.enrollmentNumber);
          localStorage.setItem('enrollmentPassword', formData.password);
          localStorage.setItem('enrollmentRememberMe', rememberMe)
        } else {
          localStorage.removeItem('enrollmentNumber');
          localStorage.removeItem('enrollmentPassword');
          localStorage.removeItem('enrollmentRememberMe');
        }

        successNotify("Login is successful.");

        const bearToken = response?.token;
        const token = bearToken.slice(7);

        localStorage.setItem("token", token);

        localStorage.setItem("isAuthenticated", true);

        const userData = JSON.stringify(response?.userData);
        localStorage.setItem("userData", userData);

        handleProfileNavigation();

        setIsAuthenticated(true);
      }
      setError({
        enrollmentNumber: true,
        password: true
      });
    } catch (err) {
      setLoading(false);
      if (typeof err === "string") {
        errorNotify(err);
        return;
      } else {
        const errors = err?.errors ? err?.errors : err?.message;
  
        if (typeof errors != "object") {
          errorNotify(errors);
        } else {
          errors.map((error) => {
            errorNotify(error.msg);
          });
        }
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

    // check localstorage and set password and enrollment number
    const _enrollmentNumber = localStorage.getItem('enrollmentNumber');
    const _enrollmentPassword = localStorage.getItem('enrollmentPassword');
    const _enrollmentRememberMe = localStorage.getItem('enrollmentRememberMe');

    const lsFormData = {};
    if (_enrollmentNumber) {
      lsFormData.enrollmentNumber = _enrollmentNumber
    }
    if (_enrollmentPassword) {
      lsFormData.password = _enrollmentPassword
    }
    if (_enrollmentRememberMe == 'true') {
      setRememberMe(true)
    }
    setFormData(prev => ({ ...prev, ...lsFormData }));

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
                Sign In for UMCH Ticket System
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
                  {" "}( eg. 264 )
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
              {!error.enrollmentNumber ? <p className="text-danger">Required Field</p> : ""}
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
                {!error.password ? <p className="text-danger">Required Field</p> : ""}
              </div>
              <Form.Group className="mb-3">
                <Form.Check type="switch" label="Remember me"
                  onChange={(evt) => setRememberMe(!rememberMe)}
                  checked={rememberMe}
                />
              </Form.Group>
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
                Technical questions:{` `}
                <a
                  href="mailto:secretary@edu.umch.de"
                  className="default-color text-decoration-none"
                >
                  marketing@edu.umch.de
                </a>
              </p>
              <div className="text-center text-inverse text-opacity-50">
                <Link to="/register" className="default-color">
                  Create an account
                </Link>
                .
              </div>
              <div className="text-inverse text-opacity-50 text-center mt-3">
                Forgotten your password?{" "}
                <Link to="/reset-password" className="default-color">
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
