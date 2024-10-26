import React from "react";
import { Row, Col, Form } from "react-bootstrap";

const CampusIT = () => {
  return (
    <div className="pt-5">
      <h1 className="mt-2 mt-md-5 mb-0 mb-md-5">Campus IT</h1>
      <Row className="mt-4">
        <Col lg={12}>
          <Form.Group>
            <Form.Label className="input-label">
              Campus IT
              <span className="ms-1 required-label">*</span>
            </Form.Label>
            <Form.Control
              as="select"
              style={{
                appearance: "none", // Hides the default arrow
                MozAppearance: "none", // For Firefox
                WebkitAppearance: "none", // For Safari/Chrome
                backgroundColor: "white",
                color: "gray !important",
                // padding: "8px 12px",
                // border: "1px solid #007bff",
              }}
              className="custom-input"
            >
              <option value="">– Select –</option>
              <option value="Canvas">Canvas</option>
              <option value="Streaming / Panopto">Streaming / Panopto</option>
            </Form.Control>
          </Form.Group>
        </Col>
      </Row>
    </div>
  );
};

export default CampusIT;
