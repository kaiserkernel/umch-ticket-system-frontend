import React from "react";
import moment from "moment";
import { Row, Col } from "react-bootstrap";

const TransferTarguMures = ({ selectedTicket }) => {
  return (
    <div className="text-black">
      <Row>
        <Col lg={6}>
          <p className="text-black fw-bold">Date Of Birth:</p>
          <p className="text-black">
            {moment(selectedTicket?.details?.birthday).format("MM/DD/YYYY")}
          </p>
        </Col>
        <Col lg={6}>
          <p className="text-black fw-bold">Current Year Of Study:</p>
          <p className="text-black">
            {selectedTicket?.details?.currentYearOfStudy}
          </p>
        </Col>
      </Row>
      <p className="text-black fw-bold">Comments:</p>
      <p className="text-black">{selectedTicket?.details?.comment}</p>
    </div>
  );
};

export default TransferTarguMures;
