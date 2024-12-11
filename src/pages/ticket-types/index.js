import React, { useEffect, useState } from "react";
import { Row, Col, Form } from "react-bootstrap";

import TicketGroupService from "../../sevices/ticket-group-service";

import { TicketTypeList } from "../../globalVariables";
import { toast } from "react-toastify";

import "./index.css"

const TicketTypes = () => {
    const [ticketGroup, setTicketGroup] = useState([]);
    const [allTicketGroup, setAllTicketGroup] = useState([]);
    // const [refetchTypes, setRefetchTypes] = useState(false);
    const [loading, setLoading] = useState(true);

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

    const getAllGroupData = (_registeredGroupData) => {
        let _unRegisteredTicketType = TicketTypeList.map(log => Object.keys(log)[0]);

        _registeredGroupData.map((log, idx) => {
            log.ticketTypes.map((logSec, idx) => {
                const removeIndex = _unRegisteredTicketType.indexOf(logSec);
                _unRegisteredTicketType.splice(removeIndex, 1);
            })
        })

        if (_unRegisteredTicketType.length > 0) {
            const _allTicketGroup = _registeredGroupData.concat({
                name: "",
                ticketTypes: _unRegisteredTicketType
            });
            setAllTicketGroup(_allTicketGroup);
        } else {
            setAllTicketGroup(_registeredGroupData)
        }
    }

    const handleGroupSelect = async (_data) => {
        const { id, name } = _data;
        if (id && name) {
            try {
                const { message } = await TicketGroupService.addTicketTypeToTicketGroup(_data);
                const res = await TicketGroupService.fetchAllTicketGroups();

                setTicketGroup(res.data);
                getAllGroupData(res.data);

                successNotify(message);
            } catch (error) {
                console.log("Error occured on adding type to group", error);
                errorNotify(error.message);
            }
        }
    }

    useEffect(() => {
        const fetchAllTicketGroup = async () => {
            setLoading(true);
            try {
                const res = await TicketGroupService.fetchAllTicketGroups();
                setTicketGroup(res.data);
                getAllGroupData(res.data);

                setLoading(false);
            } catch (error) {
                setLoading(false);
                console.error("Error fetching ticket groups", error);
            }
        };

        fetchAllTicketGroup();
    }, [])

    return (
        <section>
            <h1>Ticket Types</h1>
            {
                loading ? (
                    <h4>Loading...</h4>
                ) : (
                    allTicketGroup?.length > 0 ? (
                        allTicketGroup.sort((a, b) => {
                            if (a.name === "") return 1;
                            if (b.name === "") return -1;
                            return a.name.localeCompare(b.name);
                        }).map((_ticketGroup, idx) => (
                            <div key={idx}>
                                {
                                    _ticketGroup.name ? (
                                        <p className="fw-bold mb-2 mt-3">{_ticketGroup.name}</p>
                                    ) : (
                                        <hr className="mt-md-5 mt-4 fw-bold border-5" />
                                    )
                                }

                                {
                                    _ticketGroup.ticketTypes?.length > 0 ? (
                                        _ticketGroup.ticketTypes.sort().map((log, idxSec) => (
                                            <Row key={idxSec} className="border rounded-1 mb-2">
                                                <Col className="py-2 align-content-center ps-3">
                                                    <span>{log}</span>
                                                </Col>
                                                <Col className="py-2 pe-3 d-flex align-items-center">
                                                    <span className="me-2">TicketGroup:</span>
                                                    <Form.Select
                                                        className="d-inline"
                                                        onChange={(evt) => handleGroupSelect({ id: evt.target.value, name: log })}
                                                        value={_ticketGroup._id ? _ticketGroup._id : ""}
                                                    >
                                                        <option value="">Select Group</option>
                                                        {
                                                            ticketGroup?.length > 0 && (
                                                                ticketGroup.map((_groupLog, idx) => (
                                                                    <option key={idx} value={_groupLog._id}>
                                                                        {_groupLog.name}
                                                                    </option>
                                                                ))
                                                            )
                                                        }
                                                    </Form.Select>
                                                </Col>
                                            </Row>
                                        ))
                                    ) : (
                                        <p>No Ticket Types</p>
                                    )
                                }
                            </div>
                        )
                        )) : (
                        <h4>No Ticket Type Data</h4>
                    )
                )
            }
        </section>
    )
}

export default TicketTypes;