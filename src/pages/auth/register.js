import React, { useEffect, useContext, useState } from "react";
import { Row, Col } from "react-bootstrap";
import { Link, Navigate } from "react-router-dom";
import { AppSettings } from "./../../config/app-settings.js";
import AuthService from "../../sevices/auth-service.js";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

const PagesRegister = () => {
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
    avatar: null,
  });

  const [error, setError] = useState("");

  const [imagePreview, setImagePreview] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const { name, value, type, files } = event.target;
    if (file && file.type.startsWith("image/")) {
      const imageUrl = URL.createObjectURL(file);
      setImagePreview(imageUrl);
      setFormData({
        ...formData,
        [name]: type === "file" ? files[0] : value,
      });
    }
  };
  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData({
      ...formData,
      [name]: type === "file" ? files[0] : value,
    });
  };

  // Validate form data
  const validateForm = () => {
    const {
      firstName,
      lastName,
      email,
      password,
      confirmPass,
      role,
      enrollmentNumber,
      firstYearOfStudy,
    } = formData;
    if (
      !firstName ||
      !lastName ||
      !email ||
      !password ||
      !confirmPass ||
      !enrollmentNumber ||
      !firstYearOfStudy
    ) {
      return "All fields are required";
    }
    if (password !== confirmPass) {
      return "Passwords do not match";
    }
    if (role === "student" && (!enrollmentNumber || !firstYearOfStudy)) {
      return "Enrollment number and year of study are required for students";
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      return "Email is invalid";
    }
    return "";
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const handleLoginNavigation = () => {
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    };

    try {
      const formDataToSend = new FormData();
      for (const key in formData) {
        formDataToSend.append(key, formData[key]);
      }
      const response = await AuthService.register(formDataToSend);
      successNotify(response.message);
      setError("");
      handleLoginNavigation();
    } catch (err) {
      const errors = err?.errors;
      console.log(typeof errors);
      console.log(errors);

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
      autoClose: 5000, // Duration in milliseconds
    });
  };
  const errorNotify = (msg) => {
    toast.warning(msg, {
      autoClose: 5000, // Duration in milliseconds
    });
  };
  return (
    <div className="register">
      <div className="register-content">
        <ToastContainer />
        <form onSubmit={handleSubmit}>
          <h1 className="text-center">Sign Up</h1>
          <p className="text-inverse text-opacity-50 text-center">
            One Admin ID is all you need to access all the Admin services.
          </p>

          <Row>
            <Col lg={6}>
              <div className="mb-3">
                <label className="form-label">
                  First Name <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="form-control form-control-lg bg-white bg-opacity-5"
                  placeholder="First Name"
                />
              </div>
            </Col>
            <Col lg={6}>
              <div className="mb-3">
                <label className="form-label">
                  Last Name <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="form-control form-control-lg bg-white bg-opacity-5"
                  placeholder="Last Name"
                />
              </div>
            </Col>
          </Row>
          <Row>
            <Col lg={6}>
              <div className="mb-3">
                <label className="form-label">
                  Email Address <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="form-control form-control-lg bg-white bg-opacity-5"
                  placeholder="username@address.com"
                />
              </div>
            </Col>
            <Col lg={6}>
              <div className="mb-3">
                <label className="form-label">
                  Role <span className="text-danger">*</span>
                </label>
                <select
                  className="form-select form-select-lg bg-white bg-opacity-5"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                >
                  <option value="0">Admin</option>
                  <option value="1">Teacher</option>
                  <option value="2">Student</option>
                </select>
              </div>
            </Col>
          </Row>
          <Row>
            <Col lg={6}>
              <div className="mb-3">
                <label className="form-label">
                  Password <span className="text-danger">*</span>
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="form-control form-control-lg bg-white bg-opacity-5"
                />
              </div>
            </Col>

            <Col lg={6}>
              <div className="mb-3">
                <label className="form-label">
                  Confirm Password <span className="text-danger">*</span>
                </label>
                <input
                  type="password"
                  name="confirmPass"
                  value={formData.confirmPass}
                  onChange={handleChange}
                  className="form-control form-control-lg bg-white bg-opacity-5"
                />
              </div>
            </Col>
          </Row>

          {formData.role === "2" && (
            <Row>
              <Col lg={6}>
                <div className="mb-3">
                  <label className="form-label">
                    Enrollment Number <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    name="enrollmentNumber"
                    value={formData.enrollmentNumber}
                    onChange={handleChange}
                    className="form-control form-control-lg bg-white bg-opacity-5"
                  />
                </div>
              </Col>
              <Col lg={6}>
                <div className="mb-3">
                  <label className="form-label">
                    First Year of Study <span className="text-danger">*</span>
                  </label>
                  <select
                    className="form-select form-select-lg bg-white bg-opacity-5"
                    name="firstYearOfStudy"
                    value={formData.firstYearOfStudy}
                    onChange={handleChange}
                  >
                    <option value="2024">2024</option>
                    <option value="2023">2023</option>
                    <option value="2022">2022</option>
                    <option value="2021">2021</option>
                    <option value="2020">2020</option>
                    <option value="2019">2019</option>
                  </select>
                </div>
              </Col>
            </Row>
          )}
          <Row>
            <Col md={1}>
              <label className="form-label">Avatar</label>
            </Col>
            <Col md={11}>
              <div className="mb-3 d-flex flex-column justify-content-center align-items-center">
                <input
                  type="file"
                  name="avatar"
                  id="avatar"
                  accept="image/*"
                  style={{ visibility: "hidden" }}
                  onChange={handleFileChange}
                />
                <label for="avatar" style={{ width: "60%" }}>
                  <div
                    style={{
                      width: "100%",
                      height: "220px",
                      border: "2px solid #878787",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      cursor: "pointer",
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
                          objectPosition: "top",
                        }}
                      />
                    ) : (
                      <>
                        <span
                          style={{
                            color: "#FF9C00",
                            fontSize: "18px",
                            margin: "0 10px 0 0 ",
                          }}
                        >
                          Choose File
                        </span>
                        <img
                          src="assets/img/img-input.png"
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
          <div className="mb-3">
            <button
              type="submit"
              className="btn btn-outline-theme btn-lg d-block w-100"
            >
              Sign Up
            </button>
          </div>
          <div className="text-inverse text-opacity-50 text-center">
            Already have an Admin ID? <Link to="/login">Sign In</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PagesRegister;
