import React from "react";
import moment from "moment";

const OnlineCatalogue = ({ selectedTicket }) => {
  return (
    <div className="text-black">
      <p className="text-black fw-bold">Comments:</p>
      <p className="text-black">{selectedTicket?.details?.comment}</p>
    </div>
  );
};

export default OnlineCatalogue;
