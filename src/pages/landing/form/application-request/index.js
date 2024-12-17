import React, { useState, useEffect, useContext, useRef } from "react";
import { Row, Col, Form } from "react-bootstrap";
import { motion, AnimatePresence } from "framer-motion";
import Absence from "./absence";
import Default from "./default";
import ChangeTeachingHospital from "./change-teaching-hospital";
import ChangeStudyGroup from "./change-study-group";
import DemonstratorStudent from "./demonstrator-student";
import Enrollment from "./enrollment";
import ExamInspection from "./exam-inspection";
import OnlineCatalogue from "./online-catalogue";
import RecognitionCourses from "./recognition-courses";
import RecognitionInternship from "./recognition-internship";
import ShortTermBorrowDiploma from "./short-term-borrow-diploma";
import SyllabusAcademicYear from "./syllabus-academic-year";
import TranscriptRecords from "./transcript-records";
import TransferTarguMures from "./transfer-targu-mures";
import Other from "./other";
import Internship from "./internship";
import MedicalAbilities from "./medical-abilities";
import Thesis from "./thesis";

import { TicketTypeStructure } from "../../../../globalVariables";

import { FormContext } from "../index";

const ApplicationRequests = () => {
  const { isFormSubmit } =
    useContext(FormContext);

  const [formInquiryData, setFormInquiryData] = useState({
    applicationRequest: "default",
    comment: ""
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

    if (formInquiryData.applicationRequest == "default") {
      newErrors.applicationRequest = "Applications and Requests is required";
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
    },
  };
  const content = {
    default: <Default />,
    Absence: (
      <Absence
        applicationRequest={String(formInquiryData.applicationRequest)}
      />
    ),
    "Change of teaching hospital": (
      <ChangeTeachingHospital
        applicationRequest={String(formInquiryData.applicationRequest)}
      />
    ),
    "Change of study group": (
      <ChangeStudyGroup
        applicationRequest={String(formInquiryData.applicationRequest)}
      />
    ),
    "Demonstrator student": (
      <DemonstratorStudent
        applicationRequest={String(formInquiryData.applicationRequest)}
      />
    ),
    "Enrollment": (
      <Enrollment
        applicationRequest={String(formInquiryData.applicationRequest)}
      />
    ),
    "Exam inspection": (
      <ExamInspection
        applicationRequest={String(formInquiryData.applicationRequest)}
      />
    ),
    "Online Catalogue (Solaris)": (
      <OnlineCatalogue
        applicationRequest={String(formInquiryData.applicationRequest)}
      />
    ),
    "Recognition of Courses": (
      <RecognitionCourses
        applicationRequest={String(formInquiryData.applicationRequest)}
      />
    ),
    "Recognition of Internship": (
      <RecognitionInternship
        applicationRequest={String(formInquiryData.applicationRequest)}
      />
    ),
    "Short term borrow of Diploma": (
      <ShortTermBorrowDiploma
        applicationRequest={String(formInquiryData.applicationRequest)}
      />
    ),
    "Syllabus of the academic year": (
      <SyllabusAcademicYear
        applicationRequest={String(formInquiryData.applicationRequest)}
      />
    ),
    "Transcript of Records": (
      <TranscriptRecords
        applicationRequest={String(formInquiryData.applicationRequest)}
      />
    ),
    "Transcript to Targu Mures": (
      <TransferTarguMures
        applicationRequest={String(formInquiryData.applicationRequest)}
      />
    ),
    "Other": (
      <Other applicationRequest={String(formInquiryData.applicationRequest)} />
    ),
    "Internship": (
      <Internship applicationRequest={String(formInquiryData.applicationRequest)} />
    ),
    "Medical Abilities": (
      <MedicalAbilities applicationRequest={String(formInquiryData.applicationRequest)} />
    ),
    "Thesis": (
      <Thesis applicationRequest={String(formInquiryData.applicationRequest)} />
    )
  };
  return (
    <div className="pt-5">
      <h1 className="mt-2 mt-md-4 mb-0 mb-md-5">Applications and Requests</h1>
      <Row className="mt-4">
        <Col lg={12}>
          <Form.Group>
            <Form.Label className="input-label">
              Applications and Requests{" "}
              <span className="ms-1 required-label">*</span>
            </Form.Label>
            <Form.Control
              as="select"
              style={{
                appearance: "none", // Hides the default arrow
                MozAppearance: "none", // For Firefox
                WebkitAppearance: "none", // For Safari/Chrome
                backgroundColor: "white",
                color: "gray !important"
              }}
              name="applicationRequest"
              onChange={handleChange}
              value={formInquiryData.applicationRequest}
              className="custom-input"
            >
              <option value="default">– Select –</option>
              {
                TicketTypeStructure[0]["types"].map((log, idx) => (
                  <option key={idx} value={log}>{log}</option>
                ))
              }
            </Form.Control>
          </Form.Group>
          {errors.applicationRequest && (
            <p className="error-content">{errors.applicationRequest}</p>
          )}
        </Col>
      </Row>

      <AnimatePresence mode="wait">
        <motion.div
          key={formInquiryData.applicationRequest}
          initial="hidden"
          animate="visible"
          //   exit={selectedEffect === "default" ? "exit" : false}

          variants={variants[formInquiryData.applicationRequest === "default" ? "default" : "custom"]}
        >
          <div>{content[formInquiryData.applicationRequest]}</div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default ApplicationRequests;
