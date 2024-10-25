import React, { useEffect, useContext } from "react";
import "lity";
import "lity/dist/lity.min.css";
import { AppSettings } from "./../../config/app-settings.js";

function Landing() {
  const context = useContext(AppSettings);

  return <div>hello world</div>;
}

export default Landing;
