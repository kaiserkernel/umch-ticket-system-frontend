import React from "react";
import moment from "moment";

const MedicalAbilities = ({ selectedTicket }) => {
  return (
    <div className="text-black">
      <p className="text-black fw-bold">Name of teaching hospital:</p>
      <p className="text-black">{selectedTicket?.details?.hospital}</p>

      <p className="text-black fw-bold">Comments:</p>
      <p className="text-black">{selectedTicket?.details?.comment}</p>
    </div>
  );
};

export default MedicalAbilities;
