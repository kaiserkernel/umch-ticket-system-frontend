import React, { useState } from "react";
import { Row, Col, Form } from "react-bootstrap";

const RecognitionInternship = () => {
  const [selectedFromDate, handleSelectFromDate] = useState();
  return (
    <div className="mt-4 mt-md-4 g-4 g-md-4">
      <Row className=" g-4 g-md-4">
        <Col lg={12}>
          <Form.Group controlId="">
            <Form.Label className="input-label">
              Recognition of 1st medical internship
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
      <Row className="mt-5">
        <div className="fw-bold input-label">Please note:</div>
        <div className="input-label mt-2 ">
          All official documents must be translated into English language.
        </div>
      </Row>
      <div className="d-flex algin-items-center  mt-5 mt-md-5">
        <Form.Group controlId="custom-checkbox" className="me-2 ">
          <Form.Check type="checkbox" className="custom-checkbox" />
        </Form.Group>
        <div className="input-label   ">
          I confirm that all official documents are translated into English
          language.
        </div>
      </div>
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

export default RecognitionInternship;
