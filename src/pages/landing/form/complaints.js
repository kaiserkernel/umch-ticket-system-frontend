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
              <option value="">– Select –</option>
              <option value="Campus">Campus</option>
              <option value="Dean's Office">Dean’s Office</option>
              <option value="German Teaching Department">
                German Teaching Department
              </option>
              <option value="Teaching Hospital">Teaching Hospital</option>
              <option value="Teacher">Teacher</option>
              <option value="Online Catalouge (Carnet)">
                Online Catalouge (Carnet)
              </option>
              <option value="Exam">Exam</option>
              <option value="Other" selected="">
                Other
              </option>
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
