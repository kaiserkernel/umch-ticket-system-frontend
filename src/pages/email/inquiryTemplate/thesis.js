import React from "react";
import moment from "moment";
import { Row, Col } from "react-bootstrap";
const Thesis = ({ selectedTicket }) => {
  return (
    <div className="text-black">
      <Row>
        <Col lg={6}>
          <p className="text-black fw-bold">Title of the Thesis:</p>
          <p className="text-black">{selectedTicket?.details?.titleOfThesis}</p>
        </Col>
        <Col lg={6}>
          <p className="text-black fw-bold">Subject / Department:</p>
          <p className="text-black">{selectedTicket?.details?.subject}</p>
        </Col>
      </Row>
      <Row>
        <Col lg={6}>
          <p className="text-black fw-bold">
            Coordinator of your Teaching Hospital:
          </p>
          <p className="text-black">
            {selectedTicket?.details?.coordinatorOfHospital}
          </p>
        </Col>
        <Col lg={6}>
          <p className="text-black fw-bold">Coordinator of UMFST Faculty:</p>
          <p className="text-black">
            {selectedTicket?.details?.coordinatorOfFaculty}
          </p>
        </Col>
      </Row>
      <Row>
        <Col lg={12}>
          <p className="text-black fw-bold">Comments:</p>
          <p className="text-black">{selectedTicket?.details?.comment}</p>
        </Col>
      </Row>
    </div>
  );
};

export default Thesis;
