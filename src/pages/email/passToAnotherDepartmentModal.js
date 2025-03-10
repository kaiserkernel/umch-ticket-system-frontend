import React, { useState, useEffect } from "react";
import { Modal, Row, Col, Form } from "react-bootstrap";
import Select from "react-select";

import formService from "../../sevices/form-service";
import BeatLoader from "react-spinners/BeatLoader";
import { toast } from "react-toastify";

const PassToAnotherDepartmentModal = ({
  show,
  handleModalClose,
  selectedTicket,
  userRole
}) => {

  const [personalMsg, setPersonalMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedMail, setSelectedMail] = useState("");

  useEffect(() => {
    if (!show) {
      setPersonalMsg("");
      setSelectedMail("");
    }
  }, [show])

  const handlePass = async () => {
    const payload = {
      // selectedMail: selectedOptions.value,
      selectedMail: selectedMail,
      personalMsg: personalMsg,
      selectedTicket: selectedTicket
    };
    try {
      setLoading(true);
      const res = await formService.sendPassEmail(payload);
      successNotify(res?.message);
      setLoading(false);
      handleModalClose();
    } catch (err) {
      errorNotify(err?.message);
      setLoading(false);
    }
    setLoading(false);
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

  return (
    <Modal show={show} onHide={handleModalClose}>
      <Modal.Header closeButton>
        <Modal.Title>{userRole !== 2 ? "Pass To Another Department" : "Forward Ticket"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
          <Col lg={12}>
            <Form.Group className="mb-4">
              <Form.Label>Please enter the email address of the person, you want to send this ticket to</Form.Label>
              <Form.Control
                as="input"
                value={selectedMail}
                onChange={evt => setSelectedMail(evt.target.value)}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group>
              <Form.Label>Add a personal message (optional)</Form.Label>
              <Form.Control
                as="textarea" rows={5}
                value={personalMsg}
                onChange={evt => setPersonalMsg(evt.target.value)}
              />
            </Form.Group>
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <div className="d-flex justify-content-end gap-3">
          <a className="btn btn-info" onClick={handlePass}>
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
          </a>
          <a className="btn btn-success" onClick={handleModalClose}>
            Close
          </a>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default PassToAnotherDepartmentModal;
