import React, { useState, useEffect } from "react";
import { Modal, Form } from "react-bootstrap";

import formService from "../../sevices/form-service";
import BeatLoader from "react-spinners/BeatLoader";
import { toast } from "react-toastify";

const InternalNoteModal = ({
    show,
    handleModalClose,
    selectedTicket,
    setTicketStatusChange
}) => {
    const [mailContent, setMailContent] = useState("");
    const [loading, setLoading] = useState(false);

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

    const handleSendMail = async () => {
        if (!mailContent) {
            return errorNotify("Please input content")
        }

        setLoading(true);
        try {
            const res = await formService.sendInternalNote({
                selectedTicket: selectedTicket,
                mailContent: mailContent
            });
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
        }
    }, [show])

    return (
        <Modal
            show={show}
        >
            <Modal.Header>
                <Modal.Title>Internal Note</Modal.Title>
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

export default InternalNoteModal;