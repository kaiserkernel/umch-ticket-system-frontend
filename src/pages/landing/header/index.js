import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  const handleClickRegister = () => {
    navigate("/register"); // Navigate to the "/special" route
  };
  const handleClickLogin = () => {
    navigate("/login"); // Navigate to the "/special" route
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
                  <nav className="text-white">
                    <span
                      className="p-3 cursor-pointer"
                      onClick={handleClickLogin}
                    >
                      Sign In
                    </span>
                    <span> | </span>
                    <span
                      className="p-3 cursor-pointer"
                      onClick={handleClickRegister}
                    >
                      Sign Up
                    </span>
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
