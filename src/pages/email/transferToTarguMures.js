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
  const [defaultTemplate, setDefaultTemplateData] = useState();
  const [formData, setFormData] = useState({
    studentNo: selectedTicket?.enrollmentNumber
  });
  let subCategory1 = parseInt(selectedTicket?.subCategory1);
  let inquiryCategory = parseInt(selectedTicket?.inquiryCategory);
  let details = selectedTicket?.details;

  let data = "";
  if (actionBtnType == "accept" && subCategory1) {
    data =
      INQUIRYCATEGORIESEmailTemplates[inquiryCategory - 1]["subCategories"][
        subCategory1 - 1
      ]["accept"];
  }
  if (actionBtnType == "reject" && subCategory1) {
    data =
      INQUIRYCATEGORIESEmailTemplates[inquiryCategory - 1]["subCategories"][
        subCategory1 - 1
      ]["reject"];
  }

  useEffect(() => {
    const getEmailTemplatesByCategory = async () => {
      try {
        const payload = {
          inquiryCategory: inquiryCategory,
          subCategory: subCategory1
        };
        const res = await emailTemplateService.getEmailTemplatesByCategory(
          payload
        );
        setEmailTemplates(res?.emailTemplates);
      } catch (err) {
        console.log(err);
      }
    };
    getEmailTemplatesByCategory();
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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const replaceEmailTemplate = (
    mailTemplateData,
    selectedTicket,
    contentTemplate
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
          actionBtnType == "reject"
            ? `<a href='${process.env.REACT_APP_URL}/ticket-reopen/${selectedTicket?._id}'>Contact Us</a>`
            : `<a href='${process.env.REACT_APP_URL}/home'>Contact Us</a>`
        )
        .replace("[requested teaching hospital]", details?.changePartner)
        .replace("[requested group]", details?.switchStudyGroup)
        .replace("[requested subject]", details?.subject)
        .replace("[Subject Name]", details?.subject)
        .replace("[Date]", moment(details?.examDate).format("MM/DD/YYYY"))
        .replace(
          "[interval of time requested]",
          moment(details?.diplomaCollectionDate).format("MM/DD/YYYY")
        );
    } catch (err) {
      console.log(err);
    }

    let payload = {};

    if (contentTemplate == "TransferTarguMures") {
      payload = {
        replaceSubject: replaceSubject,
        replacedEmailTemplate: replacedEmailTemplate,
        formData: formData,
        id: selectedTicket?._id,
        selectedTicket: selectedTicket
      };
    }

    return payload;
  };

  const handleChangeTemplate = (e) => {
    setMailTemplateData(e.target.value);
  };
  const handleSubmit = async () => {
    try {
      handleModalClose();
      setLoading(true);

      const payload = replaceEmailTemplate(
        mailTemplateData,
        selectedTicket,
        contentTemplate
      );

      let res;

      if (actionBtnType == "accept") {
        if (contentTemplate == "Enrollment") {
          res = await FormService.acceptEnrollmentInquiry(payload);
          setUnClickedApprovedTicketsCount(unClickedApprovedTicketsCount + 1);
        }
        if (contentTemplate == "TransferTarguMures") {
          res = await FormService.acceptTransferTarguMuresInquiry(payload);
          setUnClickedApprovedTicketsCount(unClickedApprovedTicketsCount + 1);
        } else {
          try {
            res = await FormService.acceptInquiry(payload);
            setUnClickedApprovedTicketsCount(unClickedApprovedTicketsCount + 1);
          } catch (err) {
            console.log(err, "=====approve error");
          }
        }
      }
      if (actionBtnType == "reject") {
        res = await FormService.rejectInquiry(payload);
        setUnClickedRejectTicketsCount(unClickedRejectTicketsCount + 1);
      }

      if (actionBtnType == "notify") {
        try {
          res = await FormService.notifyTranscriptRecord(payload);
          setUnClickedApprovedTicketsCount(unClickedApprovedTicketsCount + 1);
        } catch (err) {}
      }
      setTicketStatusChange(false);
      setSelectedTicket(res?.inquiry);

      successNotify(res?.message);
      setLoading(false);
    } catch (error) {}
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
          >
            <option key="0" value={defaultTemplate}>
              Default Template
            </option>
            {(emailTemplates || []).map((emailTemplate, index) => (
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
