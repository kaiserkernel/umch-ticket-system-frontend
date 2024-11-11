import React, { useState, useEffect, useContext, useRef } from "react";
import { Row, Col, Form } from "react-bootstrap";
import { motion, AnimatePresence } from "framer-motion";
import Canvas from "./canvas";
import Default from "./default";
import StreamingPanopto from "./streaming-panopto";

import { FormContext } from "../index";

const CampusIT = () => {
  const { isFormSubmit, setFormData, formData, mainPageErrors } =
    useContext(FormContext);

  const [formInquiryData, setFormInquiryData] = useState({
    campusIT: "default"
  });

  const isFirstRender = useRef(true);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false; // Mark the initial render as complete.
      return; // Skip running this effect on initial render.
    }
    console.log(isFormSubmit);
    console.log(formData);
    if (isFormSubmit != 0) {
      console.log("sumbit is done");
      if (validate()) {
      }
    }
  }, [isFormSubmit]);

  const validate = () => {
    const newErrors = {};

    if (formInquiryData.campusIT == "default") {
      newErrors.campusIT = "Applications and Requests is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormInquiryData({
      ...formInquiryData,
      [e.target.name]: e.target.value
    });
  };

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
    }
  };

  const content = {
    default: <Default />,
    1: <Canvas campusIT={String(formInquiryData.campusIT)} />,
    2: <StreamingPanopto campusIT={String(formInquiryData.campusIT)} />
  };

  return (
    <div className="pt-5">
      <h1 className="mt-2 mt-md-4 mb-0 mb-md-5">Campus IT</h1>
      <div>
        <p>Dear Students,</p>
        <p>
          If you have technical questions or have noticed any technical issues
          you'd like to report, please select the appropriate form. The UMCH
          Tech Team will do its best to assist you as quickly as possible.
        </p>
      </div>
      <Row className="mt-4">
        <Col lg={12}>
          <Form.Group>
            <Form.Label className="input-label">
              Campus IT
              <span className="ms-1 required-label">*</span>
            </Form.Label>
            <Form.Control
              as="select"
              name="campusIT"
              onChange={handleChange}
              value={formInquiryData.campusIT}
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
              <option value="1">Canvas</option>
              <option value="2">Streaming / Panopto</option>
            </Form.Control>
          </Form.Group>
          {errors.campusIT && (
            <p className="error-content">{errors.campusIT}</p>
          )}
        </Col>
      </Row>
      <AnimatePresence mode="wait">
        <motion.div
          key={formInquiryData.campusIT}
          initial="hidden"
          animate="visible"
          //   exit={selectedEffect === "default" ? "exit" : false}

          variants={variants[formInquiryData.campusIT]}
        >
          <div>{content[formInquiryData.campusIT]}</div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default CampusIT;
