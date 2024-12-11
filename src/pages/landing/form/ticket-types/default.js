import React, { useState } from "react";
import { Row, Col, Form } from "react-bootstrap";

const Default = () => {
  return (
    <div className="">
      <div className="mt-5">
        <p>Dear Student</p>
        <p>
          We are happy to assist you with your applications and requests. Kindly
          select the appropriate form from the available options. You can find
          it under -Select-.
        </p>
      </div>
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

export default Default;
