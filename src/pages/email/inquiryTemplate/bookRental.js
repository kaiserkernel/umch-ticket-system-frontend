import React from "react";
import moment from "moment";

const BookRental = ({ selectedTicket }) => {
  return (
    <div className="text-black">
      <p className="text-black fw-bold">Title of the book</p>
      <p className="text-black">{selectedTicket?.details?.bookTitle}</p>
      <p className="text-black fw-bold">Period of time from</p>
      <p className="text-black">
        {moment(selectedTicket?.details?.periodFromTime).format("DD-MM-YYYY")}
      </p>

      <p className="text-black fw-bold">Comments:</p>
      <p className="text-black">{selectedTicket?.details?.comment}</p>
    </div>
  );
};

export default BookRental;
