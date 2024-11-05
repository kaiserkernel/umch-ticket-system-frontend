import React, { useState, useContext, useEffect } from "react";
import { Row, Col, Form } from "react-bootstrap";
import DatePicker from "react-datepicker";
import styled from "styled-components";
import "react-datepicker/dist/react-datepicker.css";
import { FormContext } from "../index";
import FormService from "../../../../sevices/form-service";
import { ToastContainer, toast } from "react-toastify";

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

const Absence = ({ applicationRequest }) => {
  const {
    isFormSubmit,
    setIsFormSubmit,
    setFormData,
    formData,
    mainPageErrors,
  } = useContext(FormContext);

  const [errors, setErrors] = useState({});

  const [formDetailData, setformDetailData] = useState({
    reasonForAbsence: "",
    timeFromAbsence: "",
    timeToAbsence: "",
    comment: "",
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
      newFile,
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
        progress: 0,
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
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    const successNotify = (msg) => {
      toast.info(msg, {
        autoClose: 3000, // Duration in milliseconds
      });
    };

    const errorNotify = (msg) => {
      toast.warning(msg, {
        autoClose: 3000, // Duration in milliseconds
      });
    };

    const createTicket = async () => {
      if (isFormSubmit != 0) {
        if (validate()) {
          if (Object.keys(mainPageErrors).length == 0) {
            let jsonFormDetailData = JSON.stringify(formDetailData);

            let applicationRequestObject = { subCategory1: applicationRequest };

            const combinedFormData = Object.assign(
              {},
              formData,
              applicationRequestObject
            );

            const formDataToSend = new FormData();
            for (const key in combinedFormData) {
              formDataToSend.append(key, formData[key]);
            }
            formDataToSend.append("details", jsonFormDetailData);
            originalFiles.forEach((file) => {
              formDataToSend.append("documents", file);
            });

            try {
              let res = await FormService.createInquiry(formDataToSend);
              successNotify(res?.message);
              setformDetailData({
                ...formDetailData,
                reasonForAbsence: "",
                timeFromAbsence: "",
                timeToAbsence: "",
                comment: "",
              });
              setFiles([]);
              setOriginalFiles([]);
              setFormData({
                ...formData,
                agreement: false,
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

    if (!formDetailData.reasonForAbsence) {
      newErrors.reasonForAbsence = "Reason for Absence is required";
    }

    if (!formDetailData.timeFromAbsence) {
      newErrors.timeFromAbsence = "Period of time (From) is required";
    }
    if (!formDetailData.timeToAbsence) {
      newErrors.timeToAbsence = "Period of time (to) is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return (
    <>
      <div className="">
        <Row className="mt-5">
          <div className="fw-bold input-label">Please note:</div>
          <div className="input-label mt-2 ">
            All requests must be submitted within 10 workingdays after recovery.
            Otherwise the absence will not be approved.
          </div>
        </Row>
        <Row className="mt-2 g-4 g-md-4">
          <Col lg={12}>
            <Form.Group controlId="firstName">
              <Form.Label className="input-label">
                Reason for absence
                <span className="ms-1 required-label">*</span>
              </Form.Label>
              <Form.Control
                type="text"
                placeholder=""
                name="reasonForAbsence"
                value={formDetailData.reasonForAbsence}
                onChange={handleChange}
                className="custom-input"
                autoComplete="off"
              />
            </Form.Group>
            {errors.reasonForAbsence && (
              <p className="error-content">{errors.reasonForAbsence}</p>
            )}
          </Col>
        </Row>

        <Row className="mt-2 g-4 g-md-4">
          <Col lg={6}>
            <Form.Group controlId="firstName">
              <Form.Label className="input-label">
                Period of time (absence from)
                <span className="ms-1 required-label">*</span>
              </Form.Label>
              <StyledDatePicker
                selected={formDetailData.timeFromAbsence}
                onChange={(date) =>
                  setformDetailData({
                    ...formDetailData,
                    timeFromAbsence: date,
                  })
                }
                dateFormat="yyyy/MM/dd"
                isClearable
                className="custom-input"
              />
            </Form.Group>
            {errors.timeFromAbsence && (
              <p className="error-content">{errors.timeFromAbsence}</p>
            )}
          </Col>
          <Col lg={6}>
            <Form.Group controlId="lastName">
              <Form.Label className="input-label">
                Period of time (absence to)
                <span className="ms-1 required-label">*</span>
              </Form.Label>
              <StyledDatePicker
                selected={formDetailData.timeToAbsence}
                onChange={(date) =>
                  setformDetailData({ ...formDetailData, timeToAbsence: date })
                }
                dateFormat="yyyy/MM/dd"
                isClearable
                className="custom-input"
              />
            </Form.Group>
            {errors.timeToAbsence && (
              <p className="error-content">{errors.timeToAbsence}</p>
            )}
          </Col>
        </Row>

        <Row className="mt-4">
          <Col lg={12}>
            <Form.Group controlId="">
              <Form.Label className="input-label mb-0">
                File Upload (all official documents must be translated into
                english language)
                <span className="ms-1 required-label">*</span>
              </Form.Label>
            </Form.Group>

            {/* <input
            type="file"
            name="file"
            id="file"
            style={{ visibility: "hidden" }}
            onChange={handleFileChange}
          />
          <label htmlFor="file" className="btn btn-primary upload-btn">
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                cursor: "pointer",
              }}
            ></div>
          </label>
          <div className="d-flex border">
            {file && (
              <img
                src={previewUrl}
                alt="File Preview"
                style={{ width: "80px", height: "80px" }}
              />
            )}
            {uploadProgress > 0 && (
              <div className="d-flex flex-column justify-content-center flex-grow-1 px-2">
                <span className="mb-1" style={{ fontSize: "11px" }}>
                  {file.name}
                </span>
                <div
                  style={{ background: "#eee", height: "7px", width: "100%" }}
                >
                  <div
                    style={{
                      width: `${uploadProgress}%`,
                      borderRadius: "10px",
                      height: "100%",
                      background: "#1a7efb",
                      transition: "width 0.2s",
                    }}
                  ></div>
                </div>
                <div className="mt-1" style={{ fontSize: "11px" }}>
                  <span className="me-2">{uploadProgress}% Completed</span>
                  <span>{(file.size / 1024).toFixed(2)} KB</span>
                </div>
              </div>
            )}
          </div> */}

            <input
              type="file"
              name="file"
              id="file"
              accept=".pdf"
              style={{ visibility: "hidden" }}
              onChange={handleFileChange}
            />
            <label
              htmlFor="file"
              className="btn btn-primary upload-btn"
            ></label>
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
                          width: "100%",
                        }}
                      >
                        <div
                          style={{
                            width: `${fileObj.progress}%`,
                            borderRadius: "10px",
                            height: "100%",
                            background: "#1a7efb",
                            transition: "width 0.2s",
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
                      cursor: "pointer",
                    }}
                  >
                    &times;
                  </button>
                </div>
              ))}
            </div>
          </Col>
        </Row>
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
    </>
  );
};

export default Absence;
