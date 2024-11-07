import React from "react";
import { Card, CardHeader, CardBody } from "./../../components/card/card.jsx";
import "lity";
import "lity/dist/lity.min.css";
import { Link } from "react-router-dom";

function Profile() {
  let userData = localStorage.getItem("userData");
  userData = JSON.parse(userData);
  const roleName = ["Admin", "Teacher", "Student"];

  return (
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

                {/* <div className="mb-1">
                  <i className="fa fa-map-marker-alt fa-fw text-inverse text-opacity-50"></i>{" "}
                  New York, NY
                </div>
                <div className="mb-3">
                  <i className="fa fa-link fa-fw text-inverse text-opacity-50"></i>{" "}
                  seantheme.com/hud
                </div> */}

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
              <Link className="btn btn-primary btn-lg d-block w-100 fw-500 mb-3 py-3 fs-20px text-white mb-5">
                Edit your user profile
              </Link>
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}

export default Profile;
