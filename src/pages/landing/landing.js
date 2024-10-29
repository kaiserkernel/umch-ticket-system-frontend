import React, { useEffect, useContext } from "react";
import "lity";
import "lity/dist/lity.min.css";
import { AppSettings } from "./../../config/app-settings.js";
import "./index.scss";
import Header from "./header/index.js";
import BannerSection from "./banner/index.js";
import Form from "./form/index.js";
import { useLocation } from "react-router-dom";

function Landing() {
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

  return (
    <>
      <Header />
      <BannerSection />
      <Form />
    </>
  );
}

export default Landing;
