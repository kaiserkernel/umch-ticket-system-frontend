import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import FormService from "../../sevices/form-service";
import emailTemplateService from "../../sevices/email-template-service";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styled from "styled-components";

import { formatEmailContent } from "../../utils/formatEmailContent";

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

const EnrollmentModal = ({
  show,
  handleModalClose,
  actionBtnType,
  selectedTicket,
  setLoading,
  setTicketStatusChange,
  successNotify,
  errorNotify,
  setSelectedTicket,
  contentTemplate,
  studentNo,
  setUnClickedApprovedTicketsCount,
  unClickedApprovedTicketsCount,
  setUnClickedRejectTicketsCount,
  unClickedRejectTicketsCount
}) => {
  const [mailTemplateData, setMailTemplateData] = useState();
  const [emailTemplates, setEmailTemplates] = useState([]);
  const [selectedMailTemplate, setSelectedMailTempate] = useState();

  const [formData, setFormData] = useState({
    studentNo: selectedTicket?.enrollmentNumber,
    nationality: selectedTicket?.details?.nationality,
    currentYearOfStudy: selectedTicket?.details?.currentYearOfStudy,
    birthday: selectedTicket?.details?.birthday
  });

  let subCategory1 = selectedTicket?.subCategory1;
  let inquiryCategory = selectedTicket?.inquiryCategory;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  useEffect(() => {
    const getEmailTemplates = async () => {
      try {
        const { data } = await emailTemplateService.getEmailTemplatesByCategory({
          inquiryCategory,
          subCategory1
        });
        setEmailTemplates(data);
      } catch (error) {
        console.log(error);
      }
    }
    getEmailTemplates();
  }, []);

  useEffect(() => {
    if (show && emailTemplates.length > 0) {
      const defaultTempate = emailTemplates.find(log => log.emailTemplateTitle === "Default");
      if (defaultTempate) {
        setSelectedMailTempate(defaultTempate.emailTemplateContent);
        formatTempateData(defaultTempate.emailTemplateContent);
      } else {
        setSelectedMailTempate(emailTemplates[0].emailTemplateContent);
        formatTempateData(emailTemplates[0].emailTemplateContent);
      }
    }
  }, [show, emailTemplates])

  const formatEmailPayload = (
    mailTemplateData,
    selectedTicket,
    formData
  ) => {
    let authUser = localStorage.getItem("userData");
    authUser = JSON.parse(authUser);

    const { subCategory1, inquiryCategory } = selectedTicket;
    const type = subCategory1 ? (subCategory1 === "Other" ? `Other (${inquiryCategory})` : subCategory1) : inquiryCategory;
    let title = `Decision on Your Request of ${type} - Ticket Number ` + selectedTicket?.inquiryNumber;

    let payload = {
      replaceSubject: title,
      replacedEmailTemplate: mailTemplateData,
      id: selectedTicket._id,
      studentNo: studentNo ? studentNo : "",
      selectedTicket: selectedTicket,
      formData
    };

    return payload;
  };

  const handleSubmit = async () => {
    try {
      handleModalClose();
      setLoading(true);

      const payload = formatEmailPayload(
        mailTemplateData,
        selectedTicket,
        formData
      );

      const res = await FormService.acceptEnrollmentInquiry(payload);
      setUnClickedApprovedTicketsCount(unClickedApprovedTicketsCount + 1);

      setTicketStatusChange(false);
      setSelectedTicket(res?.inquiry);

      successNotify(res?.message);
      setLoading(false);
    } catch (error) { }
  };

  const handleChangeTemplate = (e) => {
    setSelectedMailTempate(e.target.value);
    formatTempateData(e.target.value);
  };

  const formatTempateData = (_data) => {
    let studentName = selectedTicket.firstName + " " + selectedTicket.lastName;
    const data = formatEmailContent(_data, selectedTicket.details, studentName);
    setMailTemplateData(data);
  }

  return (
    <Modal show={show} onHide={handleModalClose}>
      <Modal.Header closeButton>
        <Modal.Title>Student Informatioin for PDF</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ height: "80%", overflow: "auto" }}>
        <Form.Group>
          <Form.Label className="input-label">
            Student No <span className="ms-1 required-label">*</span>
          </Form.Label>
          <Form.Control
            type="text"
            name="studentNo"
            onChange={handleChange}
            value={formData.studentNo}
            placeholder="Student No"
            className="custom-input"
          />
        </Form.Group>
        <Form.Group>
          <Form.Label className="input-label">
            Nationality <span className="ms-1 required-label">*</span>
          </Form.Label>
          <Form.Control
            type="text"
            name="nationality"
            onChange={handleChange}
            value={formData.nationality}
            placeholder="Nationality"
            className="custom-input"
          />
        </Form.Group>
        <Form.Group>
          <Form.Label className="input-label">
            Current year of study
            <span className="ms-1 required-label">*</span>
          </Form.Label>
          <Form.Control
            as="select"
            name="currentYearOfStudy"
            value={formData.currentYearOfStudy}
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
            <option value="1st year">1st year</option>
            <option value="2nd year">2nd year</option>
            <option value="3rd year">3rd year</option>
            <option value="4th year">4th year</option>
            <option value="5th year">5th year</option>
            <option value="6th year">6th year</option>
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="" className="mt-2">
          <Form.Label className="input-label">
            Date of Birth
            <span className="ms-1 required-label">*</span>
          </Form.Label>
          <StyledDatePicker
            selected={formData.birthday}
            onChange={(date) =>
              setFormData({
                ...formData,
                birthday: date
              })
            }
            name="birthday"
            dateFormat="dd/MM/yyyy"
            isClearable
            showMonthDropdown
            showYearDropdown
            dropdownMode="select"
            className="custom-input"
          />
        </Form.Group>

        <Form.Group>
          <Form.Control
            as="select"
            name="template"
            onChange={handleChangeTemplate}
            style={{
              appearance: "auto", // Hides the default arrow
              MozAppearance: "auto", // For Firefox
              WebkitAppearance: "auto", // For Safari/Chrome
              backgroundColor: "white",
              color: "black",
              padding: "8px 12px",
              border: "1px solid #007bff"
            }}
            value={selectedMailTemplate}
            className="custom-input mt-4"
          >
            {emailTemplates.map((log, index) => (
              <option
                key={index}
                value={log.emailTemplateContent}
              >
                {log?.emailTemplateTitle}
              </option>
            ))}
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="commentTextarea" className="mt-4">
          <Form.Label className="input-label">Email Template</Form.Label>
          <ReactQuill
            placeholder=""
            value={mailTemplateData}
            onChange={(data) => setMailTemplateData(data)}
            name="mailTemplateData"
            style={{ height: "200px" }}
          />
        </Form.Group>
      </Modal.Body>
      <Modal.Footer className="mt-5">
        <Button variant="primary" onClick={handleSubmit}>
          Send
        </Button>
        <Button variant="secondary" onClick={handleModalClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EnrollmentModal;
