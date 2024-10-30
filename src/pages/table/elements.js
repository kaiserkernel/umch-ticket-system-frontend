import React, { useEffect, useState } from "react";
import { Card, CardBody } from "./../../components/card/card.jsx";
import { NavScrollTo } from "./../../components/nav-scroll-to/nav-scroll-to.jsx";
import Highlight from "react-highlight";

function AccountManagement() {
  const [code1, setCode1] = useState();
  const [code2, setCode2] = useState();
  const [code3, setCode3] = useState();
  const [code4, setCode4] = useState();
  const [code5, setCode5] = useState();
  const [code6, setCode6] = useState();
  const [code7, setCode7] = useState();
  const [code8, setCode8] = useState();
  const [code9, setCode9] = useState();
  const [code10, setCode10] = useState();

  useEffect(() => {
    fetch("/assets/data/table/element-code-1.json")
      .then(function (response) {
        return response.text();
      })
      .then((html) => {
        setCode1(html);
      });
    fetch("/assets/data/table/element-code-2.json")
      .then(function (response) {
        return response.text();
      })
      .then((html) => {
        setCode2(html);
      });
    fetch("/assets/data/table/element-code-3.json")
      .then(function (response) {
        return response.text();
      })
      .then((html) => {
        setCode3(html);
      });
    fetch("/assets/data/table/element-code-4.json")
      .then(function (response) {
        return response.text();
      })
      .then((html) => {
        setCode4(html);
      });
    fetch("/assets/data/table/element-code-5.json")
      .then(function (response) {
        return response.text();
      })
      .then((html) => {
        setCode5(html);
      });
    fetch("/assets/data/table/element-code-6.json")
      .then(function (response) {
        return response.text();
      })
      .then((html) => {
        setCode6(html);
      });
    fetch("/assets/data/table/element-code-7.json")
      .then(function (response) {
        return response.text();
      })
      .then((html) => {
        setCode7(html);
      });
    fetch("/assets/data/table/element-code-8.json")
      .then(function (response) {
        return response.text();
      })
      .then((html) => {
        setCode8(html);
      });
    fetch("/assets/data/table/element-code-9.json")
      .then(function (response) {
        return response.text();
      })
      .then((html) => {
        setCode9(html);
      });
    fetch("/assets/data/table/element-code-10.json")
      .then(function (response) {
        return response.text();
      })
      .then((html) => {
        setCode10(html);
      });
  });

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-xl-10">
          <div className="row">
            <div className="col-xl-3">
              <NavScrollTo>
                <nav className="nav">
                  <a
                    className="nav-link"
                    href="#basicTable"
                    data-toggle="scroll-to"
                  >
                    Basic table
                  </a>
                  <a
                    className="nav-link"
                    href="#tableHeadOptions"
                    data-toggle="scroll-to"
                  >
                    Table head options
                  </a>
                  <a
                    className="nav-link"
                    href="#stripedRows"
                    data-toggle="scroll-to"
                  >
                    Striped rows
                  </a>
                  <a
                    className="nav-link"
                    href="#borderedTable"
                    data-toggle="scroll-to"
                  >
                    Bordered table
                  </a>
                  <a
                    className="nav-link"
                    href="#borderlessTable"
                    data-toggle="scroll-to"
                  >
                    Borderless table
                  </a>
                  <a
                    className="nav-link"
                    href="#hoverableRows"
                    data-toggle="scroll-to"
                  >
                    Hoverable rows
                  </a>
                  <a
                    className="nav-link"
                    href="#smallTable"
                    data-toggle="scroll-to"
                  >
                    Small table
                  </a>
                  <a
                    className="nav-link"
                    href="#contextualClasses"
                    data-toggle="scroll-to"
                  >
                    Contextual classes
                  </a>
                  <a
                    className="nav-link"
                    href="#captions"
                    data-toggle="scroll-to"
                  >
                    Captions
                  </a>
                  <a
                    className="nav-link"
                    href="#responsiveTables"
                    data-toggle="scroll-to"
                  >
                    Responsive tables
                  </a>
                </nav>
              </NavScrollTo>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AccountManagement;
