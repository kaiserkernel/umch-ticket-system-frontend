import React, { useState } from "react";
import { Row, Col, Form } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styled from "styled-components";
import dayjs from "dayjs";

const StyledDatePicker = styled(DatePicker)`
  border: 1px solid !important;
  padding: 8px !important;
  border-radius: 0px !important;
  outline: none !important;
  width: 100% !important;

  &:focus {
    border-color: #2596be !important;
  }
`;

const StreamingPanopto = () => {
  const [selectedFromDate, handleSelectFromDate] = useState();
  return (
    <div className="mt-4 mt-md-4 g-4 g-md-4">
      <Row>
        <Col lg={6}>
          <Form.Group controlId="Room">
            <Form.Label className="input-label">
              Room <span className="ms-1 required-label">*</span>
            </Form.Label>
            <Form.Control
              type="text"
              autoComplete="off"
              placeholder=""
              className="custom-input"
            />
          </Form.Group>
        </Col>
        <Col lg={6}>
          <Form.Group>
            <Form.Label className="input-label">
              Modules
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
              <option value="1st Module" selected="">
                1st Module
              </option>
              <option value="2nd Module">2nd Module</option>
              <option value="3rd Module">3rd Module</option>
              <option value="4th Module">4th Module</option>
            </Form.Control>
          </Form.Group>
        </Col>
      </Row>
      <Row className="mt-2 g-4 g-md-4">
        <Col lg={6}>
          <Form.Group controlId="">
            <Form.Label className="input-label">
              Date of Lecture/PA
              <span className="ms-1 required-label">*</span>
            </Form.Label>
            <StyledDatePicker
              selected={selectedFromDate}
              onChange={(date) => handleSelectFromDate(date)}
              dateFormat="yyyy/MM/dd"
              isClearable
              className="custom-input"
            />
          </Form.Group>
        </Col>
        <Col lg={6}>
          <Form.Group controlId="Room">
            <Form.Label className="input-label">
              Time of Lecture/PA <span className="ms-1 required-label">*</span>
            </Form.Label>
            <Form.Control
              type="text"
              autoComplete="off"
              placeholder=""
              className="custom-input"
            />
          </Form.Group>
        </Col>
      </Row>

      <Row className="mt-4">
        <Col lg={12}>
          <Form.Group controlId="commentTextarea">
            <Form.Label className="input-label">
              I hereby make the following request{" "}
              <span className="ms-1 required-label">*</span>
            </Form.Label>
            <Form.Control
              as="textarea"
              rows={4}
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

export default StreamingPanopto;
