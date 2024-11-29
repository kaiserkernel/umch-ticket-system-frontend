import React, { useEffect, useContext, useState, useCallback } from "react";
import { Row, Col, Form } from "react-bootstrap";
import { Link, Navigate } from "react-router-dom";
import { AppSettings } from "./../../config/app-settings.js";
import AuthService from "../../sevices/auth-service.js";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import Header from "../landing/header/index.js";
import BannerSection from "../landing/banner/index.js";
import BeatLoader from "react-spinners/BeatLoader";
import BlockUI from "react-block-ui";
import "react-block-ui/style.css";
import {
  GoogleReCaptchaProvider,
  useGoogleReCaptcha
} from 'react-google-recaptcha-v3';

const PagesRegister = () => (
  <GoogleReCaptchaProvider reCaptchaKey={process.env.REACT_APP_SITE_KEY || ''}>
    <ReCaptchaComponent />
  </GoogleReCaptchaProvider>
)

const ReCaptchaComponent = () => {
  const context = useContext(AppSettings);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPass: "",
    role: "2",
    enrollmentNumber: "",
    firstYearOfStudy: "2024",
    avatar: null
  });
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

  const [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPass: "",
    enrollmentNumber: ""
  });

  const [imagePreview, setImagePreview] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    const { name, value, type, files } = event.target;
    if (file && file.type.startsWith("image/")) {
      const imageUrl = URL.createObjectURL(file);
      setImagePreview(imageUrl);
      setFormData({
        ...formData,
        [name]: type === "file" ? files[0] : value
      });
    }
  };
  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData({
      ...formData,
      [name]: type === "file" ? files[0] : value
    });
    setErrors(prev => ({
      ...prev,
      [name]: ""
    }))
  };

  // Validate form data
  const validateForm = () => {
    let error = {};

    // required field validation
    Object.keys(formData).map(log => {
      if (!formData[log] || formData[log]?.trim().length == 0) {
        error[log] = 'error'
      }
    })

    // password validation - role
    // min lenght 8
    // at least - one number, one capital letter, one small letter, one special letter
    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (formData.password && !passwordRegex.test(formData.password)) {
      error.password = 'warn'
    }

    // confirm password validation
    // if (formData.password && formData.confirmPass && formData.password !== formData.confirmPass) {
    //   error.confirmPass = 'warn'
    // } else if (formData.password && !formData.confirmPass) {
    //   error.confirmPass = 'error'
    // } else {
    //   error.confirmPass = ''
    // }
    if (!error.password && !formData.confirmPass) {
      error.confirmPass = 'error'
    } else if (!error.password && (formData.password !== formData.confirmPass)) {
      error.confirmPass = 'warn'
    } else {
      delete error.confirmPass
    }

    delete error.avatar

    if (Object.keys(error).length > 0) {
      setErrors(prev => ({ ...prev, ...error }));
      return false
    } else {
      return true
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const handleLoginNavigation = () => {
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    };

    // sign up validation
    const validation = validateForm();
    console.log(validation, 'res')
    if (!validation)
      return;

    try {
      const formDataToSend = new FormData();
      for (const key in formData) {
        formDataToSend.append(key, formData[key]);
      }
      setLoading(true);

      formDataToSend.append("recaptChatoken", recaptChatoken);

      const response = await AuthService.register(formDataToSend);
      successNotify(response.message);
      setLoading(false);
      handleLoginNavigation();
    } catch (err) {
      setLoading(false);
      const _errors = err?.errors;

      if (typeof _errors != "object") {
        errorNotify(_errors);
        setLoading(false);
      } else {
        console.log(typeof _errors);
        _errors.map((error) => {
          errorNotify(error.msg);
        });
      }
    }
    setLoading(false);
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
  }, []);

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
  return (
    <>
      <BlockUI blocking={loading}>
        <Header />
        <BannerSection />
        <div className="register">
          <div className="register-content">
            <form onSubmit={handleSubmit} className="bg-gray-auth p-3 p-md-5">
              <h1 className="text-center">Sign Up for UMCH Ticket System</h1>

              <p className="text-inverse text-opacity-50 text-center mt-5 sm-font">
                Dear Students,
              </p>
              <p className="text-inverse text-opacity-50 text-center sm-font">
                the UMCH Ticket System is here to ensure you can easily reach
                our team for assistance with requests and complaints.
              </p>
              <p className="text-inverse text-opacity-50 text-center sm-font">
                After signing up, you can easily use the ticket system and gain
                access to your personal dashboard, where all your tickets will
                be collected and managed.
              </p>

              <Row className="mt-2 mt-md-3 g-3">
                <Col lg={6}>
                  <Form.Group controlId="firstName">
                    <Form.Label className="input-label">
                      First Name <span className="ms-1 required-label">*</span>
                    </Form.Label>
                    <Form.Control
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      placeholder="First Name"
                      className="custom-input"
                    />
                  </Form.Group>
                  {errors.firstName == 'error' && <p className="text-danger sm-font">Required field</p>}
                </Col>
                <Col lg={6}>
                  <Form.Group controlId="lastName">
                    <Form.Label className="input-label">
                      Last Name <span className="ms-1 required-label">*</span>
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      placeholder="Last Name"
                      className="custom-input"
                    />
                  </Form.Group>
                  {errors.lastName == 'error' && <p className="text-danger sm-font">Required field</p>}
                </Col>
              </Row>
              <Row className="mt-4">
                <Col lg={12}>
                  <Form.Group controlId="lastName">
                    <Form.Label className="input-label">
                      Email Address{" "}
                      <span className="ms-1 required-label">*</span>
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="username@address.com"
                      className="custom-input"
                    />
                  </Form.Group>
                  {errors.email == 'error' && <p className="text-danger sm-font">Required field</p>}
                </Col>
              </Row>
              <Row className="mt-2 g-3">
                <Col lg={6}>
                  <Form.Group controlId="lastName">
                    <Form.Label className="input-label">
                      Password <span className="ms-1 required-label">*</span>
                    </Form.Label>
                    <Form.Control
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className="custom-input"
                    />
                  </Form.Group>
                  {errors.password == 'warn' && <p className="text-warning sm-font">It must be at least 8 characters, include upper, lowercase letters, a number, and a special character.</p>}
                  {errors.password == 'error' && <p className="text-danger sm-font">Required field</p>}
                </Col>

                <Col lg={6}>
                  <Form.Group controlId="lastName">
                    <Form.Label className="input-label">
                      Confirm Password
                      <span className="ms-1 required-label">*</span>
                    </Form.Label>
                    <Form.Control
                      type="password"
                      name="confirmPass"
                      value={formData.confirmPass}
                      onChange={handleChange}
                      className="custom-input"
                    />
                  </Form.Group>
                  {errors.confirmPass == 'warn' && <p className="text-warning sm-font">Retype confirm password</p>}
                  {errors.confirmPass == 'error' && <p className="text-danger sm-font">Required field</p>}
                </Col>
              </Row>

              <Row className="mt-2 g-3">
                <Col lg={6}>
                  <Form.Group controlId="enrollmentNumber">
                    <Form.Label className="input-label">
                      Enrollment Number
                      <span className="ms-1 required-label">*</span>
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="enrollmentNumber"
                      value={formData.enrollmentNumber}
                      onChange={handleChange}
                      className="custom-input"
                    />
                  </Form.Group>
                  {errors.enrollmentNumber == 'error' && <p className="text-danger sm-font">Required field</p>}
                </Col>
                <Col lg={6}>
                  <Form.Group>
                    <Form.Label className="input-label">
                      First year of study
                      <span className="ms-1 required-label">*</span>
                    </Form.Label>
                    <Form.Control
                      as="select"
                      name="firstYearOfStudy"
                      value={formData.firstYearOfStudy}
                      onChange={handleChange}
                      style={{
                        appearance: "auto", // Hides the default arrow
                        MozAppearance: "auto", // For Firefox
                        WebkitAppearance: "auto", // For Safari/Chrome
                        backgroundColor: "white",
                        color: "black",
                        padding: "8px 12px",
                        border: "1px solid #007bff"
                      }}
                      className="custom-input"
                    >
                      <option value="2024">2024</option>
                      <option value="2023">2023</option>
                      <option value="2022">2022</option>
                      <option value="2021">2021</option>
                      <option value="2020">2020</option>
                      <option value="2019">2019</option>
                    </Form.Control>
                  </Form.Group>
                </Col>
              </Row>

              <label className="input-label mt-5">
                Choose a profile picture for yourself:
              </label>
              <Row className="mt-3">
                <Col md={12}>
                  <div className="mb-3 d-flex flex-column justify-content-center align-items-center">
                    <input
                      type="file"
                      name="avatar"
                      id="avatar"
                      accept="image/*"
                      style={{ display: "none" }}
                      onChange={handleFileChange}
                    />
                    <label htmlFor="avatar" style={{ width: "60%" }}>
                      <div
                        style={{
                          width: "100%",
                          height: "220px",
                          border: "2px solid #878787",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          cursor: "pointer"
                        }}
                      >
                        {imagePreview ? (
                          <img
                            src={imagePreview}
                            alt="input"
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                              objectPosition: "top"
                            }}
                          />
                        ) : (
                          <>
                            <span
                              style={{
                                color: "#FF9C00",
                                fontSize: "18px",
                                margin: "0 10px 0 0 "
                              }}
                            >
                              Choose File
                            </span>
                            <img
                              src="/assets/img/img-input.png"
                              alt="input"
                              style={{ width: "40px" }}
                            />
                          </>
                        )}
                      </div>
                    </label>
                  </div>
                </Col>
              </Row>
              <div className="my-3">
                <button
                  type="submit"
                  className="btn btn-primary btn-lg d-block w-100"
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
                    <span>Sign Up</span>
                  )}
                </button>
              </div>

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

              <div className="text-inverse text-opacity-50 text-center">
                Already have an Account?{" "}
                <Link to="/login" className="default-color">
                  Sign In
                </Link>
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
};

export default PagesRegister;
