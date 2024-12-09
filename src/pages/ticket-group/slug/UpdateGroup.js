import React, { useState, useEffect } from "react";
import { Modal, Form, Button } from "react-bootstrap";

import TicketGroupService from "../../../sevices/ticket-group-service";

const UpdateGroup = ({ show, hideModal, setRefetchTicketGroup, successNotify, errorNotify, groupInfo }) => {
    const [ticketData, setTicketData] = useState({
        name: "",
        prefix: ""
    })

    const handleChange = (evt) => {
        const { name, value } = evt.target;
        setTicketData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleConfirm = async () => {
        if (!ticketData.name.trim()) {
            errorNotify("Name field is required!")
            return;
        }
        if (!ticketData.prefix.trim()) {
            errorNotify("Prefix field is required!");
            return;
        }
        if (groupInfo.name === ticketData.name && groupInfo.prefix === ticketData.prefix) {
            errorNotify("Name or prefix should be updated");
            return;
        }

        try {
            let _data;
            if (groupInfo) {
                _data = { id: groupInfo._id, ...ticketData }
            }

            const res = await TicketGroupService.updateTicketGroup(_data);

            if (res.status === 200) {
                successNotify(res.message);
                setRefetchTicketGroup(prev => !prev)
                hideModal();
            }
        } catch (error) {
            console.error("Error updating ticket group", error);
            errorNotify(error.message);
        }
    }

    useEffect(() => {
        if (show) {
            let _initData;
            if (groupInfo) {
                _initData = {
                    name: groupInfo.name,
                    prefix: groupInfo.prefix
                }
            }
            setTicketData(prev => ({
                ...prev,
                ..._initData
            }))
        } else {
            setTicketData({
                name: "",
                prefix: ""
            })
        }
    }, [show, groupInfo])

    return (
        <Modal
            show={show}
            onHide={hideModal}
        >
            <Modal.Header>
                <h4>
                    Edit{` `} Group {groupInfo?.name ? `(${groupInfo.name})` : ""}
                </h4>
            </Modal.Header>
            <Modal.Body>
                <Form.Group>
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        name="name"
                        value={ticketData.name}
                        onChange={handleChange}
                        placeholder="Enter new name"
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
                        placeholder="Enter new prefix"
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

export default UpdateGroup;