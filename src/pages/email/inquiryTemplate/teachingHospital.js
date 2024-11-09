import React from "react";
import moment from "moment";

const TeachingHospital = ({ selectedTicket }) => {
  return (
    <div className="text-black">
      <p className="text-black fw-bold">Teaching Hospital:</p>
      <p className="text-black">{selectedTicket?.details?.teachingHospital}</p>
      <p className="text-black fw-bold">
        Hereby I make the following complaint:
      </p>
      <p className="text-black">{selectedTicket?.details?.complaintComment}</p>
    </div>
  );
};

export default TeachingHospital;
