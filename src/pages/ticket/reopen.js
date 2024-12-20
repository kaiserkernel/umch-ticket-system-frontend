import React, { useEffect, useContext, useState } from "react";
import { Row, Col } from "react-bootstrap";
import { Link, Navigate } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";
import { AppSettings } from "./../../config/app-settings.js";
import { useAuth } from "../../context/authProvider.js";
import AuthService from "../../sevices/auth-service.js";
import { ToastContainer, toast } from "react-toastify";
import { Form } from "react-bootstrap";
import Header from "../landing/header/index.js";
import BannerSection from "../landing/banner/index.js";
import formService from "../../sevices/form-service.js";
import BeatLoader from "react-spinners/BeatLoader";
import BlockUI from "react-block-ui";
import "react-block-ui/style.css";
import FormService from "../../sevices/form-service.js";

import { TicketStatus } from "../../globalVariables.js";

function PagesLogin() {
  const navigate = useNavigate();
  const location = useLocation();
  const context = useContext(AppSettings);
  const [ticketInfo, setTicketInfo] = useState(null);

  const [reason, setReason] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    context.setAppHeaderNone(true);
    context.setAppSidebarNone(true);
    context.setAppContentClass("p-0");

    // get ticket info
    const fetchTicketInfo = async () => {
      const path = location.pathname;
      const pathArray = path.split("/");
      try {
        const info = await FormService.getInquiryByInquiryId(pathArray[2]);
        console.log(info.inquiry, 'ticket info')
        setTicketInfo(info.inquiry);
      } catch (error) {
        console.log("Error occured on fetch info", error);
        setTicketInfo(null);
      }
    }

    fetchTicketInfo();

    return function cleanUp() {
      context.setAppHeaderNone(false);
      context.setAppSidebarNone(false);
      context.setAppContentClass("");
    };

    // eslint-disable-next-line
  }, []);

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
  const handleGoToDashboard = (e) => {
    e.preventDefault();
    navigate("/email/inbox", { replace: true });
  };

  const handleChange = (e) => {
    setReason(e.target.value);
  };

  const handleSubmit = async () => {
    setLoading(true);
    const path = location.pathname;
    const pathArray = path.split("/");
    const payload = {
      ticket_id: pathArray[2],
      reason: reason
    };
    try {
      const res = await formService.reOpenTicket(payload);
      successNotify(res?.message);
      setLoading(false);
    } catch (err) {
      console.log(err);
      errorNotify(err?.message);
      setLoading(false);
    }
  };

  return (
    <>
      <BlockUI blocking={loading}>
        <Header />
        <BannerSection />

        <div className="login mt-3 mt-md-5">
          <div className="login-content">
            <div className="bg-gray p-3 p-md-5">
              <h1 className="text-center">
                Your Ticket is going to be reopened
              </h1>
              <div className="text-inverse text-opacity-50 text-center mb-5 mt-3 mt-md-5">
                <p className="text-inverse text-opacity-50 text-center sm-font">
                  Dear Students,
                </p>
                <p className="text-inverse text-opacity-50 text-center sm-font">
                  the UMCH Ticket System is here to ensure you can easily reach
                  our team for assistance with requests and complaints. Please
                  sign in and provide the details of your inquiry so we can
                  address it promptly and effectively.
                </p>
                <p className="text-inverse text-opacity-50 text-center sm-font">
                  Sure you can easily reach our team for assistance with requests
                  and complaints. Please sign in and provide the details of your
                  inquiry so we can address it promptly and effectively.
                </p>
              </div>

              <div>
                <p className="fw-bold mb-1">Ticket Information</p>
                {ticketInfo && (
                  <>
                    <span className="fw-bold">Ticket Number: </span>
                    <span>{ticketInfo.inquiryNumber}</span>
                  </>
                )}
              </div>
              <div className="mb-3">
                {ticketInfo && (
                  <>
                    <span className="fw-bold">Ticket Status: </span>
                    <span>{TicketStatus[ticketInfo?.status]}</span>
                  </>
                )}
              </div>

              <Row className="">
                <Col lg={12}>
                  <Form.Group controlId="reason">
                    <Form.Label className="input-label">
                      Reopen Reason:{" "}
                    </Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={6}
                      name="reason"
                      value={reason}
                      onChange={handleChange}
                      placeholder=""
                      className="custom-textarea-input"
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col lg={12}>
                  <div className="d-flex justify-content-end mt-3 gap-3">
                    <button
                      className="btn btn-primary"
                      onClick={handleSubmit}
                      disabled={loading}
                    >
                      {loading ? (
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "center"
                          }}
                        >
                          <BeatLoader color="white" size={10} />
                        </div>
                      ) : (
                        <span>Submit</span>
                      )}
                    </button>
                    <a className="btn btn-info" onClick={handleGoToDashboard}>
                      Go to Dashboard
                    </a>
                  </div>
                </Col>
              </Row>
            </div>
          </div>
        </div>
      </BlockUI>
    </>
  );
}

export default PagesLogin;
