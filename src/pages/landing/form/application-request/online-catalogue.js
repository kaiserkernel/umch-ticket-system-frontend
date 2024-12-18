import React, { useState, useEffect, useContext, useRef } from "react";
import { Row, Col, Form } from "react-bootstrap";
import { FormContext } from "../index";
import FormService from "../../../../sevices/form-service";
import { ToastContainer, toast } from "react-toastify";
import { useInquiry } from "../../../../context/inquiryProvider";

const OnlineCatalogue = ({ applicationRequest }) => {
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

    if (applicationRequest === "Online Catalogue (Solaris)")
      setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  return (
    <div className="mt-4 mt-md-4 g-4 g-md-4">
      <div className="my-5">
        <p> Dear Student,</p>
        <p>
          If you have found corrections, requests for changes, or missing grades
          in the online catalog Solaris, please feel free to contact us. We will
          gladly assist in resolving the issue.
        </p>
      </div>
      <Row className="mt-4">
        <Col lg={12}>
          <Form.Group controlId="commentTextarea">
            <Form.Label className="input-label">Comments</Form.Label>
            <Form.Control
              as="textarea"
              name="comment"
              value={formDetailData?.comment}
              onChange={handleChange}
              rows={6}
              placeholder=""
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

export default OnlineCatalogue;
