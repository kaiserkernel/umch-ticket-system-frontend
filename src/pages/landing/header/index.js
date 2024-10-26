import React from "react";
import { Container, Row, Col } from "react-bootstrap";
const Header = () => {
  return (
    <>
      <div className="bg-dark-blue">
        <Container>
          <Row>
            <Col lg={12}>
              <div className="header-padding">
                <img
                  src="https://cdn.sanity.io/images/s6hq5hsx/production/b9bb869dfb5f2220260bc8a14c751eabf172142e-451x47.svg"
                  className="logo-img"
                />
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default Header;
