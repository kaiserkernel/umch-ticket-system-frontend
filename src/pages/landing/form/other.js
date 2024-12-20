import React, { useState, useEffect, useContext, useRef } from "react";
import { Row, Col, Form } from "react-bootstrap";
import DatePicker from "react-datepicker";
import styled from "styled-components";
import "react-datepicker/dist/react-datepicker.css";
import dayjs from "dayjs";
import { FormContext } from "./index";
import FormService from "../../../sevices/form-service";
import { ToastContainer, toast } from "react-toastify";
import { useInquiry } from "../../../context/inquiryProvider";

const Other = () => {
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

  // use inquiry
  const { setInquiryState } = useInquiry();

  const [formDetailData, setformDetailData] = useState({
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
        if (Object.keys(mainPageErrors).length == 0) {
          let jsonFormDetailData = JSON.stringify(formDetailData);

          const temp = formData;
          const combinedFormData = Object.assign({}, temp);

          const formDataToSend = new FormData();
          for (const key in combinedFormData) {
            formDataToSend.append(key, formData[key]);
          }
          formDataToSend.append("details", jsonFormDetailData);
          formDataToSend.append("subCategory1", "");

          try {
            setLoading(true);
            let res = await FormService.createInquiry(formDataToSend);
            setInquiryState("success");
            setLoading(false);
            successNotify(res?.message);
            setformDetailData({
              ...formDetailData,
              comment: ""
            });

            setFormData({
              ...formData,
              inquiryCategory: "",
              agreement: false
            });
          } catch (err) {
            setLoading(false);
            const errors = err?.errors || err?.error;
            setInquiryState("error");

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
    };
    createTicket();
  }, [isFormSubmit]);

  return (
    <div className="">
      <div className="mt-5">
        <p>Dear Students,</p>
        <p>We are here for you and happy to help.</p>
        <p>
          In this form, please feel free to share your wishes, suggestions,
          concerns, or requests with us.
        </p>
        <p>
          Thank you for your trust. We’ll get back to you shortly with a
          response.
        </p>
      </div>
      <Row className="mt-4">
        <Col lg={12}>
          <Form.Group controlId="commentTextarea">
            <Form.Label className="input-label">Comments</Form.Label>
            <Form.Control
              as="textarea"
              rows={8}
              placeholder=""
              name="comment"
              value={formDetailData.comment}
              onChange={handleChange}
              className="custom-textarea-input"
            />
          </Form.Group>
        </Col>
      </Row>
    </div>
  );
};

export default Other;
