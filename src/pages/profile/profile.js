import React, { useState } from "react";
import { Card, CardBody } from "./../../components/card/card.jsx";
import "lity";
import "lity/dist/lity.min.css";
import { Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import BlockUI from "react-block-ui";
import { useModal } from "../../context/profileModalProvider.js";

function Profile() {
  const userData = JSON.parse(localStorage.getItem("userData"));

  const roleName = ["Admin", "Teacher", "Student"];
  const { profileModalVisible, setProfileModalVisible } = useModal();

  return (
    <>
      {/* <BlockUI > */}
      <Card className="">
        <CardBody className="p-0">
          <div className="profile">
            <div className="profile-container">
              <div className="profile-sidebar">
                <div className="desktop-sticky-top">
                  <div className="profile-img">
                    {userData?.avatar ? (
                      <img
                        src={`${process.env.REACT_APP_API_URL}${userData.avatar}`}
                        alt=""
                      />
                    ) : (
                      <img src="/assets/img/user_placeholder.webp" alt="" />
                    )}
                  </div>

                  <h4>{userData?.firstName + " " + userData?.lastName}</h4>
                  <div className="mb-3 text-inverse text-opacity-50 fw-bold mt-n2">
                    {roleName[userData.role]}
                  </div>

                  <hr className="mt-4 mb-4" />
                </div>
              </div>

              <div className="profile-content">
                <div className="profile-content-headerCaption">
                  Welcome to your UMCH Ticket System
                </div>

                <div className="profile-content-textCaption">
                  What do you want to do next?
                </div>
                {userData.role == 2 && (
                  <Link
                    to="/home"
                    className="btn btn-primary btn-lg d-block w-100 fw-500 mb-3 mx-5 py-3 fs-20px text-white"
                  >
                    Create a new ticket
                  </Link>
                )}
                <Link
                  to="/email/inbox"
                  className="btn btn-primary btn-lg d-block w-100 fw-500 mb-3 py-3 fs-20px text-white"
                >
                  Open your latest ticket
                </Link>
                <Link
                  to="/email/inbox"
                  className="btn btn-primary btn-lg d-block w-100 fw-500 mb-3 mr-5 py-3 fs-20px text-white"
                >
                  Check all tickets
                </Link>
                <button
                  className="btn btn-primary btn-lg d-block w-100 fw-500 mb-3 py-3 fs-20px text-white mb-5"
                  onClick={(evt) =>
                    setProfileModalVisible(prev => !prev)
                  }
                >
                  Edit your user profile
                </button>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>
      {/* </BlockUI> */}
    </>
  );
}

export default Profile;
