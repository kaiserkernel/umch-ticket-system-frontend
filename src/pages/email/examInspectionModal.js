import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import TimePicker from "react-time-picker";
import "react-datepicker/dist/react-datepicker.css";
import styled from "styled-components";
import moment from "moment";

import FormService from "../../sevices/form-service";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  INQUIRYCATEGORIESEmailTemplates,
  POSITIONNAMES
} from "../../globalVariables";

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
const ExamInspectionModal = ({
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
  const [formData, setFormData] = useState({
    examTime: "",
    examDate: selectedTicket?.details?.examDate,
    examLocation: "Administration Office"
  });

  let subCategory1 = parseInt(selectedTicket?.subCategory1);
  let inquiryCategory = parseInt(selectedTicket?.inquiryCategory);
  let details = selectedTicket?.details;

  const data = INQUIRYCATEGORIESEmailTemplates[0]["subCategories"][5]["accept"];
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
        actionBtnType == "reject"
          ? `<a href='${process.env.REACT_APP_URL}/ticket-reopen/${selectedTicket?._id}'>Contact Us</a>`
          : `<a href='${process.env.REACT_APP_URL}/home'>Contact Us</a>`
      )
      .replace("[requested teaching hospital]", details?.changePartner)
      .replace("[requested group]", details?.switchStudyGroup)
      .replace("[requested subject]", details?.subject)
      .replace("[Subject Name]", details?.subject)
      .replace("[Date]", moment(formData?.examDate).format("MM/DD/YYYY"))
      .replace("[Time]", moment(formData.examTime).format("hh:mm A"))
      .replace("[Location]", formData.examLocation)
      .replace(
        "[interval of time requested]",
        moment(details?.diplomaCollectionDate).format("MM/DD/YYYY")
      );
    setMailTemplateData(replacedEmailTemplate);
  }, [formData]);

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
        .replace("[Time]", moment(formData.examTime).format("hh:mm A"))
        .replace("[Location]", formData.examLocation)
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

      const res = await FormService.acceptExamInspectionInquiry(payload);
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
        <Modal.Title>Exam Inspection</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ height: "80%", overflow: "auto" }}>
        <Form.Group controlId="">
          <Form.Label className="input-label">
            Appointment Date for Exam Inspection:
            <span className="ms-1 required-label">*</span>
          </Form.Label>
          <StyledDatePicker
            selected={formData?.examDate}
            onChange={(date) =>
              setFormData({
                ...formData,
                examDate: date
              })
            }
            dateFormat="yyyy/MM/dd"
            isClearable
            className="custom-input"
          />
        </Form.Group>
        <Form.Group className="mt-2">
          <Form.Label className="input-label">
            Appointment Date for Exam Inspection:{" "}
            <span className="ms-1 required-label">*</span>
          </Form.Label>
          <StyledDatePicker
            showTimeSelect
            showTimeSelectOnly
            name="examTime"
            selected={formData.examTime}
            onChange={(date) => setFormData({ ...formData, examTime: date })}
            timeIntervals={15}
            timeCaption="Time"
            dateFormat="h:mm aa"
            className="custom-input"
          />
        </Form.Group>
        <Form.Group className="mt-2">
          <Form.Label className="input-label">
            Exam Location: <span className="ms-1 required-label">*</span>
          </Form.Label>
          <Form.Control
            type="text"
            name="examLocation"
            onChange={handleChange}
            value={formData.examLocation}
            placeholder=""
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

export default ExamInspectionModal;
