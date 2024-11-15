import React, { useEffect, useState, useRef } from "react";
import {
  Modal,
  Button,
  Row,
  Col,
  Form,
  Badge,
  Popover,
  OverlayTrigger,
  ButtonToolbar
} from "react-bootstrap";
import { Card, CardBody } from "./../../components/card/card.jsx";
import DataTable from "react-data-table-component";
import UserService from "../../sevices/user-service.js";
import moment from "moment";
import { ToastContainer, toast } from "react-toastify";
import Select, { components } from "react-select";
import "react-toastify/dist/ReactToastify.css";

import AuthService from "../../sevices/auth-service.js";
import BlockUI from "react-block-ui";
import "react-block-ui/style.css";

import { CATEGORYDATA } from "../../globalVariables.js";

function AccountManagement() {
  const [admins, setAdmins] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [show, setShow] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [permissions, setPermissions] = useState({});

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const badgeData = [
    { bg: "primary", text: "UMCH Study Secretariat" },
    { bg: "info", text: "UMFST Administration Board Management (Vice-Rector)" },
    { bg: "warning", text: "UMFST Administration Office (UMFST Targu Mures)" },
    { bg: "secondary", text: "CPE Board Management" },
    { bg: "success", text: "UMCH Finance Department" },
    { bg: "danger", text: "UMCH German Department" },
    { bg: "light", text: "UMCH Teaching Hospital Coordination" },
    { bg: "dark", text: "UMCH IT-SUPPORT" },
    { bg: "dark", text: "UMFST - Rector (UMFST Targu Mures)" }
  ];

  const defaultPermissions = ["None", "Passive", "Active", "Responsible"];

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    title: "",
    role: 0,
    position: "-1",
    email: "",
    password: ""
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
      [e.target.name]: e.target.value
    });
  };

  const handleAddNewUser = async () => {
    const categories = [];
    selectedItems.map((item) => {
      const categoryId = item.value;
      let categoryIdArr = categoryId.split("-");

      const permission = permissions[item.value];

      const category = {
        inquiryCategory: categoryIdArr[0],
        subCategory1: categoryIdArr[1] ? categoryIdArr[1] : "null",
        permission: defaultPermissions[permission]
      };
      categories.push(category);
    });

    const combinedFormData = Object.assign({}, formData, {
      category: categories
    });
    try {
      const res = await UserService.createAdmin(combinedFormData);
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
      autoClose: 5000 // Duration in milliseconds
    });
  };

  const errorNotify = (msg) => {
    toast.warning(msg, {
      autoClose: 5000 // Duration in milliseconds
    });
  };

  const resetAdminData = (item) => {
    const newData = admins.filter((log) => log.email !== item);
    setAdmins(newData);
  };

  const popupResetPassword = (email) => (
    <Popover id={`${email}resetPwd`} className="wrap-popover">
      <Popover.Header>Reset Password?</Popover.Header>
      <Popover.Body>
        <button
          className="btn btn-sm btn-primary rounded-2"
          onClick={async (evt) => {
            const response = await AuthService.resetPasswordToDefault(email);
            successNotify("Password reseted successfully");
          }}
        >
          Yes
        </button>
        <button className="btn btn-sm btn-danger ms-3 rounded-2">No</button>
      </Popover.Body>
    </Popover>
  );

  const popupDelete = (email) => (
    <Popover id={`${email}delUser`} className="wrap-popover">
      <Popover.Header>Delete User?</Popover.Header>
      <Popover.Body>
        <button
          className="btn btn-sm btn-primary rounded-2"
          onClick={async (evt) => {
            const response = await AuthService.deleteUser(email);
            if (response.message == "SuperAdmin") {
              return errorNotify("Error: Super Admin");
            }
            successNotify("User deleted successfully");
            resetAdminData(email);
          }}
        >
          Yes
        </button>
        <button className="btn btn-sm btn-danger ms-3 rounded-2">No</button>
      </Popover.Body>
    </Popover>
  );

  const columns = [
    {
      name: "Full Name",
      selector: (row) => row.firstName + " " + row.lastName,
      sortable: true
    },
    {
      name: "Position",
      width: "500px",

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
      )
    },
    {
      name: "Email Address",
      width: "300px",
      selector: (row) => row.email,
      sortable: true
    },

    {
      name: "Registered At",
      width: "300px",
      cell: (row) => moment(row.createdAt).format("MMMM DD, YYYY"),
      sortable: true
    },
    {
      name: "Actions",
      width: "250px",
      cell: (row) => (
        <ButtonToolbar>
          <OverlayTrigger
            trigger="focus"
            placement="top"
            overlay={popupResetPassword(row.email)}
          >
            <Button>
              <i className="bi bi-arrow-counterclockwise me-1"></i>Reset
            </Button>
          </OverlayTrigger>
          <OverlayTrigger
            trigger="focus"
            placement="top"
            overlay={popupDelete(row.email)}
          >
            <Button className="btn btn-secondary ms-3">
              <i className="bi bi-trash me-1"></i>Delete
            </Button>
          </OverlayTrigger>
        </ButtonToolbar>
      )
    }
  ];

  // Filter data based on search text
  const filteredData = admins.filter((item) =>
    item.firstName.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div className="">
      <div className="row ">
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
              <Form.Group controlId="title" className="mt-3">
                <Form.Control
                  type="text"
                  placeholder="Title"
                  name="title"
                  className="custom-input"
                  value={formData.title}
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
                    color: "gray !important"
                  }}
                  className="custom-input"
                  placeholder="Position"
                >
                  <option value="-1">Select Position</option>
                  <option value="0">UMCH Study Secretariat</option>
                  <option value="1">
                    UMFST Administration Board Management (Vice-Rector)
                  </option>
                  <option value="2">
                    UMFST Administration Office (UMFST Targu Mures)
                  </option>
                  <option value="3">CPE Board Management</option>
                  <option value="4">UMCH Finance Department</option>
                  <option value="5">UMCH Facility Department</option>
                  <option value="6">UMCH Teaching Hospital Coordination</option>
                  <option value="7">UMCH IT-SUPPORT</option>
                  <option value="8">UMFST - Rector (UMFST Targu Mures)</option>
                </Form.Control>
              </Form.Group>
              <MultiLevelSelectWithPermissions
                options={CATEGORYDATA}
                setSelectedItems={setSelectedItems}
                selectedItems={selectedItems}
                setPermissions={setPermissions}
                permissions={permissions}
              />
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

