import React from "react";
import moment from "moment";
import { Row, Col } from "react-bootstrap";

const Teacher = ({ selectedTicket }) => {
  return (
    <div className="text-black">
      <Row>
        <Col lg={6}>
          <p className="text-black fw-bold">Teaching's name:</p>
          <p className="text-black">{selectedTicket?.details?.teacherName}</p>
        </Col>
        <Col lg={6}>
          <p className="text-black fw-bold">Subject:</p>
          <p className="text-black">{selectedTicket?.details?.subject}</p>
        </Col>
      </Row>
      <Row>
        <Col lg={12}>
          <p className="text-black fw-bold">
            Hereby I make the following complaint:
          </p>
          <p className="text-black">
            {selectedTicket?.details?.complaintComment}
          </p>
        </Col>
      </Row>
    </div>
  );
};

export default Teacher;
