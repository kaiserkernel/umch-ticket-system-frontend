import React, { useState, useEffect, useContext, useRef } from "react";
import { Row, Col, Form } from "react-bootstrap";
import { motion, AnimatePresence } from "framer-motion";
// import Absence from "./absence";
import Default from "./default";
// import ChangeTeachingHospital from "./change-teaching-hospital";
// import ChangeStudyGroup from "./change-study-group";
// import DemonstratorStudent from "./demonstrator-student";
// import Enrollment from "./enrollment";
// import ExamInspection from "./exam-inspection";
// import OnlineCatalogue from "./online-catalogue";
// import RecognitionCourses from "./recognition-courses";
// import RecognitionInternship from "./recognition-internship";
// import ShortTermBorrowDiploma from "./short-term-borrow-diploma";
// import SyllabusAcademicYear from "./syllabus-academic-year";
// import TranscriptRecords from "./transcript-records";
// import TransferTarguMures from "./transfer-targu-mures";
import Other from "./other";

import { FormContext } from "../index";

const ApplicationRequests = () => {
  const { isFormSubmit, setFormData, formData, mainPageErrors } =
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
      hidden: { scaleY: 0, opacity: 0 },
      visible: { scaleY: 1, opacity: 1, transition: { duration: 0.5 } },
      exit: {
        scaleY: 0,
        opacity: 0,
        originY: 0,
        transition: { duration: 0.5 }
      }
    },
    4: {
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

    5: {
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
    6: {
      hidden: { scaleY: 0, opacity: 0 },
      visible: { scaleY: 1, opacity: 1, transition: { duration: 0.5 } },
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
    },
    9: {
      hidden: { scaleY: 0, opacity: 0 },
      visible: { scaleY: 1, opacity: 1, transition: { duration: 0.5 } },
      exit: {
        scaleY: 0,
        opacity: 0,
        originY: 0,
        transition: { duration: 0.5 }
      }
    },
    10: {
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
    11: {
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
    12: {
      hidden: { scaleY: 0, opacity: 0 },
      visible: { scaleY: 1, opacity: 1, transition: { duration: 0.5 } },
      exit: {
        scaleY: 0,
        opacity: 0,
        originY: 0,
        transition: { duration: 0.5 }
      }
    },
    13: {
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
    14: {
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
    // 1: (
    //   <Absence
    //     applicationRequest={String(formInquiryData.applicationRequest)}
    //   />
    // ),
    // 2: (
    //   <ChangeTeachingHospital
    //     applicationRequest={String(formInquiryData.applicationRequest)}
    //   />
    // ),
    // 3: (
    //   <ChangeStudyGroup
    //     applicationRequest={String(formInquiryData.applicationRequest)}
    //   />
    // ),
    // 4: (
    //   <DemonstratorStudent
    //     applicationRequest={String(formInquiryData.applicationRequest)}
    //   />
    // ),
    // 5: (
    //   <Enrollment
    //     applicationRequest={String(formInquiryData.applicationRequest)}
    //   />
    // ),
    // 6: (
    //   <ExamInspection
    //     applicationRequest={String(formInquiryData.applicationRequest)}
    //   />
    // ),
    // 7: (
    //   <OnlineCatalogue
    //     applicationRequest={String(formInquiryData.applicationRequest)}
    //   />
    // ),
    // 8: (
    //   <RecognitionCourses
    //     applicationRequest={String(formInquiryData.applicationRequest)}
    //   />
    // ),
    // 9: (
    //   <RecognitionInternship
    //     applicationRequest={String(formInquiryData.applicationRequest)}
    //   />
    // ),
    // 10: (
    //   <ShortTermBorrowDiploma
    //     applicationRequest={String(formInquiryData.applicationRequest)}
    //   />
    // ),
    // 11: (
    //   <SyllabusAcademicYear
    //     applicationRequest={String(formInquiryData.applicationRequest)}
    //   />
    // ),
    // 12: (
    //   <TranscriptRecords
    //     applicationRequest={String(formInquiryData.applicationRequest)}
    //   />
    // ),
    // 13: (
    //   <TransferTarguMures
    //     applicationRequest={String(formInquiryData.applicationRequest)}
    //   />
    // ),
    // 14: (
    //   <Other applicationRequest={String(formInquiryData.applicationRequest)} />
    // )
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
                // padding: "8px 12px",
                // border: "1px solid #007bff",
              }}
              name="applicationRequest"
              onChange={handleChange}
              value={formInquiryData.applicationRequest}
              className="custom-input"
            >
              <option value="default">– Select –</option>
              <option value="1">Absence</option>
              <option value="2">Change of teaching hospital</option>
              <option value="3">Change of study group</option>
              <option value="4">Demonstrator student</option>
              <option value="5">Enrollment</option>
              <option value="6">Exam inspection</option>
              <option value="7">Online Catalogue (Solaris)</option>
              <option value="8">Recognition of Courses</option>
              <option value="9">Recognition of Internship</option>
              <option value="10">Short term borrow of Diploma</option>
              <option value="11">Syllabus of the academic year</option>
              <option value="12">Transcript of Records</option>
              <option value="13">Transfer to Targu Mures</option>
              <option value="14">Other</option>
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
