import React, { useState, useContext, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Form } from "react-bootstrap";

import Default from "./default";
import Absence from "./absence";
import Campus from "./campus";
import Canvas from "./canvas";
import ChangeStudyGroup from "./change-study-group";
import ChangeTeachingHospital from "./change-teaching-hospital";
import DeanOffice from "./deanOffice";
import DemonstratorStudent from "./demonstrator-student";
import Enrollment from "./enrollment";
import ExamInspection from "./exam-inspection";
import Exam from "./exam";
import GermanTeachingDepartment from "./germanTeachingDepartment";
import OnlineCatalogue from "./onlineCatalogue";
import OnlineCatalogueSolaris from "./online-catalogue";
import Other from "./other";
import RecognitionCourses from "./recognition-courses";
import RecognitionInternship from "./recognition-internship";
import ShortTermBorrowDiploma from "./short-term-borrow-diploma";
import StreamingPanopto from "./streaming-panopto";
import SyllabusAcademicYear from "./syllabus-academic-year";
import Teacher from "./teacher";
import TeachingHospital from "./teachingHospital";
import TranscriptRecords from "./transcript-records";
import TransferTarguMures from "./transfer-targu-mures";
import BookRental from "./book-rental";
import Internship from "./internship";
import MedicalAbilities from "./medical-abilities";
import Thesis from "./thesis";

import { FormContext } from "../index";

// Define animation variants for each collapse effect
const variants = {
    default: {
        hidden: { height: 0, opacity: 0, originY: 0 },
        visible: {
            height: "auto",
            opacity: 1,
            originY: 0,
            transition: { duration: 0.5 }
        }
    },
    0: {
        hidden: { height: 0, opacity: 0, originY: 0 },
        visible: {
            height: "auto",
            opacity: 1,
            originY: 0,
            transition: { duration: 0.5 }
        },
        exit: {
            scaleY: 0,
            opacity: 0,
            originY: 0,
            transition: { duration: 0.5 }
        }
    }
}

const content = {
    "": <Default />,
    Absence: <Absence />,
    Campus: <Campus />,
    Canvas: <Canvas />,
    Changeofstudygroup: <ChangeStudyGroup />,
    Changeofteachinghospital: <ChangeTeachingHospital />,
    "Dean'soffice": <DeanOffice />,
    Demonstratorstudent: <DemonstratorStudent />,
    Enrollment: <Enrollment />,
    Examinspection: <ExamInspection />,
    Exam: <Exam />,
    GermanTeachingDepartment: <GermanTeachingDepartment />,
    "OnlineCatalogue(Carnet)": <OnlineCatalogue />,
    "OnlineCatalogue(Solaris)": <OnlineCatalogueSolaris />,
    Other: <Other />,
    RecongnitionofCourses: <RecognitionCourses />,
    RecognitionofInternship: <RecognitionInternship />,
    ShorttermborrowofDiploma: <ShortTermBorrowDiploma />,
    "Streaming/Panopto": <StreamingPanopto />,
    Syllabusoftheacademicyear: <SyllabusAcademicYear />,
    Teacher: <Teacher />,
    TeachingHospital: <TeachingHospital />,
    TranscriptofRecords: <TranscriptRecords />,
    TransfertoTarguMures: <TransferTarguMures />,
    BookrentalUMCHlibrary: <BookRental />,
    Internship: <Internship />,
    MedicalAbilities: <MedicalAbilities />,
    Thesis: <Thesis />
}

const SelectTypesField = (props) => {
    const { group, groupList } = props;
    const groupInfo = groupList.find(log => log._id === group);

    const { isFormSubmit } = useContext(FormContext);

    const [typeName, setTypeName] = useState("");
    const isFirstRender = useRef(true);
    const [errors, setErrors] = useState({});

    const handleChange = (evt) => {
        setTypeName(evt.target.value);
    }

    const validate = () => {
        const newErrors = {};

        if (!typeName) {
            newErrors.applicationRequest = "Applications and Requests is required";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };


    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false; // Mark the initial render as complete.
            return; // Skip running this effect on initial render.
        }
        if (isFormSubmit != 0) {
            validate();
        }
    }, [isFormSubmit])

    return (
        <div className="mt-md-5 mt-4">
            <h4 className="mb-md-4 mb-3">{groupInfo.name}</h4>
            <Form.Group>
                <Form.Control
                    as="select"
                    style={{
                        appearance: "none", // Hides the default arrow
                        MozAppearance: "none", // For Firefox
                        WebkitAppearance: "none", // For Safari/Chrome
                        backgroundColor: "white",
                        color: "gray !important"
                    }}
                    className="custom-input"
                    name="ticketType"
                    value={typeName}
                    onChange={handleChange}
                >
                    <option value="">- Select Types -</option>
                    {
                        groupInfo.ticketTypes.sort().map((log, idx) => (
                            <option value={log.replaceAll(" ", "")} key={idx}>{log}</option>
                        ))
                    }
                </Form.Control>
                {errors.applicationRequest && (
                    <p className="error-content">{errors.applicationRequest}</p>
                )}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={typeName}
                        initial="hidden"
                        animate="visible"
                        //   exit={selectedEffect === "default" ? "exit" : false}

                        variants={typeName ? variants[0] : variants["default"]}
                    >
                        <div>{content[typeName]}</div>
                    </motion.div>
                </AnimatePresence>
            </Form.Group>
        </div>
    )
}

export default SelectTypesField;