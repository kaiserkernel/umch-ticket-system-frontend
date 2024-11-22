import React from "react";
import moment from "moment";

const Absence = ({ selectedTicket }) => {
  return (
    <div className="text-black">
      <p className="text-black fw-bold">Reason for Absence:</p>
      <p className="text-black">{selectedTicket?.details?.reasonForAbsence}</p>
      <div className="d-flex">
        <div className=" flex-grow-1">
          <p className="text-black fw-bold">Time From Absence:</p>
          <p className="text-black">
            {selectedTicket?.details?.timeFromAbsence
              ? moment(selectedTicket?.details?.timeFromAbsence).format(
                  "DD-MM-YYYY"
                )
              : ""}
          </p>
        </div>
        <div className="flex-grow-1">
          <p className="text-black fw-bold">Time To Absence:</p>
          <p className="text-black">
            {selectedTicket?.details?.timeToAbsence
              ? moment(selectedTicket?.details?.timeToAbsence).format(
                  "DD-MM-YYYY"
                )
              : ""}
          </p>
        </div>
      </div>
      <p className="text-black fw-bold">Comments:</p>
      <p className="text-black">{selectedTicket?.details?.comment}</p>
    </div>
  );
};

export default Absence;
