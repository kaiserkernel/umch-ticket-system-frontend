import React, { useState, useEffect, useContext, useRef } from "react";
import { Row, Col, Form } from "react-bootstrap";
import DatePicker from "react-datepicker";
import styled from "styled-components";
import "react-datepicker/dist/react-datepicker.css";
import dayjs from "dayjs";
import { FormContext } from "./index";
import FormService from "../../../sevices/form-service";
import { ToastContainer, toast } from "react-toastify";

const StyledDatePicker = styled(DatePicker)`
  border: 1px solid !important;
  padding: 8px !important;
  border-radius: 0px !important;
  outline: none !important;
  width: 100% !important;

  &:focus {
    border-color: #2596be !important;
  }
`;

const BookRental = () => {
  const {
    isFormSubmit,
    setIsFormSubmit,
    setFormData,
    formData,
    mainPageErrors,
    setLoading
  } = useContext(FormContext);

  const isFirstRender = useRef(true);
  const [errors, setErrors] = useState({});
  const today = dayjs().toDate();

  const [formDetailData, setformDetailData] = useState({
    bookTitle: "",
    periodFromTime: "",
    agreement: "",
    comment: ""
  });

  useEffect(() => {
    setIsFormSubmit(false);
    setErrors({});

    return () => {
      setIsFormSubmit(false);
      setErrors({});
    };
  }, []);

  const handleChange = (e) => {
    setformDetailData({
      ...formDetailData,
      [e.target.name]: e.target.value
    });
  };

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false; // Mark the initial render as complete.
      return; // Skip running this effect on initial render.
    }
    const successNotify = (msg) => {
      toast.info(msg, {
        autoClose: 3000 // Duration in milliseconds
      });
    };

    const errorNotify = (msg) => {
      toast.warning(msg, {
        autoClose: 3000 // Duration in milliseconds
      });
    };

    const createTicket = async () => {
      if (isFormSubmit != 0) {
        if (validate()) {
          if (Object.keys(mainPageErrors).length == 0) {
            let jsonFormDetailData = JSON.stringify(formDetailData);

            const temp = formData;
            const combinedFormData = Object.assign({}, temp);

            console.log(combinedFormData);

            const formDataToSend = new FormData();
            for (const key in combinedFormData) {
              formDataToSend.append(key, formData[key]);
            }
            formDataToSend.append("details", jsonFormDetailData);
            formDataToSend.append("subCategory1", "1");

            try {
              setLoading(true);
              let res = await FormService.createInquiry(formDataToSend);
              setLoading(false);
              successNotify(res?.message);
              setformDetailData({
                ...formDetailData,
                bookTitle: "",
                periodFromTime: "",
                agreement: "",
                comment: ""
              });

              setFormData({
                ...formData,
                agreement: false
              });
            } catch (err) {
              setLoading(false);
              const errors = err?.errors || err?.error;

              if (typeof errors != "object") {
                errorNotify(errors);
              } else {
                console.log(typeof errors);
                errors.map((error) => {
                  errorNotify(error.msg);
                });
              }
            }
          }
        }
      }
    };
    createTicket();
  }, [isFormSubmit]);

  const validate = () => {
    const newErrors = {};

    if (formDetailData.bookTitle == "") {
      newErrors.bookTitle = "This field is required";
    }
    if (!formDetailData.periodFromTime) {
      newErrors.periodFromTime = "This field is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isWithinNext3WorkingDays = (date) => {
    let count = 0;
    let day = dayjs();

    while (count < 3) {
      day = day.add(1, "day");
      if (day.day() !== 0 && day.day() !== 6) count++; // Only count weekdays
    }

    const endDate = day.toDate();
    return (
      date >= today &&
      date <= endDate &&
      date.getDay() !== 0 &&
      date.getDay() !== 6
    );
  };

  return (
    <div className="pt-5">
      <h1 className="mt-2 mt-md-4 mb-0 mb-md-5">Book rental UMCH library</h1>

      <div>
        <p>Dear Students,</p>
        <p>
          You are welcome to borrow a book from the UMCH library using this
          form.
        </p>
        <p>
          Please select a book from the list provided. The Study Secretariat
          will contact you once the book is ready for pickup.
        </p>
        <p>Happy studying!</p>
      </div>
      <Row className="mt-4">
        <Col lg={12}>
          <Form.Group>
            <Form.Label className="input-label">
              Title of the book
              <span className="ms-1 required-label">*</span>
            </Form.Label>
            <Form.Control
              as="select"
              name="bookTitle"
              onChange={handleChange}
              value={formDetailData.bookTitle}
              style={{
                appearance: "none", // Hides the default arrow
                MozAppearance: "none", // For Firefox
                WebkitAppearance: "none", // For Safari/Chrome
                backgroundColor: "white",
                color: "gray !important"
                // padding: "8px 12px",
                // border: "1px solid #007bff",
              }}
              className="custom-input"
            >
              <option value="">– Select –</option>
              <option value="Pathophysiology: Practical Work Guide / 1st. Edition">
                Pathophysiology: Practical Work Guide / 1st. Edition
              </option>
              <option value="Anatomy of The Trunk: The Thorax">
                Anatomy of The Trunk: The Thorax
              </option>
              <option value="Bones Of The Human Body">
                Bones Of The Human Body
              </option>
              <option value="Limbs Anatomy">Limbs Anatomy</option>
              <option value="Functional Anatomy Of The Abdominal Cavity">
                Functional Anatomy Of The Abdominal Cavity
              </option>
              <option value="Topographical Anatomy Of The Head And Neck">
                Topographical Anatomy Of The Head And Neck
              </option>
              <option value="Histology of the tissues">
                Histology of the tissues
              </option>
              <option value="Histology: practical works guide">
                Histology: practical works guide
              </option>
              <option value="New Approaches In Behavioral Science">
                New Approaches In Behavioral Science
              </option>
              <option value="Basic Concepts Of Pathology">
                Basic Concepts Of Pathology
              </option>
              <option value="Compendium Of Systematic Pathology">
                Compendium Of Systematic Pathology
              </option>
              <option value="Barron’s E-Z Anatomy and Physiology">
                Barron’s E-Z Anatomy and Physiology
              </option>
              <option value="Cell and Molecular Biology">
                Cell and Molecular Biology
              </option>
              <option value="Detailed Solutions to Physics Problems">
                Detailed Solutions to Physics Problems
              </option>
              <option value="Biophysics Labora">Biophysics Labora</option>
            </Form.Control>
          </Form.Group>
          {errors.bookTitle && (
            <p className="error-content">{errors.bookTitle}</p>
          )}
        </Col>
      </Row>
      <Row className="mt-4">
        <Col lg={6}>
          <Form.Group controlId="firstName">
            <Form.Label className="input-label">
              Period of time from
              <span className="ms-1 required-label">*</span>
            </Form.Label>
            <StyledDatePicker
              selected={formDetailData.periodFromTime}
              onChange={(date) =>
                setformDetailData({
                  ...formDetailData,
                  periodFromTime: date
                })
              }
              filterDate={isWithinNext3WorkingDays}
              dateFormat="yyyy/MM/dd"
              isClearable
              className="custom-input"
            />
          </Form.Group>
          {errors.periodFromTime && (
            <p className="error-content">{errors.periodFromTime}</p>
          )}
        </Col>
      </Row>
      <Row className="mt-5">
        <div className="fw-bold input-label">Please note:</div>
        <div className="input-label">
          The maximum loan period for books from the UMCH library is 3 days from
          the day of collection.
        </div>
      </Row>

      <div className="d-flex align-items-start  mt-2 mt-md-5">
        <Form.Group controlId="custom-checkbox" className="me-2 mt-1">
          <Form.Check type="checkbox" className="custom-checkbox" />
        </Form.Group>
        <p className="mb-0">
          {" "}
          I agree with the library rules and confirm that I handle the book with
          care, do not write into this book, and remove any bookmarks before the
          return! I am aware that the UMCH will have to charge me for the
          replacement costs in case I do not return the book in a proper
          condition or fail to return it even after a reminder.
        </p>
      </div>
      <Row className="mt-5">
        <Col lg={12}>
          <Form.Group controlId="commentTextarea">
            <Form.Label className="input-label">Comments</Form.Label>
            <Form.Control
              as="textarea"
              rows={8}
              placeholder=""
              name="comment"
              value={formDetailData?.comment}
              onChange={handleChange}
              className="custom-textarea-input"
            />
          </Form.Group>
        </Col>
      </Row>
    </div>
  );
};

export default BookRental;
