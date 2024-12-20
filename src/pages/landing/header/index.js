import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/authProvider";
import { useLocation } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, setIsAuthenticated } = useAuth();
  const userData = JSON.parse(localStorage.getItem("userData"));

  const handleClickRegister = () => {
    navigate("/register"); // Navigate to the "/special" route
  };

  const handleClickLogin = () => {
    navigate("/login"); // Navigate to the "/special" route
  };

  const handleClickLogout = () => {
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
    localStorage.removeItem("isAuthenticated");
    sessionStorage.removeItem("isAuthenticated");
    localStorage.removeItem("userData");
    setIsAuthenticated(false);
    navigate("/login");
  };

  const handleClickDashboard = () => {
    navigate("/profile", { replace: true });
  };

  return (
    <>
      <div className="bg-dark-blue">
        <Container>
          <Row>
            <Col lg={12}>
              <div className="d-none d-md-block">
                <div className="d-flex justify-content-between align-items-center">
                  <div className="header-padding">
                    <img
                      src="https://cdn.sanity.io/images/s6hq5hsx/production/b9bb869dfb5f2220260bc8a14c751eabf172142e-451x47.svg"
                      className="logo-img"
                    />
                  </div>
                  <nav className="text-white d-flex align-items-center">
                    {isAuthenticated == false ? (
                      <>
                        {location.pathname == "/login" && (
                          <>
                            {/* <span
                              className="p-3 cursor-pointer"
                              onClick={handleClickLogin}
                            >
                              Sign In
                            </span>
                            <span> | </span> */}
                            <span
                              className="p-3 cursor-pointer"
                              onClick={handleClickRegister}
                            >
                              Sign Up
                            </span>
                          </>
                        )}

                        {location.pathname == "/register" && (
                          <>
                            <span
                              className="p-3 cursor-pointer"
                              onClick={handleClickLogin}
                            >
                              Sign In
                            </span>
                          </>
                        )}
                      </>
                    ) : (
                      <>
                        <div
                          className="p-3 cursor-pointer d-flex align-items-center"
                        >
                          <div className="menu-img-width">
                            {userData?.avatar ? (
                              <img
                                src={`${process.env.REACT_APP_API_URL}${userData?.avatar}`}
                                className="rounded-circle w-100 h-100 object-fit-cover object"
                                style={{ objectPosition: "top" }}
                                alt=""
                              />
                            ) : (
                              <div className="d-flex align-items-center justify-content-center w-100 h-100 bg-inverse bg-opacity-25 text-inverse text-opacity-50 rounded-circle overflow-hidden">
                                <i className="bi bi-person-fill fs-32px mb-n3 text-white"></i>
                              </div>
                            )}
                          </div>
                          <span className="ms-2">{userData.firstName}{" "}{userData.lastName}</span>
                        </div>
                        <span> | </span>
                        <span
                          className="p-3 cursor-pointer"
                          onClick={handleClickDashboard}
                        >
                          Dashboard
                        </span>
                      </>
                    )}
                  </nav>
                </div>
              </div>
              <div className="d-block d-md-none">
                <div className="d-flex flex-column ">
                  <div className="header-padding">
                    <img
                      src="https://cdn.sanity.io/images/s6hq5hsx/production/b9bb869dfb5f2220260bc8a14c751eabf172142e-451x47.svg"
                      className="logo-img"
                    />
                  </div>
                  <nav className="d-flex justify-content-end text-white">
                    <span
                      className="px-3 pb-1 cursor-pointer"
                      onClick={handleClickLogin}
                    >
                      Sign In
                    </span>
                    <span className="pb-1"> | </span>
                    <span
                      className="px-3 pb-1 cursor-pointer"
                      onClick={handleClickRegister}
                    >
                      Sign Up
                    </span>
                  </nav>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default Header;
