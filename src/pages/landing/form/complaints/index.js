import React, { useState, useEffect, useContext, useRef } from "react";
import { Row, Col, Form } from "react-bootstrap";
import { motion, AnimatePresence } from "framer-motion";
import { FormContext } from "../index";

import Default from "./default";
import Campus from "./campus";
import DeanOffice from "./deanOffice";
import Exam from "./exam";
import GermanTeachingDepartment from "./germanTeachingDepartment";
import Other from "./other";
import Teacher from "./teacher";
import TeachingHospital from "./teachingHospital";
import OnlineCatalouge from "./onlineCatalouge";

import { TicketTypeStructure } from "../../../../globalVariables";

const Complaints = () => {
  const { isFormSubmit } =
    useContext(FormContext);

  const [formInquiryData, setFormInquiryData] = useState({
    complaints: "default"
  });

  const isFirstRender = useRef(true);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false; // Mark the initial render as complete.
      return; // Skip running this effect on initial render.
    }
    if (isFormSubmit != 0) {
      validate();
    }
  }, [isFormSubmit]);

  const validate = () => {
    const newErrors = {};

    if (formInquiryData.complaints == "default") {
      newErrors.complaints = "Complaints is required";
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
      hidden: { height: 0, opacity: 0, originY: 0 },
      visible: {
        height: "auto",
        opacity: 1,
        originY: 0,
        transition: { duration: 0.5 }
      }
    },
    custom: {
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
    }
  };

  const content = {
    default: <Default />,
    Campus: <Campus complaints={String(formInquiryData.complaints)} />,
    "Dean's Office": <DeanOffice complaints={String(formInquiryData.complaints)} />,
    "German Teaching Department": (
      <GermanTeachingDepartment
        complaints={String(formInquiryData.complaints)}
      />
    ),
    "Teaching Hospital": <TeachingHospital complaints={String(formInquiryData.complaints)} />,
    Teacher: <Teacher complaints={String(formInquiryData.complaints)} />,
    "Online Catalogue (Carnet)": <OnlineCatalouge complaints={String(formInquiryData.complaints)} />,
    Exam: <Exam complaints={String(formInquiryData.complaints)} />,
    Other: <Other complaints={String(formInquiryData.complaints)} />
  };
  return (
    <div className="pt-5">
      <h1 className="mt-2 mt-md-4 mb-0 mb-md-5">Complaints</h1>

      <div>
        <p>Dear Students,</p>
        <p>
          We are sorry to hear that you would like to file a complaint. Please
          select the appropriate complaint form for your situation. Rest assured
          that your complaint will be taken seriously. If you wish to report
          specific individuals or teachers, your name will remain anonymous, and
          you will not face any personal consequences.
        </p>
        <p>
          Thank you for your trust. We will address your concerns to the best of
          our ability.
        </p>
      </div>
      <Row className="mt-4">
        <Col lg={12}>
          <Form.Group>
            <Form.Label className="input-label">
              Complaints
              <span className="ms-1 required-label">*</span>
            </Form.Label>
            <Form.Control
              as="select"
              name="complaints"
              value={formInquiryData.complaints}
              onChange={handleChange}
              style={{
                appearance: "none", // Hides the default arrow
                MozAppearance: "none", // For Firefox
                WebkitAppearance: "none", // For Safari/Chrome
                backgroundColor: "white",
                color: "gray !important"
              }}
              className="custom-input"
            >
              <option value="default">– Select –</option>
              {
                TicketTypeStructure[3]["types"].map((log, idx) => (
                  <option key={idx} value={log}>{log}</option>
                ))
              }
            </Form.Control>
          </Form.Group>
          {errors.complaints && (
            <p className="error-content">{errors.complaints}</p>
          )}
        </Col>
      </Row>

      <AnimatePresence mode="wait">
        <motion.div
          key={formInquiryData.complaints}
          initial="hidden"
          animate="visible"
          variants={variants[formInquiryData.complaints === "default" ? "default" : "custom"]}
        >
          <div>{content[formInquiryData.complaints]}</div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default Complaints;
