import React from "react";
import moment from "moment";

const ChangeStudyGroup = ({ selectedTicket }) => {
  return (
    <div className="text-black">
      <div className="d-flex">
        <div className=" flex-grow-1">
          <p className="text-black fw-bold">Changing partner:</p>
          <p className="text-black">{selectedTicket?.details?.changePartner}</p>
        </div>
        <div className="flex-grow-1">
          <p className="text-black fw-bold">I am currently in study group:</p>
          <p className="text-black">
            {selectedTicket?.details?.currentStudyGroup}
          </p>
        </div>
      </div>
      <p className="text-black fw-bold">
        I would like to switch to the study group:
      </p>
      <p className="text-black">{selectedTicket?.details?.switchStudyGroup}</p>
      <p className="text-black fw-bold">Comments:</p>
      <p className="text-black">{selectedTicket?.details?.comment}</p>
    </div>
  );
};

export default ChangeStudyGroup;
