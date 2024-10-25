import React from "react";
import { Row, Col, Form } from "react-bootstrap";

const Internship = () => {
  return (
    <div className="pt-5">
      <h1 className="mt-2 mt-md-5 mb-0 mb-md-5">Internship</h1>
      <Row className="mt-4">
        <Col lg={12}>
          <Form.Group controlId="firstName">
            <Form.Label className="input-label">
              Name of Teaching Hospital
              <span className="ms-1 required-label">*</span>
            </Form.Label>
            <Form.Control type="text" placeholder="" className="custom-input" />
          </Form.Group>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col lg={12}>
          <Form.Group controlId="firstName">
            <Form.Label className="input-label">
              County where the internship takes place
              <span className="ms-1 required-label">*</span>
            </Form.Label>
            <Form.Control type="text" placeholder="" className="custom-input" />
          </Form.Group>
        </Col>
      </Row>
      <Row className="mt-2 g-4 g-md-4">
        <Col lg={6}>
          <Form.Group controlId="partner">
            <Form.Label className="input-label">
              Interval of time from{" "}
              <span className="ms-1 required-label">*</span>
            </Form.Label>
            <Form.Control type="text" placeholder="" className="custom-input" />
          </Form.Group>
        </Col>
        <Col lg={6}>
          <Form.Group controlId="partner">
            <Form.Label className="input-label">
              Interval of time to<span className="ms-1 required-label">*</span>
            </Form.Label>
            <Form.Control type="text" placeholder="" className="custom-input" />
          </Form.Group>
        </Col>
      </Row>
      <Row className="mt-5">
        <div className="fw-bold input-label">Please note:</div>
        <div className="input-label">
          You need to upload your signed document.
        </div>
      </Row>
      <Row className="mt-5">
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
            <Form.Label className="input-label mb-0">
              File Upload
              <span className="ms-1 required-label">*</span>
            </Form.Label>
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

export default Internship;
