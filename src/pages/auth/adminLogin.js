import React, { useEffect, useContext, useState, useCallback } from "react";
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
import { setDefaultLocale } from "react-datepicker";
import BlockUI from "react-block-ui";
import "react-block-ui/style.css";
import {
  GoogleReCaptchaProvider,
  useGoogleReCaptcha
} from 'react-google-recaptcha-v3';

const AdminLogin = () => (
  <GoogleReCaptchaProvider reCaptchaKey={process.env.REACT_APP_SITE_KEY || ''}>
    <ReCaptchaComponent />
  </GoogleReCaptchaProvider>
)

function ReCaptchaComponent() {
  const navigate = useNavigate();
  const context = useContext(AppSettings);
  const { setIsAuthenticated } = useAuth();
  const [redirect, setRedirect] = useState(false);
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [recaptChatoken, setReCaptChaToken] = useState('');

  const handleReCaptchaVerify = useCallback(async () => {
    if (!executeRecaptcha) {
      console.log('Execute recaptcha not yet available');
      return;
    }

    const _recaptChatoken = await executeRecaptcha('submit_form');
    setReCaptChaToken(_recaptChatoken);
    // Do whatever you want with the recaptChatoken
  }, [executeRecaptcha]);

  useEffect(() => {
    if (executeRecaptcha) {
      handleReCaptchaVerify();
    }
  }, [executeRecaptcha]);

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const [loading, setLoading] = useState(false);

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
      setLoading(true);
      const response = await AuthService.adminLogin({ ...formData, recaptChatoken: recaptChatoken });
      setLoading(false);
      if (response?.success) {

        if (rememberMe) {
          localStorage.setItem('email', formData.email);
          localStorage.setItem('emailPassword', formData.password);
          localStorage.setItem('emailRememberMe', rememberMe)
        } else {
          localStorage.removeItem('email');
          localStorage.removeItem('emailPassword');
          localStorage.removeItem('emailRememberMe');
        }

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

    // check localstorage and set password and enrollment number
    const _email = localStorage.getItem('email');
    const _emailPassword = localStorage.getItem('emailPassword');
    const _emailRememberMe = localStorage.getItem('emailRememberMe');

    const lsFormData = {};
    if (_email) {
      lsFormData.email = _email
    }
    if (_emailPassword) {
      lsFormData.password = _emailPassword
    }
    if (_emailRememberMe == 'true') {
      console.log(_emailRememberMe, 'kkk')
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
              <h1 className="text-center">Sign In</h1>
              <div className="text-inverse text-opacity-50 text-center mb-4">
                For your protection, please verify your identity.
              </div>

              <div className="mb-3">
                <Form.Group controlId="Email">
                  <Form.Label className="input-label">
                    Email <span className="ms-1 required-label">*</span>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="email"
                    onChange={handleChange}
                    value={formData.email}
                    placeholder="Email"
                    className="custom-input"
                  />
                </Form.Group>
              </div>
              <div className="mb-3">
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
              <Form className="mb-3">
                <Form.Check type="switch" label="Remember me"
                  onChange={(evt) => setRememberMe(!rememberMe)}
                  checked={rememberMe}
                />
              </Form>

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
              <div className="text-center text-inverse text-opacity-50">
                Don't have an account yet?{" "}
                <Link to="/register" className="default-color">
                  Sign up
                </Link>
                .
              </div>
              <div className="text-inverse text-opacity-50 text-center mt-3">
                Forget your password?{" "}
                <Link to="/admin-reset-password" className="default-color">
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

export default AdminLogin;
