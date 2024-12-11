import React, { useState, useEffect, useContext, useRef } from "react";
import { Row, Col, Form } from "react-bootstrap";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styled from "styled-components";
import dayjs from "dayjs";
import { FormContext } from "../index";
import FormService from "../../../../sevices/form-service";
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

const Exam = () => {
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
  const [formDetailData, setformDetailData] = useState({
    examDate: "",
    subject: "",
    teacherName: "",
    module: "",
    complaintComment: ""
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

            const formDataToSend = new FormData();

            for (const key in combinedFormData) {
              formDataToSend.append(key, combinedFormData[key]);
            }

            formDataToSend.append("details", jsonFormDetailData);
            formDataToSend.append("subCategory1", "Exam");

            try {
              setLoading(true);
              let res = await FormService.createInquiry(formDataToSend);

              setLoading(false);
              successNotify(res?.message);
              setformDetailData({
                ...formDetailData,
                examDate: "",
                subject: "",
                teacherName: "",
                module: "",
                complaintComment: ""
              });

              setFormData({
                ...formData,
                agreement: false
              });
            } catch (err) {
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

    if (!formDetailData.examDate) {
      newErrors.examDate = "This field is required";
    }
    if (!formDetailData.subject) {
      newErrors.subject = "This field is required";
    }
    if (!formDetailData.teacherName) {
      newErrors.teacherName = "This field is required";
    }
    if (!formDetailData.module) {
      newErrors.module = "This field is required";
    }
    if (!formDetailData.complaintComment) {
      newErrors.complaintComment = "This field is required";
    }

    // if (complaints == "7") {
    setErrors(newErrors);
    // }
    return Object.keys(newErrors).length === 0;
  };
  return (
    <div className="mt-4 mt-md-4 g-4 g-md-4">
      <Row className="mt-4">
        <Col lg={6}>
          <Form.Group controlId="">
            <Form.Label className="input-label">
              Exam Date
              <span className="ms-1 required-label">*</span>
            </Form.Label>
            <StyledDatePicker
              selected={formDetailData?.examDate}
              onChange={(date) =>
                setformDetailData({
                  ...formDetailData,
                  examDate: date
                })
              }
              dateFormat="yyyy/MM/dd"
              isClearable
              className="custom-input"
            />
          </Form.Group>
          {errors.examDate && (
            <p className="error-content">{errors.examDate}</p>
          )}
        </Col>
        <Col lg={6}>
          <Form.Group controlId="subject">
            <Form.Label className="input-label">
              Subject
              <span className="ms-1 required-label">*</span>
            </Form.Label>
            <Form.Control
              type="text"
              placeholder=""
              name="subject"
              value={formDetailData.subject}
              onChange={handleChange}
              className="custom-input"
            />
          </Form.Group>
          {errors.subject && <p className="error-content">{errors.subject}</p>}
        </Col>
      </Row>

      <Row className="mt-4">
        <Col lg={6}>
          <Form.Group controlId="subject">
            <Form.Label className="input-label">
              Teacher's name
              <span className="ms-1 required-label">*</span>
            </Form.Label>
            <Form.Control
              type="text"
              placeholder=""
              name="teacherName"
              value={formDetailData.teacherName}
              onChange={handleChange}
              className="custom-input"
            />
          </Form.Group>
          {errors.teacherName && (
            <p className="error-content">{errors.teacherName}</p>
          )}
        </Col>
        <Col lg={6}>
          <Form.Group>
            <Form.Label className="input-label">
              Module
              <span className="ms-1 required-label">*</span>
            </Form.Label>
            <Form.Control
              as="select"
              name="module"
              value={formDetailData?.module}
              onChange={handleChange}
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
              <option value="default">– Select –</option>
              <option value="Module 1">Module 1</option>
              <option value="Module 2">Module 2</option>
              <option value="Module 3">Module 3</option>
              <option value="Module 4">Module 4</option>
            </Form.Control>
          </Form.Group>
          {errors.module && <p className="error-content">{errors.module}</p>}
        </Col>
      </Row>
      <Row className="mt-4">
        <Col lg={12}>
          <Form.Group controlId="commentTextarea">
            <Form.Label className="input-label">
              Hereby I make the following complaint
              <span className="ms-1 required-label">*</span>
            </Form.Label>
            <Form.Control
              as="textarea"
              rows={4}
              placeholder=""
              name="complaintComment"
              value={formDetailData.complaintComment}
              onChange={handleChange}
              className="custom-textarea-input"
            />
          </Form.Group>
          {errors.complaintComment && (
            <p className="error-content">{errors.complaintComment}</p>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default Exam;
