import React, { useState, useEffect, useContext } from "react";
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

import { FormContext } from "../index";

const ApplicationRequests = () => {
  const { isFormSubmit, setFormData, formData, mainPageErrors } =
    useContext(FormContext);
  const [selectedEffect, setSelectedEffect] = useState("default");

  const [formInquiryData, setFormInquiryData] = useState({
    applicationRequest: "default",
    comment: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
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

    if (formInquiryData.applicationRequest == "default") {
      newErrors.applicationRequest = "Applications and Requests is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormInquiryData({
      ...formInquiryData,
      [e.target.name]: e.target.value,
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
        transition: { duration: 0.5 },
      },
    },
    1: {
      hidden: { height: 0, opacity: 0, originY: 0 },
      visible: {
        height: "auto",
        opacity: 1,
        originY: 0,
        transition: { duration: 0.5 },
      },
      exit: {
        scaleY: 0,
        opacity: 0,
        originY: 0,
        transition: { duration: 0.5 },
      },
    },

    2: {
      hidden: { scaleY: 0, opacity: 0, originY: 1 }, // Starts from bottom
      visible: {
        scaleY: 1,
        opacity: 1,
        originY: 1,
        transition: { duration: 0.5 },
      },
      exit: {
        scaleY: 0,
        opacity: 0,
        originY: 0,
        transition: { duration: 0.5 },
      },
    },
    change_study_group: {
      hidden: { scaleY: 0, opacity: 0 },
      visible: { scaleY: 1, opacity: 1, transition: { duration: 0.5 } },
      exit: {
        scaleY: 0,
        opacity: 0,
        originY: 0,
        transition: { duration: 0.5 },
      },
    },
    demonstrator_student: {
      hidden: { height: 0, opacity: 0, originY: 0 },
      visible: {
        height: "auto",
        opacity: 1,
        originY: 0,
        transition: { duration: 0.5 },
      },
      exit: {
        scaleY: 0,
        opacity: 0,
        originY: 0,
        transition: { duration: 0.5 },
      },
    },

    enrollment: {
      hidden: { scaleY: 0, opacity: 0, originY: 1 }, // Starts from bottom
      visible: {
        scaleY: 1,
        opacity: 1,
        originY: 1,
        transition: { duration: 0.5 },
      },
      exit: {
        scaleY: 0,
        opacity: 0,
        originY: 0,
        transition: { duration: 0.5 },
      },
    },
    exam_inspection: {
      hidden: { scaleY: 0, opacity: 0 },
      visible: { scaleY: 1, opacity: 1, transition: { duration: 0.5 } },
      exit: {
        scaleY: 0,
        opacity: 0,
        originY: 0,
        transition: { duration: 0.5 },
      },
    },
    online_catalogue: {
      hidden: { height: 0, opacity: 0, originY: 0 },
      visible: {
        height: "auto",
        opacity: 1,
        originY: 0,
        transition: { duration: 0.5 },
      },
      exit: {
        scaleY: 0,
        opacity: 0,
        originY: 0,
        transition: { duration: 0.5 },
      },
    },
    recognition_courses: {
      hidden: { scaleY: 0, opacity: 0, originY: 1 }, // Starts from bottom
      visible: {
        scaleY: 1,
        opacity: 1,
        originY: 1,
        transition: { duration: 0.5 },
      },
      exit: {
        scaleY: 0,
        opacity: 0,
        originY: 0,
        transition: { duration: 0.5 },
      },
    },
    recognition_internship: {
      hidden: { scaleY: 0, opacity: 0 },
      visible: { scaleY: 1, opacity: 1, transition: { duration: 0.5 } },
      exit: {
        scaleY: 0,
        opacity: 0,
        originY: 0,
        transition: { duration: 0.5 },
      },
    },
    short_term_borrow_diploma: {
      hidden: { height: 0, opacity: 0, originY: 0 },
      visible: {
        height: "auto",
        opacity: 1,
        originY: 0,
        transition: { duration: 0.5 },
      },
      exit: {
        scaleY: 0,
        opacity: 0,
        originY: 0,
        transition: { duration: 0.5 },
      },
    },
    syllabus_academic_year: {
      hidden: { scaleY: 0, opacity: 0, originY: 1 }, // Starts from bottom
      visible: {
        scaleY: 1,
        opacity: 1,
        originY: 1,
        transition: { duration: 0.5 },
      },
      exit: {
        scaleY: 0,
        opacity: 0,
        originY: 0,
        transition: { duration: 0.5 },
      },
    },
    transcript_records: {
      hidden: { scaleY: 0, opacity: 0 },
      visible: { scaleY: 1, opacity: 1, transition: { duration: 0.5 } },
      exit: {
        scaleY: 0,
        opacity: 0,
        originY: 0,
        transition: { duration: 0.5 },
      },
    },
    transfer_targu_mures: {
      hidden: { height: 0, opacity: 0, originY: 0 },
      visible: {
        height: "auto",
        opacity: 1,
        originY: 0,
        transition: { duration: 0.5 },
      },
      exit: {
        scaleY: 0,
        opacity: 0,
        originY: 0,
        transition: { duration: 0.5 },
      },
    },
    other: {
      hidden: { scaleY: 0, opacity: 0, originY: 1 }, // Starts from bottom
      visible: {
        scaleY: 1,
        opacity: 1,
        originY: 1,
        transition: { duration: 0.5 },
      },
      exit: {
        scaleY: 0,
        opacity: 0,
        originY: 0,
        transition: { duration: 0.5 },
      },
    },
  };
  const content = {
    default: <Default />,
    1: <Absence applicationRequest={formInquiryData.applicationRequest} />,
    2: (
      <ChangeTeachingHospital
        applicationRequest={formInquiryData.applicationRequest}
      />
    ),
    change_study_group: <ChangeStudyGroup />,
    demonstrator_student: <DemonstratorStudent />,
    enrollment: <Enrollment />,
    exam_inspection: <ExamInspection />,
    online_catalogue: <OnlineCatalogue />,
    recognition_courses: <RecognitionCourses />,
    recognition_internship: <RecognitionInternship />,
    short_term_borrow_diploma: <ShortTermBorrowDiploma />,
    syllabus_academic_year: <SyllabusAcademicYear />,
    transcript_records: <TranscriptRecords />,
    transfer_targu_mures: <TransferTarguMures />,
    other: <Other />,
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
                color: "gray !important",
                // padding: "8px 12px",
                // border: "1px solid #007bff",
              }}
              name="applicationRequest"
              onChange={(e) => {
                handleChange(e);
                setFormData({
                  ...formData,
                  subCategory1: e.target.value,
                });
              }}
              value={formInquiryData.applicationRequest}
              className="custom-input"
            >
              <option value="default">– Select –</option>
              <option value="1">Absence</option>
              <option value="2">Change of teaching hospital</option>
              <option value="change_study_group">Change of study group</option>
              <option value="demonstrator_student">Demonstrator student</option>
              <option value="enrollment">Enrollment</option>
              <option value="exam_inspection">Exam inspection</option>
              <option value="online_catalogue">
                Online Catalogue (Carnet)
              </option>
              <option value="recognition_courses">
                Recognition of Courses
              </option>
              <option value="recognition_internship">
                Recognition of Internship
              </option>
              <option value="short_term_borrow_diploma">
                Short term borrow of Diploma
              </option>
              <option value="syllabus_academic_year">
                Syllabus of the academic year
              </option>
              <option value="transcript_records">Transcript of Records</option>
              <option value="transfer_targu_mures">
                Transfer to Targu Mures
              </option>
              <option value="other">Other</option>
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

          variants={variants[formInquiryData.applicationRequest]}
        >
          <div>{content[formInquiryData.applicationRequest]}</div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default ApplicationRequests;
