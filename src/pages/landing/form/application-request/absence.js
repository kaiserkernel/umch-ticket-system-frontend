import React, { useState } from "react";
import { Row, Col, Form } from "react-bootstrap";
import DatePicker from "react-datepicker";
import styled from "styled-components";
import "react-datepicker/dist/react-datepicker.css";

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

const Absence = () => {
  const [selectedFromDate, handleSelectFromDate] = useState();
  const [selectedToDate, handleSelectToDate] = useState();
  return (
    <div className="">
      <Row className="mt-5">
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
              Period of time (absence from)
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
          <Form.Group controlId="lastName">
            <Form.Label className="input-label">
              Period of time (absence to)
              <span className="ms-1 required-label">*</span>
            </Form.Label>
            <StyledDatePicker
              selected={selectedToDate}
              onChange={(date) => handleSelectToDate(date)}
              dateFormat="yyyy/MM/dd"
              isClearable
              className="custom-input"
            />
          </Form.Group>
        </Col>
      </Row>

      <Row className="mt-4">
        <Col lg={12}>
          <Form.Group controlId="">
            <Form.Label className="input-label mb-0">
              File Upload (all official documents must be translated into
              english language)
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
    </div>
  );
};

export default Absence;
