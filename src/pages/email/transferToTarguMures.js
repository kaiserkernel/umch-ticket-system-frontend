import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import FormService from "../../sevices/form-service";
import emailTemplateService from "../../sevices/email-template-service";

import { formatEmailContent } from "../../utils/formatEmailContent";

const TarguModal = ({
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
  setUnClickedApprovedTicketsCount,
  unClickedApprovedTicketsCount,
  setUnClickedRejectTicketsCount,
  unClickedRejectTicketsCount
}) => {
  const [mailTemplateData, setMailTemplateData] = useState();
  const [emailTemplates, setEmailTemplates] = useState([]);
  const [selectedMailTemplate, setSelectedMailTempate] = useState();

  const [formData, setFormData] = useState({
    studentNo: selectedTicket?.enrollmentNumber
  });

  let subCategory1 = selectedTicket?.subCategory1;
  let inquiryCategory = selectedTicket?.inquiryCategory;

  const formatTempateData = (_data) => {
    let studentName = selectedTicket.firstName + " " + selectedTicket.lastName;
    const data = formatEmailContent(_data, selectedTicket.details, studentName);
    setMailTemplateData(data);
  }

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
      selectedTicket: selectedTicket,
      formData,
      selectedTicket
    };

    return payload;
  };

  const handleChangeTemplate = (e) => {
    setSelectedMailTempate(e.target.value);
    formatTempateData(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      handleModalClose();
      setLoading(true);

      const payload = formatEmailPayload(
        mailTemplateData,
        selectedTicket,
        contentTemplate
      );

      let res;

      if (actionBtnType == "accept") {
        res = await FormService.acceptTransferTarguMuresInquiry(payload);
        setUnClickedApprovedTicketsCount(unClickedApprovedTicketsCount + 1);
      }
      if (actionBtnType == "reject") {
        res = await FormService.rejectInquiry(payload);
        setUnClickedRejectTicketsCount(unClickedRejectTicketsCount + 1);
      }

      if (actionBtnType == "notify") {
        try {
          res = await FormService.notifyTranscriptRecord(payload);
          setUnClickedApprovedTicketsCount(unClickedApprovedTicketsCount + 1);
        } catch (err) { }
      }
      setTicketStatusChange(false);
      setSelectedTicket(res?.inquiry);

      successNotify(res?.message);
      setLoading(false);
    } catch (error) { }
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

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <Modal show={show} onHide={handleModalClose}>
      <Modal.Header closeButton>
        <Modal.Title>Email Template</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ height: "90%", overflow: "auto" }}>
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
            value={selectedMailTemplate}
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
          <ReactQuill
            placeholder=""
            value={mailTemplateData}
            onChange={(data) => setMailTemplateData(data)}
            name="mailTemplateData"
            style={{ height: "300px" }}
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

export default TarguModal;
