import React, { useState, useEffect, useContext, useRef } from "react";
import { Row, Col, Form } from "react-bootstrap";
import { FormContext } from "../index";
import FormService from "../../../../sevices/form-service";
import { ToastContainer, toast } from "react-toastify";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styled from "styled-components";

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

const Enrollment = ({ applicationRequest }) => {
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
    nationality: "",
    currentYearOfStudy: "",
    birthday: "",
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
                nationality: "",
                currentYearOfStudy: "",
                comment: "",
                birthday: ""
              });
              setFiles([]);
              setOriginalFiles([]);
              setFormData({
                ...formData,
                agreement: false
              });
            } catch (err) {
              setLoading(false);
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

    if (!formDetailData.nationality) {
      newErrors.nationality = "This field is required";
    }
    if (!formDetailData.birthday) {
      newErrors.birthday = "This field is required";
    }
    if (
      formDetailData.currentYearOfStudy == "default" ||
      formDetailData.currentYearOfStudy == ""
    ) {
      newErrors.currentYearOfStudy = "This field is required";
    }

    console.log(newErrors, "========newErrors");

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  return (
    <div className="">
      <div className="mt-5">
        <p> Dear Student,</p>
        <p>
          With this form, we are happy to prepare your Enrollment Paper for you.
          Please fill out the required fields.
        </p>
        <p>
          Please note that the request for an Enrollment Paper can only be made
          once a year and it remains valid for one academic year.
        </p>
        <p>Thank you very much.</p>
      </div>
      <Row className="mt-2 g-4 g-md-4">
        <Col lg={6}>
          <Form.Group controlId="">
            <Form.Label className="input-label">
              Nationality
              <span className="ms-1 required-label">*</span>
            </Form.Label>
            <Form.Control
              type="text"
              placeholder=""
              name="nationality"
              value={formDetailData.nationality}
              onChange={handleChange}
              className="custom-input"
              autoComplete="off"
            />
          </Form.Group>
          {errors.nationality && (
            <p className="error-content">{errors.nationality}</p>
          )}
        </Col>
        <Col lg={6}>
          <Form.Group>
            <Form.Label className="input-label">
              Current year of study
              <span className="ms-1 required-label">*</span>
            </Form.Label>
            <Form.Control
              as="select"
              name="currentYearOfStudy"
              value={formDetailData.currentYearOfStudy}
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
              <option value="1st year">1st year</option>
              <option value="2nd year">2nd year</option>
              <option value="3rd year">3rd year</option>
              <option value="4th year">4th year</option>
              <option value="5th year">5th year</option>
              <option value="6th year">6th year</option>
            </Form.Control>
          </Form.Group>
          {errors.currentYearOfStudy && (
            <p className="error-content">{errors.currentYearOfStudy}</p>
          )}
        </Col>
      </Row>
      <Row className="mt-4 ">
        <Col lg={12}>
          <Form.Group controlId="">
            <Form.Label className="input-label">
              Date of Birth
              <span className="ms-1 required-label">*</span>
            </Form.Label>
            <StyledDatePicker
              selected={formDetailData.birthday}
              onChange={(date) =>
                setformDetailData({
                  ...formDetailData,
                  birthday: date
                })
              }
              name="diplomaCollectionDate"
              dateFormat="yyyy/MM/dd"
              isClearable
              showMonthDropdown
              showYearDropdown
              dropdownMode="select"
              className="custom-input"
            />
          </Form.Group>
          {errors.birthday && (
            <p className="error-content">{errors.birthday}</p>
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
              value={formDetailData.comment}
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

export default Enrollment;
