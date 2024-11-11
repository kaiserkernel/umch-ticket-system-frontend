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

const Complaints = () => {
  const { isFormSubmit, setFormData, formData, mainPageErrors } =
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
    console.log(isFormSubmit, "=======");
    console.log(formData);
    if (isFormSubmit != 0) {
      console.log("sumbit is done");
      if (validate()) {
      }
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

    4: {
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
    5: {
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

    6: {
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
    default: <Default />,
    1: <Campus complaints={String(formInquiryData.complaints)} />,
    2: <DeanOffice complaints={String(formInquiryData.complaints)} />,
    3: (
      <GermanTeachingDepartment
        complaints={String(formInquiryData.complaints)}
      />
    ),
    4: <TeachingHospital complaints={String(formInquiryData.complaints)} />,
    5: <Teacher complaints={String(formInquiryData.complaints)} />,
    6: <OnlineCatalouge complaints={String(formInquiryData.complaints)} />,
    7: <Exam complaints={String(formInquiryData.complaints)} />,
    8: <Other complaints={String(formInquiryData.complaints)} />
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
                // padding: "8px 12px",
                // border: "1px solid #007bff",
              }}
              className="custom-input"
            >
              <option value="default">– Select –</option>
              <option value="1">Campus</option>
              <option value="2">Dean’s Office</option>
              <option value="3">German Teaching Department</option>
              <option value="4">Teaching Hospital</option>
              <option value="5">Teacher</option>
              <option value="6">Online Catalouge (Carnet)</option>
              <option value="7">Exam</option>
              <option value="8">Other</option>
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
          variants={variants[formInquiryData.complaints]}
        >
          <div>{content[formInquiryData.complaints]}</div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default Complaints;
