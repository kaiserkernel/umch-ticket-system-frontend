import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import moment from "moment";
import FormService from "../../sevices/form-service";
import emailTemplateService from "../../sevices/email-template-service";
import {
  INQUIRYCATEGORIESEmailTemplates,
  POSITIONNAMES
} from "../../globalVariables";

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
  const [defaultTemplate, setDefaultTemplateData] = useState();
  const [emailTemplates, setEmailTemplates] = useState([]);
  const [formData, setFormData] = useState({
    studentNo: selectedTicket?.enrollmentNumber,
    nationality: selectedTicket?.details?.nationality,
    currentYearOfStudy: selectedTicket?.details?.currentYearOfStudy,
    birthday: moment(selectedTicket?.details?.birthday).format("MM/DD/YYYY")
  });

  let subCategory1 = parseInt(selectedTicket?.subCategory1);
  let inquiryCategory = parseInt(selectedTicket?.inquiryCategory);
  let details = selectedTicket?.details;

  const data = INQUIRYCATEGORIESEmailTemplates[0]["subCategories"][4]["accept"];
  console.log(data);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  useEffect(() => {
    const getAllEmailTemplate = async () => {
      try {
        const res = await emailTemplateService.getEmailTemplates();
        setEmailTemplates(res?.emailTemplate);
      } catch (err) {
        console.log(err);
      }
    };
    getAllEmailTemplate();
    let authUser = localStorage.getItem("userData");
    authUser = JSON.parse(authUser);
    let replacedEmailTemplate = data
      .replace(
        "[Student's Name]",
        selectedTicket?.firstName + " " + selectedTicket?.lastName
      )
      .replace("[Your Name]", authUser?.firstName + " " + authUser?.lastName)
      .replace("[Your Title]", authUser.title ? authUser.title : "Professor")
      .replace(
        "[Institution/Organization Name]",
        authUser.position
          ? POSITIONNAMES[authUser.position]
          : "UMCH University Team"
      )
      .replace("[Contact Information]", authUser?.email)
      .replace(
        "[contact us]",
        actionBtnType == "reject"
          ? `<a href='${process.env.REACT_APP_URL}/#/ticket-reopen/${selectedTicket?._id}'>Contact Us</a>`
          : `<a href='${process.env.REACT_APP_URL}/#/ticket-reopen/${selectedTicket?._id}'>Contact Us</a>`
      )
      .replace("[requested teaching hospital]", details?.changePartner)
      .replace("[requested group]", details?.switchStudyGroup)
      .replace("[requested subject]", details?.subject)
      .replace("[Subject Name]", details?.subject)
      .replace("[Date]", moment(details?.examDate).format("MM-DD-YYYY"))
      .replace(
        "[interval of time requested]",
        moment(details?.diplomaCollectionDate).format("MM-DD-YYYY")
      );
    setMailTemplateData(replacedEmailTemplate);
    setDefaultTemplateData(replacedEmailTemplate);
  }, [actionBtnType]);

  const replaceEmailTemplate = (
    mailTemplateData,
    selectedTicket,
    contentTemplate,
    formData
  ) => {
    let authUser = localStorage.getItem("userData");
    authUser = JSON.parse(authUser);
    let replaceSubject =
      "Decision on Your Request of Absence - Ticket Number [Ticket Number]".replace(
        "[Ticket Number]",
        selectedTicket?.inquiryNumber
      );

    let replacedEmailTemplate;

    try {
      replacedEmailTemplate = mailTemplateData
        .replace(
          "[Student's Name]",
          selectedTicket?.firstName + " " + selectedTicket?.lastName
        )
        .replace("[Your Name]", authUser?.firstName + " " + authUser?.lastName)
        .replace("[Your Title]", authUser.title ? authUser.title : "Professor")
        .replace(
          "[Institution/Organization Name]",
          authUser.position ? POSITIONNAMES[authUser.position] : "Vice Rector"
        )
        .replace("[Contact Information]", authUser?.email)
        .replace(
          "[contact us]",
          "<a href='" +
            process.env.REACT_APP_URL +
            "/#/ticket-reopen/" +
            selectedTicket?._id +
            "'>Contact Us</a>"
        )
        .replace("[requested teaching hospital]", details?.changePartner)
        .replace("[requested group]", details?.switchStudyGroup)
        .replace("[requested subject]", details?.subject)
        .replace("[Subject Name]", details?.subject)
        .replace("[Date]", moment(details?.examDate).format("MM-DD-YYYY"))
        .replace(
          "[interval of time requested]",
          moment(details?.diplomaCollectionDate).format("MM-DD-YYYY")
        );
    } catch (err) {
      console.log(err);
    }

    let payload = {};

    payload = {
      replaceSubject: replaceSubject,
      replacedEmailTemplate: replacedEmailTemplate,
      id: selectedTicket?._id,
      studentNo: studentNo ? studentNo : "",
      selectedTicket: selectedTicket,
      formData: formData
    };

    return payload;
  };
  const handleSubmit = async () => {
    try {
      handleModalClose();
      setLoading(true);

      const payload = replaceEmailTemplate(
        mailTemplateData,
        selectedTicket,
        contentTemplate,
        formData
      );

      const res = await FormService.acceptEnrollmentInquiry(payload);
      setUnClickedApprovedTicketsCount(unClickedApprovedTicketsCount + 1);

      setTicketStatusChange(false);
      setSelectedTicket(res?.inquiry);

      successNotify(res?.message);
      setLoading(false);
    } catch (error) {}
  };

  const handleChangeTemplate = (e) => {
    setMailTemplateData(e.target.value);
  };
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
            dateFormat="yyyy/MM/dd"
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
            className="custom-input mt-4"
          >
            <option key="0" value={defaultTemplate}>
              Default Template
            </option>
            {emailTemplates.map((emailTemplate, index) => (
              <option
                key={index + 1}
                value={emailTemplate?.emailTemplateContent}
              >
                {emailTemplate?.emailTemplateTitle}
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
