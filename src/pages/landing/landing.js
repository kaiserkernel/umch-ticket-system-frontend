import React, { useEffect, useContext } from "react";
import "lity";
import "lity/dist/lity.min.css";
import { AppSettings } from "./../../config/app-settings.js";
import "./index.scss";
import Header from "./header/index.js";
import BannerSection from "./banner/index.js";
import Form from "./form/index.js";

function Landing() {
  const context = useContext(AppSettings);

  return (
    <>
      <Header />
      <BannerSection />
      <Form />
    </>
  );
}

export default Landing;
