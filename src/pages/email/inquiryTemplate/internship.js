import React from "react";
import moment from "moment";
import { Row, Col } from "react-bootstrap";

const Internship = ({ selectedTicket }) => {
  return (
    <div className="text-black">
      <Row>
        <Col lg={12}>
          <p className="text-black fw-bold">Name of Teaching Hospital:</p>
          <p className="text-black">{selectedTicket?.details?.hospitalName}</p>
        </Col>
      </Row>
      <Row>
        <Col lg={12}>
          <p className="text-black fw-bold">
            County where the internship takes place:
          </p>
          <p className="text-black">{selectedTicket?.details?.country}</p>
        </Col>
      </Row>
      <Row>
        <Col lg={6}>
          <p className="text-black fw-bold">Interval of time from:</p>
          <p className="text-black">
            {moment(selectedTicket?.details?.timeFrom).format("DD-MM-YYYY")}
          </p>
        </Col>
        <Col lg={6}>
          <p className="text-black fw-bold">Interval of time to:</p>
          <p className="text-black">
            {moment(selectedTicket?.details?.timeTo).format("DD-MM-YYYY")}
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

export default Internship;
