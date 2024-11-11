import React from "react";
import moment from "moment";

const ExamInspection = ({ selectedTicket }) => {
  return (
    <div className="text-black">
      <p className="text-black fw-bold">Subject:</p>
      <p className="text-black">{selectedTicket?.details?.subject}</p>
      <div className="d-flex">
        <div className=" flex-grow-1">
          <p className="text-black fw-bold">Exam Date:</p>
          <p className="text-black">
            {moment(selectedTicket?.details?.examDate).format("MM/DD/YYYY")}
          </p>
        </div>
        <div className="flex-grow-1">
          <p className="text-black fw-bold">Specification of exam:</p>
          <p className="text-black">
            {selectedTicket?.details?.examSpecification}
          </p>
        </div>
      </div>

      <p className="text-black fw-bold">Comments:</p>
      <p className="text-black">{selectedTicket?.details?.comment}</p>
    </div>
  );
};

export default ExamInspection;
