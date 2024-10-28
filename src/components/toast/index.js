import React, { useEffect } from "react";
import { Toast, ToastContainer } from "react-bootstrap";

const AutoCloseToast = ({ show, message, duration = 3000 }) => {
  useEffect(() => {
    let timer;
    if (show) {
      timer = setTimeout(() => {
        // Call a function or use state to handle close logic
        // Here, you could call a prop function like onClose, or handle it as needed
        console.log("Toast should close here"); // Placeholder for close logic
      }, duration);
    }
    return () => clearTimeout(timer);
  }, [show, duration]);

  return (
    <ToastContainer position="top-end" className="p-3">
      <Toast show={show}>
        <Toast.Header>
          <strong className="me-auto">Notification</strong>
          <small>Just now</small>
        </Toast.Header>
        <Toast.Body>{message}</Toast.Body>
      </Toast>
    </ToastContainer>
  );
};

export default AutoCloseToast;
