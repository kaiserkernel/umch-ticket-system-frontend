import React from "react";
import useVisibility from "../../../hook/useVisibility";

const BannerSection = () => {
  const [ref, isVisible] = useVisibility();
  console.log(isVisible);
  return (
    <section ref={ref} className="banner-section">
      <div className="bg-header-positionRelative">
        <div className="bg-header-container">
          <img
            src="assets/img/2023-05-05-UMFST-UMCH-Days-2023-5201-3.webp"
            alt="Sample Image 1"
            height={10}
            className="bg-header-img"
          />

          <div
            className="d-block d-md-none bg-header-overlay-section"
            style={{ width: "70%" }}
          >
            <div
              className={`bg-header-img-caption ${
                isVisible ? "fade-in-down" : ""
              }`}
            >
              {/* <img src="assets/img/Pen.svg" width={50} height={50} /> */}
              <div className="bg-header-img-headerCaption">Ticket System</div>
              <div className="bg-header-img-textCaption ">
                for Requests and Complaints
              </div>
            </div>
          </div>
        </div>
        <div className="bg-header-mask-imgContainer">
          <img
            className="bg-header-mask-img"
            src="assets/img/b-header.webp"
            alt="Sample Image 1"
            width={10}
            height={10}
          />

          <div className="bg-header-overlay-section" style={{ width: "50%" }}>
            <div
              className={`bg-header-img-caption ${
                isVisible ? "fade-in-down" : ""
              }`}
            >
              <img src="assets/img/Pen.svg" width={70} height={70} />
              <div className="bg-header-img-headerCaption mt-2 mt-md-5">
                Ticket System
              </div>
              <div className="bg-header-img-textCaption d-md-block d-none">
                for Requests and Complaints
              </div>
            </div>
          </div>
        </div>
        <div className="d-md-none d-flex bg-header-mobile-mask-img justify-content-center align-items-center w-100"></div>
      </div>
    </section>
  );
};

export default BannerSection;
