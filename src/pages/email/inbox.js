import React, { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import PerfectScrollbar from "react-perfect-scrollbar";
import { AppSettings } from "./../../config/app-settings.js";
import { Link } from "react-router-dom";
import moment from "moment";
import { ToastContainer, toast } from "react-toastify";
import Select, { components } from "react-select";
import {
  Badge,
  Form,
  Dropdown,
  Modal,
  Button,
  Row,
  Col
} from "react-bootstrap";
import "react-toastify/dist/ReactToastify.css";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import FormService from "../../sevices/form-service";
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
import OnlineCatalogueComplaint from "./inquiryTemplate/onlineCatalogueComplaint.js";
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
import PassToAnotherDepartmentModal from "./passToAnotherDepartmentModal.js";
import TarguModal from "./transferToTarguMures.js";
import InternalNoteModal from "./internalNoteModal.js";

import BeatLoader from "react-spinners/BeatLoader";
import * as XLSX from "xlsx";
import BlockUI from "react-block-ui";
import "react-block-ui/style.css";

import { TicketTypeStructure, POSITIONNAMES } from "../../globalVariables.js";
import ReplyStudentModal from "./replyStudentModal.js";
import formService from "../../sevices/form-service";

function EmailInbox() {
  const host = process.env.REACT_APP_API_URL;
  const context = useContext(AppSettings);
  const navigate = useNavigate();

  const [ticketData, setTicketData] = useState();
  const [originalTicketData, setOriginalTicketData] = useState([]);
  const [ticketsByYear, setTicketsByYear] = useState([]);
  const [ticketId, setTicketId] = useState();
  const [selectedTicket, setSelectedTicket] = useState();
  const [attachments, setSelectedTicketAttachments] = useState([]);
  const [firstYearOfStudy, setFirstYearOfStudy] = useState("all");

  const [isMobile, setIsMobile] = useState(false);
  const [showTicketDetail, setShowTicketDetail] = useState(false);
  const [userPermissionCategory, setUserPermissonCategory] = useState();
  const [activeTab, setActiveTab] = useState("All");

  const [isTicketStatusChange, setTicketStatusChange] = useState(true);
  const [loading, setLoading] = useState(false);
  const [previewLoading, setPreviewLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [actionBtnType, setActionBtnType] = useState();
  const [studentNo, setStudentNo] = useState("");
  const [selectedItems, setSelectedItems] = useState([
    { label: "Select All Category", value: "0" }
  ]);

  const [unClickedNewTicketsCount, setUnClickedNewTicketsCount] = useState(0);
  const [unClickedApprovedTicketsCount, setUnClickedApprovedTicketsCount] =
    useState(0);
  const [unClickedRejectTicketsCount, setUnClickedRejectTicketsCount] =
    useState(0);
  const [unClickedCloseTicketsCount, setUnClickedClosedTicketCount] =
    useState(0);

  const [enrollmentModalShow, setEnrollmentModalShow] = useState(false);
  const [examInspectionModalShow, setExamInspectionModalShow] = useState(false);
  const [targuModalshow, setTarguModalShow] = useState(false);
  const [examFilter, setExamFilter] = useState({
    examSpecification: "",
    subject: ""
  });
  const [showExcelExportModal, setShowExcelExportModal] = useState(false);
  const [excelFileName, setExcelFileName] = useState("");
  const [categoryData, setCategoryData] = useState([]);
  const [internalNoteModalShow, setInternalNoteModalShow] = useState(false);
  const [replyStudentModalShow, setReplyStudentModalShow] = useState(false);

  const [internalNotes, setInternalNotes] = useState([]);
  const [replyStudentMessage, steReplyStudentMessage] = useState([]);
  const [selectedInternalMessage, setSelectedInternalMessage] = useState();

  const [
    passToAnotherDepartmentModalShow,
    setPassToAnotherDepartmentModalShow
  ] = useState(false);
  const handleModalClose = () => setShow(false);
  const handleModalShow = () => setShow(true);

  const handleEnrollmentModalClose = () => setEnrollmentModalShow(false);

  const handleExamInspectionModalClose = () =>
    setExamInspectionModalShow(false);

  const handlePassToAnotherDepartmentModalClose = () => {
    setPassToAnotherDepartmentModalShow(false);
  };

  const handleInterlNoteModalClose = () => {
    setInternalNoteModalShow(false);
  };

  const handleReplyStudentModalClose = () => {
    setReplyStudentModalShow(false);
  };

  const handleTarguModalClose = () => {
    setTarguModalShow(false);
  };

  // Prepare main options for Select component
  const formatOptions = (data) =>
    data.reduce((acc, category) => {
      if (category?.subcategories) {
        acc.push({
          label: <div style={{ fontWeight: "bold" }}>{category.label}</div>,
          value: category.value,
          isDisabled: true // Prevent main category selection
        });
      } else {
        acc.push({
          label: <div style={{ fontWeight: "bold" }}>{category.label}</div>,
          value: category.value,
          isDisabled: false // Prevent main category selection
        });
      }
      if (category?.subcategories) {
        category?.subcategories.forEach((sub) =>
          acc.push({
            label: sub.label,
            value: sub.value,
            isSubcategory: true // Mark subcategories for custom styles
          })
        );
      }
      return acc;
    }, []);

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? "#f0f8ff" : "#fff",
      borderColor: state.isFocused ? "#2596be" : "#002d47",
      borderWidth: state.isFocused ? "5px" : "1px",
      borderRadius: "0px",
      padding: "5px",
      fontSize: "16px",
      "&:hover": {
        borderColor: state.isFocused ? "#2596be" : "#002d47"
      }
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? "#4a90e2" : "#fff",
      color: state.isSelected ? "#fff" : "#333",
      paddingLeft: state.data.isSubcategory ? "1.5rem" : "0.5rem", // Apply ms-3 only to subcategories
      "&:hover": {
        backgroundColor: "#e6f7ff",
        color: "#333"
      }
    }),
    singleValue: (provided) => ({
      ...provided,
      paddingLeft: "0rem" // Ensure no ms-3 for selected value
    }),
    menu: (provided) => ({
      ...provided,
      borderRadius: "5px",
      marginTop: "5px",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.15)"
    }),
    placeholder: (provided) => ({
      ...provided,
      color: "#999"
    }),
    multiValue: (provided) => ({
      ...provided,
      backgroundColor: "#4a90e2",
      color: "#fff",
      borderRadius: "3px"
    }),
    multiValueLabel: (provided) => ({
      ...provided,
      color: "#fff"
    }),
    multiValueRemove: (provided) => ({
      ...provided,
      color: "#fff",
      cursor: "pointer",
      "&:hover": {
        backgroundColor: "#ff5e5e",
        color: "white"
      }
    })
  };

  // Handle selection of subcategory in main select component
  const handleSelectChange = (selectedOption) => {
    // init exam filter
    setExamFilter({ examSpecification: "", subject: "" });

    setSelectedItems(selectedOption || []);

    let inquiryCategory = "";
    let subCategory1 = "";

    if (selectedOption.value.includes("-")) {
      const idx = selectedOption.value.indexOf("-");
      inquiryCategory = selectedOption.value.substring(0, idx);
      subCategory1 = selectedOption.value.substring(idx + 1);
    } else {
      inquiryCategory = selectedOption.value;
    }

    const filteredTempTickets = originalTicketData.filter(
      (ticket) =>
        ticket.subCategory1 === subCategory1 &&
        ticket.inquiryCategory === inquiryCategory
    );

    if (selectedOption.value == "") {
      setTicketData(originalTicketData);
      setTicketsByYear(originalTicketData);
    } else {
      setTicketData(filteredTempTickets);
      setTicketsByYear(filteredTempTickets);
    }
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

  const [contentTemplate, setContentTemplate] = useState();

  const fetchInternalMessage = async () => {
    try {
      let _internalMessage;
      let _replyMessage;
      if (userRole !== 2) {
        // admin - get internal and reply
        const { data } = await formService.fetchInternalNote();
        _internalMessage = data;
        {
          const { data } = await formService.fetchReplyStudentMessageList();
          _replyMessage = data;
          steReplyStudentMessage(_replyMessage);
        }
      } else {
        // student - get only reply
        const { data } = await formService.fetchReplyStudentMessage();
        _replyMessage = data;
        _internalMessage = [];
        steReplyStudentMessage(_replyMessage);
      }
      setInternalNotes(_internalMessage);
    } catch (error) {
      console.log(error);
      if (error.message) {
        errorNotify(error.message);
      }
      setInternalNotes([]);
      steReplyStudentMessage([]);
    }
  };

  useEffect(() => {
    try {
      if (selectedTicket) {
        const ticketComponent =
          selectedTicket.inquiryCategory +
          (selectedTicket.subCategory1
            ? `-${selectedTicket.subCategory1}`
            : "");
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

    // set inquirycateogries
    const _initialData = [
      {
        value: "",
        label: "Select All Categories"
      }
    ];

    const _categoryData = _initialData.concat(
      TicketTypeStructure.map((log) => {
        if (log.types) {
          const _subCategory = log.types.map((logSec) => ({
            label: logSec,
            value: log.name + "-" + logSec
          }));
          return {
            label: log.name,
            subcategories: _subCategory
          };
        } else {
          return {
            label: log.name,
            value: log.name
          };
        }
      })
    );

    setCategoryData(_categoryData);
    handleShowNewTickets();

    // fetch internal notes and reply student message
    const fetchInternalMessage = async () => {
      try {
        let _internalMessage;
        let _replyMessage;
        if (userRole !== 2) {
          // admin - get internal and reply
          const { data } = await formService.fetchInternalNote();
          _internalMessage = data;
          {
            const { data } = await formService.fetchReplyStudentMessageList();
            _replyMessage = data;
            steReplyStudentMessage(_replyMessage);
          }
        } else {
          // student - get only reply
          const { data } = await formService.fetchReplyStudentMessage();
          _replyMessage = data;
          _internalMessage = [];
          steReplyStudentMessage(_replyMessage);
        }
        setInternalNotes(_internalMessage);
      } catch (error) {
        console.log(error);
        if (error.message) {
          errorNotify(error.message);
        }
        setInternalNotes([]);
        steReplyStudentMessage([]);
      }
    };

    fetchInternalMessage();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    getAllInquiries();
    fetchInternalMessage();
  }, [isTicketStatusChange]);

  const handleCheckEnrollment = () => {
    setActionBtnType("enrollment");
    setEnrollmentModalShow(true);
  };

  const openInNewTab = (url) => {
    const link = document.createElement("a");
    link.href = url;
    link.target = "_blank";
    link.rel = "noopener noreferrer"; // For security
    link.click();
  };

  const handlePreviewCredentialPDF = async () => {
    setPreviewLoading(true);
    const res = await FormService.previewCredentailPDF(selectedTicket);

    setPreviewLoading(false);
    openInNewTab(process.env.REACT_APP_API_URL + res?.pdf_url);
  };

  const handleExamInspectionCloseModalShow = () => {
    setExamInspectionModalShow(true);
  };

  const renderContentTemplate = () => {
    switch (contentTemplate) {
      case "Application and Requests-Absence":
        return <Absence selectedTicket={selectedTicket} />;
      case "Application and Requests-Change of teaching hospital":
        return <ChangeTeachingHospital selectedTicket={selectedTicket} />;
      case "Application and Requests-Change of study group":
        return <ChangeStudyGroup selectedTicket={selectedTicket} />;
      case "Application and Requests-Demonstrator student":
        return <DemonstratorStudent selectedTicket={selectedTicket} />;
      case "Application and Requests-Enrollment Certificate":
        return <Enrollment selectedTicket={selectedTicket} />;
      case "Application and Requests-Exam inspection":
        return <ExamInspection selectedTicket={selectedTicket} />;
      case "Application and Requests-Online Catalogue (Solaris)":
        return <OnlineCatalogue selectedTicket={selectedTicket} />;
      case "Application and Requests-Recognition of Courses":
        return <RecognitionCourses selectedTicket={selectedTicket} />;
      case "Application and Requests-Recognition of Internship":
        return <RecognitionInternship selectedTicket={selectedTicket} />;
      case "Application and Requests-Short term borrow of Diploma":
        return <ShotTermBorrowDiploma selectedTicket={selectedTicket} />;
      case "Application and Requests-Syllabus of the academic year":
        return <SyllabusAcademic selectedTicket={selectedTicket} />;
      case "Application and Requests-Transcript of Records":
        return <TranscriptRecords selectedTicket={selectedTicket} />;
      case "Application and Requests-Transcript to Targu Mures":
        return <TransferTarguMures selectedTicket={selectedTicket} />;
      case "Application and Requests-Internship":
        return <Internship selectedTicket={selectedTicket} />;
      case "Application and Requests-Medical Abilities":
        return <MedicalAbilities selectedTicket={selectedTicket} />;
      case "Application and Requests-Thesis":
        return <Thesis selectedTicket={selectedTicket} />;
      case "Application and Requests-Other":
        return <OtherApplicationRequest selectedTicket={selectedTicket} />;

      case "Book rental UMCH library":
        return <BookRental selectedTicket={selectedTicket} />;

      case "Campus IT-Canvas":
        return <Canvas selectedTicket={selectedTicket} />;
      case "Campus IT-Streaming/Panopto":
        return <Streaming selectedTicket={selectedTicket} />;

      case "Complaints-Campus":
        return <Campus selectedTicket={selectedTicket} />;
      case "Complaints-Dean's Office":
        return <DeanOffice selectedTicket={selectedTicket} />;
      case "Complaints-German Teaching Department":
        return <GermanTeachingDepartment selectedTicket={selectedTicket} />;
      case "Complaints-Teaching Hospital":
        return <TeachingHospital selectedTicket={selectedTicket} />;
      case "Complaints-Teacher":
        return <Teacher selectedTicket={selectedTicket} />;
      case "Complaints-Online Catalogue (Carnet)":
        return <OnlineCatalogueComplaint selectedTicket={selectedTicket} />;
      case "Complaints-Exam":
        return <Exam selectedTicket={selectedTicket} />;
      case "Complaints-Other":
        return <OtherComplaint selectedTicket={selectedTicket} />;

      case "Other":
        return <Other selectedTicket={selectedTicket} />;
      default:
        return <></>;
    }
  };

  const BtnUnderContent = ({ contentTemplate }) => {
    // first check permission
    let _permission = "";
    if (userPermissionCategory === "all") {
      _permission = "Responsible";
    } else if (
      userPermissionCategory &&
      contentTemplate &&
      userPermissionCategory[contentTemplate]
    ) {
      _permission = userPermissionCategory[contentTemplate];
    }

    if (_permission === "Passive" || _permission === "Active") {
      return <></>;
    }

    // second current ticket state
    if (
      selectedTicket &&
      (selectedTicket.status === 2 ||
        selectedTicket.status === 3 ||
        selectedTicket.status === 7)
    ) {
      return <></>;
    }
    if (_permission === "Responsible") {
      if (
        contentTemplate === "Application and Requests-Absence" ||
        contentTemplate === "Application and Requests-Change of study group" ||
        contentTemplate ===
        "Application and Requests-Change of teaching hospital" ||
        contentTemplate === "Application and Requests-Demonstrator student" ||
        contentTemplate ===
        "Application and Requests-Online Catalogue (Solaris)" ||
        contentTemplate === "Application and Requests-Recognition of Courses" ||
        contentTemplate ===
        "Application and Requests-Recognition of Internship" ||
        contentTemplate ===
        "Application and Requests-Syllabus of the academic year" ||
        contentTemplate ===
        "Application and Requests-Transcript to Targu Mures" ||
        contentTemplate === "Book rental UMCH library"
      ) {
        // accept and reject button
        return (
          <div className="d-flex justify-content-end">
            <button
              className="py-1 px-3 rounded-pill btn btn-primary"
              onClick={() => handleInquiryAccept(selectedTicket?._id)}
            >
              Accept
            </button>
            <button
              className="py-1 px-3 rounded-pill btn btn-danger ms-3"
              onClick={() => handleInquiryReject(selectedTicket?._id)}
            >
              Reject
            </button>
          </div>
        );
      }

      if (
        contentTemplate === "Application and Requests-Transcript of Records"
      ) {
        return (
          <div className="d-flex justify-content-end">
            {selectedTicket.status === 1 && (
              <button
                className="px-1 py-1 btn btn-secondary rounded-pill"
                onClick={() => {
                  handleProcessTranscriptRecord(ticketId);
                }}
              >
                Process
              </button>
            )}
            {selectedTicket.status === 4 && (
              <button
                className="btn btn-primary rounded-pill px-1 py-1"
                onClick={() => {
                  handleDoneTranscriptRecord(ticketId);
                }}
              >
                Done
              </button>
            )}
            {selectedTicket.status === 5 && (
              <button
                className="btn btn-info rounded-pill px-1 py-1"
                onClick={() => {
                  handleNotifyTranscriptRecord(ticketId);
                }}
              >
                Notify
              </button>
            )}
            <button
              className="py-1 px-3 rounded-pill btn btn-primary ms-3"
              onClick={() => handleInquiryAccept(selectedTicket?._id)}
            >
              Accept
            </button>
            <button
              className="py-1 px-3 rounded-pill btn btn-danger ms-3"
              onClick={() => handleInquiryReject(selectedTicket?._id)}
            >
              Reject
            </button>
          </div>
        );
      }

      if (contentTemplate === "Application and Requests-Exam inspection") {
        return (
          <div className="d-flex justify-content-end">
            <button
              className="py-1 px-3 rounded-pill btn btn-danger"
              onClick={() => handleInquiryClose(selectedTicket?._id)}
            >
              Close
            </button>
          </div>
        );
      }

      if (
        contentTemplate === "Application and Requests-Enrollment Certificate"
      ) {
        // generate pdf button
        return (
          <div className="d-flex justify-content-end">
            <button
              className="py-2 px-3  mx-4 rounded-pill btn btn-secondary"
              onClick={() => handlePreviewCredentialPDF()}
              disabled={previewLoading}
            >
              {previewLoading ? (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center"
                  }}
                >
                  <BeatLoader color="white" size={10} />
                </div>
              ) : (
                <span>Preview PDF</span>
              )}
            </button>
            <button
              className="py-2 px-3 rounded-pill btn btn-primary"
              onClick={() => handleCheckEnrollment()}
            >
              Generate PDF
            </button>
          </div>
        );
      } else {
        // close button
        return (
          <div className="d-flex justify-content-end">
            <button
              className="py-1 px-3 rounded-pill btn btn-danger"
              onClick={() => handleExamInspectionCloseModalShow()}
            >
              Close
            </button>
          </div>
        );
      }
    }
  };

  const BtnUpperContent = ({ contentTemplate }) => {
    // first check permission
    let _permission = "";
    if (userPermissionCategory === "all") {
      _permission = "Responsible";
    } else if (
      userPermissionCategory &&
      contentTemplate &&
      userPermissionCategory[contentTemplate]
    ) {
      _permission = userPermissionCategory[contentTemplate];
    }

    if (_permission === "Passive") {
      return (
        <div>
          <button
            type="button"
            className="btn btn-info"
            onClick={(evt) => setInternalNoteModalShow(true)}
          >
            Add internal note
          </button>
        </div>
      );
    }

    if (_permission === "Active" || _permission === "Responsible") {
      return (
        <div className="d-flex flex-row flex-wrap">
          <button
            type="button"
            className="btn btn-primary"
            onClick={(evt) => setReplyStudentModalShow(true)}
          >
            Reply to the student
          </button>
          <button
            type="button"
            className="btn btn-info ms-2"
            onClick={(evt) => setInternalNoteModalShow(true)}
          >
            Add internal note
          </button>
          <button
            type="button"
            className="btn btn-secondary ms-2"
            onClick={(evt) => setPassToAnotherDepartmentModalShow(true)}
          >
            Pass to another department
          </button>
        </div>
      );
    }

    return;
  };

  const BtnUpperContentForStudent = () => (
    <>
      <button
        type="button"
        className="btn btn-primary"
        onClick={(evt) => setReplyStudentModalShow(true)}
      >
        Reply to the support
      </button>
      <button
        type="button"
        className="btn btn-secondary ms-2"
        onClick={(evt) => setPassToAnotherDepartmentModalShow(true)}
      >
        Forward Ticket
      </button>
    </>
  );

  let userData = localStorage.getItem("userData");
  userData = JSON.parse(userData);
  let userRole = "";
  let enrollmentNumber = "";
  if (userData) {
    userRole = userData?.role;
    enrollmentNumber = userData?.enrollmentNumber;
  }

  const handleShowNewTickets = () => {
    setActiveTab("All");
    setTicketId("");
    setSelectedTicket("");
    setShowTicketDetail(false);

    setFirstYearOfStudy("all");
    setSelectedItems([{ label: "Select All Category", value: "0" }]);

    getAllInquiries();
    getAllInquiriesByEnrollmentNumber();

    context.setAppContentFullHeight(true);
    context.setAppContentClass("py-3 px-1 px-md-5");

    return function cleanUp() {
      context.setAppContentFullHeight(false);
      context.setAppContentClass("");
    };
  };

  const getAllInquiries = async () => {
    if (userRole == 2) {
      return;
    }

    try {
      setLoading(true);
      const res = await FormService.getAllInquiries();

      if (res?.inquiries) {
        let result = res.inquiries.reverse();

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
        const unClickedCloseTickets = result.filter(
          (ticket) => ticket.status === 7
        );

        setUnClickedNewTicketsCount(unClickedNewTickets.length);
        setUnClickedApprovedTicketsCount(unClickedApprovedTickets.length);
        setUnClickedRejectTicketsCount(unClickedRejectTickets.length);
        setUnClickedClosedTicketCount(unClickedCloseTickets.length);

        setTicketData(newTickets);
        setOriginalTicketData(newTickets);
        setTicketsByYear(newTickets);
        setLoading(false);
        // setSelectedTicket(newTickets[0]?._id);
        if (res.userCategory === "SuperAdmin") {
          setUserPermissonCategory("all");
        } else {
          let _permissionCategory = {};
          res.userCategory.map((log) => {
            const key =
              log.inquiryCategory +
              (log.subCategory1 ? `-${log.subCategory1}` : "");
            const value = log.permission;
            _permissionCategory[key] = value;
          });
          setUserPermissonCategory(_permissionCategory);
        }
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

      if (userRole !== 2 || !enrollmentNumber) {
        return;
      }
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
      const unClickedCloseTickets = newTickets.filter(
        (ticket) => ticket.isClicked === 0 && ticket.status === 7
      );

      setUnClickedNewTicketsCount(unClickedNewTickets.length);
      setUnClickedApprovedTicketsCount(unClickedApprovedTickets.length);
      setUnClickedRejectTicketsCount(unClickedRejectTickets.length);
      setUnClickedClosedTicketCount(unClickedCloseTickets.length);

      setTicketData(newTickets);
      setOriginalTicketData(newTickets);
      setTicketsByYear(newTickets);
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
    // initialize selected internal data
    setSelectedInternalMessage();

    const updatedTickets = ticketData.map((ticket) =>
      ticket._id === ticket_id && userRole != 2
        ? { ...ticket, isClicked: 1 }
        : ticket
    );
    setTicketData(updatedTickets);
    setOriginalTicketData(updatedTickets);
    setTicketsByYear(updatedTickets);
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
        if (
          res?.inquiry?.status == 7 &&
          res?.inquiry?.isClicked == 1 &&
          res?.isOriginalClicked == false &&
          unClickedCloseTicketsCount >= 1
        ) {
          setUnClickedClosedTicketCount(unClickedCloseTicketsCount - 1);
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
        setTicketData(filteredAllTickets);
        setOriginalTicketData(filteredAllTickets);
        setTicketsByYear(filteredAllTickets);

        setFirstYearOfStudy("all");
        setSelectedItems([{ label: "Select All Category", value: "0" }]);
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
        allTickets.reverse();
        const filteredAllTickets = allTickets.filter(
          (ticket) =>
            ticket.status === 2 ||
            ticket.status === 5 ||
            ticket.status === 6 ||
            ticket.status === 7
        );
        setTicketData(filteredAllTickets);
        setOriginalTicketData(filteredAllTickets);
        setTicketsByYear(filteredAllTickets);

        setFirstYearOfStudy("all");
        setSelectedItems([{ label: "Select All Category", value: "0" }]);
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

        allTickets.inquiries.reverse();
        const filteredAllTickets = allTickets.inquiries.filter(
          (ticket) => ticket.status === 3
        );

        setTicketData(filteredAllTickets);
        setOriginalTicketData(filteredAllTickets);
        setTicketsByYear(filteredAllTickets);

        setFirstYearOfStudy("all");
        setSelectedItems([{ label: "Select All Category", value: "0" }]);
        setLoading(false);
      } catch (err) {
        setLoading(false);
      }
    } else {
      try {
        const allTickets = await FormService.getAllInquiriesByEnrollmentNumber(
          enrollmentNumber
        );
        allTickets.reverse();
        const filteredAllTickets = allTickets.filter(
          (ticket) => ticket.status === 3
        );

        setTicketData(filteredAllTickets);
        setOriginalTicketData(filteredAllTickets);
        setTicketsByYear(filteredAllTickets);

        setFirstYearOfStudy("all");
        setSelectedItems([{ label: "Select All Category", value: "0" }]);
      } catch (err) {
        setLoading(false);
      }
    }
    setLoading(false);
  };

  const handleShowClosedTickets = async () => {
    setLoading(true);
    setActiveTab("Closed");
    setSelectedTicket("");
    setShowTicketDetail(false);
    setTicketId("");
    if (userRole != 2) {
      try {
        const allTickets = await FormService.getAllInquiries();

        allTickets.inquiries.reverse();
        const filteredAllTickets = allTickets.inquiries.filter(
          (ticket) => ticket.status === 7
        );

        setTicketData(filteredAllTickets);
        setOriginalTicketData(filteredAllTickets);
        setTicketsByYear(filteredAllTickets);

        setFirstYearOfStudy("all");
        setSelectedItems([{ label: "Select All Category", value: "0" }]);
        setLoading(false);
      } catch (err) {
        setLoading(false);
      }
    } else {
      try {
        const allTickets = await FormService.getAllInquiriesByEnrollmentNumber(
          enrollmentNumber
        );
        allTickets.reverse();
        const filteredAllTickets = allTickets.filter(
          (ticket) => ticket.status === 7
        );

        setTicketData(filteredAllTickets);
        setOriginalTicketData(filteredAllTickets);
        setTicketsByYear(filteredAllTickets);

        setFirstYearOfStudy("all");
        setSelectedItems([{ label: "Select All Category", value: "0" }]);
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
      if (userRole !== 2) {
        // admin
        const fileUrl = host + attachment.url;
        const fileName = attachment.filename;
        handleDownload(fileUrl, fileName);

        if (attachment.translatedFileUrl) {
          const fileUrl = host + attachment.translatedFileUrl;
          const fileName = attachment.translatedFileName;
          handleDownload(fileUrl, fileName);
        }
      } else {
        // student
        const fileUrl = host + attachment.url;
        const fileName = attachment.filename;
        handleDownload(fileUrl, fileName);
      }
    });
  };

  const handleInquiryAccept = (id) => {
    if (
      contentTemplate ==
      `${selectedTicket.inquiryCategory}-Transcript to Targu Mures`
    ) {
      setTarguModalShow(true);
    } else {
      handleModalShow(true);
    }
    setActionBtnType("accept");
  };

  const handleInquiryReject = (id) => {
    handleModalShow(true);
    setActionBtnType("reject");
  };

  const handleInquiryClose = (id) => {
    handleModalShow(true);
    setActionBtnType("close");
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

  const filterByExam = (_data, _name, _value) => {
    if (_value !== "" && _value !== "all") {
      _data = _data.filter((log) => log.details[_name] == _value);
    }
    return _data;
  };

  const filterByYear = (_data, _value) => {
    if (_value !== "all") {
      _data = _data.filter((log) => log.firstYearOfStudy == _value);
    }
    return _data;
  };

  const handleFilterChange = (evt) => {
    const { name, value } = evt.target;
    if (name == "firstYearOfStudy") {
      setFirstYearOfStudy(value);
    } else {
      setExamFilter((prev) => ({
        ...prev,
        [name]: value
      }));
    }

    let _ticketData = ticketsByYear;

    switch (name) {
      case "firstYearOfStudy":
        _ticketData = filterByYear(_ticketData, value);
        _ticketData = filterByExam(_ticketData, "subject", examFilter.subject);
        _ticketData = filterByExam(
          _ticketData,
          "examSpecification",
          examFilter.examSpecification
        );
        break;
      case "subject":
        _ticketData = filterByExam(_ticketData, "subject", value);
        _ticketData = filterByYear(_ticketData, firstYearOfStudy);
        _ticketData = filterByExam(
          _ticketData,
          "examSpecification",
          examFilter.examSpecification
        );
        break;
      case "examSpecification":
        _ticketData = filterByExam(_ticketData, "examSpecification", value);
        _ticketData = filterByYear(_ticketData, firstYearOfStudy);
        _ticketData = filterByExam(_ticketData, "subject", examFilter.subject);
        break;
      default:
        break;
    }

    setTicketData(_ticketData);
  };

  const openExportExcelConfirmModal = () => {
    setShowExcelExportModal(true);
    const _filter_options =
      new Date().toDateString() +
      (selectedItems?.label
        ? `-${selectedItems.label?.replaceAll(" ", "_")}`
        : "") +
      (firstYearOfStudy !== "all" ? `-${firstYearOfStudy}` : "-all_Year") +
      (examFilter.subject
        ? `-${examFilter.subject?.replaceAll(" ", "_")}`
        : "") +
      (examFilter.examSpecification
        ? `-${examFilter.examSpecification?.replaceAll(" ", "_")}`
        : "");
    setExcelFileName(_filter_options);
  };

  const exportData = () => {
    const _ticketData = ticketData.map((log, idx) => {
      const _res = {
        No: idx + 1,
        name: log.firstName + " " + log.lastName,
        email: log.email,
        enrollmentNumber: log?.enrollmentNumber,
        firstYearOfStudy: log?.firstYearOfStudy,
        inquiryCategory: log.inquiryCategory,
        category: log.subCategory1,
        detail: log.detail ? log.detail : "",
        documents: log.documents,
        agreement: log.agreement,
        viewed: log.status ? "viewed" : "no viewed",
        createdAt: log.createdAt,
        inquiryNumber: log.inquiryNumber
      };

      if (log.details.subject && log.details.examSpecification) {
        _res.subject = log.details.subject;
        _res.examSpecification = log.details.examSpecification;
        _res.examDate = log.details.examDate;
      }
      if (log.details.comment) {
        _res.detailComment = log.details.comment;
      }

      return _res;
    });
    // Create a worksheet from the data
    const worksheet = XLSX.utils.json_to_sheet(_ticketData);

    // Create a new workbook and append the worksheet
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

    // Write the workbook and trigger a download
    XLSX.writeFile(workbook, `${excelFileName}.xlsx`);

    setShowExcelExportModal(false);
  };

  const handleClickInternalMessage = (_internalData, _ticketData) => {
    setTicketId(_ticketData?._id);
    setSelectedInternalMessage({
      internalData: _internalData,
      ticketData: _ticketData
    });
  };

  const FormatTicketDataForInternalNote = ({ ticket }) => {
    // add internal note - internalNotes
    const _internalNote = internalNotes.filter(
      (log) => log.inquiry?._id === ticket?._id
    );

    return (
      <>
        {_internalNote &&
          _internalNote.length > 0 &&
          _internalNote.map((log, idx) => (
            <div
              key={idx}
              className="mailbox-message p-3 bg-gradient-light"
              style={{ cursor: "pointer" }}
              onClick={(evt) => handleClickInternalMessage(log, ticket)}
            >
              <div className="mailbox-sender">
                <span className="mailbox-sender-name mb-2 pb-1 border border-0 border-bottom">
                  Internal Note
                </span>
              </div>
              <div>
                Ticket Number:{" "}
                <span className="fw-bold">{ticket.inquiryNumber}</span>
              </div>
              <div>
                Creator: {log.user.firstName} {log.user.lastName}
              </div>
              <div>Creator Position: {POSITIONNAMES[log.user.position]}</div>
              <div>
                Created Time: {moment(log.createdAt).format("DD-MM-YYYY")};
              </div>
            </div>
          ))}
      </>
    );
  };

  const FormatTicketDataForReplyStudent = ({ ticket }) => {
    // add reply student
    const _replyStudent = replyStudentMessage.filter(
      (log) => log.inquiry?._id === ticket?._id
    );
    return (
      <>
        {_replyStudent &&
          _replyStudent.length > 0 &&
          _replyStudent.map((log, idx) => (
            <div
              key={idx}
              className={`mailbox-message p-3 text-white ${log.user?.role !== 2
                ? "bg-gradient-gray-600"
                : "bg-gradient-teal"
                }`}
              style={{ cursor: "pointer" }}
              onClick={(evt) => handleClickInternalMessage(log, ticket)}
            >
              <div className="mailbox-sender">
                <span className="mailbox-sender-name mb-2 pb-1 border border-0 border-white border-bottom">
                  {log.user?.role !== 2
                    ? "Reply Message to Student"
                    : "Reply Message to Support"}
                </span>
              </div>
              <div>
                Ticket Number:{" "}
                <span className="fw-bold">{ticket.inquiryNumber}</span>
              </div>
              {log.user && log.user.role !== 2 && (
                <>
                  <div>
                    Creator: {log.user.firstName} {log.user.lastName}
                  </div>
                  <div>Position: {POSITIONNAMES[log.user.position]}</div>
                </>
              )}
              <div>
                Created Time: {moment(log.createdAt).format("DD-MM-YYYY")};
              </div>
            </div>
          ))}
      </>
    );
  };

  const InternalMessageContainer = () => {
    if (!selectedInternalMessage) {
      return <></>;
    } else {
      const { internalData, ticketData } = selectedInternalMessage;
      let title;

      if (internalData.state !== "internalNote") {
        title =
          internalData.user.role === 2
            ? "Reply Message to Support"
            : "Reply Message to Student";
      } else {
        title = "Internal Note";
      }

      const header = title + ` for ${ticketData.inquiryNumber} Ticket`;
      return (
        <div className="p-4">
          <p className="fw-bold">{header}</p>
          <hr />
          <p className="fw-bold">Ticket Information</p>
          <p>Category: {ticketData.inquiryCategory}</p>
          <p>Subcategory: {ticketData.subCategory1}</p>
          <p>
            Student Name: {ticketData.firstName} {ticketData.lastName}
          </p>
          <p>
            Student Enrollment Number: {ticketData.firstName}{" "}
            {ticketData.enrollmentNumber}
          </p>
          <hr />
          <p className="fw-bold">{title} - Information</p>
          {internalData.user.role !== 2 && (
            <>
              <p>
                Creator: {internalData.user.firstName}{" "}
                {internalData.user.lastName}
              </p>
              <p>Position: {POSITIONNAMES[internalData.user.position]}</p>
            </>
          )}
          <p>
            Created Time: {moment(internalData.createdAt).format("DD-MM-YYYY")}
          </p>
          <p>Content:</p>
          <p>{internalData.content}</p>
        </div>
      );
    }
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
              className={`d-flex mailbox-toolbar-link ${activeTab == "All" && !showTicketDetail ? "active" : ""
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
              className={`d-flex mailbox-toolbar-link ${activeTab == "Approved" && !showTicketDetail ? "active" : ""
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
              className={`d-flex mailbox-toolbar-link ${activeTab == "Rejected" && !showTicketDetail ? "active" : ""
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
            <Link
              onClick={handleShowClosedTickets}
              className={`d-flex mailbox-toolbar-link ${activeTab == "Closed" && !showTicketDetail ? "active" : ""
                } `}
            >
              Closed
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
                  {unClickedCloseTicketsCount}
                </Badge>
              )}
            </Link>
          </div>
          {userData?.role !== 2 && (
            <div className="mailbox-toolbar-item">
              <button
                className="mailbox-toolbar-link btn-info btn text-white"
                onClick={openExportExcelConfirmModal}
              >
                Export
              </button>
            </div>
          )}

          <div className="mailbox-toolbar-item">
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
            {userData?.role != 2 && (
              <div>
                <Row>
                  <Col lg={12}>
                    <Form.Group controlId="emailTemplateTitle" className="">
                      <Select
                        options={formatOptions(categoryData)}
                        value={selectedItems}
                        onChange={handleSelectChange}
                        isMulti={false}
                        closeMenuOnSelect={true}
                        hideSelectedOptions={false}
                        menuPosition="fixed"
                        styles={customStyles}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col md={12}>
                    <Form.Group className="mt-3">
                      <Form.Select
                        required
                        name="firstYearOfStudy"
                        value={firstYearOfStudy}
                        className="custom-input"
                        placeholder="Select First Study Year"
                        onChange={handleFilterChange}
                      >
                        <option value="all">Select First Study Year</option>
                        <option value="2024">2024</option>
                        <option value="2023">2023</option>
                        <option value="2022">2022</option>
                        <option value="2021">2021</option>
                        <option value="2020">2020</option>
                        <option value="2019">2019</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                </Row>
                {selectedItems.label === "Exam inspection" && (
                  <>
                    <Row>
                      <Col md={12}>
                        <Form.Group className="mt-3">
                          <Form.Control
                            as="select"
                            name="subject"
                            value={examFilter.subject}
                            onChange={handleFilterChange}
                            className="custom-input"
                          >
                            <option value="" disabled>
                              Select Subject
                            </option>
                            <option value="all">--All--</option>
                            <option></option>
                            <optgroup label="1st year of study">
                              <option disabled=""></option>
                              <option value="Anatomy 1">Anatomy 1</option>
                              <option value="Anatomy 2">Anatomy 2</option>
                              <option value="BioChemistry 1">
                                BioChemistry 1
                              </option>
                              <option value="Biochemistry 2">
                                BioChemistry 2
                              </option>
                              <option value="Biophysics">Biophysics</option>
                              <option value="Medical Informatics">
                                Medical Informatics
                              </option>
                              <option value="Medical Biostatistics">
                                Medical Biostatistics
                              </option>
                              <option value="Molecular and Cell Biology">
                                Molecular and Cell Biology
                              </option>
                              <option value="Medical Terminology">
                                Medical Terminology
                              </option>
                              <option value="Physiology 1">Physiology 1</option>
                              <option value="Romanian Cultural Studies 1.1">
                                Romanian Cultural Studies 1.1
                              </option>
                              <option value="Romanian Cultural Studies 1.2">
                                Romanian Cultural Studies 1.2
                              </option>
                            </optgroup>
                            <option disabled=""></option>
                            <optgroup label="2nd year of study">
                              <option disabled=""></option>
                              <option value="Physiology 2">Physiology 2</option>
                              <option value="Physiology 3">Physiology 3</option>
                              <option value="Histology 1">Histology 1</option>
                              <option value="Histology 2">Histology 2</option>
                              <option value="Anatomy 3">Anatomy 3</option>
                              <option value="Patient Doctor Communication">
                                Patient Doctor Communication
                              </option>
                              <option value="Medical Deontology Bioethics">
                                Medical Deontology Bioethics
                              </option>
                              <option value="Genetics">Genetics</option>
                              <option value="Introduction in Practical Work">
                                Introduction in Practical Work
                              </option>
                              <option value="First Aid">First Aid</option>
                              <option value="Romanian Cultural Strudies 2.1">
                                Romanian Cultural Strudies 2.1
                              </option>
                              <option value="Romanian Cultural Strudies 2.2">
                                Romanian Cultural Strudies 2.2
                              </option>
                            </optgroup>
                            <option disabled=""></option>
                            <optgroup label="3rd year of study">
                              <option disabled=""></option>
                              <option value="Pathology 1">Pathology 1</option>
                              <option value="Pathology 2">Pathology 2</option>
                              <option value="Pharmacology 1">
                                Pharmacology 1
                              </option>
                              <option value="Pharmacology 2">
                                Pharmacology 2
                              </option>
                              <option value="Scientific Research Methodology">
                                Scientific Research Methodology
                              </option>
                              <option value="Pathophysiology 1">
                                Pathophysiology 1
                              </option>
                              <option value="Pathophysiology 2">
                                Pathophysiology 2
                              </option>
                              <option value="Medical Semiology 1">
                                Medical Semiology 1
                              </option>
                              <option value="Medical Semiology 2">
                                Medical Semiology 2
                              </option>
                              <option value="Surgical Semiology 1">
                                Surgical Semiology 1
                              </option>
                              <option value="Surgical Semiology 2">
                                Surgical Semiology 2
                              </option>
                              <option value="Bacteriology. Virusology. Parasitology 1">
                                Bacteriology. Virusology. Parasitology 1
                              </option>
                              <option value="Bacteriology. Virusology. Parasitology 2">
                                Bacteriology. Virusology. Parasitology 2
                              </option>
                              <option value="Hygiene, Environmental Health and Food Safety">
                                Hygiene, Environmental Health and Food Safety
                              </option>
                              <option value="Clinical Biochemistry. Immunology">
                                Clinical Biochemistry. Immunology
                              </option>
                            </optgroup>
                            <option disabled=""></option>
                            <optgroup label="4th year of study">
                              <option disabled=""></option>
                              <option value="Orthopedics and Traumatology">
                                Orthopedics and Traumatology
                              </option>
                              <option value="General Surgery">
                                General Surgery
                              </option>
                              <option value="Urology">Urology</option>
                              <option value="Endocrinology">
                                Endocrinology
                              </option>
                              <option value="Pediatric Surgery. Pediatric Orthopedics">
                                Pediatric Surgery. Pediatric Orthopedics
                              </option>
                              <option value="Plastic, Esthetics and Reconstructive Microsurgery">
                                Plastic, Esthetics and Reconstructive
                                Microsurgery
                              </option>
                              <option value="Cardiology-Internal medicine">
                                Cardiology-Internal medicine
                              </option>
                              <option value="Hematology-Internal medicine">
                                Hematology-Internal medicine
                              </option>
                              <option value="Emergency medicine">
                                Emergency medicine
                              </option>
                              <option value="Child Care">Child Care</option>
                              <option value="Radiology and medical imaging">
                                Radiology and medical imaging
                              </option>
                              <option value="Occupational medicine and professional diseases">
                                Occupational medicine and professional diseases
                              </option>
                              <option value="Oral-maxillo-facial Surgery">
                                Oral-maxillo-facial Surgery
                              </option>
                            </optgroup>
                            <option disabled=""></option>
                            <optgroup label="5th year of study">
                              <option disabled=""></option>
                              <option value="Gastroenterology-Internal medicine">
                                Gastroenterology-Internal medicine
                              </option>
                              <option value="Nephrology-Internal medicine">
                                Nephrology-Internal medicine
                              </option>
                              <option value="Diabetology and Nutritional Diseases-Internal medicine">
                                Diabetology and Nutritional Diseases-Internal
                                medicine
                              </option>
                              <option value="ENT (Ear Nose Throat)">
                                ENT (Ear Nose Throat)
                              </option>
                              <option value="Ophthalmology">
                                Ophthalmology
                              </option>
                              <option value="Anesthesia-Intensive Care">
                                Anesthesia-Intensive Care
                              </option>
                              <option value="Rheumatology">Rheumatology</option>
                              <option value="Rehabilitation, Physical Medicine and Balneology">
                                Rehabilitation, Physical Medicine and Balneology
                              </option>
                              <option value="Dermatology">Dermatology</option>
                              <option value="Neurology">Neurology</option>
                              <option value="Pediatrics">Pediatrics</option>
                              <option value="Pneumology">Pneumology</option>
                              <option value="Medical Oncology">
                                Medical Oncology
                              </option>
                              <option value="Pediatric Psychiatry">
                                Pediatric Psychiatry
                              </option>
                            </optgroup>
                            <option disabled=""></option>
                            <optgroup label="6th year of study">
                              <option disabled=""></option>
                              <option value="Obstetrics-Gynecology. Neonatology">
                                Obstetrics-Gynecology. Neonatology
                              </option>
                              <option value="Infectious Diseases">
                                Infectious Diseases
                              </option>
                              <option value="Family medicine">
                                Family medicine
                              </option>
                              <option value="Public Health">
                                Public Health
                              </option>
                              <option value="Health Management">
                                Health Management
                              </option>
                              <option value="Primary Care">Primary Care</option>
                              <option value="Palliative Care">
                                Palliative Care
                              </option>
                              <option value="Epidemiology">Epidemiology</option>
                              <option value="Psychiatry">Psychiatry</option>
                              <option value="Forensic Medicine">
                                Forensic Medicine
                              </option>
                            </optgroup>
                          </Form.Control>
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={12}>
                        <Form.Group className="mt-3">
                          <Form.Select
                            required
                            name="examSpecification"
                            value={examFilter.examSpecification}
                            className="custom-input"
                            onChange={handleFilterChange}
                          >
                            <option value="" disabled>
                              Select Specification of exam
                            </option>
                            <option value="all">--All--</option>
                            <option value="PA exam">PA exam</option>
                            <option value="PA re-exam">PA re-exam</option>
                            <option value="PA re-re-exam">PA re-re-exam</option>
                            <option value="Written exam">Written exam</option>
                            <option value="Written Re-exam">
                              Written Re-exam
                            </option>
                            <option value="Written Re-re-exam">
                              Written Re-re-exam
                            </option>
                            <option value="OSCE">OSCE</option>
                            <option value="Re-OSCE">Re-OSCE</option>
                          </Form.Select>
                        </Form.Group>
                      </Col>
                    </Row>
                  </>
                )}
              </div>
            )}
            <PerfectScrollbar
              className="h-100  pb-100"
              options={{ suppressScrollX: true }}
            >
              <div
                className={
                  userData?.role == 2 ? "mailbox-list-student" : "mailbox-list"
                }
              >
                {ticketData && ticketData.length > 0 ? (
                  ticketData.map((ticket, index) => (
                    <div key={index}>
                      <div
                        className={
                          userData?.role == 2
                            ? "mailbox-list-item border-bottom" +
                            (ticket?.documents ? " has-attachment " : "")
                            : "mailbox-list-item border-bottom" +
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
                          onClick={(evt) => handleSelectTicket(ticket?._id)}
                          style={{ cursor: "pointer" }}
                        >
                          <div className="mailbox-sender">
                            <span className="mailbox-sender-name">
                              {ticket.subCategory1}
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
                            {ticket.inquiryCategory}
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
                                  <div className="d-flex align-items-center justify-content-between">
                                    <span>
                                      Ticket Number: {ticket?.inquiryNumber}
                                    </span>

                                    <Badge
                                      style={{
                                        fontSize: "14px",
                                        fontWeight: "300"
                                      }}
                                      bg="primary"
                                    >
                                      Viewed
                                    </Badge>
                                  </div>
                                ) : (
                                  <div className="d-flex align-items-center justify-content-between">
                                    Ticket Number: {ticket?.inquiryNumber}
                                    <Badge
                                      style={{
                                        fontSize: "14px",
                                        fontWeight: "300"
                                      }}
                                      bg="danger"
                                    >
                                      Not Viewed
                                    </Badge>
                                  </div>
                                )}
                              </>
                            ) : ticket?.isClicked ? (
                              <div className="d-flex align-items-center justify-content-between">
                                <span>
                                  {" "}
                                  Ticket Number: {ticket?.inquiryNumber}
                                </span>

                                <Badge
                                  style={{
                                    fontSize: "14px",
                                    fontWeight: "300"
                                  }}
                                  bg="primary"
                                >
                                  Viewed
                                </Badge>
                              </div>
                            ) : (
                              <div className="d-flex align-items-center justify-content-between">
                                Ticket Number: {ticket?.inquiryNumber}
                                <Badge
                                  style={{
                                    fontSize: "14px",
                                    fontWeight: "300"
                                  }}
                                  bg="danger"
                                >
                                  Not Viewed
                                </Badge>
                              </div>
                            )
                          ) : ticket.isClicked == 1 ? (
                            <div className="d-flex align-items-center justify-content-between mt-2">
                              <span>
                                Ticket Number: {ticket?.inquiryNumber}
                              </span>

                              <Badge
                                style={{
                                  fontSize: "14px",
                                  fontWeight: "300"
                                }}
                                bg="primary"
                              >
                                Viewed
                              </Badge>
                            </div>
                          ) : (
                            <div className="d-flex align-items-center justify-content-between mt-2">
                              Ticket Number: {ticket?.inquiryNumber}
                              <Badge
                                style={{
                                  fontSize: "14px",
                                  fontWeight: "300"
                                }}
                                bg="danger"
                              >
                                Not Viewed
                              </Badge>
                            </div>
                          )}
                        </div>
                      </div>
                      <FormatTicketDataForInternalNote ticket={ticket} />
                      <FormatTicketDataForReplyStudent ticket={ticket} />
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
            {!selectedInternalMessage &&
              (loading ? (
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
                      {userRole !== 2 && (
                        <div className="mailbox-detail-header external-btn-container">
                          <BtnUpperContent contentTemplate={contentTemplate} />
                        </div>
                      )}
                      {userRole === 2 && (
                        <div className="mailbox-detail-header external-btn-container">
                          <BtnUpperContentForStudent />
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
                            {selectedTicket?.subCategory1
                              ? selectedTicket?.subCategory1
                              : selectedTicket?.inquiryCategory}{" "}
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
                                  <div className="d-flex">
                                    {/* show original file */}
                                    <a
                                      className="me-5 border border-1 rounded-1"
                                      onClick={(e) => {
                                        const fileUrl = host + attachment?.url;
                                        const fileName = attachment?.filename;
                                        handleDownload(fileUrl, fileName);
                                      }}
                                    >
                                      <div className="document-file">
                                        <i className="fa fa-file-archive"></i>
                                      </div>
                                      <div className="document-name">
                                        {attachment.filename}
                                      </div>
                                    </a>
                                    {/* admin and translation exist */}
                                    {userRole !== 2 &&
                                      attachment.translatedFileName && (
                                        <a
                                          className="border border-1 rounded-1"
                                          onClick={(e) => {
                                            const fileUrl =
                                              host +
                                              attachment.translatedFileUrl;
                                            const fileName =
                                              attachment.translatedFileName;
                                            handleDownload(fileUrl, fileName);
                                          }}
                                        >
                                          <div className="document-file">
                                            <i className="fa fa-file-archive"></i>
                                          </div>
                                          <div className="document-name">
                                            {attachment.translatedFileName}
                                          </div>
                                        </a>
                                      )}
                                  </div>
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
                          {renderContentTemplate()}
                          <div className="mt-5">
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
                            Enrollment Number:{" "}
                            {selectedTicket?.enrollmentNumber}
                          </p>
                          <br />
                        </div>
                      </div>
                      {userRole != 2 && (
                        <div
                          style={{
                            position: "sticky",
                            bottom: "10px",
                            backgroundColor: "white",
                            paddingBottom: "10px"
                          }}
                        >
                          <BtnUnderContent contentTemplate={contentTemplate} />
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
              ))}
            <InternalMessageContainer />
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
          setUnClickedApprovedTicketsCount={setUnClickedApprovedTicketsCount}
          setUnClickedRejectTicketsCount={setUnClickedRejectTicketsCount}
          setUnClickedClosedTicketCount={setUnClickedClosedTicketCount}
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
          unClickedCloseTicketsCount={unClickedCloseTicketsCount}
          setUnClickedClosedTicketCount={setUnClickedClosedTicketCount}
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
          unClickedCloseTicketsCount={unClickedCloseTicketsCount}
          setUnClickedClosedTicketCount={setUnClickedClosedTicketCount}
        />
      )}
      {examInspectionModalShow && (
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
          unClickedCloseTicketsCount={unClickedCloseTicketsCount}
          setUnClickedClosedTicketCount={setUnClickedClosedTicketCount}
        />
      )}

      <PassToAnotherDepartmentModal
        show={passToAnotherDepartmentModalShow}
        handleModalClose={handlePassToAnotherDepartmentModalClose}
        selectedTicket={selectedTicket}
        userRole={userRole}
      />

      <InternalNoteModal
        show={internalNoteModalShow}
        handleModalClose={handleInterlNoteModalClose}
        selectedTicket={selectedTicket}
        setTicketStatusChange={setTicketStatusChange}
      />

      <ReplyStudentModal
        show={replyStudentModalShow}
        handleModalClose={handleReplyStudentModalClose}
        selectedTicket={selectedTicket}
        setTicketStatusChange={setTicketStatusChange}
        userRole={userRole}
      />

      <Modal
        show={showExcelExportModal}
        onHide={() => setShowExcelExportModal(false)}
        centered
      >
        <Modal.Header className="h4">
          Are you sure to export this data?
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label>File Name</Form.Label>
            <Form.Control
              value={excelFileName}
              onChange={(evt) => setExcelFileName(evt.target.value)}
            />
          </Form.Group>
          {excelFileName == "" ? (
            <small className="text-danger mt-3">Required field *</small>
          ) : (
            ""
          )}
          <Modal.Footer>
            <button
              onClick={exportData}
              className="me-3 btn btn-secondary"
              disabled={excelFileName == "" ? true : false}
            >
              Confirm
            </button>
            <button
              onClick={() => setShowExcelExportModal(false)}
              className="btn btn-secondary"
            >
              Cancel
            </button>
          </Modal.Footer>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default EmailInbox;
