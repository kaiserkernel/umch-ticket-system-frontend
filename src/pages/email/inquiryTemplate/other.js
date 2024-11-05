import React from "react";
import moment from "moment";

const Other = ({ selectedTicket }) => {
  return (
    <div className="text-black">
      <div className="d-flex">
        <div className=" flex-grow-1">
          <p className="text-black fw-bold">
            Name of the hospital changing from:
          </p>
          <p className="text-black">
            {selectedTicket?.details?.changeFromHospitalName}
          </p>
        </div>
        <div className="flex-grow-1">
          <p className="text-black fw-bold">
            Name of the hospital changing To:
          </p>
          <p className="text-black">
            {selectedTicket?.details?.changeToHospitalName}
          </p>
        </div>
      </div>
      <p className="text-black fw-bold">Changing partner:</p>
      <p className="text-black">{selectedTicket?.details?.changePartner}</p>
      <p className="text-black fw-bold">Comments:</p>
      <p className="text-black">{selectedTicket?.details?.comment}</p>
    </div>
  );
};

export default Other;
