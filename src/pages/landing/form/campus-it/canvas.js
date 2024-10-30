import React, { useState } from "react";
import { Row, Col, Form } from "react-bootstrap";

const Canvas = () => {
  return (
    <div className="">
      <Row className="mt-4">
        <Col lg={12}>
          <Form.Group controlId="commentTextarea">
            <Form.Label className="input-label">
              I hereby make the following request{" "}
              <span className="ms-1 required-label">*</span>
            </Form.Label>
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

      <Row className="mt-5">
        <Col lg={12}>
          <p className="fw-bold"> Please note:</p>
          <p>
            Our IT Support system is designated for issues related to our
            systems and infrastructure only. Personal problems or inquiries not
            connected to these areas cannot be addressed. Thank you for your
            understanding!
          </p>
          <p className=" text-black">
            For the best possible support, please provide as many details as you
            can about the issues you are experiencing. Including screenshots is
            highly encouraged, as it helps us understand and resolve your
            problem more efficiently.
          </p>
          <p className="text-black">Thank you!</p>
        </Col>
      </Row>
    </div>
  );
};

export default Canvas;
