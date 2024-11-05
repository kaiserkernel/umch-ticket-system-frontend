import React, { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import PerfectScrollbar from "react-perfect-scrollbar";
import { AppSettings } from "./../../config/app-settings.js";
import { Link } from "react-router-dom";
import moment from "moment";
import FormService from "../../sevices/form-service";
import { ToastContainer, toast } from "react-toastify";
import { Badge } from "react-bootstrap";
import Dropdown from "react-bootstrap/Dropdown";
import "react-toastify/dist/ReactToastify.css";
import { DownTimer } from "../../components/downTimer/downTimer.jsx";

import Absence from "./inquiryTemplate/absence.js";
import ChangeTeachingHospital from "./inquiryTemplate/changeTeachingHospital.js";
import ChangeStudyGroup from "./inquiryTemplate/changeStudyGroup.js";
import DemonstratorStudent from "./inquiryTemplate/demonstratorStudent.js";
import Enrollment from "./inquiryTemplate/enrollment.js";
import ExamInspection from "./inquiryTemplate/examInspection.js";
import OnlineCatalogue from "./inquiryTemplate/onlineCatalogue.js";
import RecognitionCourses from "./inquiryTemplate/recognitionCourses.js";
import RecognitionInternship from "./inquiryTemplate/recognitionInternship.js";
import ShotTermBorrowDiploma from "./inquiryTemplate/shortTermBorrowDiploma.js";
import SyllabusAcademic from "./inquiryTemplate/syllabusAcademic.js";
import TranscriptRecords from "./inquiryTemplate/transcriptRecords.js";
import TransferTarguMures from "./inquiryTemplate/transferTarguMures.js";
import Other from "./inquiryTemplate/other.js";

const INQUIRYCATEGORIES = [
  {
    inquiryCategory: "Applications and Requests",
    component: "",
    subCategories: [
      { subCategory1: "Absence", component: "Absence" },
      {
        subCategory1: "Change of teaching hospital",
        component: "ChangeTeachingHospital",
      },
      {
        subCategory1: "Change of study group",
        component: "ChangeStudyGroup",
      },
      {
        subCategory1: "Demonstrator student",
        component: "DemonstratorStudent",
      },
      {
        subCategory1: "Enrollment",
        component: "Enrollment",
      },
      {
        subCategory1: "Exam inspection",
        component: "ExamInspection",
      },
      {
        subCategory1: "Online Catalogue (Carnet)",
        component: "OnlineCatalogue",
      },
      {
        subCategory1: "Recognition of Courses",
        component: "RecognitionCourses",
      },
      {
        subCategory1: "Recognition of Internship",
        component: "RecognitionInternship",
      },
      {
        subCategory1: "Short term borrow of Diploma",
        component: "ShotTermBorrowDiploma",
      },
      {
        subCategory1: "Syllabus of the academic year",
        component: "SyllabusAcademic",
      },
      {
        subCategory1: "Transcript of Records",
        component: "TranscriptRecords",
      },
      {
        subCategory1: "Transfer to Targu Mures",
        component: "TransferTarguMures",
      },
      {
        subCategory1: "Other",
        component: "Other",
      },
    ],
  },

  "Book rental UMCH library",
  "Campus IT",
  "Complaints",
  "Internship",
  "Medical Abilities",
  "Thesis",
  "Other",
];

function EmailInbox() {
  const context = useContext(AppSettings);
  const navigate = useNavigate();
  const [mailData, setMailData] = useState();
  const [ticketData, setTicketData] = useState();
  const [ticketId, setTicketId] = useState();
  const [selectedTicket, setSelectedTicket] = useState();
  const [attachments, setSelectedTicketAttachments] = useState([]);
  const host = process.env.REACT_APP_API_URL;

  const [isMobile, setIsMobile] = useState(false);
  const [showTicketDetail, setShowTicketDetail] = useState(false);
  const [userPermissionCategory, setUserPermissonCategory] = useState();
  const [activeTab, setActiveTab] = useState("All");
  const [isTicketStatusChange, setTicketStatusChange] = useState(true);

  const ticketStatus = ["Received", "Checked", "Approved", "Rejected"];
  const ticketStatusBadge = ["secondary", "success", "info", "danger"];

  const [contentTemplate, setContentTemplate] = useState("Absence");

  useEffect(() => {
    if (selectedTicket) {
      const ticketComponent =
        INQUIRYCATEGORIES[selectedTicket?.inquiryCategory - 1]["subCategories"][
        selectedTicket?.subCategory1 - 1
        ]["component"];
      console.log(ticketComponent);
      setContentTemplate(ticketComponent);
    }
  }, [selectedTicket]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const renderContentTemplate = () => {
    switch (contentTemplate) {
      case "Absence":
        return <Absence selectedTicket={selectedTicket} />;
        break;
      case "ChangeTeachingHospital":
        return <ChangeTeachingHospital selectedTicket={selectedTicket} />;
        break;
      case "ChangeStudyGroup":
        return <ChangeStudyGroup selectedTicket={selectedTicket} />;
        break;
      case "DemonstratorStudent":
        return <DemonstratorStudent selectedTicket={selectedTicket} />;
        break;
      case "Enrollment":
        return <Enrollment selectedTicket={selectedTicket} />;
        break;
      case "ExamInspection":
        return <ExamInspection selectedTicket={selectedTicket} />;
        break;
      case "OnlineCatalogue":
        return <OnlineCatalogue selectedTicket={selectedTicket} />;
        break;
      case "RecognitionCourses":
        return <RecognitionCourses selectedTicket={selectedTicket} />;
        break;
      case "RecognitionInternship":
        return <RecognitionInternship selectedTicket={selectedTicket} />;
        break;
      case "ShotTermBorrowDiploma":
        return <ShotTermBorrowDiploma selectedTicket={selectedTicket} />;
        break;
      case "SyllabusAcademic":
        return <SyllabusAcademic selectedTicket={selectedTicket} />;
        break;
      case "TranscriptRecords":
        return <TranscriptRecords selectedTicket={selectedTicket} />;
        break;
      case "TransferTarguMures":
        return <TransferTarguMures selectedTicket={selectedTicket} />;
        break;
      case "Other":
        return <Other selectedTicket={selectedTicket} />;
        break;

      default:
        break;
    }
    return <Absence />;
  };
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
        if (res?.inquiries) {
          res.inquiries.reverse();
          const result = res.inquiries.map((item1) => {
            const match = res.inquiries.find(
              (item2) =>
                item2.inquiryCategory === item1.inquiryCategory &&
                item2.subCategory1 === item1.subCategory1
            );

            return {
              ...item1,
              permission: match ? match.permission : null, // Add permission if found, otherwise null
            };
          });
          setTicketData(result);
          setUserPermissonCategory(res.userCategory);
        }
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

  const handleClickOpenTicket = (e) => {
    e.preventDefault();
    navigate("/home", { replace: true });
  };

  const handleSelectTicket = async (ticket_id) => {
    console.log(ticket_id);
    if (ticket_id) {
      // const result = ticketData.find((ticket) => ticket._id === ticket_id);
      const res = await FormService.getInquiryByInquiryId(ticket_id);

      console.log(res);

      setTicketId(ticket_id);
      setSelectedTicket(res?.inquiry);
      setSelectedTicketAttachments(res?.inquiry?.documents);
      setTicketStatusChange(true);
      if (isMobile) {
        console.log("mobile");
        setShowTicketDetail(true);
      }
    }
  };

  const handleShowApprovedTickets = async () => {
    setActiveTab("Approved");
    setSelectedTicket("");
    setShowTicketDetail(false);
    setTicketId("");
    if (userRole != 2) {
      const allTickets = await FormService.getAllInquiries();
      allTickets.inquiries.reverse();
      console.log(allTickets);
      const filteredAllTickets = allTickets.inquiries.filter(
        (ticket) => ticket.status === 2
      );
      console.log(filteredAllTickets);
      setTicketData(filteredAllTickets);
    } else {
      const allTickets = await FormService.getAllInquiriesByEnrollmentNumber(
        enrollmentNumber
      );
      console.log(allTickets);
      allTickets.reverse();
      console.log(allTickets);
      const filteredAllTickets = allTickets.filter(
        (ticket) => ticket.status === 2
      );
      console.log(filteredAllTickets);
      setTicketData(filteredAllTickets);
    }
  };

  const handleShowRejectedTickets = async () => {
    setActiveTab("Rejected");
    setSelectedTicket("");
    setShowTicketDetail(false);
    setTicketId("");
    if (userRole != 2) {
      const allTickets = await FormService.getAllInquiries();
      console.log(allTickets);
      allTickets.inquiries.reverse();
      const filteredAllTickets = allTickets.inquiries.filter(
        (ticket) => ticket.status === 3
      );
      console.log(filteredAllTickets);
      setTicketData(filteredAllTickets);
    } else {
      const allTickets = await FormService.getAllInquiriesByEnrollmentNumber(
        enrollmentNumber
      );
      console.log(allTickets);
      allTickets.reverse();
      const filteredAllTickets = allTickets.filter(
        (ticket) => ticket.status === 3
      );
      console.log(filteredAllTickets);
      setTicketData(filteredAllTickets);
    }
  };

  const handleShowAllTickets = async () => {
    setActiveTab("All");
    setSelectedTicket("");
    setTicketId("");
    if (userRole != 2) {
      const allTickets = await FormService.getAllInquiries();
      console.log(allTickets.inquiries);

      setTicketData(allTickets.inquiries);
    } else {
      const allTickets = await FormService.getAllInquiriesByEnrollmentNumber(
        enrollmentNumber
      );
      console.log(allTickets);
      setTicketData(allTickets);
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

  const getTimeRemain = (startDate, endDate) => {
    let date = startDate;
    if (date.getDay() > 3 && date.getDay() < 6) {
      return endDate + 1000 * 60 * 60 * 24 * 2 - date;
    } else if (date.getDay() == 0) {
      return (
        endDate - date + (1000 * 60 * 60 * 24 - (date % (1000 * 60 * 60 * 24)))
      );
    } else if (date.getDay() == 6) {
      return (
        endDate -
        date +
        (1000 * 60 * 60 * 24 * 2 - (date % (1000 * 60 * 60 * 24)))
      );
    } else return endDate - date;
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
      setTicketStatusChange(false);
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
      setTicketStatusChange(false);
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
    setActiveTab("All");
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
      <div className="mailbox">
        <div className="mailbox-toolbar">
          <div className="mailbox-toolbar-item">
            <span className="mailbox-toolbar-text">Mailboxes</span>
          </div>
          <div className="mailbox-toolbar-item">
            <Link
              to=""
              className={`mailbox-toolbar-link ${activeTab == "All" ? "active" : ""
                } `}
              onClick={handleShowAllTickets}
            >
              All
            </Link>
          </div>
          <div
            className={`mailbox-toolbar-item ${showTicketDetail ? "" : "d-none"
              }`}
          >
            <Link
              to=""
              className={`mailbox-toolbar-link ${showTicketDetail ? "active" : ""
                } `}
            >
              Detail
            </Link>
          </div>
          <div className="mailbox-toolbar-item">
            <Link
              onClick={handleShowApprovedTickets}
              className={`mailbox-toolbar-link ${activeTab == "Approved" ? "active" : ""
                } `}
            >
              Approved
            </Link>
          </div>
          <div className="mailbox-toolbar-item">
            <Link
              onClick={handleShowRejectedTickets}
              className={`mailbox-toolbar-link ${activeTab == "Rejected" ? "active" : ""
                } `}
            >
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
            {userData?.role != 2 && (
              <Link
                to="/email/compose"
                className="mailbox-toolbar-link text-inverse bg-inverse bg-opacity-15"
              >
                Internal Message <i className="fa fa-pen fs-12px ms-1"></i>
              </Link>
            )}

            {userData?.role == 2 && (
              <Link
                onClick={handleClickOpenTicket}
                className="mailbox-toolbar-link text-inverse bg-inverse bg-opacity-15"
              >
                Open Ticket<i className="fa fa-pen fs-12px ms-1"></i>
              </Link>
            )}
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
                        "mailbox-list-item border-bottom border-white" +
                        // (mail.unread ? " unread" : "") +
                        (ticket?.documents ? " has-attachment " : "") +
                        (Math.floor(
                          (new Date() - new Date(ticket?.createdAt)) /
                          (1000 * 60 * 60)
                        ) > 45
                          ? "mailbox-list-danger "
                          : Math.floor(
                            (new Date() - new Date(ticket?.createdAt)) /
                            (1000 * 60 * 60)
                          ) > 24
                            ? "mailbox-list-warning"
                            : "mailbox-list-general")
                      }
                    >
                      <div className="mailbox-checkbox">
                        <div className="form-check ">
                          <input
                            className="form-check-input border border-white"
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
                          <span className="mailbox-sender-name">
                            [
                            {
                              INQUIRYCATEGORIES[ticket?.inquiryCategory - 1][
                              "subCategories"
                              ][ticket?.subCategory1 - 1]["subCategory1"]
                            }
                            ]
                          </span>
                          <span className="mailbox-time">
                            {getTimeDifference(
                              new Date(ticket?.createdAt),
                              new Date()
                            )}
                          </span>
                        </div>

                        <div className="text-white fw-bold">
                          {
                            INQUIRYCATEGORIES[ticket?.inquiryCategory - 1][
                            "inquiryCategory"
                            ]
                          }
                        </div>
                        <div className="mailbox-desc">{ticket?.email}</div>
                        <DownTimer
                          remainTime={getTimeRemain(
                            new Date(ticket?.createdAt),
                            new Date()
                          )}
                        />
                      </div>
                    </div>
                  ))
                ) : (
                  <div
                    className="mailbox-list-item"
                    style={{ minWidth: "360px" }}
                  >
                    No tickets found
                  </div>
                )}
              </div>
            </PerfectScrollbar>
          </div>
          <div
            className={`mailbox-content d-lg-block ${showTicketDetail ? "" : "d-none"
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
                          <div className="flex-1 mt-3">
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
                    <div className="d-flex gap-3 mb-3">
                      <h4 className="mb-0">
                        {
                          INQUIRYCATEGORIES[
                          selectedTicket?.inquiryCategory - 1
                          ]["subCategories"][selectedTicket?.subCategory1 - 1][
                          "subCategory1"
                          ]
                        }{" "}
                        Request from{" "}
                        {selectedTicket?.firstName +
                          " " +
                          selectedTicket?.lastName}
                      </h4>

                      {selectedTicket && (
                        <Badge
                          style={{ fontSize: "14px", fontWeight: "300" }}
                          bg={ticketStatusBadge[selectedTicket?.status]}
                        >
                          {ticketStatus[selectedTicket?.status]}
                        </Badge>
                      )}
                    </div>

                    <div className="d-flex">
                      {attachments &&
                        attachments.map((attachment, index) => (
                          <div
                            className="mailbox-detail-attachment"
                            key={index}
                          >
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
                    {attachments.length != 0 ? (
                      <div
                        className="mb-3"
                        onClick={(e) => handleDownloadAll(e)}
                      >
                        <a className="btn btn-rounded px-3 btn-sm bg-theme bg-opacity-20 text-theme fw-600 rounded">
                          Download
                        </a>
                      </div>
                    ) : (
                      <></>
                    )}
                    <div className="mailbox-detail-body mt-5">
                      <p className="text-black">Hi Dear Admin,</p>
                      {renderContentTemplate()}
                      <div className="mt-5">
                        <p className="text-black">Regards,</p>
                        <div className="d-flex">
                          <p className="text-black">Name:</p>
                          <p className="text-black">
                            {selectedTicket?.firstName +
                              " " +
                              selectedTicket?.lastName}
                          </p>
                        </div>
                        <div className="d-flex">
                          <p className="text-black">Email:</p>
                          <p className="text-black">{selectedTicket?.email}</p>
                        </div>
                        <div className="d-flex">
                          <p className="text-black">Ticket Number:</p>
                          <p className="text-black">
                            {selectedTicket?.inquiryNumber}
                          </p>
                        </div>
                      </div>
                      <br />
                      <br />
                      Enrollment Number: {selectedTicket?.enrollmentNumber}
                      <br />
                    </div >
                  </div >
                  {userRole != 2 &&
                    selectedTicket?.status != 2 &&
                    selectedTicket?.status != 3 &&
                    isTicketStatusChange && (
                      <div
                        style={{
                          borderTop: "1px solid",
                          borderColor: "gray",
                        }}
                        className="pt-2 d-flex gap-3"
                      >
                        <div
                          class="btn-group w-100"
                          role="group"
                          aria-label="Basic example"
                          style={{ maxWidth: "115px" }}
                        >
                          <button
                            type="button"
                            style={{
                              backgroundColor: "#009be3",
                              borderTopLeftRadius: "50px",
                              borderBottomLeftRadius: "50px",
                              borderRight: "1px solid orange",
                            }}
                            className="btn btn-info btn-left mailbox-detail-button pl-5"
                            onClick={() =>
                              handleInquiryAccept(selectedTicket?._id)
                            }
                          >
                            Accept
                          </button>
                          <Dropdown type="button">
                            {/* <button className="btn btn-info" style={{ backgroundColor: "#009be3" }}>Accept</button> */}
                            <Dropdown.Toggle
                              variant="success"
                              id="dropdown-basic"
                              className="btn btn-info dropdown-toggle"
                              style={{
                                borderTopRightRadius: "50px",
                                borderBottomRightRadius: "50px",
                              }}
                            ></Dropdown.Toggle>

                            <Dropdown.Menu>
                              <Dropdown.Item
                                href="#/action-1"
                              >
                                Accept with Internal Note
                              </Dropdown.Item>
                              <Dropdown.Item
                                href="#/action-2"
                              >
                                Accept with Email
                              </Dropdown.Item>
                            </Dropdown.Menu>
                          </Dropdown>
                        </div>

                        <div
                          class="btn-group w-100"
                          role="group"
                          aria-label="Basic example"
                          style={{ maxWidth: "115px" }}
                        >
                          <button
                            type="button"
                            style={{
                              backgroundColor: "#e00000",
                              borderTopLeftRadius: "50px",
                              borderBottomLeftRadius: "50px",
                              borderRight: "1px solid orange",
                            }}
                            className="btn btn-danger btn-left"
                            onClick={() =>
                              handleInquiryReject(selectedTicket?._id)
                            }
                          >
                            Reject
                          </button>
                          <Dropdown type="button">
                            <Dropdown.Toggle
                              variant="danger"
                              id="dropdown-basic"
                              className="btn btn-danger dropdown-toggle"
                              style={{
                                borderTopRightRadius: "50px",
                                borderBottomRightRadius: "50px",
                              }}
                            >
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                              <Dropdown.Item
                                href="#/action-1"
                              >
                                Accept with Internal Note
                              </Dropdown.Item>
                              <Dropdown.Item
                                href="#/action-2"
                              >
                                Accept with Email
                              </Dropdown.Item>
                            </Dropdown.Menu>
                          </Dropdown>
                        </div>
                      </div>
                    )
                  }
                </div >
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
            </PerfectScrollbar >
          </div >
        </div >
      </div >
    </div >
  );
}

export default EmailInbox;
