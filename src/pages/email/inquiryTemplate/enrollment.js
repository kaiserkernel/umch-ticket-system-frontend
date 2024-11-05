import React from "react";
import moment from "moment";

const Enrollment = ({ selectedTicket }) => {
  return (
    <div className="text-black">
      <div className="d-flex">
        <div className=" flex-grow-1">
          <p className="text-black fw-bold">Nationality:</p>
          <p className="text-black">{selectedTicket?.details?.nationality}</p>
        </div>
        <div className="flex-grow-1">
          <p className="text-black fw-bold">Current year of study:</p>
          <p className="text-black">
            {selectedTicket?.details?.currentYearOfStudy}
          </p>
        </div>
      </div>

      <p className="text-black fw-bold">Comments:</p>
      <p className="text-black">{selectedTicket?.details?.comment}</p>
    </div>
  );
};

export default Enrollment;
