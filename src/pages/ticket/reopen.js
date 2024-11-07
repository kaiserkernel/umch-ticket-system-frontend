import React, { useEffect, useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";
import { AppSettings } from "./../../config/app-settings.js";
import { useAuth } from "../../context/authProvider.js";
import AuthService from "../../sevices/auth-service.js";
import { ToastContainer, toast } from "react-toastify";
import { Form } from "react-bootstrap";
import Header from "../landing/header/index.js";
import BannerSection from "../landing/banner/index.js";
import formService from "../../sevices/form-service.js";

function PagesLogin() {
  const navigate = useNavigate();
  const location = useLocation();
  const context = useContext(AppSettings);

  useEffect(() => {
    context.setAppHeaderNone(true);
    context.setAppSidebarNone(true);
    context.setAppContentClass("p-0");

    return function cleanUp() {
      context.setAppHeaderNone(false);
      context.setAppSidebarNone(false);
      context.setAppContentClass("");
    };

    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    const path = location.pathname;
    const pathArray = path.split("/");
    console.log(pathArray);

    const reOpenTicket = async (ticket_id) => {
      const payload = {
        ticket_id: ticket_id,
      };
      const res = await formService.reOpenTicket(payload);
    };

    reOpenTicket(pathArray[2]);
  }, []);

  const handleGoToDashboard = (e) => {
    e.preventDefault();
    navigate("/email/inbox", { replace: true });
  };

  return (
    <>
      <Header />
      <BannerSection />

      <div className="login mt-3 mt-md-5">
        <div className="login-content">
          <div className="bg-gray p-3 p-md-5">
            <h1 className="text-center">Your Ticket was reopened</h1>
            <div className="text-inverse text-opacity-50 text-center mb-5 mt-3 mt-md-5">
              <p className="text-inverse text-opacity-50 text-center sm-font">
                Dear Students,
              </p>
              <p className="text-inverse text-opacity-50 text-center sm-font">
                the UMCH Ticket System is here to ensure you can easily reach
                our team for assistance with requests and complaints. Please
                sign in and provide the details of your inquiry so we can
                address it promptly and effectively.
              </p>
              <p className="text-inverse text-opacity-50 text-center sm-font">
                ure you can easily reach our team for assistance with requests
                and complaints. Please sign in and provide the details of your
                inquiry so we can address it promptly and effectively.
              </p>
            </div>

            <div className="text-center">
              <a className="btn btn-primary" onClick={handleGoToDashboard}>
                Go to the Dashboard
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PagesLogin;
