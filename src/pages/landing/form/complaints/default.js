import React, { useState, useEffect, useContext, useRef } from "react";
import { Row, Col, Form } from "react-bootstrap";

import { FormContext } from "../index";
import FormService from "../../../../sevices/form-service";
import { ToastContainer, toast } from "react-toastify";

const Default = () => {
  return (
    <div className="mt-4 mt-md-4 g-4 g-md-4">
      <Row className="mt-4">
        <Col lg={12}>
          <Form.Group controlId="commentTextarea">
            <Form.Label className="input-label">
              Hereby I make the following complaint{" "}
              <span className="ms-1 required-label">*</span>
            </Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder=""
              className="custom-textarea-input"
            />
          </Form.Group>
        </Col>
      </Row>
    </div>
  );
};

export default Default;
