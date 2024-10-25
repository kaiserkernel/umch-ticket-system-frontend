import React from "react";
import { Row, Col, Form } from "react-bootstrap";

const BookRental = () => {
  return (
    <div className="pt-5">
      <h1 className="mt-2 mt-md-5 mb-0 mb-md-5">Book rental UMCH library</h1>
      <Row className="mt-4">
        <Col lg={12}>
          <Form.Group>
            <Form.Label className="input-label">
              Title of the book
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
        <Col lg={6}>
          <Form.Group controlId="firstName">
            <Form.Label className="input-label">
              Period of time from
              <span className="ms-1 required-label">*</span>
            </Form.Label>
            <Form.Control type="text" placeholder="" className="custom-input" />
          </Form.Group>
        </Col>
      </Row>
      <Row className="mt-5">
        <div className="fw-bold input-label">Please note:</div>
        <div className="input-label">
          The maximum loan period for books from the UMCH library is 3 days from
          the day of collection.
        </div>
      </Row>

      <div className="d-flex align-items-start  mt-2 mt-md-5">
        <Form.Group controlId="custom-checkbox" className="me-2 mt-1">
          <Form.Check type="checkbox" className="custom-checkbox" />
        </Form.Group>
        <p className="mb-0">
          {" "}
          I agree with the library rules and confirm that I handle the book with
          care, do not write into this book, and remove any bookmarks before the
          return! I am aware that the UMCH will have to charge me for the
          replacement costs in case I do not return the book in a proper
          condition or fail to return it even after a reminder.
        </p>
      </div>
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
    </div>
  );
};

export default BookRental;
