import React, { useState, useEffect } from "react"
import { Button, ButtonToolbar, OverlayTrigger, Popover, Tooltip } from "react-bootstrap";
import { toast } from "react-toastify";

import TicketGroupService from "../../sevices/ticket-group-service";

import CreateGroup from "./slug/CreateGroup"
import UpdateGroup from "./slug/UpdateGroup";

import "./index.css";

const TicketGroup = () => {
    const [createGroupModalShow, setCreateGroupModalShow] = useState(false);
    const [updateGroupModalShow, setupdateGroupModalShow] = useState(false);
    const [allTicketGroup, setAllTicketGroup] = useState([]);
    const [refetchTicketGroup, setRefetchTicketGroup] = useState(false);
    const [seletedTicketGroup, setSelectedTicketGroup] = useState();
    const [loading, setLoading] = useState(true);

    const handleHideCreateGroupModal = () => setCreateGroupModalShow(false);

    const handleHideUpdateGroupModalShow = () => setupdateGroupModalShow(false);

    const handleOpenUpdateGroupModalShow = (_data) => {
        if (_data) {
            setSelectedTicketGroup(_data);
            setupdateGroupModalShow(true);
        }
    }

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

    useEffect(() => {
        const fetchAllTicketGroup = async () => {
            try {
                const res = await TicketGroupService.fetchAllTicketGroups();
                setLoading(false);
                setAllTicketGroup(res.data);
            } catch (error) {
                setLoading(false);
                console.error("Error fetching ticket groups", error);
            }
        };

        fetchAllTicketGroup();
    }, [])

    useEffect(() => {
        const fetchAllTicketGroup = async () => {
            try {
                const res = await TicketGroupService.fetchAllTicketGroups();
                setAllTicketGroup(res.data);
            } catch (error) {
                console.error("Error fetching ticket groups", error);
            }
        };

        fetchAllTicketGroup();
    }, [refetchTicketGroup])

    useEffect(() => {
        if (!updateGroupModalShow) {
            setSelectedTicketGroup();
        }
    }, [updateGroupModalShow])

    const popupDeleteTicket = (prop) => {

        const handleDelete = async () => {
            try {
                const res = await TicketGroupService.deleteTicketGroup({ id: prop._id });
                setRefetchTicketGroup(prev => !prev);
                successNotify(res.message);
            } catch (error) {
                console.log("Error deleting ticket group", error);
                errorNotify(error.message);
            }
        }

        return (
            <Popover>
                <Popover.Header>
                    Delete <span className="text-danger">{prop.name}?</span>
                </Popover.Header>
                <Popover.Body className="text-center">
                    <button
                        className="btn btn-sm btn-primary rounded-2"
                        onClick={() => handleDelete()}
                    >
                        Yes
                    </button>
                    <button className="btn btn-sm btn-danger ms-3 rounded-2">No</button>
                </Popover.Body>
            </Popover>
        )
    }

    const updateTooltop = (
        <Tooltip>
            Update
        </Tooltip>
    )

    return (
        <section>
            <div className="d-flex justify-content-between">
                <h1>Ticket Group</h1>
                <Button
                    type="button" className="btn btn-green"
                    onClick={() => setCreateGroupModalShow(true)}
                >
                    New <span className="d-md-inline d-none">ticket group </span>+
                </Button>
            </div>
            <div className="mt-4">
                {
                    loading ? (
                        <h4>...loading</h4>
                    ) : (
                        allTicketGroup?.length > 0 ? (
                            allTicketGroup.map((log, idx) => (
                                <div key={idx} className="row ticket-group-item border shadow-sm">
                                    <div className="col-lg-9 col-md-7 col-6 text-white text-break py-md-3 py-2 align-content-center">
                                        <span className="ms-3 d-md-inline d-none">
                                            {log.name} (prefix: {log.prefix})
                                        </span>
                                    </div>
                                    <div className="col-lg-3 col-md-5 col-6 py-md-3 py-2">
                                        <ButtonToolbar className="d-flex justify-content-end">
                                            <OverlayTrigger
                                                placement="top"
                                                overlay={updateTooltop}
                                            >
                                                <div
                                                    className="btn btn-green btn-sm ms-2"
                                                    onClick={() => {
                                                        handleOpenUpdateGroupModalShow(log)
                                                    }}
                                                >
                                                    <i className="bi bi-pencil-square"></i>
                                                </div>
                                            </OverlayTrigger>
                                            <OverlayTrigger
                                                trigger="focus"
                                                placement="top"
                                                overlay={popupDeleteTicket(log)}
                                            >
                                                <Button
                                                    className="btn btn-danger btn-sm ms-2"
                                                >
                                                    <i className="bi bi-trash" />
                                                </Button>
                                            </OverlayTrigger>
                                        </ButtonToolbar>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <h4>No Ticket Group Data</h4>
                        )
                    )
                }
            </div>
            <CreateGroup
                show={createGroupModalShow}
                hideModal={handleHideCreateGroupModal}
                setRefetchTicketGroup={setRefetchTicketGroup}
                successNotify={successNotify}
                errorNotify={errorNotify}
            />
            <UpdateGroup
                show={updateGroupModalShow}
                hideModal={handleHideUpdateGroupModalShow}
                setRefetchTicketGroup={setRefetchTicketGroup}
                successNotify={successNotify}
                errorNotify={errorNotify}
                groupInfo={seletedTicketGroup}
            />
        </section>
    )
}

export default TicketGroup;