const MultiLevelSelectWithPermissions = ({
  options,
  setSelectedItems,
  setPermissions,
  selectedItems,
  permissions
}) => {
  const selectedCategoryBadge = [
    { bg: "secondary" },
    { bg: "warning" },
    { bg: "primary" },
    { bg: "success" }
  ];

  const defaultPermissions = ["None", "Passive", "Active", "Responsible"];
  // Handle selection of subcategory in main select component
  const handleSelectChange = (selectedOptions) => {
    setSelectedItems(selectedOptions || []);

    selectedOptions.map((option) => {
      setPermissions({
        ...permissions,
        [option.value]: 0
      });
    });
  };

  // Update the permission for a specific subcategory
  const handlePermissionChange = (subcategoryValue, permission) => {
    setPermissions({
      ...permissions,
      [subcategoryValue]: permission
    });
  };

  // Prepare main options for Select component
  const formatOptions = (data) =>
    data.reduce((acc, category) => {
      if (category?.subcategories) {
        acc.push({
          label: <div style={{ fontWeight: "bold" }}>{category.label}</div>,
          value: category.value,
          isDisabled: true // Prevent main category selection
        });
      } else {
        acc.push({
          label: <div style={{ fontWeight: "bold" }}>{category.label}</div>,
          value: category.value,
          isDisabled: false // Prevent main category selection
        });
      }
      if (category?.subcategories) {
        category?.subcategories.forEach((sub) =>
          acc.push({
            label: (
              <div
                style={{ display: "flex", alignItems: "center" }}
                className="ms-3"
              >
                {sub.label}
              </div>
            ),
            value: sub.value
          })
        );
      }
      return acc;
    }, []);

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? "#f0f8ff" : "#fff",
      borderColor: state.isFocused ? "#2596be" : "#002d47",
      borderWidth: state.isFocused ? "5px" : "1px",
      borderRadius: "0px",
      padding: "5px",
      fontSize: "16px",
      "&:hover": {
        borderColor: state.isFocused ? "#2596be" : "#002d47"
      }
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? "#4a90e2" : "#fff",
      color: state.isSelected ? "#fff" : "#333",
      "&:hover": {
        backgroundColor: "#e6f7ff",
        color: "#333"
      }
    }),
    menu: (provided) => ({
      ...provided,
      borderRadius: "5px",
      marginTop: "5px",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.15)"
    }),
    placeholder: (provided) => ({
      ...provided,
      color: "#999"
    }),
    multiValue: (provided) => ({
      ...provided,
      backgroundColor: "#4a90e2",
      color: "#fff",
      borderRadius: "3px"
    }),
    multiValueLabel: (provided) => ({
      ...provided,
      color: "#fff"
    }),
    multiValueRemove: (provided) => ({
      ...provided,
      color: "#fff",
      cursor: "pointer",
      "&:hover": {
        backgroundColor: "#ff5e5e",
        color: "white"
      }
    })
  };

  return (
    <div>
      <div className="permissions-section mb-3">
        {selectedItems.map((item) => (
          <div key={item.value} style={{ marginTop: "15px" }}>
            <Badge
              style={{ fontSize: "14px", fontWeight: "300" }}
              bg={selectedCategoryBadge[permissions[item.value]].bg}
            >
              <span>{item.label.props.children}:</span>
            </Badge>

            <select
              style={{ marginLeft: "10px" }}
              onChange={(e) =>
                handlePermissionChange(item.value, e.target.value)
              }
              value={permissions[item.value] || ""}
            >
              {defaultPermissions.map((perm, index) => (
                <option key={index} value={index}>
                  {perm}
                </option>
              ))}
            </select>
          </div>
        ))}
      </div>
      <Select
        options={formatOptions(options)}
        value={selectedItems}
        onChange={handleSelectChange}
        isMulti
        placeholder="Select subcategories"
        closeMenuOnSelect={false}
        hideSelectedOptions={false}
        menuPosition="fixed"
        styles={customStyles}
      />
    </div>
  );
};

export default AccountManagement;
