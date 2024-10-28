import React, { useState } from "react";
import { Row, Col, Form } from "react-bootstrap";

const ChangeStudyGroup = () => {
  return (
    <div className="">
      <Row className="mt-2 g-4 g-md-4">
        <Col lg={12}>
          <Form.Group controlId="">
            <Form.Label className="input-label">
              Changing partner:
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
      <Row className="mt-2 g-4 g-md-4">
        <Col lg={12}>
          <Form.Group controlId="">
            <Form.Label className="input-label">
              I am currently in study group
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
      <Row className="mt-2 g-4 g-md-4">
        <Col lg={12}>
          <Form.Group controlId="">
            <Form.Label className="input-label">
              I would like to switch to the study group :
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
              rows={8}
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

export default ChangeStudyGroup;
