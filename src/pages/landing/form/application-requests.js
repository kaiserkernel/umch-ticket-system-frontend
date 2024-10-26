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
              <option value="">– Select –</option>
              <option value="Absence">Absence</option>
              <option value="Change of teaching hospital">
                Change of teaching hospital
              </option>
              <option value="Change of study group">
                Change of study group
              </option>
              <option value="Demonstrator student">Demonstrator student</option>
              <option value="Enrollment">Enrollment</option>
              <option value="Exam inspection">Exam inspection</option>
              <option value="Online Catalogue (Carnet)">
                Online Catalogue (Carnet)
              </option>
              <option value="Recognition of Courses">
                Recognition of Courses
              </option>
              <option value="Recognition of Internship">
                Recognition of Internship
              </option>
              <option value="Short term borrow of Diploma">
                Short term borrow of Diploma
              </option>
              <option value="Syllabus of the academic year">
                Syllabus of the academic year
              </option>
              <option value="Transcript of Records">
                Transcript of Records
              </option>
              <option value="Transfer to Targu Mures">
                Transfer to Targu Mures
              </option>
              <option value="Other">Other</option>
            </Form.Control>
          </Form.Group>
        </Col>
      </Row>

      {/* <Row className="mt-5">
        <div className="fw-bold input-label">Please note:</div>
        <div className="input-label mt-2 ">
          All requests must be submitted within 10 workingdays after recovery.
          Otherwise the absence will not be approved.
        </div>
      </Row>
      <Row className="mt-2 g-4 g-md-4">
        <Col lg={12}>
          <Form.Group controlId="firstName">
            <Form.Label className="input-label">
              Reason for absence
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
        <Col lg={6}>
          <Form.Group controlId="firstName">
            <Form.Label className="input-label">
              Name of the hospital changing from
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
          <Form.Group controlId="lastName">
            <Form.Label className="input-label">
              Name of the hospital changing to{" "}
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
          <Form.Group controlId="partner">
            <Form.Label className="input-label">
              Changing partner: <span className="ms-1 required-label">*</span>
            </Form.Label>
            <Form.Control
              type="text"
              placeholder=""
              className="custom-input"
              autoComplete="off"
            />
          </Form.Group>
        </Col>
      </Row> */}
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
      {/* <Row className="mt-4">
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
      </Row> */}
    </div>
  );
};

export default ApplicationRequests;
