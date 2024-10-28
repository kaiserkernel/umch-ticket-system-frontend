import React, { useState } from "react";
import { Row, Col, Form } from "react-bootstrap";

const Enrollment = () => {
  return (
    <div className="">
      <Row className="mt-2 g-4 g-md-4">
        <Col lg={6}>
          <Form.Group controlId="">
            <Form.Label className="input-label">
              Nationality
              <span className="ms-1 required-label">*</span>
            </Form.Label>
            <Form.Control
              type="text"
              placeholder=""
              className="custom-input"
              autoComplete="off"
            />
          </Form.Group>
        </Col>
        <Col lg={6}>
          <Form.Group>
            <Form.Label className="input-label">
              Current year of study
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
              <option value="default">– Select –</option>
              <option value="1">1st year</option>
              <option value="2">2nd year</option>
              <option value="3">3rd year</option>
              <option value="4">4th year</option>
              <option value="5">5th year</option>
              <option value="6">6th year</option>
            </Form.Control>
          </Form.Group>
        </Col>
      </Row>

      <Row className="mt-4">
        <Col lg={12}>
          <Form.Group controlId="commentTextarea">
            <Form.Label className="input-label">Comments</Form.Label>
            <Form.Control
              as="textarea"
              rows={6}
              placeholder=""
              className="custom-textarea-input"
            />
          </Form.Group>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col lg={12}>
          <Form.Group controlId="">
            <Form.Label className="input-label mb-0">Upload File</Form.Label>
            <div className="text-center">
              <div className="mt-3 btn btn-primary px-4 py-2 upload-btn">
                <div className="d-flex flex-column"></div>
              </div>
            </div>
          </Form.Group>
        </Col>
      </Row>
    </div>
  );
};

export default Enrollment;
