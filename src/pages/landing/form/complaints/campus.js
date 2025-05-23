import React, { useState, useEffect, useContext, useRef } from "react";
import { Row, Col, Form } from "react-bootstrap";

import { FormContext } from "../index";
import FormService from "../../../../sevices/form-service";
import { ToastContainer, toast } from "react-toastify";
import { useInquiry } from "../../../../context/inquiryProvider";

const Campus = ({ complaints }) => {
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
    section: "",
    complaintComment: ""
  });

  // use inquiry
  const { setInquiryState } = useInquiry();

  useEffect(() => {
    setErrors({});

    return () => {
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
            formDataToSend.append("subCategory1", complaints);

            try {
              setLoading(true);
              let res = await FormService.createInquiry(formDataToSend);
              setInquiryState("success");

              setLoading(false);
              successNotify(res?.message);
              setformDetailData({
                ...formDetailData,
                section: "",
                complaintComment: ""
              });

              setFormData({
                ...formData,
                inquiryCategory: "",
                agreement: false
              });
            } catch (err) {
              const errors = err?.errors || err?.error;
              setInquiryState("error");
              setLoading(false);

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

    if (formDetailData.section == "") {
      newErrors.section = "This field is required";
    }
    if (!formDetailData.complaintComment) {
      newErrors.complaintComment = "This field is required";
    }

    if (complaints === "Campus") {
      setErrors(newErrors);
    }
    return Object.keys(newErrors).length === 0;
  };
  return (
    <div className="mt-4 mt-md-4 g-4 g-md-4">
      <Row>
        <Col lg={12}>
          <Form.Group>
            <Form.Label className="input-label">
              Section <span className="ms-1 required-label">*</span>
            </Form.Label>
            <Form.Control
              as="select"
              style={{
                appearance: "none",
                MozAppearance: "none",
                WebkitAppearance: "none",
                backgroundColor: "white",
                color: "gray !important"
              }}
              name="section"
              onChange={handleChange}
              value={formDetailData.section}
              className="custom-input"
            >
              <option value="">– Select –</option>
              <option value="Administration Departments">
                Administration Departments
              </option>
              <option value="Campus Infrustructure (Furniture/ Rooms ect. )">
                Campus Infrustructure (Furniture/ Rooms ect. )
              </option>
              <option value="Finance">Finance</option>
            </Form.Control>
          </Form.Group>
          {errors.section && <p className="error-content">{errors.section}</p>}
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

export default Campus;
