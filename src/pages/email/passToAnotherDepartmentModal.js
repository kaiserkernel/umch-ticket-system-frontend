import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import Select from "react-select";

import formService from "../../sevices/form-service";

const PassToAnotherDepartmentModal = ({ show, handleModalClose }) => {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [adminEmails, setAdminEmails] = useState();

  useEffect(() => {
    const getAdminUsers = async () => {
      try {
        const res = await formService.getAdminUsers();
        let emailList = [];
        const adminlist = res.map((user) => ({
          value: user?.email,
          label: user?.email
        }));
        console.log(adminlist);
        setAdminEmails(adminlist);
      } catch (err) {
        console.log(err);
      }
    };
    getAdminUsers();
  }, []);
  const handlePass = () => {
    console.log(selectedOptions);
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
            Pass
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
