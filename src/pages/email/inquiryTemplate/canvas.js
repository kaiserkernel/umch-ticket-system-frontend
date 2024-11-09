import React from "react";
import moment from "moment";

const Canvas = ({ selectedTicket }) => {
  return (
    <div className="text-black">
      <p className="text-black fw-bold">I hereby make the following request:</p>
      <p className="text-black">{selectedTicket?.details?.request}</p>
    </div>
  );
};

export default Canvas;
