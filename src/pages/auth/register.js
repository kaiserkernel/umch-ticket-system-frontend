import React, { useEffect, useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { AppSettings } from "./../../config/app-settings.js";
import AuthService from "../../sevices/auth-service.js";

function PagesRegister() {
  const context = useContext(AppSettings);
  const [redirect, setRedirect] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPass: "",
    role: "3",
    enrollmentNumber: "",
    firstYearOfStudy: "",
    avatar: null,
  });

  const [error, setError] = useState("");

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
    if (!firstName || !lastName || !email || !password || !confirmPass) {
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
    console.log(formData);
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      const formDataToSend = new FormData();
      for (const key in formData) {
        formDataToSend.append(key, formData[key]);
      }
      const response = await AuthService.register(formDataToSend);
      console.log(response.data);
    } catch (err) {
      setError(err.response?.data?.message || "Server error");
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

    // eslint-disable-next-line
  }, []);

  // function handleSubmit(event) {
  //   event.preventDefault();

  //   setRedirect(true);
  // }

  return (
    <div className="register">
      <div className="register-content">
        <form onSubmit={handleSubmit}>
          <h1 className="text-center">Sign Up</h1>
          <p className="text-inverse text-opacity-50 text-center">
            One Admin ID is all you need to access all the Admin services.
          </p>
          {error && <p style={{ color: "red" }}>{error}</p>}
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

          {formData.role === "2" && (
            <>
              <div className="mb-3">
                <label className="form-label">Enrollment Number</label>
                <input
                  type="text"
                  name="enrollmentNumber"
                  value={formData.enrollmentNumber}
                  onChange={handleChange}
                  className="form-control form-control-lg bg-white bg-opacity-5"
                />
              </div>
              <div className="mb-3">
                <label className="form-label">First Year of Study</label>
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
            </>
          )}

          <div className="mb-3">
            <label className="form-label me-2">Avatar:</label>
            <input
              type="file"
              name="avatar"
              accept="image/*"
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <button
              type="submit"
              className="btn btn-outline-theme btn-lg d-block w-100"
            >
              Sign Up
            </button>
          </div>
          <div className="text-inverse text-opacity-50 text-center">
            Already have an Admin ID? <Link to="/pages/login">Sign In</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PagesRegister;
