import React, { useState, useEffect, useContext, useRef } from "react";
import { Row, Col, Form } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styled from "styled-components";
import dayjs from "dayjs";
import { FormContext } from "../index";
import FormService from "../../../../sevices/form-service";
import { ToastContainer, toast } from "react-toastify";

const RecognitionInternship = ({ applicationRequest }) => {
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
    recognitionMedicalInternship: "",
    comment: ""
  });

  const [files, setFiles] = useState([]);
  const [originalFiles, setOriginalFiles] = useState([]);

  useEffect(() => {
    setIsFormSubmit(false);
    setErrors({});

    return () => {
      setIsFormSubmit(false);
      setErrors({});
    };
  }, []);

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

  const handleDownload = (url, filename) => {
    fetch(url)
      .then((response) => response.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(new Blob([blob]));
        const link = document.createElement("a");
        link.href = url;
        link.download = filename;
        document.body.appendChild(link);

        link.click();

        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      })
      .catch((error) => {
        console.error("Error fetching the file:", error);
      });
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
              setLoading(false);
              successNotify(res?.message);
              setformDetailData({
                ...formDetailData,
                recognitionMedicalInternship: "",
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

    if (formDetailData.recognitionMedicalInternship == "") {
      newErrors.subject = "This field is required";
    }

    console.log(newErrors, "========newErrors");

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  return (
    <div className="mt-4 mt-md-4 g-4 g-md-4">
      <div className="my-5">
        <p> Dear Student,</p>
        <p>
          With this application, you can request an evaluation to see if a
          previously completed internship can be credited toward your studies.
          Use the "Download" button for the module syllabus titled “Speciality
          Practice” to verify whether the required content was covered in your
          internship.
        </p>
        <p>
          For this, we will need the following documents from your previous
          university:
        </p>
        <p>
          In the second step, you can have the "Certificate for Submission to
          the University" verified by your internship supervisor. Please upload
          this certificate in the designated upload area. We will review your
          request internally and get back to you.
        </p>
      </div>
      <Row className=" g-4 g-md-4">
        <Col lg={12}>
          <Form.Group controlId="">
            <Form.Label className="input-label">
              Recognition of 1st medical internship
              <span className="ms-1 required-label">*</span>
            </Form.Label>
            <Form.Control
              type="text"
              placeholder=""
              name="recognitionMedicalInternship"
              value={formDetailData.recognitionMedicalInternship}
              onChange={handleChange}
              className="custom-input"
              autoComplete="off"
            />
          </Form.Group>
          {errors.recognitionMedicalInternship && (
            <p className="error-content">
              {errors.recognitionMedicalInternship}
            </p>
          )}
        </Col>
      </Row>

      <Row className="d-flex  my-4">
        <Col lg={6}>
          <a
            className="btn btn-primary"
            onClick={() =>
              handleDownload(
                process.env.REACT_APP_API_URL +
                  "/download/Bescheinigung_Praktikum(2).pdf",
                "Bescheinigung_Praktikum(2).pdf"
              )
            }
          >
            Syllabus for the module “Speciality Practice“ (1st year of study){" "}
            <i className="bi bi-file-earmark-arrow-down"></i>
          </a>
        </Col>
        <Col lg={6}>
          <a
            className="btn btn-info"
            onClick={() =>
              handleDownload(
                process.env.REACT_APP_API_URL +
                  "/download/Syllabus_Speciality Practice_1st year_MEH2022.pdf",
                "Syllabus_Speciality Practice_1st year_MEH2022.pdf"
              )
            }
          >
            Certificate for Submission to the University{" "}
            <i className="bi bi-file-earmark-arrow-down"></i>
          </a>
        </Col>
      </Row>

      <Row className="mt-4">
        <Col lg={12}>
          <Form.Group controlId="commentTextarea">
            <Form.Label className="input-label">Comments</Form.Label>
            <Form.Control
              as="textarea"
              rows={6}
              name="comment"
              value={formDetailData.comment}
              onChange={handleChange}
              placeholder=""
              className="custom-textarea-input"
            />
          </Form.Group>
        </Col>
      </Row>
      <Row className="mt-5">
        <div className="fw-bold input-label">Please note:</div>
        <div className="input-label mt-2 ">
          All official documents must be translated into English language.
        </div>
      </Row>
      <div className="d-flex algin-items-center  mt-5 mt-md-5">
        <Form.Group controlId="custom-checkbox" className="me-2 ">
          <Form.Check type="checkbox" className="custom-checkbox" />
        </Form.Group>
        <div className="input-label   ">
          I confirm that all official documents are translated into English
          language.
        </div>
      </div>
      <Row className="mt-4">
        <Col lg={12}>
          <Form.Group controlId="">
            <Form.Label className="input-label mb-0">File Upload</Form.Label>
          </Form.Group>
          <input
            type="file"
            name="file"
            id="file"
            accept=".pdf"
            style={{ visibility: "hidden" }}
            onChange={handleFileChange}
          />
          <label htmlFor="file" className="btn btn-primary upload-btn"></label>
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

export default RecognitionInternship;
