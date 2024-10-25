import React from "react";
import { Row, Col, Form } from "react-bootstrap";

const Complaints = () => {
  return (
    <div className="pt-5">
      <h1 className="mt-2 mt-md-5 mb-0 mb-md-5">Complaints</h1>
      <Row className="mt-4">
        <Col lg={12}>
          <Form.Group>
            <Form.Label className="input-label">
              Complaints
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

export default Complaints;
