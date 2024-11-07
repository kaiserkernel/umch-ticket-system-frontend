import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import FormService from "../../sevices/form-service";

const positionNames = [
  "UMCH Study Secretariat",
  "UMFST Administration Board Management (Vice-Rector)",
  "UMFST Administration Office (UMFST Targu Mures)",
  "CPE Board Management, UMCH Finance Department",
  "UMCH Facility Department",
  "UMCH Teaching Hospital Coordination",
  "UMCH IT-SUPPORT, UMFST - Rector (UMFST Targu Mures)",
];

const emailTemplate = [
  {
    accept:
      "<p>Dear [Student's Name]<p><p>Thank you for your request and for placng your trust in us. We have carefully reviewed your request and would like to inform you of the following decision:</p><br/><p>Congratulations! Your request has been approved.</p><p> Please make sure to inform your teachers about the decision and any subsequent steps you need to take.</p><p>If you have any further questions or need additional clarification, feel free to [contact us].</p><br /> <p>Thank you for your understanding and cooperation.</p><p>Best regards,</p><p>[Your Name]</p><p>[Your Title]<p><p>[Institution/Organization Name]<p><p>[Contact Information]</p>",
    reject:
      "<p>Dear [Student's Name],</p><p>Thank you for your request and for placing your trust in us. We have carefully reviewed your application and would like to inform you of the following decision:</p><br /><p>We regret to inform you that your request has been declined. We understand this may be disappointing, and we encourage you to reach out if you have any questions about the decision or need further assistance.</p><br /><p>If you have any further questions or need additional clarification, feel free to [contact us]. </p><br /><p>Thank you for your understanding and cooperation.</p><p>Best regards,</p><p>[Your Name]</p><p>[Your Title]</p><p>[Institution/Organization Name]</p><p>[Contact Information]</p>",
  },
  {
    accept:
      "<p>Dear [Student's Name]<p><p>Thank you for your request and for placng your trust in us. We have carefully reviewed your request and would like to inform you of the following decision:</p><br/><p>Congratulations! Your request has been approved.</p><p> Please make sure to inform your teachers about the decision and any subsequent steps you need to take.</p><p>If you have any further questions or need additional clarification, feel free to [contact us].</p><br /> <p>Thank you for your understanding and cooperation.</p><p>Best regards,</p><p>[Your Name]</p><p>[Your Title]<p><p>[Institution/Organization Name]<p><p>[Contact Information]</p>",
    reject:
      "<p>Dear [Student's Name],</p><p>Thank you for your request and for placing your trust in us. We have carefully reviewed your application and would like to inform you of the following decision:</p><br /><p>We regret to inform you that your request has been declined. We understand this may be disappointing, and we encourage you to reach out if you have any questions about the decision or need further assistance.</p><br /><p>If you have any further questions or need additional clarification, feel free to [contact us]. </p><br /><p>Thank you for your understanding and cooperation.</p><p>Best regards,</p><p>[Your Name]</p><p>[Your Title]</p><p>[Institution/Organization Name]</p><p>[Contact Information]</p>",
  },
  {
    accept:
      "<p>Dear [Student's Name]<p><p>Thank you for your request and for placng your trust in us. We have carefully reviewed your request and would like to inform you of the following decision:</p><br/><p>Congratulations! Your request has been approved.</p><p> Please make sure to inform your teachers about the decision and any subsequent steps you need to take.</p><p>If you have any further questions or need additional clarification, feel free to [contact us].</p><br /> <p>Thank you for your understanding and cooperation.</p><p>Best regards,</p><p>[Your Name]</p><p>[Your Title]<p><p>[Institution/Organization Name]<p><p>[Contact Information]</p>",
    reject:
      "<p>Dear [Student's Name],</p><p>Thank you for your request and for placing your trust in us. We have carefully reviewed your application and would like to inform you of the following decision:</p><br /><p>We regret to inform you that your request has been declined. We understand this may be disappointing, and we encourage you to reach out if you have any questions about the decision or need further assistance.</p><br /><p>If you have any further questions or need additional clarification, feel free to [contact us]. </p><br /><p>Thank you for your understanding and cooperation.</p><p>Best regards,</p><p>[Your Name]</p><p>[Your Title]</p><p>[Institution/Organization Name]</p><p>[Contact Information]</p>",
  },
  {
    accept:
      "<p>Dear [Student's Name]<p><p>Thank you for your request and for placng your trust in us. We have carefully reviewed your request and would like to inform you of the following decision:</p><br/><p>Congratulations! Your request has been approved.</p><p> Please make sure to inform your teachers about the decision and any subsequent steps you need to take.</p><p>If you have any further questions or need additional clarification, feel free to [contact us].</p><br /> <p>Thank you for your understanding and cooperation.</p><p>Best regards,</p><p>[Your Name]</p><p>[Your Title]<p><p>[Institution/Organization Name]<p><p>[Contact Information]</p>",
    reject:
      "<p>Dear [Student's Name],</p><p>Thank you for your request and for placing your trust in us. We have carefully reviewed your application and would like to inform you of the following decision:</p><br /><p>We regret to inform you that your request has been declined. We understand this may be disappointing, and we encourage you to reach out if you have any questions about the decision or need further assistance.</p><br /><p>If you have any further questions or need additional clarification, feel free to [contact us]. </p><br /><p>Thank you for your understanding and cooperation.</p><p>Best regards,</p><p>[Your Name]</p><p>[Your Title]</p><p>[Institution/Organization Name]</p><p>[Contact Information]</p>",
  },
  {
    accept:
      "<p>Dear [Student's Name]<p><p>Thank you for your request and for placng your trust in us. We have carefully reviewed your request and would like to inform you of the following decision:</p><br/><p>Congratulations! Your request has been approved.</p><p> Please make sure to inform your teachers about the decision and any subsequent steps you need to take.</p><p>If you have any further questions or need additional clarification, feel free to [contact us].</p><br /> <p>Thank you for your understanding and cooperation.</p><p>Best regards,</p><p>[Your Name]</p><p>[Your Title]<p><p>[Institution/Organization Name]<p><p>[Contact Information]</p>",
    reject:
      "<p>Dear [Student's Name],</p><p>Thank you for your request and for placing your trust in us. We have carefully reviewed your application and would like to inform you of the following decision:</p><br /><p>We regret to inform you that your request has been declined. We understand this may be disappointing, and we encourage you to reach out if you have any questions about the decision or need further assistance.</p><br /><p>If you have any further questions or need additional clarification, feel free to [contact us]. </p><br /><p>Thank you for your understanding and cooperation.</p><p>Best regards,</p><p>[Your Name]</p><p>[Your Title]</p><p>[Institution/Organization Name]</p><p>[Contact Information]</p>",
  },
  {
    accept:
      "<p>Dear [Student's Name]<p><p>Thank you for your request and for placng your trust in us. We have carefully reviewed your request and would like to inform you of the following decision:</p><br/><p>Congratulations! Your request has been approved.</p><p> Please make sure to inform your teachers about the decision and any subsequent steps you need to take.</p><p>If you have any further questions or need additional clarification, feel free to [contact us].</p><br /> <p>Thank you for your understanding and cooperation.</p><p>Best regards,</p><p>[Your Name]</p><p>[Your Title]<p><p>[Institution/Organization Name]<p><p>[Contact Information]</p>",
    reject:
      "<p>Dear [Student's Name],</p><p>Thank you for your request and for placing your trust in us. We have carefully reviewed your application and would like to inform you of the following decision:</p><br /><p>We regret to inform you that your request has been declined. We understand this may be disappointing, and we encourage you to reach out if you have any questions about the decision or need further assistance.</p><br /><p>If you have any further questions or need additional clarification, feel free to [contact us]. </p><br /><p>Thank you for your understanding and cooperation.</p><p>Best regards,</p><p>[Your Name]</p><p>[Your Title]</p><p>[Institution/Organization Name]</p><p>[Contact Information]</p>",
  },
  {
    accept:
      "<p>Dear [Student's Name]<p><p>Thank you for your request and for placng your trust in us. We have carefully reviewed your request and would like to inform you of the following decision:</p><br/><p>Congratulations! Your request has been approved.</p><p> Please make sure to inform your teachers about the decision and any subsequent steps you need to take.</p><p>If you have any further questions or need additional clarification, feel free to [contact us].</p><br /> <p>Thank you for your understanding and cooperation.</p><p>Best regards,</p><p>[Your Name]</p><p>[Your Title]<p><p>[Institution/Organization Name]<p><p>[Contact Information]</p>",
    reject:
      "<p>Dear [Student's Name],</p><p>Thank you for your request and for placing your trust in us. We have carefully reviewed your application and would like to inform you of the following decision:</p><br /><p>We regret to inform you that your request has been declined. We understand this may be disappointing, and we encourage you to reach out if you have any questions about the decision or need further assistance.</p><br /><p>If you have any further questions or need additional clarification, feel free to [contact us]. </p><br /><p>Thank you for your understanding and cooperation.</p><p>Best regards,</p><p>[Your Name]</p><p>[Your Title]</p><p>[Institution/Organization Name]</p><p>[Contact Information]</p>",
  },
  {
    accept:
      "<p>Dear [Student's Name]<p><p>Thank you for your request and for placng your trust in us. We have carefully reviewed your request and would like to inform you of the following decision:</p><br/><p>Congratulations! Your request has been approved.</p><p> Please make sure to inform your teachers about the decision and any subsequent steps you need to take.</p><p>If you have any further questions or need additional clarification, feel free to [contact us].</p><br /> <p>Thank you for your understanding and cooperation.</p><p>Best regards,</p><p>[Your Name]</p><p>[Your Title]<p><p>[Institution/Organization Name]<p><p>[Contact Information]</p>",
    reject:
      "<p>Dear [Student's Name],</p><p>Thank you for your request and for placing your trust in us. We have carefully reviewed your application and would like to inform you of the following decision:</p><br /><p>We regret to inform you that your request has been declined. We understand this may be disappointing, and we encourage you to reach out if you have any questions about the decision or need further assistance.</p><br /><p>If you have any further questions or need additional clarification, feel free to [contact us]. </p><br /><p>Thank you for your understanding and cooperation.</p><p>Best regards,</p><p>[Your Name]</p><p>[Your Title]</p><p>[Institution/Organization Name]</p><p>[Contact Information]</p>",
  },
  {
    accept:
      "<p>Dear [Student's Name]<p><p>Thank you for your request and for placng your trust in us. We have carefully reviewed your request and would like to inform you of the following decision:</p><br/><p>Congratulations! Your request has been approved.</p><p> Please make sure to inform your teachers about the decision and any subsequent steps you need to take.</p><p>If you have any further questions or need additional clarification, feel free to [contact us].</p><br /> <p>Thank you for your understanding and cooperation.</p><p>Best regards,</p><p>[Your Name]</p><p>[Your Title]<p><p>[Institution/Organization Name]<p><p>[Contact Information]</p>",
    reject:
      "<p>Dear [Student's Name],</p><p>Thank you for your request and for placing your trust in us. We have carefully reviewed your application and would like to inform you of the following decision:</p><br /><p>We regret to inform you that your request has been declined. We understand this may be disappointing, and we encourage you to reach out if you have any questions about the decision or need further assistance.</p><br /><p>If you have any further questions or need additional clarification, feel free to [contact us]. </p><br /><p>Thank you for your understanding and cooperation.</p><p>Best regards,</p><p>[Your Name]</p><p>[Your Title]</p><p>[Institution/Organization Name]</p><p>[Contact Information]</p>",
  },
  {
    accept:
      "<p>Dear [Student's Name]<p><p>Thank you for your request and for placng your trust in us. We have carefully reviewed your request and would like to inform you of the following decision:</p><br/><p>Congratulations! Your request has been approved.</p><p> Please make sure to inform your teachers about the decision and any subsequent steps you need to take.</p><p>If you have any further questions or need additional clarification, feel free to [contact us].</p><br /> <p>Thank you for your understanding and cooperation.</p><p>Best regards,</p><p>[Your Name]</p><p>[Your Title]<p><p>[Institution/Organization Name]<p><p>[Contact Information]</p>",
    reject:
      "<p>Dear [Student's Name],</p><p>Thank you for your request and for placing your trust in us. We have carefully reviewed your application and would like to inform you of the following decision:</p><br /><p>We regret to inform you that your request has been declined. We understand this may be disappointing, and we encourage you to reach out if you have any questions about the decision or need further assistance.</p><br /><p>If you have any further questions or need additional clarification, feel free to [contact us]. </p><br /><p>Thank you for your understanding and cooperation.</p><p>Best regards,</p><p>[Your Name]</p><p>[Your Title]</p><p>[Institution/Organization Name]</p><p>[Contact Information]</p>",
  },
  {
    accept:
      "<p>Dear [Student's Name]<p><p>Thank you for your request and for placng your trust in us. We have carefully reviewed your request and would like to inform you of the following decision:</p><br/><p>Congratulations! Your request has been approved.</p><p> Please make sure to inform your teachers about the decision and any subsequent steps you need to take.</p><p>If you have any further questions or need additional clarification, feel free to [contact us].</p><br /> <p>Thank you for your understanding and cooperation.</p><p>Best regards,</p><p>[Your Name]</p><p>[Your Title]<p><p>[Institution/Organization Name]<p><p>[Contact Information]</p>",
    reject:
      "<p>Dear [Student's Name],</p><p>Thank you for your request and for placing your trust in us. We have carefully reviewed your application and would like to inform you of the following decision:</p><br /><p>We regret to inform you that your request has been declined. We understand this may be disappointing, and we encourage you to reach out if you have any questions about the decision or need further assistance.</p><br /><p>If you have any further questions or need additional clarification, feel free to [contact us]. </p><br /><p>Thank you for your understanding and cooperation.</p><p>Best regards,</p><p>[Your Name]</p><p>[Your Title]</p><p>[Institution/Organization Name]</p><p>[Contact Information]</p>",
  },
  {
    accept:
      "<p>Dear [Student's Name]<p><p>Thank you for your request and for placng your trust in us. We have carefully reviewed your request and would like to inform you of the following decision:</p><br/><p>Congratulations! Your request has been approved.</p><p> Please make sure to inform your teachers about the decision and any subsequent steps you need to take.</p><p>If you have any further questions or need additional clarification, feel free to [contact us].</p><br /> <p>Thank you for your understanding and cooperation.</p><p>Best regards,</p><p>[Your Name]</p><p>[Your Title]<p><p>[Institution/Organization Name]<p><p>[Contact Information]</p>",
    reject:
      "<p>Dear [Student's Name],</p><p>Thank you for your request and for placing your trust in us. We have carefully reviewed your application and would like to inform you of the following decision:</p><br /><p>We regret to inform you that your request has been declined. We understand this may be disappointing, and we encourage you to reach out if you have any questions about the decision or need further assistance.</p><br /><p>If you have any further questions or need additional clarification, feel free to [contact us]. </p><br /><p>Thank you for your understanding and cooperation.</p><p>Best regards,</p><p>[Your Name]</p><p>[Your Title]</p><p>[Institution/Organization Name]</p><p>[Contact Information]</p>",
  },
  {
    accept:
      "<p>Dear [Student's Name]<p><p>Thank you for your request and for placng your trust in us. We have carefully reviewed your request and would like to inform you of the following decision:</p><br/><p>Congratulations! Your request has been approved.</p><p> Please make sure to inform your teachers about the decision and any subsequent steps you need to take.</p><p>If you have any further questions or need additional clarification, feel free to [contact us].</p><br /> <p>Thank you for your understanding and cooperation.</p><p>Best regards,</p><p>[Your Name]</p><p>[Your Title]<p><p>[Institution/Organization Name]<p><p>[Contact Information]</p>",
    reject:
      "<p>Dear [Student's Name],</p><p>Thank you for your request and for placing your trust in us. We have carefully reviewed your application and would like to inform you of the following decision:</p><br /><p>We regret to inform you that your request has been declined. We understand this may be disappointing, and we encourage you to reach out if you have any questions about the decision or need further assistance.</p><br /><p>If you have any further questions or need additional clarification, feel free to [contact us]. </p><br /><p>Thank you for your understanding and cooperation.</p><p>Best regards,</p><p>[Your Name]</p><p>[Your Title]</p><p>[Institution/Organization Name]</p><p>[Contact Information]</p>",
  },
  {
    accept:
      "<p>Dear [Student's Name]<p><p>Thank you for your request and for placng your trust in us. We have carefully reviewed your request and would like to inform you of the following decision:</p><br/><p>Congratulations! Your request has been approved.</p><p> Please make sure to inform your teachers about the decision and any subsequent steps you need to take.</p><p>If you have any further questions or need additional clarification, feel free to [contact us].</p><br /> <p>Thank you for your understanding and cooperation.</p><p>Best regards,</p><p>[Your Name]</p><p>[Your Title]<p><p>[Institution/Organization Name]<p><p>[Contact Information]</p>",
    reject:
      "<p>Dear [Student's Name],</p><p>Thank you for your request and for placing your trust in us. We have carefully reviewed your application and would like to inform you of the following decision:</p><br /><p>We regret to inform you that your request has been declined. We understand this may be disappointing, and we encourage you to reach out if you have any questions about the decision or need further assistance.</p><br /><p>If you have any further questions or need additional clarification, feel free to [contact us]. </p><br /><p>Thank you for your understanding and cooperation.</p><p>Best regards,</p><p>[Your Name]</p><p>[Your Title]</p><p>[Institution/Organization Name]</p><p>[Contact Information]</p>",
  },
  {
    accept:
      "<p>Dear [Student's Name]<p><p>Thank you for your request and for placng your trust in us. We have carefully reviewed your request and would like to inform you of the following decision:</p><br/><p>Congratulations! Your request has been approved.</p><p> Please make sure to inform your teachers about the decision and any subsequent steps you need to take.</p><p>If you have any further questions or need additional clarification, feel free to [contact us].</p><br /> <p>Thank you for your understanding and cooperation.</p><p>Best regards,</p><p>[Your Name]</p><p>[Your Title]<p><p>[Institution/Organization Name]<p><p>[Contact Information]</p>",
    reject:
      "<p>Dear [Student's Name],</p><p>Thank you for your request and for placing your trust in us. We have carefully reviewed your application and would like to inform you of the following decision:</p><br /><p>We regret to inform you that your request has been declined. We understand this may be disappointing, and we encourage you to reach out if you have any questions about the decision or need further assistance.</p><br /><p>If you have any further questions or need additional clarification, feel free to [contact us]. </p><br /><p>Thank you for your understanding and cooperation.</p><p>Best regards,</p><p>[Your Name]</p><p>[Your Title]</p><p>[Institution/Organization Name]</p><p>[Contact Information]</p>",
  },
];
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
}) => {
  const [mailTemplateData, setMailTemplateData] = useState();
  let subCategory1 = parseInt(selectedTicket?.subCategory1);
  console.log(subCategory1)
  let data = "";
  if (actionBtnType == "accept") {
    data = emailTemplate[subCategory1 -1]["accept"];
  }
  if (actionBtnType == "reject") {
    data = emailTemplate[subCategory1 -1]["reject"];
  }
  useEffect(() => {
    let authUser = localStorage.getItem("userData");
    authUser = JSON.parse(authUser);
   let replacedEmailTemplate = data
          .replace(
            "[Student's Nametet]",
            selectedTicket?.firstName + " " + selectedTicket?.lastName
          )
          .replace("[Your Name]", authUser?.firstName + " " + authUser?.lastName)
          .replace("[Your Title]", authUser.title ? authUser.title : "Professor")
          .replace(
            "[Institution/Organization Name]",
            authUser.position ? positionNames[authUser.position] : "UMCH University Team"
          )
          .replace("[Contact Information]", authUser?.email)
          .replace(
            "[contact us]",
            "<a href='" +
              process.env.REACT_APP_URL +
              "/ticket-reopen/" +
              selectedTicket?._id +
              "'>Contact Us</a>"
          );
    setMailTemplateData(replacedEmailTemplate);
  }, [actionBtnType]);

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
  
        try{
           replacedEmailTemplate = mailTemplateData
          .replace(
            "[Student's Name]",
            selectedTicket?.firstName + " " + selectedTicket?.lastName
          )
          .replace("[Your Name]", authUser?.firstName + " " + authUser?.lastName)
          .replace("[Your Title]", authUser.title ? authUser.title : "Professor")
          .replace(
            "[Institution/Organization Name]",
            authUser.position ? positionNames[authUser.position] : "Vice Rector"
          )
          .replace("[Contact Information]", authUser?.email)
          .replace(
            "[contact us]",
            "<a href='" +
              process.env.REACT_APP_URL +
              "/ticket-reopen/" +
              selectedTicket?._id +
              "'>Contact Us</a>"
          );
        }catch(err){
          console.log(err);
        }
      
      let payload = {};
    if (contentTemplate == "Enrollment") {
      payload = {
        replaceSubject: replaceSubject,
        replacedEmailTemplate: replacedEmailTemplate,
        id: selectedTicket?._id,
        studentNo: studentNo ? studentNo : "",
        selectedTicket: selectedTicket,
      };
    } else {
      payload = {
        replaceSubject: replaceSubject,
        replacedEmailTemplate: replacedEmailTemplate,
        id: selectedTicket?._id,
      };
    }
    return payload;

    console.log(replaceSubject, "======replaced email template");
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
        } else {
          try {
            res = await FormService.acceptInquiry(payload);
          } catch (err) {
            console.log(err);
          }
        }
      }
      if (actionBtnType == "reject") {
        res = await FormService.rejectInquiry(payload);
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
      <Modal.Body style={{ height: "450px" }}>
        <Form.Group controlId="commentTextarea">
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
