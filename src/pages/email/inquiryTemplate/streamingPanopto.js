import React from "react";
import moment from "moment";
import { Row, Col } from "react-bootstrap";

const StreamingPanopto = ({ selectedTicket }) => {
  return (
    <div className="text-black">
      <Row>
        <Col lg={6}>
          <div className="">
            <p className="text-black fw-bold">Room:</p>
            <p className="text-black">{selectedTicket?.details?.room}</p>
          </div>
        </Col>
        <Col lg={6}>
          <div className="flex-grow-1">
            <p className="text-black fw-bold">Modules:</p>
            <p className="text-black">
              <p className="text-black">{selectedTicket?.details?.modules}</p>
            </p>
          </div>
        </Col>
      </Row>

      <Row>
        <Col lg={6}>
          <div className=" flex-grow-1">
            <p className="text-black fw-bold">Date of Lecture/PA:</p>
            <p className="text-black">
              {selectedTicket?.details?.dateOfLecture}
            </p>
          </div>
        </Col>
        <Col lg={6}>
          <div className="flex-grow-1">
            <p className="text-black fw-bold">Time of Lecture/PA :</p>
            <p className="text-black">
              <p className="text-black">
                {selectedTicket?.details?.timeOfLecture}
              </p>
            </p>
          </div>
        </Col>
      </Row>
      <Row>
        <Col lg={12}>
          <p className="text-black fw-bold">
            I hereby make the following request:
          </p>
          <p className="text-black">{selectedTicket?.details?.request}</p>
        </Col>
      </Row>
    </div>
  );
};

export default StreamingPanopto;
