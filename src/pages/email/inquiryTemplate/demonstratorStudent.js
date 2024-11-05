import React from "react";
import moment from "moment";

const DemonstratorStudent = ({ selectedTicket }) => {
  return (
    <div className="text-black">
      <div className="d-flex">
        <div className=" flex-grow-1">
          <p className="text-black fw-bold">Subject</p>
          <p className="text-black">{selectedTicket?.details?.subject}</p>
        </div>
      </div>

      <p className="text-black fw-bold">Comments:</p>
      <p className="text-black">{selectedTicket?.details?.comment}</p>
    </div>
  );
};

export default DemonstratorStudent;
