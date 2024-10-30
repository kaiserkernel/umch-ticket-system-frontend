import React, { useEffect, useState, useRef } from "react";
import { Modal, Button, Row, Col, Form, Badge } from "react-bootstrap";
import { Card, CardBody } from "./../../components/card/card.jsx";
import DataTable from "react-data-table-component";
import UserService from "../../sevices/user-service.js";
import moment from "moment";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { px } from "framer-motion";

function AccountManagement() {
  const [admins, setAdmins] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const badgeData = [
    { bg: "primary", text: "Mrs Vice-Rector" },
    { bg: "info", text: "UMCH Studysecretariat" },
    { bg: "warning", text: "UMFST Administration Office" },
    { bg: "secondary", text: "IT / Support S. Knippenberg" },
  ];

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    role: 0,
    position: 0,
    email: "",
    password: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await UserService.getAdmins();
        setAdmins(res);
      } catch (err) {
        errorNotify(err.message);
      }
    };

    fetchData();
  }, [show]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddNewUser = async () => {
    try {
      const res = await UserService.createAdmin(formData);
      successNotify(res.message);
    } catch (err) {
      if (err?.message) {
        errorNotify(err?.message);
      }

      const errors = err?.errors;

      if (typeof errors != "object") {
        errorNotify(errors);
      } else {
        console.log(typeof errors);
        errors.map((error) => {
          errorNotify(error.msg);
        });
      }
    }
  };

  const successNotify = (msg) => {
    toast.info(msg, {
      autoClose: 5000, // Duration in milliseconds
    });
  };
  const errorNotify = (msg) => {
    toast.warning(msg, {
      autoClose: 5000, // Duration in milliseconds
    });
  };

  const columns = [
    {
      name: "Full Name",
      selector: (row) => row.firstName + " " + row.lastName,
      sortable: true,
    },
    {
      name: "Position",
      width: "300px",

      cell: (row) => (
        <>
          {badgeData[row.position] && (
            <Badge
              style={{ fontSize: "14px", fontWeight: "300" }}
              bg={badgeData[row.position].bg}
            >
              {badgeData[row.position].text}
            </Badge>
          )}
        </>
      ),
    },
    {
      name: "Email Address",
      width: "300px",
      selector: (row) => row.email,
      sortable: true,
    },

    {
      name: "Registered At",
      width: "300px",
      cell: (row) => moment(row.createdAt).format("MMMM DD, YYYY"),
      sortable: true,
    },
    {
      name: "Actions",
      width: "250px",
      cell: (row) => (
        <div className="d-flex py-4">
          <a className="btn btn-info me-1">
            {" "}
            <i className="bi bi-arrow-counterclockwise me-1"></i>Reset
          </a>
          <a className="btn btn-secondary">
            {" "}
            <i className="bi bi-trash me-1"></i>Delete
          </a>
        </div>
      ),
    },
  ];

  // Filter data based on search text
  const filteredData = admins.filter((item) =>
    item.firstName.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div className="">
      <div className="row ">
        <ToastContainer />
        <div className="col-xl-12">
          <div className="row bs-gutter-x-0">
            <div className="col-xl-12">
              <div id="datatable" className="mb-5">
                <Card>
                  <CardBody>
                    <div className="d-flex justify-content-between mb-5">
                      <Button
                        className="btn btn-primary me-1"
                        onClick={handleShow}
                      >
                        {" "}
                        <i className="bi bi-pencil me-1"></i>Add New User
                      </Button>
                      <input
                        type="text"
                        placeholder="Search by User Name..."
                        onChange={(e) => setSearchText(e.target.value)}
                        style={{ padding: "5px" }}
                      />
                    </div>
                    <DataTable
                      columns={columns}
                      data={filteredData}
                      pagination
                      paginationRowsPerPageOptions={[5, 10, 15]}
                      defaultSortField="name"
                    />
                  </CardBody>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add New User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row className="mt-4">
            <Col lg={12}>
              <Form.Group controlId="firstName" className="mt-3">
                <Form.Control
                  type="text"
                  placeholder="First Name"
                  name="firstName"
                  className="custom-input"
                  value={formData.firstName}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group controlId="lastName" className="mt-3">
                <Form.Control
                  type="text"
                  placeholder="Last Name"
                  name="lastName"
                  className="custom-input"
                  value={formData.lastName}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group controlId="position" className="mt-3">
                <Form.Control
                  as="select"
                  name="position"
                  onChange={handleChange}
                  value={formData.position}
                  style={{
                    appearance: "none", // Hides the default arrow
                    MozAppearance: "none", // For Firefox
                    WebkitAppearance: "none", // For Safari/Chrome
                    backgroundColor: "white",
                    color: "gray !important",
                  }}
                  className="custom-input"
                >
                  <option value="0">Mrs Vice-Rector</option>
                  <option value="1">UMCH Studysecretariat</option>
                  <option value="2">UMFST Administration Office</option>
                  <option value="3">IT / Support S. Knippenberg</option>
                </Form.Control>
              </Form.Group>
              <Form.Group controlId="email" className="mt-3">
                <Form.Control
                  type="email"
                  placeholder="Email Address"
                  name="email"
                  className="custom-input"
                  value={formData.email}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group controlId="password" className="mt-3">
                <Form.Control
                  type="text"
                  placeholder="Password"
                  name="password"
                  className="custom-input"
                  value={formData.password}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleAddNewUser}>
            Add
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default AccountManagement;
