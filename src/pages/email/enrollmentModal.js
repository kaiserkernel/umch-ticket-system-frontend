import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import moment from "moment";
import FormService from "../../sevices/form-service";
import {
  INQUIRYCATEGORIESEmailTemplates,
  POSITIONNAMES
} from "../../globalVariables";

const EnrollmentModal = ({
  show,
  handleModalClose,
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
  const [formData, setFormData] = useState({
    studentNo: studentNo,
    nationality: selectedTicket?.details?.nationality,
    currentYearOfStudy: selectedTicket?.details?.currentYearOfStudy,
    birthday: moment(selectedTicket?.details?.birthday).format("MM-DD-YYYY")
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
        "<a href='" +
          process.env.REACT_APP_URL +
          "/ticket-reopen/" +
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
    setMailTemplateData(replacedEmailTemplate);
  });

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
            "/ticket-reopen/" +
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
        <Form.Group className="mt-2">
          <Form.Label className="input-label">
            Current Year of Study <span className="ms-1 required-label">*</span>
          </Form.Label>
          <Form.Control
            type="text"
            name="currentYearOfStudy"
            onChange={handleChange}
            value={formData.currentYearOfStudy}
            placeholder="Current Year Of Study"
            className="custom-input"
          />
        </Form.Group>
        <Form.Group className="mt-2">
          <Form.Label className="input-label">
            Date of Birthday <span className="ms-1 required-label">*</span>
          </Form.Label>
          <Form.Control
            type="text"
            name="birthday"
            onChange={handleChange}
            value={formData.birthday}
            placeholder="Birthday"
            className="custom-input"
          />
        </Form.Group>

        <Form.Group controlId="commentTextarea" className="mt-2">
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
