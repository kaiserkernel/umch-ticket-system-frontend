import React from "react";
import moment from "moment";

const ShortTermBorrowDiploma = ({ selectedTicket }) => {
  return (
    <div className="text-black">
      <p className="text-black fw-bold">Date of diploma collection:</p>
      <p className="text-black">
        {moment(selectedTicket?.details?.diplomaCollectionDate).format(
          "MM-DD-YYYY"
        )}
      </p>
      <p className="text-black fw-bold">Comments:</p>
      <p className="text-black">{selectedTicket?.details?.comment}</p>
    </div>
  );
};

export default ShortTermBorrowDiploma;
