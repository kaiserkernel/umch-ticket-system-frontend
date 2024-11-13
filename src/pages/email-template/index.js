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

import { ToastContainer, toast } from "react-toastify";
import ReactQuill from "react-quill";
import EmailTemplateService from "../../sevices/email-template-service.js";
import BeatLoader from "react-spinners/BeatLoader";
import BlockUI from "react-block-ui";
import "react-block-ui/style.css";

function EmailTemplateManagement() {
  const [emailTemplates, setEmailTemplates] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [show, setShow] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [btnType, setBtnType] = useState("");
  const [deleteTemplate, setDeleteTemplate] = useState("");

  const [formData, setFormData] = useState({
    id: "",
    emailTemplateTitle: "",
    emailTemplateContent: ""
  });

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const validate = () => {
    const newErrors = {};

    if (formData.emailTemplateTitle == "") {
      newErrors.emailTemplateTitle = "This field is required";
    }
    if (!formData.emailTemplateContent) {
      newErrors.emailTemplateContent = "This field is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await EmailTemplateService.getEmailTemplates();
        setEmailTemplates(res?.emailTemplate);
      } catch (err) {
        errorNotify(err.message);
      }
    };

    fetchData();
  }, [show, deleteTemplate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleAddEmailTemplate = async () => {
    setBtnType("add");
    setFormData({
      id: "",
      emailTemplateTitle: "",
      emailTemplateContent: ""
    });
    try {
      if (validate()) {
        setLoading(true);
        const res = await EmailTemplateService.addEmailTemplate(formData);
        successNotify(res?.message);
        setLoading(false);
        setShow(false);
        setFormData({
          id: "",
          emailTemplateTitle: "",
          emailTemplateContent: ""
        });
      }
    } catch (err) {
      errorNotify(err.message);
      console.log(err);
      setLoading(false);
    }
    setLoading(false);
  };

  const handleDeleteTemplate = async (id) => {
    setBtnType("delete");
    setLoading(true);
    try {
      const res = await EmailTemplateService.deleteEmailTemplate(id);
      setLoading(false);
      successNotify(res?.message);
      setDeleteTemplate(new Date());
    } catch (err) {
      errorNotify(err?.message);
      setLoading(false);
    }
    setLoading(false);
  };

  const handleEditTemplate = async (id) => {
    setBtnType("edit");
    setShow(true);
    try {
      const res = await EmailTemplateService.getEmailTemplate(id);
      setFormData({
        ...formData,
        id: res?.emailTemplate?._id,
        emailTemplateTitle: res?.emailTemplate?.emailTemplateTitle,
        emailTemplateContent: res?.emailTemplate?.emailTemplateContent
      });
    } catch (err) {
      console.log(err?.message);
    }
  };

  const handleSaveEmailTemplate = async () => {
    try {
      setLoading(true);
      const res = await EmailTemplateService.editEmailTemplate(formData);
      setEmailTemplates(res?.emailTemplates);
      setShow(false);
      setFormData({
        id: "",
        emailTemplateTitle: "",
        emailTemplateContent: ""
      });
      setLoading(false);
    } catch (err) {
      console.log(err?.message);
      setLoading(false);
    }
    setLoading(false);
  };

  const handleNewEmailTemplate = async () => {
    setBtnType("add");
    setFormData({
      id: "",
      emailTemplateTitle: "",
      emailTemplateContent: ""
    });
    setShow(true);
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

  const columns = [
    {
      name: "Template Name",
      selector: (row) => row.emailTemplateTitle,
      width: "200px",
      sortable: true
    },

    {
      name: "Template Content",

      selector: (row) => (
        <div
          className="template-content"
          dangerouslySetInnerHTML={{ __html: row.emailTemplateContent }}
          style={{ whiteSpace: "nowrap" }} // Preserve inline styles or add more styles as needed
        />
      ),
      sortable: true
    },

    {
      name: "Actions",
      width: "250px",
      cell: (row) => (
        <>
          <Button
            className="btn btn-info"
            onClick={() => handleEditTemplate(row?._id)}
          >
            <i className="bi bi-pencil me-1"></i>Edit
          </Button>

          <Button
            onClick={() => handleDeleteTemplate(row?._id)}
            className="btn btn-secondary ms-3"
          >
            <i className="bi bi-trash me-1"></i>Delete
          </Button>
        </>
      )
    }
  ];

  //   Filter data based on search text
  const filteredData = emailTemplates.filter((item) =>
    item.emailTemplateTitle.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <BlockUI blocking={loading}>
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
                          onClick={handleNewEmailTemplate}
                        >
                          {" "}
                          + Add New Email Template
                        </Button>
                        <input
                          type="text"
                          placeholder="Search by Template Name..."
                          onChange={(e) => setSearchText(e.target.value)}
                          style={{ padding: "5px" }}
                        />
                      </div>
                      {loading ? (
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "center"
                          }}
                        >
                          <BeatLoader size={10} />
                        </div>
                      ) : (
                        emailTemplates && (
                          <DataTable
                            columns={columns}
                            data={filteredData}
                            pagination
                            paginationRowsPerPageOptions={[5, 10, 15]}
                            defaultSortField="name"
                          />
                        )
                      )}
                    </CardBody>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add New Email Template</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row className="mt-4">
              <Col lg={12}>
                <Form.Group controlId="emailTemplateTitle" className="mt-3">
                  <Form.Control
                    type="text"
                    placeholder="Template Title"
                    name="emailTemplateTitle"
                    className="custom-input"
                    value={formData.emailTemplateTitle}
                    onChange={handleChange}
                  />
                </Form.Group>
                {errors.emailTemplateTitle && (
                  <p className="error-content">{errors.emailTemplateTitle}</p>
                )}
                <Form.Group controlId="emailTemplateContent" className="mt-3">
                  <ReactQuill
                    placeholder="Template Content"
                    name="emailTemplateContent"
                    value={formData.emailTemplateContent}
                    onChange={(data) =>
                      setFormData({ ...formData, emailTemplateContent: data })
                    }
                  />
                </Form.Group>
                {errors.emailTemplateContent && (
                  <p className="error-content">{errors.emailTemplateContent}</p>
                )}
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            {btnType == "add" && (
              <Button variant="primary" onClick={handleAddEmailTemplate}>
                {loading ? (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center"
                    }}
                  >
                    <BeatLoader color="white" size={10} />
                  </div>
                ) : (
                  <span>Add</span>
                )}
              </Button>
            )}
            {btnType == "edit" && (
              <Button variant="primary" onClick={handleSaveEmailTemplate}>
                {loading ? (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center"
                    }}
                  >
                    <BeatLoader color="white" size={10} />
                  </div>
                ) : (
                  <span>Save</span>
                )}
              </Button>
            )}
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </BlockUI>
  );
}

export default EmailTemplateManagement;
