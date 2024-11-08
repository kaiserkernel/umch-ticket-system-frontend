import React, { useEffect, useState, createContext } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";

import ApplicationRequests from "./application-request";
import BookRental from "./book-rental";
import CampusIT from "./campus-it";
import Complaints from "./complaints";
import Internship from "./internship";
import MedicalAbilities from "./medical-abilities";
import Thesis from "./thesis";
import Other from "./other";
import FormService from "../../../sevices/form-service";

import "react-toastify/dist/ReactToastify.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import BeatLoader from "react-spinners/BeatLoader";

export const FormContext = createContext();

const FormSection = () => {
  let userData = "";
  if (localStorage.getItem("userData")) {
    userData = JSON.parse(localStorage.getItem("userData"));
  }
  const location = useLocation();
  const [isFormSubmit, setIsFormSubmit] = useState(0);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: userData?.firstName,
    lastName: userData?.lastName,
    email: userData?.email,
    enrollmentNumber: userData?.enrollmentNumber,
    firstYearOfStudy: userData?.firstYearOfStudy,
    inquiryCategory: "default",
    subCategory2: "",
    agreement: false
  });

  const [mainPageErrors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    console.log(formData, "====formdata");
    // Name validation
    if (!formData.firstName.trim()) {
      newErrors.firstName = "First Name is required";
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last Name is required";
    }

    // Email validation
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email address is invalid";
    }

    if (!formData.enrollmentNumber) {
      newErrors.enrollmentNumber = "Enrollment Number is required";
    }

    if (formData.firstYearOfStudy == "0") {
      newErrors.firstYearOfStudy = "First year of study is required";
    }
    if (formData.inquiryCategory == "default") {
      newErrors.inquiryCategory = "Category is required";
    }

    setErrors(newErrors);
    setIsFormSubmit(new Date());
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    if (e.target.name == "agreement") {
      setFormData({
        ...formData,
        [e.target.name]: e.target.checked
      });
    } else {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    validate();
  };

  useEffect(() => {
    const specialClass = "app";
    const newClass = "app-custom";
    const specialClassContent = "app-content";
    const newClassContent = "app-content-custom";

    // Function to replace classes
    const replaceClass = (elementClass, newClass) => {
      const elements = document.querySelectorAll(`.${elementClass}`);
      elements.forEach((element) => {
        element.classList.remove(elementClass);
        element.classList.add(newClass);
      });
    };

    // Apply styles based on the current path
    if (location.pathname === "/home") {
      document.body.classList.remove("theme-teal");
      document.body.classList.add("bg-white");
      replaceClass(specialClass, newClass);
      replaceClass(specialClassContent, newClassContent);
    } else {
      // Reset classes if not on "/home"
      document.body.classList.remove("bg-white");
      replaceClass(newClass, specialClass);
      replaceClass(newClassContent, specialClassContent);
      document.body.setAttribute("data-theme", "dark");
    }

    // Cleanup function to reset styles on unmount or path change
    return () => {
      document.body.classList.remove("bg-white");
      document.body.classList.remove("theme-teal");
      replaceClass(newClass, specialClass);
      replaceClass(newClassContent, specialClassContent);
    };
  }, [location.pathname]); // Runs effect on path change

  // Define animation variants for each collapse effect
  const variants = {
    default: {
      hidden: { scaleY: 0, opacity: 0, originY: 1 },
      visible: {
        scaleY: 0,
        opacity: 0,
        originY: 0,
        transition: { duration: 0.5 }
      }
    },
    1: {
      hidden: { height: 0, opacity: 0, originY: 0 },
      visible: {
        height: "auto",
        opacity: 1,
        originY: 0,
        transition: { duration: 0.5 }
      },
      exit: {
        scaleY: 0,
        opacity: 0,
        originY: 0,
        transition: { duration: 0.5 }
      }
    },

    2: {
      hidden: { scaleY: 0, opacity: 0, originY: 1 }, // Starts from bottom
      visible: {
        scaleY: 1,
        opacity: 1,
        originY: 1,
        transition: { duration: 0.5 }
      },
      exit: {
        scaleY: 0,
        opacity: 0,
        originY: 0,
        transition: { duration: 0.5 }
      }
    },
    3: {
      hidden: { scaleY: 0, opacity: 0 },
      visible: { scaleY: 1, opacity: 1, transition: { duration: 0.5 } },
      exit: {
        scaleY: 0,
        opacity: 0,
        originY: 0,
        transition: { duration: 0.5 }
      }
    },
    4: {
      hidden: { height: 0, opacity: 0, originY: 0 },
      visible: {
        height: "auto",
        opacity: 1,
        originY: 0,
        transition: { duration: 0.5 }
      },
      exit: {
        scaleY: 0,
        opacity: 0,
        originY: 0,
        transition: { duration: 0.5 }
      }
    },

    5: {
      hidden: { scaleY: 0, opacity: 0, originY: 1 }, // Starts from bottom
      visible: {
        scaleY: 1,
        opacity: 1,
        originY: 1,
        transition: { duration: 0.5 }
      },
      exit: {
        scaleY: 0,
        opacity: 0,
        originY: 0,
        transition: { duration: 0.5 }
      }
    },
    6: {
      hidden: { scaleY: 0, opacity: 0 },
      visible: { scaleY: 1, opacity: 1, transition: { duration: 0.5 } },
      exit: {
        scaleY: 0,
        opacity: 0,
        originY: 0,
        transition: { duration: 0.5 }
      }
    },
    7: {
      hidden: { height: 0, opacity: 0, originY: 0 },
      visible: {
        height: "auto",
        opacity: 1,
        originY: 0,
        transition: { duration: 0.5 }
      },
      exit: {
        scaleY: 0,
        opacity: 0,
        originY: 0,
        transition: { duration: 0.5 }
      }
    },
    8: {
      hidden: { scaleY: 0, opacity: 0, originY: 1 }, // Starts from bottom
      visible: {
        scaleY: 1,
        opacity: 1,
        originY: 1,
        transition: { duration: 0.5 }
      },
      exit: {
        scaleY: 0,
        opacity: 0,
        originY: 0,
        transition: { duration: 0.5 }
      }
    }
  };
  const content = {
    1: <ApplicationRequests />,
    2: <BookRental />,
    3: <CampusIT />,
    4: <Complaints />,
    5: <Internship />,
    6: <MedicalAbilities />,
    7: <Thesis />,
    8: <Other />
  };

  return (
    <FormContext.Provider
      value={{
        isFormSubmit,
        setIsFormSubmit,
        setFormData,
        formData,
        mainPageErrors,
        setLoading
      }}
    >
      <section className="form py-2 py-md-2">
        <div className="bg-gray mt-2 mt-md-4 py-2 py-md-5">
          <div className="form-container">
            <h1 className="text-center mt-3 mt-md-5">Dear UMCH Student</h1>
            <p className="text-center mt-5">
              Please use our ticketing system to submit your requests digitally.
            </p>
            <p className="text-center mt-3">
              You will receive a unique ticket number that allows you to track
              and manage your inquiry.
            </p>

            <p className="text-center fw-bold">Thank you very much!</p>
            <Form className="mt-2 mt-md-5">
              <Row className=" g-4 g-md-4">
                <Col lg={6}>
                  <Form.Group controlId="firstName">
                    <Form.Label className="input-label">
                      First Name <span className="ms-1 required-label">*</span>
                    </Form.Label>
                    <Form.Control
                      type="text"
                      autoComplete="off"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      placeholder="First Name"
                      className="custom-input"
                      disabled
                    />
                  </Form.Group>
                  {mainPageErrors.firstName && (
                    <p className="error-content">{mainPageErrors.firstName}</p>
                  )}
                </Col>
                <Col lg={6}>
                  <Form.Group controlId="lastName">
                    <Form.Label className="input-label">
                      Last Name <span className="ms-1 required-label">*</span>
                    </Form.Label>
                    <Form.Control
                      type="text"
                      autoComplete="off"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      placeholder="Last Name"
                      className="custom-input"
                      disabled
                    />
                  </Form.Group>
                  {mainPageErrors.lastName && (
                    <p className="error-content">{mainPageErrors.lastName}</p>
                  )}
                </Col>
              </Row>
              <Row className="mt-4">
                <Col lg={12}>
                  <Form.Group controlId="email">
                    <Form.Label className="input-label">
                      Email <span className="ms-1 required-label">*</span>
                    </Form.Label>
                    <Form.Control
                      type="email"
                      autoComplete="off"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Email Address"
                      className="custom-input"
                      disabled
                    />
                  </Form.Group>
                  {mainPageErrors.email && (
                    <p className="error-content">{mainPageErrors.email}</p>
                  )}
                </Col>
              </Row>
              <Row className="mt-2  g-4 g-md-4">
                <Col lg={6}>
                  <Form.Group controlId="enrollmentNumber">
                    <Form.Label className="input-label">
                      Enrollment Number{" "}
                      <span className="ms-1 required-label">*</span>
                    </Form.Label>
                    <Form.Control
                      type="text"
                      className="custom-input"
                      name="enrollmentNumber"
                      autoComplete="off"
                      value={formData.enrollmentNumber}
                      onChange={handleChange}
                      disabled={userData?.enrollmentNumber != undefined}
                    />
                  </Form.Group>
                  {mainPageErrors.enrollmentNumber && (
                    <p className="error-content">
                      {mainPageErrors.enrollmentNumber}
                    </p>
                  )}
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
                        appearance: "none", // Hides the default arrow
                        MozAppearance: "none", // For Firefox
                        WebkitAppearance: "none", // For Safari/Chrome
                        backgroundColor: "white",
                        color: "black",
                        padding: "8px 12px",
                        border: "1px solid #007bff"
                      }}
                      className="custom-input"
                      disabled
                    >
                      <option value="0">– Select –</option>
                      <option value="2024">2024</option>
                      <option value="2023">2023</option>
                      <option value="2022">2022</option>
                      <option value="2021">2021</option>
                      <option value="2020">2020</option>
                      <option value="2019">2019</option>
                    </Form.Control>
                  </Form.Group>
                  {mainPageErrors.firstYearOfStudy && (
                    <p className="error-content">
                      {mainPageErrors.firstYearOfStudy}
                    </p>
                  )}
                </Col>
              </Row>

              <Row className="mt-4">
                <Col lg={12}>
                  <Form.Group>
                    <Form.Label className="input-label">
                      Choose your category for your inquiry{" "}
                      <span className="ms-1 required-label">*</span>
                    </Form.Label>
                    <Form.Control
                      as="select"
                      style={{
                        appearance: "none", // Hides the default arrow
                        MozAppearance: "none", // For Firefox
                        WebkitAppearance: "none", // For Safari/Chrome
                        backgroundColor: "white",
                        color: "gray !important",
                        padding: "8px 12px",
                        border: "1px solid #007bff"
                      }}
                      className="custom-input"
                      name="inquiryCategory"
                      onChange={handleChange}
                      value={formData.inquiryCategory}
                    >
                      <option value="default">- Select -</option>
                      <option value="1">Applications and Requests</option>
                      <option value="2">Book rental UMCH library</option>
                      <option value="3">Campus IT</option>
                      <option value="4">Complaints</option>
                      <option value="5">Internship</option>
                      <option value="6">Medical Abilities</option>
                      <option value="7">Thesis</option>
                      <option value="8">Other</option>
                    </Form.Control>
                  </Form.Group>
                  {mainPageErrors.inquiryCategory && (
                    <p className="error-content">
                      {mainPageErrors.inquiryCategory}
                    </p>
                  )}
                </Col>
              </Row>

              <AnimatePresence mode="wait">
                {formData.inquiryCategory === "default" ? (
                  <motion.div
                    key="default"
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    variants={variants.default}
                  >
                    <div>{content[formData.inquiryCategory]}</div>
                  </motion.div>
                ) : (
                  <motion.div
                    key={formData.inquiryCategory}
                    initial="hidden"
                    animate="visible"
                    //   exit={selectedEffect === "default" ? "exit" : false}

                    variants={
                      variants[formData.inquiryCategory] || variants.default
                    }
                  >
                    <div>{content[formData.inquiryCategory]}</div>
                  </motion.div>
                )}
              </AnimatePresence>

              <p className="mt-5">
                {" "}
                <span className="required-label">*</span> Mandatory field
              </p>

              <div className="mt-2 mt-md-5 pt-md-4">
                <p className="fw-bold mb-1">Please note:</p>
                <p>
                  We would like to inform you that each request and complaint is
                  assigned a unique ticket number, allowing you to easily track
                  the status of your inquiry. Once submitted, you will receive a
                  confirmation email, and all further communication will take
                  place via email.
                </p>
                <p className="mt-4 mt-md-5">
                  To stay updated, kindly check your email inbox regularly. We
                  aim to process requests within 48 business hours. For any
                  follow-up questions, please always refer to your ticket
                  number.
                </p>
                <p className="mt-4 mt-md-5">
                  If you have any additional inquiries, please feel free to
                  create a new request or complaint for each matter.
                </p>
              </div>
              <div className="d-flex  mt-5 mt-md-5">
                <Form.Group controlId="custom-checkbox" className="me-2 mt-1 ">
                  <Form.Check
                    type="checkbox"
                    className="custom-checkbox"
                    name="agreement"
                    checked={formData.agreement}
                    onChange={handleChange}
                  />
                </Form.Group>
                <p className="mb-0">
                  {" "}
                  I have read and agree to the
                  <a href="" className="ms-1 red-text-decoration">
                    Imprint
                  </a>{" "}
                  and
                  <a href="" className="ms-1 red-text-decoration">
                    Privacy Policy
                  </a>
                </p>
              </div>
              <p className="fw-bold mt-5 mt-md-5 mb-4 mb-md-0">
                Thank you for your cooperation
              </p>
              <p className="mt-5 mt-md-5 pt-4 pt-md-4">Best regards</p>
              <p>UMFST-UMCH</p>
              {loading ? (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center"
                  }}
                >
                  <BeatLoader size={15} />
                </div>
              ) : (
                <div className="text-center">
                  <button
                    onClick={handleSubmit}
                    className="m-4 btn btn-primary ronded-pill px-4 py-2 default-bg"
                    disabled={formData.agreement ? false : true}
                  >
                    Send Request
                  </button>
                </div>
              )}
            </Form>
          </div>
        </div>
      </section>
    </FormContext.Provider>
  );
};

export default FormSection;
