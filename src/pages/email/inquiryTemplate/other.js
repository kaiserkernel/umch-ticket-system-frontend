import React from "react";
import moment from "moment";

const Other = ({ selectedTicket }) => {
  return (
    <div className="text-black">
      <p className="text-black fw-bold">Comment:</p>
      <p className="text-black">{selectedTicket?.details?.comment}</p>
    </div>
  );
};

export default Other;
