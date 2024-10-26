import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { motion, AnimatePresence } from "framer-motion";
import ApplicationRequests from "./application-requests";
import "bootstrap-icons/font/bootstrap-icons.css";
import BookRental from "./book-rental";
import CampusIT from "./campus-it";
import Complaints from "./complaints";
import Internship from "./internship";
import MedicalAbilities from "./medical-abilities";
import Thesis from "./thesis";
import Other from "./other";

const FormSection = () => {
  const [selectedOption, setSelectedOption] = useState("");

  const handleSelectChange = (e) => {
    setSelectedOption(e.target.value);
  };
  return (
    <section className="form py-2 py-md-2">
      <div className="bg-gray mt-2 mt-md-4 py-2 py-md-5">
        <div className="form-container">
          <h1 className="text-center mt-3 mt-md-5">Dear UMCH Student</h1>
          <p className="text-center mt-5">
            Please use our ticketing system to submit your requests digitally.
          </p>
          <p className="text-center mt-3">
            You will receive a unique ticket number that allows you to track and
            manage your inquiry.
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
                    placeholder="First Name"
                    className="custom-input"
                  />
                </Form.Group>
              </Col>
              <Col lg={6}>
                <Form.Group controlId="lastName">
                  <Form.Label className="input-label">
                    Last Name <span className="ms-1 required-label">*</span>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    autoComplete="off"
                    placeholder="Last Name"
                    className="custom-input"
                  />
                </Form.Group>
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
                    placeholder="Email Address"
                    className="custom-input"
                  />
                </Form.Group>
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
                    autoComplete="off"
                  />
                </Form.Group>
              </Col>
              <Col lg={6}>
                <Form.Group>
                  <Form.Label className="input-label">
                    First year of study
                    <span className="ms-1 required-label">*</span>
                  </Form.Label>
                  <Form.Control
                    as="select"
                    style={{
                      appearance: "none", // Hides the default arrow
                      MozAppearance: "none", // For Firefox
                      WebkitAppearance: "none", // For Safari/Chrome
                      backgroundColor: "white",
                      color: "black",
                      padding: "8px 12px",
                      border: "1px solid #007bff",
                    }}
                    className="custom-input"
                  >
                    <option value="">– Select –</option>
                    <option value="2024" selected="">
                      2024
                    </option>
                    <option value="2023">2023</option>
                    <option value="2022">2022</option>
                    <option value="2021">2021</option>
                    <option value="2020">2020</option>
                    <option value="2019">2019</option>
                  </Form.Control>
                </Form.Group>
              </Col>
            </Row>
            <Row className="mt-4">
              <Col lg={12}>
                <Form.Group>
                  <Form.Label className="input-label">
                    Choose your category for your enquiry{" "}
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
                      border: "1px solid #007bff",
                    }}
                    className="custom-input"
                    onChange={handleSelectChange}
                    value={selectedOption}
                  >
                    <option>- Select -</option>
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
              </Col>
            </Row>

            {selectedOption && (
              <div
                className={`transition-box ${selectedOption ? "visible" : ""}`}
              >
                {selectedOption === "1" && <ApplicationRequests />}
                {selectedOption === "2" && <BookRental />}
                {selectedOption === "3" && <CampusIT />}
                {selectedOption === "4" && <Complaints />}
                {selectedOption === "5" && <Internship />}
                {selectedOption === "6" && <MedicalAbilities />}
                {selectedOption === "7" && <Thesis />}
                {selectedOption === "8" && <Other />}
              </div>
            )}

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
                To stay updated, kindly check your email inbox regularly. We aim
                to process requests within 48 business hours. For any follow-up
                questions, please always refer to your ticket number.
              </p>
              <p className="mt-4 mt-md-5">
                If you have any additional inquiries, please feel free to create
                a new request or complaint for each matter.
              </p>
            </div>
            <div className="d-flex  mt-5 mt-md-5">
              <Form.Group controlId="custom-checkbox" className="me-2 ">
                <Form.Check type="checkbox" className="custom-checkbox" />
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
            <div className="text-center">
              <a className="m-4 btn btn-primary rounded-pill px-4 py-2 default-bg">
                Send Request
              </a>
            </div>
          </Form>
        </div>
      </div>
    </section>
  );
};

export default FormSection;
