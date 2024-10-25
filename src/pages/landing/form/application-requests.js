import React from "react";
import { Row, Col, Form } from "react-bootstrap";

const ApplicationRequests = () => {
  return (
    <div className="pt-5">
      <h1 className="mt-2 mt-md-5 mb-0 mb-md-5">Applications and Requests</h1>
      <Row className="mt-4">
        <Col lg={12}>
          <Form.Group>
            <Form.Label className="input-label">
              Applications and Requests{" "}
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
              <option>- Select -</option>
              <option>Option 2</option>
              <option>Option 3</option>
            </Form.Control>
          </Form.Group>
        </Col>
      </Row>
      <Row className="mt-2 g-4 g-md-4">
        <Col lg={6}>
          <Form.Group controlId="firstName">
            <Form.Label className="input-label">
              Name of the hospital changing from
              <span className="ms-1 required-label">*</span>
            </Form.Label>
            <Form.Control type="text" placeholder="" className="custom-input" />
          </Form.Group>
        </Col>
        <Col lg={6}>
          <Form.Group controlId="lastName">
            <Form.Label className="input-label">
              Name of the hospital changing to{" "}
              <span className="ms-1 required-label">*</span>
            </Form.Label>
            <Form.Control type="text" placeholder="" className="custom-input" />
          </Form.Group>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col lg={12}>
          <Form.Group controlId="partner">
            <Form.Label className="input-label">
              Changing partner: <span className="ms-1 required-label">*</span>
            </Form.Label>
            <Form.Control type="text" placeholder="" className="custom-input" />
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

export default ApplicationRequests;
