import React, { useEffect, useState } from "react";
import { Row, Col, Form } from "react-bootstrap";

import TicketGroupService from "../../sevices/ticket-group-service";

import { TicketTypeList } from "../../globalVariables";
import { toast } from "react-toastify";

import "./index.css"

const TicketTypes = () => {
    const [ticketGroup, setTicketGroup] = useState([]);
    const [allTicketTypes, setAllTicketTypes] = useState([]);
    const [refetchTypes, setRefetchTypes] = useState(false);
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

    const handleGroupSelect = async (_data) => {
        const { id, name } = _data;
        if (id && name) {
            try {
                const res = await TicketGroupService.addTicketTypeToTicketGroup(_data);
                setRefetchTypes(prev => !prev)
                successNotify(res.message);
            } catch (error) {
                console.log("Error occured on adding type to group", error);
                errorNotify(error.message);
            }
        }
    }

    const fetchAllTicketGroup = async () => {
        setLoading(true);
        try {
            const res = await TicketGroupService.fetchAllTicketGroups();

            setLoading(false);
            setTicketGroup(res.data);

            const registedTypes = await TicketGroupService.fetchAllRegistedTicketTypes();
            const _allTypes = TicketTypeList.map((log) => {
                const key = Object.keys(log)[0];
                const matchingItem = registedTypes.data.find((logSec) => logSec[key] !== undefined);

                return matchingItem || log;
            })
            setAllTicketTypes(_allTypes);

        } catch (error) {
            setLoading(false);
            console.error("Error fetching ticket groups", error);
        }
    };

    useEffect(() => {
        fetchAllTicketGroup();
    }, [])

    useEffect(() => {
        fetchAllTicketGroup();
    }, [refetchTypes])

    return (
        <section>
            <h1>Ticket Types</h1>
            {
                loading ? (
                    <h4>Loading...</h4>
                ) : (
                    allTicketTypes?.length > 0 && (
                        allTicketTypes.map((_ticketLog, idx) => (
                            <Row key={idx} className="border rounded-1 mb-2">
                                <Col className="py-2 align-content-center ps-3">
                                    <span>{Object.keys(_ticketLog)[0]}</span>
                                </Col>
                                <Col className="py-2 pe-3 d-flex align-items-center">
                                    <span className="me-2">TicketGroup:</span>
                                    <Form.Select
                                        className="d-inline"
                                        onChange={(evt) => handleGroupSelect({ id: evt.target.value, name: Object.keys(_ticketLog)[0] })}
                                        value={Object.values(_ticketLog)[0]}
                                    >
                                        <option>Select Group</option>
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
                    )
                )
            }
        </section>
    )
}

export default TicketTypes;