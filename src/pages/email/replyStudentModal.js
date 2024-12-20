import React, { useState, useEffect } from "react";
import { Modal, Form, Button, ProgressBar } from "react-bootstrap";

import formService from "../../sevices/form-service";
import BeatLoader from "react-spinners/BeatLoader";
import { toast } from "react-toastify";

const ReplyStudentModal = ({
    show,
    handleModalClose,
    selectedTicket,
    setTicketStatusChange,
    userRole
}) => {
    const [mailContent, setMailContent] = useState("");
    const [loading, setLoading] = useState(false);
    const [file, setFile] = useState(null);

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

    const handleFileChange = (evt) => {
        const selectedFile = evt.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
        }
    };

    const handleSendMail = async () => {
        if (!mailContent) {
            return errorNotify("Please input content")
        }

        const temp = {
            selectedTicket: selectedTicket,
            mailContent: mailContent
        }

        const formDataToSend = new FormData();
        for (const key in temp) {
            formDataToSend.append(key, JSON.stringify(temp[key]));
        }
        formDataToSend.append("documents", file)

        setLoading(true);
        try {
            const res = await formService.replyStudent(formDataToSend);
            successNotify(res.message);
            setTicketStatusChange(prev => !prev);
            handleModalClose();
        } catch (error) {
            if (error.message) {
                errorNotify(error.message);
            }
        }
        setLoading(false);
    }

    useEffect(() => {
        if (!show) {
            setMailContent("")
            setFile(null);
        }
    }, [show])

    return (
        <Modal
            show={show}
        >
            <Modal.Header>
                <Modal.Title>{userRole !== 2 ? "Reply To The Student" : "Reply To The Support"}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>{selectedTicket?.inquiryNumber} from {selectedTicket?.firstName} {selectedTicket?.lastName} </p>
                <Form.Group>
                    <Form.Label>Mail Content</Form.Label>
                    <Form.Control
                        as="textarea" rows={5}
                        value={mailContent}
                        onChange={evt => setMailContent(evt.target.value)} />
                </Form.Group>
                {
                    userRole === 2 && (
                        <Form.Group className="mt-3">
                            <Form.Label>Attachment</Form.Label>
                            <Form.Control type="file" onChange={handleFileChange} />
                        </Form.Group>
                    )
                }
            </Modal.Body>
            <Modal.Footer>
                <button className="btn btn-info" onClick={(evt) => handleSendMail()}>
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
                        <span>send </span>
                    )}
                </button>
                <button className="btn btn-success" onClick={handleModalClose}>Close</button>
            </Modal.Footer>
        </Modal>
    )
}

export default ReplyStudentModal;