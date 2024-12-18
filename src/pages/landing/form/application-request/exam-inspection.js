import React, { useState, useEffect, useContext, useRef } from "react";
import { Row, Col, Form } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styled from "styled-components";
import dayjs from "dayjs";
import { FormContext } from "../index";
import FormService from "../../../../sevices/form-service";
import { ToastContainer, toast } from "react-toastify";
import { useInquiry } from "../../../../context/inquiryProvider";

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

const ExamInspection = ({ applicationRequest }) => {
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
    subject: "",
    examDate: "",
    examSpecification: "",
    comment: ""
  });

  const [files, setFiles] = useState([]);
  const [originalFiles, setOriginalFiles] = useState([]);

  // use inquiry
  const { setInquiryState } = useInquiry();

  useEffect(() => {
    setIsFormSubmit(false);
    setErrors({});

    return () => {
      setIsFormSubmit(false);
      setErrors({});
    };
  }, []);

  const handleDrop = (event) => {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files[0];

    if (droppedFile) {
      // Create a mock event to reuse the handleFileChange logic
      const mockEvent = {
        target: {
          files: [droppedFile],
        },
      };
      handleFileChange(mockEvent);
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleFileChange = (event) => {
    const newFile = event.target.files[0];

    setOriginalFiles((previousOriginalFiles) => [
      ...previousOriginalFiles,
      newFile
    ]);

    if (newFile) {
      let previewUrl;
      let fileType = newFile.type;
      if (!fileType.includes("image")) {
        previewUrl = "/assets/img/pdf.svg";
      } else {
        previewUrl = URL.createObjectURL(newFile);
      }
      const fileData = {
        file: newFile,
        previewUrl: previewUrl,
        progress: 0
      };
      setFiles((prevFiles) => [...prevFiles, fileData]);
      uploadFile(fileData);
    }
  };

  const uploadFile = (fileData) => {
    const uploadInterval = setInterval(() => {
      setFiles((prevFiles) =>
        prevFiles.map((file) =>
          file.file.name === fileData.file.name && file.progress < 100
            ? { ...file, progress: file.progress + 10 }
            : file
        )
      );
    }, 200);

    setTimeout(() => {
      clearInterval(uploadInterval);
    }, 2000);
  };

  const removeFile = (fileName) => {
    setFiles((prevFiles) =>
      prevFiles.filter((file) => file.file.name !== fileName)
    );
  };

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

            let applicationRequestObject = { subCategory1: applicationRequest };
            const temp = formData;
            const combinedFormData = Object.assign(
              {},
              temp,
              applicationRequestObject
            );

            const formDataToSend = new FormData();
            for (const key in combinedFormData) {
              formDataToSend.append(key, combinedFormData[key]);
            }
            formDataToSend.append("details", jsonFormDetailData);
            originalFiles.forEach((file) => {
              formDataToSend.append("documents", file);
            });

            try {
              setLoading(true);
              let res = await FormService.createInquiry(formDataToSend);
              setInquiryState("success");
              setLoading(false);
              successNotify(res?.message);
              setformDetailData({
                ...formDetailData,
                subject: "",
                examDate: "",
                examSpecification: "",
                comment: ""
              });
              setFiles([]);
              setOriginalFiles([]);
              setFormData({
                ...formData,
                agreement: false
              });
            } catch (err) {
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
      }
    };
    createTicket();
  }, [isFormSubmit]);

  const validate = () => {
    const newErrors = {};

    if (formDetailData.subject == "default" || formDetailData.subject == "") {
      newErrors.subject = "This field is required";
    }
    if (!formDetailData.examDate) {
      newErrors.examDate = "This field is required";
    }
    if (
      formDetailData.examSpecification == "default" ||
      formDetailData.examSpecification == ""
    ) {
      newErrors.examSpecification = "This field is required";
    }

    if (applicationRequest === "Exam inspection")
      setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  return (
    <div className="mt-4 mt-md-4 g-4 g-md-4">
      <Row>
        <Col lg={12}>
          <Form.Group>
            <Form.Label className="input-label">
              Subject
              <span className="ms-1 required-label">*</span>
            </Form.Label>
            <Form.Control
              as="select"
              name="subject"
              value={formDetailData?.subject}
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
              <option value="default">UMFST-UMCH Subjects</option>
              <option></option>
              <optgroup label="1st year of study">
                <option disabled=""></option>
                <option value="Anatomy 1">Anatomy 1</option>
                <option value="Anatomy 2">Anatomy 2</option>
                <option value="BioChemistry 1">BioChemistry 1</option>
                <option value="Biochemistry 2">BioChemistry 2</option>
                <option value="Biophysics">Biophysics</option>
                <option value="Medical Informatics">Medical Informatics</option>
                <option value="Medical Biostatistics">
                  Medical Biostatistics
                </option>
                <option value="Molecular and Cell Biology">
                  Molecular and Cell Biology
                </option>
                <option value="Medical Terminology">Medical Terminology</option>
                <option value="Physiology 1">Physiology 1</option>
                <option value="Romanian Cultural Studies 1.1">
                  Romanian Cultural Studies 1.1
                </option>
                <option value="Romanian Cultural Studies 1.2">
                  Romanian Cultural Studies 1.2
                </option>
              </optgroup>
              <option disabled=""></option>
              <optgroup label="2nd year of study">
                <option disabled=""></option>
                <option value="Physiology 2">Physiology 2</option>
                <option value="Physiology 3">Physiology 3</option>
                <option value="Histology 1">Histology 1</option>
                <option value="Histology 2">Histology 2</option>
                <option value="Anatomy 3">Anatomy 3</option>
                <option value="Patient Doctor Communication">
                  Patient Doctor Communication
                </option>
                <option value="Medical Deontology Bioethics">
                  Medical Deontology Bioethics
                </option>
                <option value="Genetics">Genetics</option>
                <option value="Introduction in Practical Work">
                  Introduction in Practical Work
                </option>
                <option value="First Aid">First Aid</option>
                <option value="Romanian Cultural Strudies 2.1">
                  Romanian Cultural Strudies 2.1
                </option>
                <option value="Romanian Cultural Strudies 2.2">
                  Romanian Cultural Strudies 2.2
                </option>
              </optgroup>
              <option disabled=""></option>
              <optgroup label="3rd year of study">
                <option disabled=""></option>
                <option value="Pathology 1">Pathology 1</option>
                <option value="Pathology 2">Pathology 2</option>
                <option value="Pharmacology 1">Pharmacology 1</option>
                <option value="Pharmacology 2">Pharmacology 2</option>
                <option value="Scientific Research Methodology">
                  Scientific Research Methodology
                </option>
                <option value="Pathophysiology 1">Pathophysiology 1</option>
                <option value="Pathophysiology 2">Pathophysiology 2</option>
                <option value="Medical Semiology 1">Medical Semiology 1</option>
                <option value="Medical Semiology 2">Medical Semiology 2</option>
                <option value="Surgical Semiology 1">
                  Surgical Semiology 1
                </option>
                <option value="Surgical Semiology 2">
                  Surgical Semiology 2
                </option>
                <option value="Bacteriology. Virusology. Parasitology 1">
                  Bacteriology. Virusology. Parasitology 1
                </option>
                <option value="Bacteriology. Virusology. Parasitology 2">
                  Bacteriology. Virusology. Parasitology 2
                </option>
                <option value="Hygiene, Environmental Health and Food Safety">
                  Hygiene, Environmental Health and Food Safety
                </option>
                <option value="Clinical Biochemistry. Immunology">
                  Clinical Biochemistry. Immunology
                </option>
              </optgroup>
              <option disabled=""></option>
              <optgroup label="4th year of study">
                <option disabled=""></option>
                <option value="Orthopedics and Traumatology">
                  Orthopedics and Traumatology
                </option>
                <option value="General Surgery">General Surgery</option>
                <option value="Urology">Urology</option>
                <option value="Endocrinology">Endocrinology</option>
                <option value="Pediatric Surgery. Pediatric Orthopedics">
                  Pediatric Surgery. Pediatric Orthopedics
                </option>
                <option value="Plastic, Esthetics and Reconstructive Microsurgery">
                  Plastic, Esthetics and Reconstructive Microsurgery
                </option>
                <option value="Cardiology-Internal medicine">
                  Cardiology-Internal medicine
                </option>
                <option value="Hematology-Internal medicine">
                  Hematology-Internal medicine
                </option>
                <option value="Emergency medicine">Emergency medicine</option>
                <option value="Child Care">Child Care</option>
                <option value="Radiology and medical imaging">
                  Radiology and medical imaging
                </option>
                <option value="Occupational medicine and professional diseases">
                  Occupational medicine and professional diseases
                </option>
                <option value="Oral-maxillo-facial Surgery">
                  Oral-maxillo-facial Surgery
                </option>
              </optgroup>
              <option disabled=""></option>
              <optgroup label="5th year of study">
                <option disabled=""></option>
                <option value="Gastroenterology-Internal medicine">
                  Gastroenterology-Internal medicine
                </option>
                <option value="Nephrology-Internal medicine">
                  Nephrology-Internal medicine
                </option>
                <option value="Diabetology and Nutritional Diseases-Internal medicine">
                  Diabetology and Nutritional Diseases-Internal medicine
                </option>
                <option value="ENT (Ear Nose Throat)">
                  ENT (Ear Nose Throat)
                </option>
                <option value="Ophthalmology">Ophthalmology</option>
                <option value="Anesthesia-Intensive Care">
                  Anesthesia-Intensive Care
                </option>
                <option value="Rheumatology">Rheumatology</option>
                <option value="Rehabilitation, Physical Medicine and Balneology">
                  Rehabilitation, Physical Medicine and Balneology
                </option>
                <option value="Dermatology">Dermatology</option>
                <option value="Neurology">Neurology</option>
                <option value="Pediatrics">Pediatrics</option>
                <option value="Pneumology">Pneumology</option>
                <option value="Medical Oncology">Medical Oncology</option>
                <option value="Pediatric Psychiatry">
                  Pediatric Psychiatry
                </option>
              </optgroup>
              <option disabled=""></option>
              <optgroup label="6th year of study">
                <option disabled=""></option>
                <option value="Obstetrics-Gynecology. Neonatology">
                  Obstetrics-Gynecology. Neonatology
                </option>
                <option value="Infectious Diseases">Infectious Diseases</option>
                <option value="Family medicine">Family medicine</option>
                <option value="Public Health">Public Health</option>
                <option value="Health Management">Health Management</option>
                <option value="Primary Care">Primary Care</option>
                <option value="Palliative Care">Palliative Care</option>
                <option value="Epidemiology">Epidemiology</option>
                <option value="Psychiatry">Psychiatry</option>
                <option value="Forensic Medicine">Forensic Medicine</option>
              </optgroup>
            </Form.Control>
          </Form.Group>
          {errors.subject && <p className="error-content">{errors.subject}</p>}
        </Col>
      </Row>
      <Row className="mt-2 g-4 g-md-4">
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
              dateFormat="dd/MM/yyyy"
              isClearable
              className="custom-input"
            />
          </Form.Group>
          {errors.examDate && (
            <p className="error-content">{errors.examDate}</p>
          )}
        </Col>
        <Col lg={6}>
          <Form.Group>
            <Form.Label className="input-label">
              Specification of exam
              <span className="ms-1 required-label">*</span>
            </Form.Label>
            <Form.Control
              as="select"
              name="examSpecification"
              value={formDetailData?.examSpecification}
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
              <option value="PA exam">PA exam</option>
              <option value="PA re-exam">PA re-exam</option>
              <option value="PA re-re-exam">PA re-re-exam</option>
              <option value="Written exam">Written exam</option>
              <option value="Written Re-exam">Written Re-exam</option>
              <option value="Written Re-re-exam">Written Re-re-exam</option>
              <option value="OSCE">OSCE</option>
              <option value="Re-OSCE">Re-OSCE</option>
            </Form.Control>
          </Form.Group>
          {errors.examSpecification && (
            <p className="error-content">{errors.examSpecification}</p>
          )}
        </Col>
      </Row>

      <Row className="mt-4">
        <Col lg={12}>
          <Form.Group controlId="commentTextarea">
            <Form.Label className="input-label">Comments</Form.Label>
            <Form.Control
              as="textarea"
              rows={6}
              placeholder=""
              name="comment"
              value={formDetailData?.comment}
              onChange={handleChange}
              className="custom-textarea-input"
            />
          </Form.Group>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col lg={12}>
          <Form.Group controlId="">
            <Form.Label className="input-label mb-0">File Upload</Form.Label>
          </Form.Group>
          <input
            type="file"
            name="file"
            id="file"
            style={{ visibility: "hidden" }}
            onChange={handleFileChange}
          />
          <label
            htmlFor="file" className="btn btn-primary upload-btn"
            onDrop={handleDrop}
            onDragOver={handleDragOver}>
          </label>
          <div className="d-flex flex-column mt-3">
            {files.map((fileObj, index) => (
              <div
                className="d-flex border mb-3"
                key={index}
                style={{ position: "relative" }}
              >
                {fileObj.previewUrl && (
                  <img
                    src={fileObj.previewUrl}
                    alt="File Preview"
                    style={{ width: "80px", height: "80px" }}
                  />
                )}
                {fileObj.progress > 0 && (
                  <div className="d-flex flex-column justify-content-center flex-grow-1 px-2">
                    <span className="mb-1" style={{ fontSize: "11px" }}>
                      {fileObj.file.name}
                    </span>
                    <div
                      style={{
                        background: "#eee",
                        height: "7px",
                        width: "100%"
                      }}
                    >
                      <div
                        style={{
                          width: `${fileObj.progress}%`,
                          borderRadius: "10px",
                          height: "100%",
                          background: "#1a7efb",
                          transition: "width 0.2s"
                        }}
                      ></div>
                    </div>
                    <div className="mt-1" style={{ fontSize: "11px" }}>
                      <span className="me-2">
                        {fileObj.progress}% Completed
                      </span>
                      <span>{(fileObj.file.size / 1024).toFixed(2)} KB</span>
                    </div>
                  </div>
                )}
                <button
                  onClick={() => removeFile(fileObj.file.name)}
                  style={{
                    position: "absolute",
                    top: "5px",
                    right: "5px",
                    background: "transparent",
                    color: "red",
                    border: "none",
                    borderRadius: "50%",
                    width: "20px",
                    height: "20px",
                    cursor: "pointer"
                  }}
                >
                  &times;
                </button>
              </div>
            ))}
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default ExamInspection;
