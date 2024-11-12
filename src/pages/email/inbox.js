import React, { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import PerfectScrollbar from "react-perfect-scrollbar";
import { AppSettings } from "./../../config/app-settings.js";
import { Link } from "react-router-dom";
import moment from "moment";
import FormService from "../../sevices/form-service";
import { ToastContainer, toast } from "react-toastify";
import { Badge, Form, Dropdown, Modal, Button } from "react-bootstrap";
import "react-toastify/dist/ReactToastify.css";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
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
import OtherApplicationRequest from "./inquiryTemplate/otherApplicationRequest.js";
import BookRental from "./inquiryTemplate/bookRental.js";
import Canvas from "./inquiryTemplate/canvas.js";
import Streaming from "./inquiryTemplate/streamingPanopto.js";
import Campus from "./inquiryTemplate/campus.js";
import DeanOffice from "./inquiryTemplate/deanOffice.js";
import GermanTeachingDepartment from "./inquiryTemplate/germanTeachingDepartment.js";
import TeachingHospital from "./inquiryTemplate/teachingHospital.js";
import Teacher from "./inquiryTemplate/teacher.js";
import OnlineCatalougeComplaint from "./inquiryTemplate/onlineCatalougeComplaint.js";
import Exam from "./inquiryTemplate/exam.js";
import OtherComplaint from "./inquiryTemplate/otherComplaint.js";
import Internship from "./inquiryTemplate/internship.js";
import MedicalAbilities from "./inquiryTemplate/medicalAbilities.js";
import Thesis from "./inquiryTemplate/thesis.js";
import Other from "./inquiryTemplate/other.js";
//////////////////////////
import EmailTemplateModal from "./emailTemplateModal.js";
import EnrollmentModal from "./enrollmentModal.js";
import ExamInspectionModal from "./examInspectionModal.js";
import TranscriptRecordsModal from "./transcriptRecordsModal.js";
import PassToAnotherDepartmentModal from "./passToAnotherDepartmentModal.js";
import TarguModal from "./transferToTarguMures.js";

import { components } from "react-select";
import BeatLoader from "react-spinners/BeatLoader";
import { INQUIRYCATEGORIES } from "../../globalVariables.js";

function EmailInbox() {
  const host = process.env.REACT_APP_API_URL;
  const context = useContext(AppSettings);
  const navigate = useNavigate();

  const [mailData, setMailData] = useState();
  const [ticketData, setTicketData] = useState();
  const [ticketId, setTicketId] = useState();
  const [selectedTicket, setSelectedTicket] = useState();
  const [attachments, setSelectedTicketAttachments] = useState([]);

  const [isMobile, setIsMobile] = useState(false);
  const [showTicketDetail, setShowTicketDetail] = useState(false);
  const [userPermissionCategory, setUserPermissonCategory] = useState();
  const [activeTab, setActiveTab] = useState("All");
  const [isTicketStatusChange, setTicketStatusChange] = useState(true);
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [actionBtnType, setActionBtnType] = useState();
  const [studentNo, setStudentNo] = useState("");

  const [unClickedNewTicketsCount, setUnClickedNewTicketsCount] = useState(0);
  const [unClickedApprovedTicketsCount, setUnClickedApprovedTicketsCount] =
    useState(0);
  const [unClickedRejectTicketsCount, setUnClickedRejectTicketsCount] =
    useState(0);

  const [enrollmentModalShow, setEnrollmentModalShow] = useState(false);
  const [examInspectionModalShow, setExamInspectionModalShow] = useState(false);
  const [targuModalshow, setTarguModalShow] = useState(false);

  const [
    passToAnotherDepartmentModalShow,
    setPassToAnotherDepartmentModalShow
  ] = useState(false);
  const handleModalClose = () => setShow(false);
  const handleModalShow = () => setShow(true);

  const handleEnrollmentModalShow = () => setEnrollmentModalShow(true);
  const handleEnrollmentModalClose = () => setEnrollmentModalShow(false);

  const handleExamInspectionModalShow = () => setExamInspectionModalShow(true);
  const handleExamInspectionModalClose = () =>
    setExamInspectionModalShow(false);

  const handlePassToAnotherDepartmentModalShow = () => {
    setPassToAnotherDepartmentModalShow(true);
  };
  const handlePassToAnotherDepartmentModalClose = () => {
    setPassToAnotherDepartmentModalShow(false);
  };

  const handleTarguModalClose = () => {
    setTarguModalShow(false);
  };

  const ticketStatus = [
    "Received",
    "Checked",
    "Approved",
    "Rejected",
    "Process",
    "Done",
    "Notify"
  ];
  const ticketStatusBadge = [
    "secondary",
    "success",
    "info",
    "danger",
    "secondary",
    "success",
    "info"
  ];

  const [contentTemplate, setContentTemplate] = useState("Absence");

  useEffect(() => {
    try {
      if (
        selectedTicket &&
        INQUIRYCATEGORIES[selectedTicket?.inquiryCategory - 1]["subCategories"][
          selectedTicket?.subCategory1 - 1
        ]
      ) {
        const ticketComponent =
          INQUIRYCATEGORIES[selectedTicket?.inquiryCategory - 1][
            "subCategories"
          ][selectedTicket?.subCategory1 - 1]["component"];
        console.log(ticketComponent);
        setContentTemplate(ticketComponent);
      }
    } catch (err) {
      console.log(err);
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

  const getPermissionOfTicket = (ticket, userPermission) => {
    const permission = userPermission.find(
      (p) =>
        p.inquiryCategory === ticket.inquiryCategory &&
        p.subCategory1 === ticket.subCategory1
    );

    // If no permission found, default to 'None'
    const ticketPermission = permission ? permission.permission : "None";
    return ticketPermission;
  };
  const handleCheckEnrollment = () => {
    setActionBtnType("enrollment");
    setEnrollmentModalShow(true);
  };

  const handleCheckExamInspection = () => {
    setActionBtnType("examInspection");
    setExamInspectionModalShow(true);
  };

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
      case "OtherApplicationRequest":
        return <OtherApplicationRequest selectedTicket={selectedTicket} />;
        break;
      case "BookRental":
        return <BookRental selectedTicket={selectedTicket} />;
        break;
      case "Canvas":
        return <Canvas selectedTicket={selectedTicket} />;
        break;
      case "Streaming":
        return <Streaming selectedTicket={selectedTicket} />;
        break;
      case "Campus":
        return <Campus selectedTicket={selectedTicket} />;
        break;
      case "DeanOffice":
        return <DeanOffice selectedTicket={selectedTicket} />;
        break;
      case "GermanTeachingDepartment":
        return <GermanTeachingDepartment selectedTicket={selectedTicket} />;
        break;
      case "TeachingHospital":
        return <TeachingHospital selectedTicket={selectedTicket} />;
        break;
      case "Teacher":
        return <Teacher selectedTicket={selectedTicket} />;
        break;
      case "OnlineCatalougeComplaint":
        return <OnlineCatalougeComplaint selectedTicket={selectedTicket} />;
        break;
      case "Exam":
        return <Exam selectedTicket={selectedTicket} />;
        break;
      case "OtherComplaint":
        return <OtherComplaint selectedTicket={selectedTicket} />;
        break;
      case "Internship":
        return <Internship selectedTicket={selectedTicket} />;
        break;
      case "MedicalAbilities":
        return <MedicalAbilities selectedTicket={selectedTicket} />;
        break;
      case "Thesis":
        return <Thesis selectedTicket={selectedTicket} />;
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
    handleShowNewTickets();
  }, []);

  const handleShowNewTickets = () => {
    setActiveTab("All");
    setTicketId("");
    setSelectedTicket("");
    setShowTicketDetail(false);

    if (userRole != 2) {
      getAllInquiries();
    } else {
      getAllInquiriesByEnrollmentNumber();
    }

    context.setAppContentFullHeight(true);
    context.setAppContentClass("py-3 px-1 px-md-5");

    return function cleanUp() {
      context.setAppContentFullHeight(false);
      context.setAppContentClass("");
    };
  };

  const getAllInquiries = async () => {
    try {
      setLoading(true);
      const res = await FormService.getAllInquiries();

      if (res?.inquiries) {
        let result = res.inquiries.reverse();
        // const result = res.inquiries.map((item1) => {
        //   const match = res.userCategory.find(
        //     (item2) =>
        //       item2.inquiryCategory === item1.inquiryCategory &&
        //       item2.subCategory1 === item1.subCategory1
        //   );

        //   return {
        //     ...item1,
        //     permission: match ? match.permission : null // Add permission if found, otherwise null
        //   };
        // });

        const newTickets = result.filter(
          (ticket) =>
            ticket.status === 0 ||
            ticket.status === 1 ||
            ticket.status === 4 ||
            ticket.status === 5
        );

        const unClickedNewTickets = newTickets.filter(
          (ticket) => ticket.isClicked === 0
        );
        const unClickedApprovedTickets = result.filter(
          (ticket) =>
            ticket.isClicked === 0 &&
            (ticket.status === 2 || ticket.status === 6)
        );
        const unClickedRejectTickets = result.filter(
          (ticket) => ticket.isClicked === 0 && ticket.status === 3
        );
        console.log(result, "===unClickedApprovedTickets");

        setUnClickedNewTicketsCount(unClickedNewTickets.length);
        setUnClickedApprovedTicketsCount(unClickedApprovedTickets.length);
        setUnClickedRejectTicketsCount(unClickedRejectTickets.length);
        setTicketData(newTickets);
        setLoading(false);
        // setSelectedTicket(newTickets[0]?._id);
        setUserPermissonCategory(res.userCategory);
      }
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
    setLoading(false);
  };
  const getAllInquiriesByEnrollmentNumber = async () => {
    try {
      setLoading(true);
      const res = await FormService.getAllInquiriesByEnrollmentNumber(
        enrollmentNumber
      );
      res.reverse();
      const newTickets = res.filter(
        (ticket) => ticket.status === 0 || ticket.status === 1
      );

      const unClickedNewTickets = newTickets.filter(
        (ticket) => ticket.isClicked === 0
      );
      const unClickedApprovedTickets = newTickets.filter(
        (ticket) =>
          ticket.isClicked === 0 && (ticket.status === 2 || ticket.status === 6)
      );
      const unClickedRejectTickets = newTickets.filter(
        (ticket) => ticket.isClicked === 0 && ticket.status === 3
      );
      console.log(newTickets, "===unClickedApprovedTickets");

      setUnClickedNewTicketsCount(unClickedNewTickets.length);
      setUnClickedApprovedTicketsCount(unClickedApprovedTickets.length);
      setUnClickedRejectTicketsCount(unClickedRejectTickets.length);
      console.log(newTickets);
      setTicketData(newTickets);
      setSelectedTicket(newTickets[0]);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
    setLoading(false);
  };
  const handleClickOpenTicket = (e) => {
    e.preventDefault();
    navigate("/home", { replace: true });
  };

  const handleSelectTicket = async (ticket_id) => {
    const updatedTickets = ticketData.map((ticket) =>
      ticket._id === ticket_id && userRole != 2
        ? { ...ticket, isClicked: 1 }
        : ticket
    );
    setTicketData(updatedTickets);
    setLoading(true);
    setActionBtnType("");
    setTicketId(ticket_id);
    let res = "";
    if (ticket_id) {
      try {
        res = await FormService.getInquiryByInquiryId(ticket_id);
        if (
          res?.inquiry?.status == 1 &&
          res?.inquiry?.isClicked == 1 &&
          res?.isOriginalClicked == false &&
          unClickedNewTicketsCount >= 1
        ) {
          setUnClickedNewTicketsCount(unClickedNewTicketsCount - 1);
        }
        if (
          (res?.inquiry?.status == 2 || res?.inquiry?.status == 6) &&
          res?.inquiry?.isClicked == 1 &&
          res?.isOriginalClicked == false &&
          unClickedApprovedTicketsCount >= 1
        ) {
          setUnClickedApprovedTicketsCount(unClickedApprovedTicketsCount - 1);
        }
        if (
          res?.inquiry?.status == 3 &&
          res?.inquiry?.isClicked == 1 &&
          res?.isOriginalClicked == false &&
          unClickedRejectTicketsCount >= 1
        ) {
          setUnClickedRejectTicketsCount(unClickedRejectTicketsCount - 1);
        }
        successNotify(res?.message);
        setLoading(false);
        setSelectedTicket(res?.inquiry);
        setSelectedTicketAttachments(res?.inquiry?.documents);
        setTicketStatusChange(true);
      } catch (err) {
        console.log(err);
        setLoading(false);
        successNotify(err?.message);
      }

      if (isMobile) {
        console.log("mobile");
        setShowTicketDetail(true);
      }
    }
  };

  const handleShowApprovedTickets = async () => {
    setLoading(true);
    setActiveTab("Approved");
    setSelectedTicket("");
    setShowTicketDetail(false);
    setTicketId("");

    if (userRole != 2) {
      try {
        const allTickets = await FormService.getAllInquiries();
        allTickets?.inquiries?.reverse();

        const filteredAllTickets = allTickets?.inquiries?.filter(
          (ticket) => ticket.status === 2 || ticket.status === 6
        );
        console.log(filteredAllTickets);
        setTicketData(filteredAllTickets);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    } else {
      try {
        const allTickets = await FormService.getAllInquiriesByEnrollmentNumber(
          enrollmentNumber
        );
        console.log(allTickets);
        allTickets.reverse();
        console.log(allTickets);
        const filteredAllTickets = allTickets.filter(
          (ticket) =>
            ticket.status === 2 ||
            ticket.status === 5 ||
            ticket.status === 6 ||
            ticket.status === 7
        );
        console.log(filteredAllTickets);
        setTicketData(filteredAllTickets);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    }
    setLoading(false);
  };

  const handleShowRejectedTickets = async () => {
    setLoading(true);
    setActiveTab("Rejected");
    setSelectedTicket("");
    setShowTicketDetail(false);
    setTicketId("");
    if (userRole != 2) {
      try {
        const allTickets = await FormService.getAllInquiries();
        console.log(allTickets);
        allTickets.inquiries.reverse();
        const filteredAllTickets = allTickets.inquiries.filter(
          (ticket) => ticket.status === 3
        );
        console.log(filteredAllTickets);
        setTicketData(filteredAllTickets);
        setLoading(false);
      } catch (err) {
        setLoading(false);
      }
    } else {
      try {
        const allTickets = await FormService.getAllInquiriesByEnrollmentNumber(
          enrollmentNumber
        );
        console.log(allTickets);
        allTickets.reverse();
        const filteredAllTickets = allTickets.filter(
          (ticket) => ticket.status === 3
        );

        setTicketData(filteredAllTickets);
      } catch (err) {
        setLoading(false);
      }
    }
    setLoading(false);
  };

  const handleProcessTranscriptRecord = async (id) => {
    setLoading(true);
    let res;
    try {
      res = await FormService.processTranscriptRecord(id);

      setSelectedTicket(res?.inquiry);
      setLoading(false);
      successNotify(res?.message);
    } catch (err) {
      errorNotify(res?.message);
      setLoading(false);
    }
    setLoading(false);
  };

  const handleDoneTranscriptRecord = async (id) => {
    setLoading(true);
    let res;
    try {
      res = await FormService.doneTranscriptRecord(id);

      setSelectedTicket(res?.inquiry);
      setLoading(false);
      successNotify(res?.message);
    } catch (err) {
      errorNotify(res?.message);
      setLoading(false);
    }
    setLoading(false);
  };

  const handleNotifyTranscriptRecord = async (id) => {
    try {
      handleModalShow(true);
      setActionBtnType("notify");
      let res;
      // res = await FormService.notifyTranscriptRecord(id);
      // setUnClickedApprovedTicketsCount(unClickedApprovedTicketsCount + 1);

      // setSelectedTicket(res?.inquiry);
      // setLoading(false);
      // successNotify(res?.message);
    } catch (err) {
      errorNotify(err?.message);
      setLoading(false);
    }
    setLoading(false);
  };

  const getTimeDifference = (startDate, endDate) => {
    // Convert both dates to milliseconds
    const diffInMs = endDate - startDate;

    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
    if (diffInDays >= 1) {
      return endDate.toLocaleDateString(); // Customize date format as needed
    }
    // Calculate the difference in days, hours, and minutes

    let diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
    if (diffInHours < 0) {
      diffInHours = 0;
    }
    let diffInMinutes = Math.floor(diffInMs / (1000 * 60));
    if (diffInMinutes < 0) {
      diffInMinutes = 0;
    }
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
    if (startDate.getDay() > 3 && startDate.getDay() < 6) {
      return 1000 * 60 * 60 * 24 * 4 - (endDate - startDate);
    } else if (startDate.getDay() == 0) {
      return (
        1000 * 60 * 60 * 24 * 3 -
        (startDate % (1000 * 60 * 60 * 24)) -
        (endDate - startDate)
      );
    } else if (startDate.getDay() == 6) {
      return (
        1000 * 60 * 60 * 24 * 4 -
        (startDate % (1000 * 60 * 60 * 24)) -
        (endDate - startDate)
      );
    } else return 1000 * 60 * 60 * 24 * 2 - (endDate - startDate);
  };

  const handleDownload = async (fileUrl, fileName) => {
    try {
      // Fetch the file from the URL as a Blob
      const response = await fetch(fileUrl, {
        method: "GET"
        // headers: {
        //   "Content-Type": "application/octet-stream"
        // }
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
      if (contentTemplate == "TransferTarguMures") {
        setTarguModalShow(true);
      } else {
        handleModalShow(true);
      }
      setActionBtnType("accept");
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
      handleModalShow(true);
      setActionBtnType("reject");
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

  const successNotify = (msg) => {
    toast.info(msg, {
      autoClose: 5000 // Duration in milliseconds
    });
  };
  const errorNotify = (msg) => {
    toast.warning(msg, {
      autoClose: 5000 // Duration in milliseconds
    });
  };

  const handlePassToAnotherDepartment = () => {
    setPassToAnotherDepartmentModalShow(true);
  };

  return (
    <div className="h-100 border border-gray">
      <div className="mailbox">
        <div className="mailbox-toolbar">
          <div className="mailbox-toolbar-item d-flex align-items-center">
            <span className="mailbox-toolbar-text">TicketBoxes</span>
          </div>
          <div className="mailbox-toolbar-item">
            <Link
              to=""
              className={`d-flex mailbox-toolbar-link ${
                activeTab == "All" && !showTicketDetail ? "active" : ""
              } `}
              onClick={handleShowNewTickets}
            >
              New tickets
              {userRole != 2 && (
                <Badge
                  pill
                  bg="primary"
                  className="ms-2"
                  style={{
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                  }}
                >
                  {unClickedNewTicketsCount}
                </Badge>
              )}
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
            <Link
              onClick={handleShowApprovedTickets}
              className={`d-flex mailbox-toolbar-link ${
                activeTab == "Approved" && !showTicketDetail ? "active" : ""
              } `}
            >
              Approved
              {userRole != 2 && (
                <Badge
                  pill
                  bg="primary"
                  className="ms-2"
                  style={{
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                  }}
                >
                  {unClickedApprovedTicketsCount}
                </Badge>
              )}
            </Link>
          </div>
          <div className="mailbox-toolbar-item">
            <Link
              onClick={handleShowRejectedTickets}
              className={`d-flex mailbox-toolbar-link ${
                activeTab == "Rejected" && !showTicketDetail ? "active" : ""
              } `}
            >
              Rejected
              {userRole != 2 && (
                <Badge
                  pill
                  bg="primary"
                  className="ms-2"
                  style={{
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                  }}
                >
                  {unClickedRejectTicketsCount}
                </Badge>
              )}
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
              <div
                className={
                  userData?.role == 2 ? "mailbox-list-student" : "mailbox-list"
                }
              >
                {ticketData && ticketData.length > 0 ? (
                  ticketData.map((ticket, index) => (
                    <div
                      key={index}
                      className={
                        userData?.role == 2
                          ? "mailbox-list-item border-bottom" +
                            (ticket?.documents ? " has-attachment " : "")
                          : "mailbox-list-item border-bottom border-white" +
                            (ticket?.documents &&
                            (ticket?.status == 0 ||
                              ticket?.status == 1 ||
                              ticket?.status == 4 ||
                              ticket?.status == 5)
                              ? " has-attachment "
                              : "") +
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
                      <div
                        className="mailbox-message"
                        onClick={() => handleSelectTicket(ticket?._id)}
                        style={{ cursor: "pointer" }}
                      >
                        <div className="mailbox-sender">
                          <span className="mailbox-sender-name">
                            [
                            {INQUIRYCATEGORIES[ticket?.inquiryCategory - 1][
                              "subCategories"
                            ][ticket?.subCategory1 - 1]["subCategory1"]
                              ? INQUIRYCATEGORIES[ticket?.inquiryCategory - 1][
                                  "subCategories"
                                ][ticket?.subCategory1 - 1]["subCategory1"]
                              : ""}
                            ]
                          </span>
                          <span className="mailbox-time">
                            {getTimeDifference(
                              new Date(ticket?.createdAt),
                              new Date()
                            )}
                          </span>
                        </div>

                        <div
                          className={
                            userData?.role == 2
                              ? "fw-bold"
                              : ticket?.status == 0 ||
                                ticket?.status == 1 ||
                                ticket?.status == 4 ||
                                ticket?.status == 5
                              ? "text-white fw-bold"
                              : "fw-bold"
                          }
                        >
                          {
                            INQUIRYCATEGORIES[ticket?.inquiryCategory - 1][
                              "inquiryCategory"
                            ]
                          }
                        </div>
                        <div
                          className={
                            userRole != 2 &&
                            ticket?.status != 0 &&
                            ticket?.status != 1 &&
                            ticket?.status != 4 &&
                            ticket?.status != 5
                              ? "text-black"
                              : "mailbox-desc"
                          }
                        >
                          {ticket?.email}
                        </div>
                        {userData?.role != 2 ? (
                          ticket?.status == 0 ||
                          ticket?.status == 1 ||
                          ticket?.status == 4 ||
                          ticket?.status == 5 ? (
                            <>
                              <DownTimer
                                remainTime={getTimeRemain(
                                  new Date(ticket?.createdAt),
                                  new Date()
                                )}
                              />
                              {ticket?.isClicked == 1 ? (
                                <Badge
                                  style={{
                                    marginTop: "13px",
                                    fontSize: "14px",
                                    fontWeight: "300",
                                    float: "right"
                                  }}
                                  bg="primary"
                                >
                                  Viewed
                                </Badge>
                              ) : (
                                <Badge
                                  style={{
                                    marginTop: "13px",
                                    fontSize: "14px",
                                    fontWeight: "300",
                                    float: "right"
                                  }}
                                  bg="danger"
                                >
                                  No Viewed
                                </Badge>
                              )}
                            </>
                          ) : ticket?.isClicked ? (
                            <Badge
                              style={{
                                marginTop: "13px",
                                fontSize: "14px",
                                fontWeight: "300",
                                float: "right"
                              }}
                              bg="primary"
                            >
                              Viewed
                            </Badge>
                          ) : (
                            <Badge
                              style={{
                                marginTop: "13px",
                                fontSize: "14px",
                                fontWeight: "300",
                                float: "right"
                              }}
                              bg="danger"
                            >
                              No Viewed
                            </Badge>
                          )
                        ) : ticket.isClicked == 1 ? (
                          <Badge
                            style={{
                              marginTop: "13px",
                              fontSize: "14px",
                              fontWeight: "300",
                              float: "right"
                            }}
                            bg="primary"
                          >
                            Viewed
                          </Badge>
                        ) : (
                          <Badge
                            style={{
                              marginTop: "13px",
                              fontSize: "14px",
                              fontWeight: "300",
                              float: "right"
                            }}
                            bg="danger"
                          >
                            No Viewed
                          </Badge>
                        )}
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
            className={`mailbox-content d-lg-block ${
              showTicketDetail ? "" : "d-none"
            }`}
          >
            {loading ? (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100vh"
                }}
              >
                <BeatLoader size={15} />
              </div>
            ) : (
              <PerfectScrollbar className="h-100">
                {ticketId ? (
                  <div className="mailbox-detail">
                    {userRole != 2 && (
                      <div className="mailbox-detail-header external-btn-container">
                        <a className="btn btn-light rounded-pill mt-2">
                          Reply to the student
                        </a>
                        <a className="btn btn-light rounded-pill mt-2">
                          Add internal note
                        </a>
                        <a
                          className="btn btn-primary rounded-pill mt-2"
                          onClick={handlePassToAnotherDepartment}
                        >
                          Pass to another department
                        </a>
                      </div>
                    )}
                    <div className="mailbox-detail-header">
                      <div
                        className="d-flex "
                        style={{ wordBreak: "break-all" }}
                      >
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
                    <div className="mailbox-detail-content ">
                      <div className="d-flex gap-3 mb-3">
                        <h4 className="mb-0">
                          {
                            INQUIRYCATEGORIES[
                              selectedTicket?.inquiryCategory - 1
                            ]["subCategories"][
                              selectedTicket?.subCategory1 - 1
                            ]["subCategory1"]
                          }{" "}
                          Request from{" "}
                          {selectedTicket?.firstName +
                            " " +
                            selectedTicket?.lastName}
                        </h4>

                        {selectedTicket && (
                          <Badge
                            style={{
                              fontSize: "14px",
                              fontWeight: "300",
                              height: "25px"
                            }}
                            bg={ticketStatusBadge[selectedTicket?.status]}
                          >
                            {ticketStatus[selectedTicket?.status]}
                          </Badge>
                        )}
                      </div>

                      <div className="d-flex ">
                        {attachments &&
                          attachments.map((attachment, index) => (
                            <div
                              className="mailbox-detail-attachment"
                              key={index}
                            >
                              <div className="mailbox-attachment">
                                <a
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
                        <div className="mb-3">
                          <a
                            className="btn btn-rounded px-3 btn-sm bg-theme bg-opacity-20 text-theme fw-600 rounded"
                            onClick={(e) => handleDownloadAll(e)}
                          >
                            Download
                          </a>
                        </div>
                      ) : (
                        <></>
                      )}
                      {selectedTicket?.emailContent && (
                        <Form.Group controlId="emailContent">
                          <label>Email Content:</label>
                          <ReactQuill
                            placeholder=""
                            value={selectedTicket?.emailContent}
                            readOnly={true}
                            theme="snow" // Ensure you use a valid theme to keep the styles
                            style={{
                              height: "auto", // Set a fixed height

                              backgroundColor: "#f8f9fa" // Optional: Set a background to indicate read-only
                            }}
                          />
                        </Form.Group>
                      )}
                      {selectedTicket?.reason && (
                        <Form.Group controlId="reason" className="mt-4">
                          <label>Ticket Reopen Reason:</label>
                          <ReactQuill
                            placeholder=""
                            value={selectedTicket?.reason}
                            readOnly={true}
                            theme="snow" // Ensure you use a valid theme to keep the styles
                            style={{
                              height: "auto", // Set a fixed height

                              backgroundColor: "#f8f9fa" // Optional: Set a background to indicate read-only
                            }}
                          />
                        </Form.Group>
                      )}

                      <div className="mailbox-detail-body mt-5 border-bottom border-gray ">
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
                            <p className="text-black">
                              {selectedTicket?.email}
                            </p>
                          </div>
                          <div className="d-flex">
                            <p className="text-black">Ticket Number:</p>
                            <p className="text-black">
                              {selectedTicket?.inquiryNumber}
                            </p>
                          </div>
                        </div>
                        <p className="mb-0">
                          Enrollment Number: {selectedTicket?.enrollmentNumber}
                        </p>
                        <br />
                      </div>
                    </div>
                    {userRole != 2 &&
                      selectedTicket?.status != 2 &&
                      selectedTicket?.status != 3 && (
                        <div
                          style={{
                            position: "sticky",
                            bottom: "0px",
                            backgroundColor: "white",
                            paddingBottom: "10px"
                          }}
                        >
                          <div className="pt-2 d-flex justify-content-end ">
                            <div
                              className="d-flex gap-3 bg-white"
                              style={{
                                width: "inherit"
                              }}
                            >
                              {contentTemplate == "Enrollment" && (
                                <div
                                  className="btn-group w-100"
                                  role="group"
                                  aria-label="Basic example"
                                  style={{
                                    maxWidth: "115px"
                                  }}
                                >
                                  <button
                                    type="button"
                                    className="btn btn-info rounded-pill pl-5"
                                    onClick={() =>
                                      handleCheckEnrollment(selectedTicket?._id)
                                    }
                                  >
                                    Check
                                  </button>
                                </div>
                              )}
                              {contentTemplate == "ExamInspection" && (
                                <div
                                  className="btn-group w-100"
                                  role="group"
                                  aria-label="Basic example"
                                  style={{
                                    maxWidth: "115px"
                                  }}
                                >
                                  <button
                                    type="button"
                                    className="btn btn-info rounded-pill pl-5"
                                    onClick={() =>
                                      handleCheckExamInspection(
                                        selectedTicket?._id
                                      )
                                    }
                                  >
                                    Check
                                  </button>
                                </div>
                              )}
                              {contentTemplate == "TranscriptRecords" && (
                                <>
                                  <div
                                    className="btn-group w-100"
                                    role="group"
                                    aria-label="Basic example"
                                    style={{
                                      maxWidth: "115px"
                                    }}
                                  >
                                    <button
                                      type="button"
                                      className={
                                        selectedTicket?.status == 4 ||
                                        selectedTicket?.status == 5 ||
                                        selectedTicket?.status == 6
                                          ? "d-none"
                                          : "btn btn-secondary rounded-pill pl-5"
                                      }
                                      onClick={() => {
                                        handleProcessTranscriptRecord(ticketId);
                                      }}
                                    >
                                      Process
                                    </button>
                                  </div>
                                  <div
                                    className="btn-group w-100"
                                    role="group"
                                    aria-label="Basic example"
                                    style={{
                                      maxWidth: "115px"
                                    }}
                                  >
                                    <button
                                      type="button"
                                      onClick={() => {
                                        handleDoneTranscriptRecord(ticketId);
                                      }}
                                      className={
                                        selectedTicket?.status == 5 ||
                                        selectedTicket?.status == 6
                                          ? "d-none"
                                          : "btn btn-primary rounded-pill pl-5"
                                      }
                                    >
                                      Done
                                    </button>
                                  </div>
                                  <div
                                    className="btn-group w-100"
                                    role="group"
                                    aria-label="Basic example"
                                    style={{
                                      maxWidth: "115px"
                                    }}
                                  >
                                    <button
                                      type="button"
                                      className={
                                        selectedTicket?.status == 6
                                          ? "d-none"
                                          : "btn btn-info rounded-pill pl-5"
                                      }
                                      onClick={() => {
                                        handleNotifyTranscriptRecord(ticketId);
                                      }}
                                    >
                                      Notify
                                    </button>
                                  </div>
                                </>
                              )}

                              {contentTemplate != "Enrollment" &&
                                contentTemplate != "ExamInspection" &&
                                contentTemplate != "TranscriptRecords" &&
                                ((getPermissionOfTicket(
                                  selectedTicket,
                                  userPermissionCategory
                                ) != "None" &&
                                  getPermissionOfTicket(
                                    selectedTicket,
                                    userPermissionCategory
                                  ) != "Passive" &&
                                  getPermissionOfTicket(
                                    selectedTicket,
                                    userPermissionCategory
                                  ) != "Active") ||
                                  (userData?.role == 0 &&
                                    userData?.position == 1)) && (
                                  <>
                                    <div
                                      className="btn-group w-100"
                                      role="group"
                                      aria-label="Basic example"
                                      style={{
                                        maxWidth: "115px"
                                      }}
                                    >
                                      <button
                                        type="button"
                                        style={{
                                          backgroundColor: "#009be3",
                                          borderTopLeftRadius: "50px",
                                          borderBottomLeftRadius: "50px",
                                          borderRight: "1px solid orange"
                                        }}
                                        className="btn btn-info btn-left mailbox-detail-button pl-5"
                                        onClick={() =>
                                          handleInquiryAccept(
                                            selectedTicket?._id
                                          )
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
                                            borderBottomRightRadius: "50px"
                                          }}
                                        ></Dropdown.Toggle>

                                        <Dropdown.Menu>
                                          <Dropdown.Item href="#/action-1">
                                            Accept with Internal Note
                                          </Dropdown.Item>
                                          <Dropdown.Item href="#/action-2">
                                            Accept with Email
                                          </Dropdown.Item>
                                        </Dropdown.Menu>
                                      </Dropdown>
                                    </div>

                                    <div
                                      className="btn-group w-100"
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
                                          borderRight: "1px solid orange"
                                        }}
                                        className="btn btn-danger btn-left"
                                        onClick={() =>
                                          handleInquiryReject(
                                            selectedTicket?._id
                                          )
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
                                            borderBottomRightRadius: "50px"
                                          }}
                                        ></Dropdown.Toggle>

                                        <Dropdown.Menu>
                                          <Dropdown.Item href="#/action-1">
                                            Reject with Internal Note
                                          </Dropdown.Item>
                                          <Dropdown.Item href="#/action-2">
                                            Reject with Email
                                          </Dropdown.Item>
                                        </Dropdown.Menu>
                                      </Dropdown>
                                    </div>
                                  </>
                                )}
                            </div>
                          </div>
                        </div>
                      )}
                  </div>
                ) : (
                  <div className="mailbox-empty-message">
                    <div className="mailbox-empty-message-icon">
                      <i className="bi bi-inbox text-theme text-opacity-50"></i>
                    </div>
                    <div className="mailbox-empty-message-title">
                      No ticket selected
                    </div>
                  </div>
                )}
              </PerfectScrollbar>
            )}
          </div>
        </div>
      </div>
      {actionBtnType && (
        <EmailTemplateModal
          show={show}
          handleModalClose={handleModalClose}
          actionBtnType={actionBtnType}
          selectedTicket={selectedTicket}
          setLoading={setLoading}
          setTicketStatusChange={setTicketStatusChange}
          successNotify={successNotify}
          errorNotify={errorNotify}
          setSelectedTicket={setSelectedTicket}
          contentTemplate={contentTemplate}
          studentNo={studentNo}
          unClickedApprovedTicketsCount={unClickedApprovedTicketsCount}
          setUnClickedApprovedTicketsCount={setUnClickedApprovedTicketsCount}
          unClickedRejectTicketsCount={unClickedRejectTicketsCount}
          setUnClickedRejectTicketsCount={setUnClickedRejectTicketsCount}
        />
      )}
      {actionBtnType && (
        <TarguModal
          show={targuModalshow}
          handleModalClose={handleTarguModalClose}
          actionBtnType={actionBtnType}
          selectedTicket={selectedTicket}
          setLoading={setLoading}
          setTicketStatusChange={setTicketStatusChange}
          successNotify={successNotify}
          errorNotify={errorNotify}
          setSelectedTicket={setSelectedTicket}
          contentTemplate={contentTemplate}
          unClickedApprovedTicketsCount={unClickedApprovedTicketsCount}
          setUnClickedApprovedTicketsCount={setUnClickedApprovedTicketsCount}
          unClickedRejectTicketsCount={unClickedRejectTicketsCount}
          setUnClickedRejectTicketsCount={setUnClickedRejectTicketsCount}
        />
      )}
      {actionBtnType && (
        <EnrollmentModal
          show={enrollmentModalShow}
          handleModalClose={handleEnrollmentModalClose}
          actionBtnType={actionBtnType}
          selectedTicket={selectedTicket}
          setLoading={setLoading}
          setTicketStatusChange={setTicketStatusChange}
          successNotify={successNotify}
          errorNotify={errorNotify}
          setSelectedTicket={setSelectedTicket}
          contentTemplate={contentTemplate}
          studentNo={studentNo}
          unClickedApprovedTicketsCount={unClickedApprovedTicketsCount}
          setUnClickedApprovedTicketsCount={setUnClickedApprovedTicketsCount}
          unClickedRejectTicketsCount={unClickedRejectTicketsCount}
          setUnClickedRejectTicketsCount={setUnClickedRejectTicketsCount}
        />
      )}
      {actionBtnType && (
        <ExamInspectionModal
          show={examInspectionModalShow}
          handleModalClose={handleExamInspectionModalClose}
          actionBtnType={actionBtnType}
          selectedTicket={selectedTicket}
          setLoading={setLoading}
          setTicketStatusChange={setTicketStatusChange}
          successNotify={successNotify}
          errorNotify={errorNotify}
          setSelectedTicket={setSelectedTicket}
          contentTemplate={contentTemplate}
          studentNo={studentNo}
          unClickedApprovedTicketsCount={unClickedApprovedTicketsCount}
          setUnClickedApprovedTicketsCount={setUnClickedApprovedTicketsCount}
          unClickedRejectTicketsCount={unClickedRejectTicketsCount}
          setUnClickedRejectTicketsCount={setUnClickedRejectTicketsCount}
        />
      )}

      <PassToAnotherDepartmentModal
        show={passToAnotherDepartmentModalShow}
        handleModalClose={handlePassToAnotherDepartmentModalClose}
        selectedTicket={selectedTicket}
      />
    </div>
  );
}

export default EmailInbox;
