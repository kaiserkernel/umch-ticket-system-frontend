import React, { useEffect, useContext, useState } from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import { AppSettings } from "./../../config/app-settings.js";
import { Link } from "react-router-dom";
import { Card } from "./../../components/card/card.jsx";
import moment from "moment";
import FormService from "../../sevices/form-service";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function EmailInbox() {
  const context = useContext(AppSettings);
  const [mailData, setMailData] = useState();
  const [ticketData, setTicketData] = useState();
  const [ticketId, setTicketId] = useState();
  const [selectedTicket, setSelectedTicket] = useState();
  const [attachments, setSelectedTicketAttachments] = useState([]);
  const host = process.env.REACT_APP_API_URL;

  const [isMobile, setIsMobile] = useState(false);
  const [showTicketDetail, setShowTicketDetail] = useState(false);
  const [userPermissionCategory, setUserPermissonCategory] = useState();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  let userData = localStorage.getItem("userData");
  userData = JSON.parse(userData);
  let userRole = "";
  let enrollmentNumber = "";
  if (userData) {
    userRole = userData?.role;
    enrollmentNumber = userData?.enrollmentNumber;
  }
  useEffect(() => {
    const getAllInquiries = async () => {
      try {
        const res = await FormService.getAllInquiries();
        res.inquiries.reverse();
        console.log(res);
        setTicketData(res.inquiries);
        setUserPermissonCategory(res.userCategory);
      } catch (err) {
        console.log(err);
      }
    };
    const getAllInquiriesByEnrollmentNumber = async () => {
      try {
        const res = await FormService.getAllInquiriesByEnrollmentNumber(
          enrollmentNumber
        );
        res.reverse();
        console.log(res);
        setTicketData(res);
      } catch (err) {
        console.log(err);
      }
    };

    if (userRole != 2) {
      getAllInquiries();
    } else {
      getAllInquiriesByEnrollmentNumber();
    }
    context.setAppContentFullHeight(true);
    context.setAppContentClass("py-3 px-5");

    return function cleanUp() {
      context.setAppContentFullHeight(false);
      context.setAppContentClass("");
    };

    // eslint-disable-next-line
  }, []);

  const handleSelectTicket = (ticket_id) => {
    console.log(ticket_id);
    if (ticket_id) {
      const result = ticketData.find((ticket) => ticket._id === ticket_id);
      setTicketId(ticket_id);
      setSelectedTicket(result);
      setSelectedTicketAttachments(result?.documents);
      if (isMobile) {
        console.log("mobile");
        setShowTicketDetail(true);
      }
    }
  };

  const getTimeDifference = (startDate, endDate) => {
    // Convert both dates to milliseconds
    const diffInMs = endDate - startDate;

    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
    if (diffInDays >= 1) {
      return endDate.toLocaleDateString(); // Customize date format as needed
    }
    // Calculate the difference in days, hours, and minutes

    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
    const diffInMinutes = Math.floor(diffInMs / (1000 * 60));

    // Return the largest unit that applies
    if (diffInDays >= 1) {
      return `${diffInDays} day${diffInDays > 1 ? "s" : ""} ago`;
    } else if (diffInHours >= 1) {
      return `${diffInHours} hour${diffInHours > 1 ? "s" : ""} ago`;
    } else {
      return `${diffInMinutes} minute${diffInMinutes > 1 ? "s" : ""}  ago`;
    }
  };

  const handleDownload = async (fileUrl, fileName) => {
    try {
      // Fetch the file from the URL as a Blob
      const response = await fetch(fileUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/octet-stream",
        },
      });

      // Ensure the request was successful
      if (!response.ok) {
        throw new Error("Failed to fetch file");
      }

      // Convert the response to a Blob
      const blob = await response.blob();

      // Create a temporary download link
      const downloadUrl = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.download = fileName || "downloaded-file";
      document.body.appendChild(link);
      link.click();

      // Clean up by revoking the object URL and removing the link element
      URL.revokeObjectURL(downloadUrl);
      document.body.removeChild(link);
    } catch (error) {
      console.error("Download error:", error);
    }
  };

  const handleDownloadAll = (e) => {
    attachments.map((attachment, index) => {
      handleDownload(host + attachment?.url, attachment?.filename);
    });
  };

  const handleInquiryAccept = async (id) => {
    try {
      const res = await FormService.acceptInquiry(id);

      console.log(res?.message);
      console.log(res);
      successNotify(res?.message);
    } catch (err) {
      if (err?.message) {
        errorNotify(err?.message);
      }

      const errors = err?.errors;

      if (typeof errors != "object") {
        errorNotify(errors);
      } else {
        console.log(typeof errors);
        errors.map((error) => {
          errorNotify(error.msg);
        });
      }
    }
  };

  const handleInquiryReject = async (id) => {
    try {
      const res = await FormService.rejectInquiry(id);
      successNotify(res?.message);
    } catch (err) {
      if (err?.message) {
        errorNotify(err?.message);
      }

      const errors = err?.errors;

      if (typeof errors != "object") {
        errorNotify(errors);
      } else {
        console.log(typeof errors);
        errors.map((error) => {
          errorNotify(error.msg);
        });
      }
    }
  };

  const handleClickAllTickets = () => {
    setShowTicketDetail(false);
  };

  const successNotify = (msg) => {
    toast.info(msg, {
      autoClose: 5000, // Duration in milliseconds
    });
  };
  const errorNotify = (msg) => {
    toast.warning(msg, {
      autoClose: 5000, // Duration in milliseconds
    });
  };

  return (
    <div className="h-100 border border-gray">
      <ToastContainer />
      <div className="mailbox">
        <div className="mailbox-toolbar">
          <div className="mailbox-toolbar-item">
            <span className="mailbox-toolbar-text">Mailboxes</span>
          </div>
          <div className="mailbox-toolbar-item">
            <Link
              to=""
              className={`mailbox-toolbar-link ${
                showTicketDetail ? "" : "active"
              } `}
              onClick={handleClickAllTickets}
            >
              All
            </Link>
          </div>
          <div
            className={`mailbox-toolbar-item ${
              showTicketDetail ? "" : "d-none"
            }`}
          >
            <Link
              to=""
              className={`mailbox-toolbar-link ${
                showTicketDetail ? "active" : ""
              } `}
            >
              Detail
            </Link>
          </div>
          <div className="mailbox-toolbar-item">
            <Link to="/email/inbox" className="mailbox-toolbar-link">
              Approved
            </Link>
          </div>
          <div className="mailbox-toolbar-item">
            <Link to="/email/inbox" className="mailbox-toolbar-link">
              Rejected
            </Link>
          </div>
          <div className="mailbox-toolbar-item">
            <Link to="/email/inbox" className="mailbox-toolbar-link">
              Drafts (1)
            </Link>
          </div>
          <div className="mailbox-toolbar-item">
            <Link to="/email/inbox" className="mailbox-toolbar-link">
              Junk
            </Link>
          </div>
          <div className="mailbox-toolbar-item">
            <Link
              to="/email/compose"
              className="mailbox-toolbar-link text-inverse bg-inverse bg-opacity-15"
            >
              New Message <i className="fa fa-pen fs-12px ms-1"></i>
            </Link>
          </div>
        </div>
        <div className="mailbox-body">
          <div
            className={`mailbox-sidebar ${showTicketDetail ? "d-none" : ""}`}
          >
            <PerfectScrollbar
              className="h-100"
              options={{ suppressScrollX: true }}
            >
              <div className="mailbox-list">
                {ticketData && ticketData.length > 0 ? (
                  ticketData.map((ticket, index) => (
                    <div
                      key={index}
                      className={
                        "mailbox-list-item" +
                        // (mail.unread ? " unread" : "") +
                        (ticket?.documents ? " has-attachment" : "")
                      }
                    >
                      <div className="mailbox-checkbox">
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            value=""
                            id={"mailCheckbox" + index}
                          />
                          <label
                            className="form-check-label"
                            htmlFor={"mailCheckbox" + index}
                          ></label>
                        </div>
                      </div>
                      <div
                        className="mailbox-message"
                        onClick={() => handleSelectTicket(ticket?._id)}
                        style={{ cursor: "pointer" }}
                      >
                        <div className="mailbox-sender">
                          <span className="mailbox-sender-name">[Absence]</span>
                          <span className="mailbox-time">
                            {getTimeDifference(
                              new Date(ticket?.createdAt),
                              new Date()
                            )}
                          </span>
                        </div>

                        <div className="text-black fw-bold">
                          Application and Request
                        </div>
                        <div className="mailbox-desc">{ticket?.email}</div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div
                    className="mailbox-list-item"
                    style={{ minWidth: "360px" }}
                  >
                    No records found
                  </div>
                )}
              </div>
            </PerfectScrollbar>
          </div>
          <div
            className={`mailbox-content d-lg-block ${
              showTicketDetail ? "" : "d-none"
            }`}
          >
            <PerfectScrollbar className="h-100">
              {ticketId ? (
                <div className="mailbox-detail">
                  {userRole != 2 && (
                    <div className="d-flex gap-5 mailbox-detail-header">
                      <a className="btn btn-primary rounded-pill">
                        Reply to the student
                      </a>
                      <a className="btn btn-primary rounded-pill">
                        Add internal note
                      </a>
                      <a className="btn btn-primary rounded-pill">
                        Pass to another department
                      </a>
                      <a className="btn btn-light rounded-pill">
                        Close the ticket
                      </a>
                    </div>
                  )}
                  <div className="mailbox-detail-header">
                    <div className="d-flex " style={{ wordBreak: "break-all" }}>
                      <a href="#/">
                        <img
                          src="/assets/img/user/user-1.jpg"
                          alt=""
                          width="40"
                          className="rounded-circle"
                        />
                      </a>
                      <div className="flex-fill ms-3">
                        <div className="d-lg-flex align-items-center">
                          <div className="flex-1">
                            <div className="fw-600">
                              {selectedTicket?.firstName +
                                " " +
                                selectedTicket?.lastName +
                                "<" +
                                selectedTicket?.email +
                                ">"}
                            </div>
                            <div className="fs-13px">
                              <span>
                                {" "}
                                {getTimeDifference(
                                  new Date(selectedTicket?.createdAt),
                                  new Date()
                                )}{" "}
                              </span>
                            </div>
                          </div>
                          <div className="fs-12px text-white text-opacity-50 text-lg-end mt-lg-0 mt-3">
                            Nov 27, 2024{" "}
                            <span className="d-none d-lg-inline">
                              <br />
                            </span>
                            at 7.00pm
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mailbox-detail-content">
                    <h4 className="mb-3">
                      Absense Request from{" "}
                      {selectedTicket?.firstName +
                        " " +
                        selectedTicket?.lastName}
                    </h4>

                    <div className="d-flex">
                      {attachments.map((attachment, index) => (
                        <div className="mailbox-detail-attachment" key={index}>
                          <div className="mailbox-attachment">
                            <a
                              href="#"
                              download
                              onClick={(e) =>
                                handleDownload(
                                  host + attachment?.url,
                                  attachment?.filename
                                )
                              }
                            >
                              <div className="document-file">
                                <i className="fa fa-file-archive"></i>
                              </div>
                              <div className="document-name">
                                {attachment?.filename}
                              </div>
                            </a>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="mb-3" onClick={(e) => handleDownloadAll(e)}>
                      <a className="btn btn-rounded px-3 btn-sm bg-theme bg-opacity-20 text-theme fw-600 rounded">
                        Download
                      </a>
                    </div>
                    <div className="mailbox-detail-body mt-5">
                      <p className="text-black">Hi Dear Admin,</p>
                      <div className="text-black">
                        <p className="text-black fw-bold">
                          Reason for Absence:
                        </p>
                        <p className="text-black">
                          {selectedTicket?.details?.reasonForAbsence}
                        </p>
                        <div className="d-flex">
                          <div className=" flex-grow-1">
                            <p className="text-black fw-bold">
                              Time From Absence:
                            </p>
                            <p className="text-black">
                              {selectedTicket?.details?.timeFromAbsence
                                ? moment(
                                    selectedTicket?.details?.timeFromAbsence
                                  ).format("MMMM DD, YYYY")
                                : ""}
                            </p>
                          </div>
                          <div className="flex-grow-1">
                            <p className="text-black fw-bold">
                              Time To Absence:
                            </p>
                            <p className="text-black">
                              {selectedTicket?.details?.timeToAbsence
                                ? moment(
                                    selectedTicket?.details?.timeToAbsence
                                  ).format("MMMM DD, YYYY")
                                : ""}
                            </p>
                          </div>
                        </div>
                        <p className="text-black fw-bold">Comments:</p>
                        <p className="text-black">
                          {selectedTicket?.details?.comment}
                        </p>
                      </div>
                      Regards,
                      <br />
                      Twitter Inc,
                      <br />
                      795 Folsom Ave, Suite 600
                      <br />
                      <br />
                      P: (123) 456-7890
                      <br />
                    </div>
                  </div>
                  {userRole != 2 && (
                    <div
                      style={{
                        borderTop: "1px solid",
                        borderColor: "gray",
                      }}
                      className="pt-2"
                    >
                      <a
                        className="btn btn-info me-3"
                        onClick={() => handleInquiryAccept(selectedTicket?._id)}
                      >
                        Accept
                      </a>
                      <a
                        className="btn btn-danger"
                        onClick={() => handleInquiryReject(selectedTicket?._id)}
                      >
                        Reject
                      </a>
                    </div>
                  )}
                </div>
              ) : (
                <div className="mailbox-empty-message">
                  <div className="mailbox-empty-message-icon">
                    <i className="bi bi-inbox text-theme text-opacity-50"></i>
                  </div>
                  <div className="mailbox-empty-message-title">
                    No message selected
                  </div>
                </div>
              )}
            </PerfectScrollbar>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmailInbox;
