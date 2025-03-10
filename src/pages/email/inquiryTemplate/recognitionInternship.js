import React from "react";
import moment from "moment";

const RecognitionInternship = ({ selectedTicket }) => {
  return (
    <div className="text-black">
      <p className="text-black fw-bold">
        Recognition of 1st medical internship:
      </p>
      <p className="text-black">
        {selectedTicket?.details?.recognitionMedicalInternship}
      </p>
      <p className="text-black fw-bold">Comments:</p>
      <p className="text-black">{selectedTicket?.details?.comment}</p>
    </div>
  );
};

export default RecognitionInternship;
