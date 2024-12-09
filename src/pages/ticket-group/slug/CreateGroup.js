import React, { useEffect, useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";

import TicketGroupService from "../../../sevices/ticket-group-service";

const CreateGroup = ({ show, hideModal, setRefetchTicketGroup, successNotify, errorNotify }) => {
    const [ticketData, setTicketData] = useState({
        name: "",
        prefix: ""
    });

    const handleConfirm = async () => {
        // send request
        try {
            const res = await TicketGroupService.createTicketGroup(ticketData);
            successNotify(`Create new Ticket Group: ${ticketData.name}`);
            setRefetchTicketGroup(prev => !prev);
            hideModal();
        } catch (error) {
            console.error("Error creating ticket group", error);
            errorNotify(error.message);
        }

    }

    const handleChange = (evt) => {
        const { name, value } = evt.target;
        setTicketData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    useEffect(() => {
        if (!show) {
            setTicketData({
                name: "",
                prefix: ""
            })
        }
    }, [show])

    return (
        <Modal
            show={show}
            onHide={hideModal}
        >
            <Modal.Header>
                <h4>
                    Create Ticket Group
                </h4>
            </Modal.Header>
            <Modal.Body>
                <Form.Group>
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        name="name"
                        value={ticketData.name}
                        onChange={handleChange}
                        placeholder="New Ticket Type name"
                        onKeyDown={(evt) => {
                            if (evt.key === "Enter") {
                                handleConfirm();
                            }
                        }}
                        autoFocus
                    />
                </Form.Group>
                <Form.Group className="mt-3">
                    <Form.Label>Prefix</Form.Label>
                    <Form.Control
                        name="prefix"
                        value={ticketData.prefix}
                        onChange={handleChange}
                        placeholder="Prefix for New Ticket Type"
                        onKeyDown={(evt) => {
                            if (evt.key === "Enter") {
                                handleConfirm();
                            }
                        }}
                    />
                </Form.Group>
            </Modal.Body>
            <Modal.Footer>
                <Button
                    className="btn btn-success"
                    onClick={handleConfirm}
                >
                    Confirm
                </Button>
                <Button
                    className="btn btn-danger"
                    onClick={hideModal}
                >
                    Cancel
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default CreateGroup;