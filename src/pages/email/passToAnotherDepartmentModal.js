import React, { useState, useEffect } from "react";
import { Modal, Row, Col } from "react-bootstrap";
import Select from "react-select";

import formService from "../../sevices/form-service";
import BeatLoader from "react-spinners/BeatLoader";
import { toast } from "react-toastify";

const PassToAnotherDepartmentModal = ({
  show,
  handleModalClose,
  selectedTicket
}) => {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [adminEmails, setAdminEmails] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getAdminUsers = async () => {
      try {
        const res = await formService.getAdminUsers();
        const adminlist = res.map((user) => ({
          value: user?.email,
          label: user?.email
        }));

        setAdminEmails(adminlist);
      } catch (err) {
        console.log(err);
      }
    };
    getAdminUsers();
  }, []);

  const handlePass = async () => {
    const payload = {
      selectedOptions: selectedOptions,
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
    console.log(selectedOptions);
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
        <Modal.Title>Pass To Another Department</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
          <Col lg={12}>
            {adminEmails && (
              <Select
                isMulti
                options={adminEmails}
                value={selectedOptions}
                closeMenuOnSelect={false}
                hideSelectedOptions={false}
                onChange={setSelectedOptions}
                placeholder="Select Emails"
              />
            )}
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
              <span>Pass </span>
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
