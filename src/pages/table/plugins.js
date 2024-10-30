import React, { useEffect, useState, useRef } from "react";
import { Card, CardBody } from "./../../components/card/card.jsx";
import { NavScrollTo } from "./../../components/nav-scroll-to/nav-scroll-to.jsx";
import Highlight from "react-highlight";
import "datatables.net-bs5/css/dataTables.bootstrap5.min.css";
import "datatables.net-responsive-bs5/css/responsive.bootstrap5.min.css";
import "datatables.net-fixedcolumns-bs5/css/fixedColumns.bootstrap5.min.css";
import "datatables.net-buttons-bs5/css/buttons.bootstrap5.min.css";

const $ = require("jquery");
$.DataTable = require("datatables.net");
require("datatables.net-bs5");
require("datatables.net-buttons");
require("datatables.net-buttons/js/buttons.colVis.min.js");
require("datatables.net-buttons/js/buttons.html5.min.js");
require("datatables.net-buttons/js/buttons.print.min.js");
require("datatables.net-buttons-bs5");
require("datatables.net-responsive");
require("datatables.net-responsive-bs5");
require("datatables.net-fixedcolumns");
require("datatables.net-fixedcolumns-bs5");

function AccountManagement() {
  const [code1, setCode1] = useState();
  const tableRef = useRef(null);

  useEffect(() => {
    fetch("/assets/data/table/plugin-code-1.json")
      .then(function (response) {
        return response.text();
      })
      .then((html) => {
        setCode1(html);
      });

    tableRef.current = $("#datatableDefault").DataTable({
      dom: "<'row mb-3'<'col-md-4 mb-3 mb-md-0'l><'col-md-8 text-end'<'d-lg-flex justify-content-end'f<'d-lg-block d-none'B>>>>t<'row align-items-center mt-3'<'mr-auto col-md-6 mb-3 mb-md-0 'i><'mb-0 col-md-6'p>>",
      lengthMenu: [10, 20, 30, 40, 50],
      responsive: true,
      buttons: [
        { extend: "print", className: "btn btn-outline-default btn-sm ms-2" },
        { extend: "csv", className: "btn btn-outline-default btn-sm" },
      ],
    });

    return function cleanUp() {
      if (tableRef.current) {
        tableRef.current.destroy();
      }
    };

    // eslint-disable-next-line
  }, []);

  return (
    <div className="container">
      <div className="row ">
        <div className="col-xl-12">
          <div className="row">
            <div className="col-xl-12">
              <div id="datatable" className="mb-5">
                <Card>
                  <CardBody>
                    <table
                      id="datatableDefault"
                      className="table text-nowrap w-100"
                    >
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Full Name</th>
                          <th>Role</th>
                          <th>Email Address</th>
                          <th>Password</th>
                          <th>Registered At</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>1.</td>
                          <td>Test User</td>
                          <td>Student</td>
                          <td>test@gmail.com</td>
                          <td>61</td>
                          <td>10/15/2024</td>
                          <td>
                            <a className="btn btn-primary me-1">
                              {" "}
                              <i className="bi bi-pencil me-1"></i>Edit
                            </a>
                            <a className="btn btn-secondary">
                              {" "}
                              <i className="bi bi-trash me-1"></i>Delete
                            </a>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </CardBody>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AccountManagement;
