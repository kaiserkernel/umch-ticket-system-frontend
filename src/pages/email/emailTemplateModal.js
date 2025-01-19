import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import FormService from "../../sevices/form-service";
import emailTemplateService from "../../sevices/email-template-service";

import { formatEmailContent } from "../../utils/formatEmailContent";

const EmailTemplateModal = ({
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
  setUnClickedRejectTicketsCount,
  setUnClickedClosedTicketCount
}) => {
  const [mailTemplateData, setMailTemplateData] = useState("");
  const [emailTemplates, setEmailTemplates] = useState([]);
  const [selectedMailTemplate, setSelectedMailTempate] = useState();

  let subCategory1 = selectedTicket?.subCategory1;
  let inquiryCategory = selectedTicket?.inquiryCategory;

  useEffect(() => {
    if (show) {
      const getEmailTemplates = async () => {
        try {
          const { data } = await emailTemplateService.getEmailTemplatesByCategory({
            inquiryCategory,
            subCategory1,
            emailTemplateState: actionBtnType
          });

          setEmailTemplates(data);

          // set default template
          if (data.length > 0) {
            const defaultTempate = data.find(log => log.emailTemplateTitle === "Default");
            if (defaultTempate) {
              setSelectedMailTempate(defaultTempate.emailTemplateContent);
              formatTempateData(defaultTempate.emailTemplateContent);
            } else {
              setSelectedMailTempate(data[0].emailTemplateContent);
              formatTempateData(data[0].emailTemplateContent);
            }
          }
        } catch (error) {
          console.log(error);
        }
      }
      getEmailTemplates();
    } else {
      setEmailTemplates([]);
      setMailTemplateData("");
    }
  }, [show, actionBtnType])

  const formatEmailPayload = (
    mailTemplateData,
    selectedTicket,
    contentTemplate
  ) => {
    let authUser = localStorage.getItem("userData");
    authUser = JSON.parse(authUser);

    const { subCategory1, inquiryCategory } = selectedTicket;
    const type = subCategory1 ? (subCategory1 === "Other" ? `Other (${inquiryCategory})` : subCategory1) : inquiryCategory;
    let title = `Decision on Your Request of ${type} - Ticket Number ` + selectedTicket?.inquiryNumber;

    let payload = {};
    if (contentTemplate == `${selectedTicket.inquiryCategory}-Transcript of Records`) {
      payload = {
        replaceSubject: title,
        replacedEmailTemplate: mailTemplateData,
        id: selectedTicket?._id
      };
    }
    if (contentTemplate == `${selectedTicket.inquiryCategory}-Enrollment Certificate`) {
      payload = {
        replaceSubject: title,
        replacedEmailTemplate: mailTemplateData,
        id: selectedTicket?._id,
        studentNo: studentNo ? studentNo : "",
        selectedTicket: selectedTicket
      };
    }
    if (contentTemplate == `${selectedTicket.inquiryCategory}-Transcript to Targu Mures`) {
      payload = {
        replaceSubject: title,
        replacedEmailTemplate: mailTemplateData,
        id: selectedTicket?._id,
        selectedTicket: selectedTicket
      };
    } else {
      payload = {
        replaceSubject: title,
        replacedEmailTemplate: mailTemplateData,
        id: selectedTicket?._id
      };
    }

    return payload;
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
        if (contentTemplate == `${selectedTicket.inquiryCategory}-Enrollment Certificate`) {
          res = await FormService.acceptEnrollmentInquiry(payload);
          setUnClickedApprovedTicketsCount(prev => prev + 1);
        }
        if (contentTemplate == `${selectedTicket.inquiryCategory}-Transcript to Targu Mures`) {
          res = await FormService.acceptTransferTarguMuresInquiry(payload);
          setUnClickedApprovedTicketsCount(prev => prev + 1);
        } else {
          try {
            res = await FormService.acceptInquiry(payload);
            setUnClickedApprovedTicketsCount(prev => prev + 1);
          } catch (err) {
            console.log(err, "approve error");
          }
        }
      }
      if (actionBtnType == "reject") {
        res = await FormService.rejectInquiry(payload);
        setUnClickedRejectTicketsCount(prev => prev + 1);
      }
      if (actionBtnType == "close") {
        console.log("close inquiry")
        res = await FormService.closeInquiry(payload);
        setUnClickedClosedTicketCount(prev => prev + 1);
      }

      if (actionBtnType == "notify") {
        try {
          res = await FormService.notifyTranscriptRecord(payload);
          setUnClickedApprovedTicketsCount(prev => prev + 1);
        } catch (err) { }
      }
      setTicketStatusChange(prev => !prev);

      // if (actionBtnType !== "close")
      //   setSelectedTicket(res?.inquiry);

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
        <Modal.Title>Email Template</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ height: "450px" }}>
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
            className="custom-input"
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
      <Modal.Footer>
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

export default EmailTemplateModal;
