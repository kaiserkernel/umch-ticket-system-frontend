import React, { useEffect, useState } from "react";
import {
  Modal,
  Button,
  Row,
  Col,
  Form,
  Accordion
} from "react-bootstrap";
import { Card, CardBody } from "./../../components/card/card.jsx";
import DataTable from "react-data-table-component";

import { toast } from "react-toastify";
import ReactQuill from "react-quill";
import Select from "react-select";
import BeatLoader from "react-spinners/BeatLoader";
import BlockUI from "react-block-ui";
import "react-block-ui/style.css";
import EmailTemplateService from "../../sevices/email-template-service.js";
import { EmailTemplateDescription } from "../../globalVariables.js";

import { TicketTypeStructure } from "../../globalVariables.js";

import "./index.css"

function EmailTemplateManagement() {
  const [emailTemplates, setEmailTemplates] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [show, setShow] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [btnType, setBtnType] = useState("");
  const [deleteTemplate, setDeleteTemplate] = useState("");
  const [selectedItems, setSelectedItems] = useState("");
  const [categoryData, setCategoryData] = useState([]);
  const [visibleEmailTemplateOption, setVisibleEmailTemplateOption] = useState("")

  const [formData, setFormData] = useState({
    id: "",
    inquiryCategory: "",
    subCategory1: "",
    emailTemplateTitle: "",
    emailTemplateContent: "",
    emailTemplateState: ""
  });

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const validate = () => {
    const newErrors = {};
    if (selectedItems.length == 0) {
      newErrors.subCategories = "This field is required";
    }
    if (selectedItems.value !== "student" && formData.emailTemplateTitle == "") {
      newErrors.emailTemplateTitle = "This field is required";
    }
    if (selectedItems.value !== "student" && !formData.emailTemplateState) {
      newErrors.emailTemplateState = "This field is required"
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
    setErrors({});
    if (btnType === "add") {
      setFormData({
        id: "",
        inquiryCategory: "",
        subCategory1: "",
        emailTemplateTitle: "",
        emailTemplateContent: "",
        emailTemplateState: ""
      });
      setSelectedItems("");
    }

  }, [show, deleteTemplate, btnType]);

  useEffect(() => {
    const _initialData = [
      {
        value: "",
        label: "Select All Categories"
      },
      {
        value: "student",
        label: "Student Default Template"
      }
    ];

    const _categoryData = _initialData.concat(
      TicketTypeStructure.map((log) => {
        if (log.types) {
          const _subCategory = log.types.map(logSec => ({
            label: logSec,
            value: log.name + "-" + logSec
          }));
          return {
            label: log.name,
            subcategories: _subCategory
          }
        } else {
          return {
            label: log.name,
            value: log.name
          }
        }
      })
    );
    setCategoryData(_categoryData);
  }, [])

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleAddEmailTemplate = async () => {
    setBtnType("add");

    try {
      if (validate()) {
        setLoading(true);

        const res = await EmailTemplateService.addEmailTemplate(formData);
        successNotify(res?.message);
        setLoading(false);
        setShow(false);

        setFormData({
          inquiryCategory: "",
          subCategory1: "",
          emailTemplateTitle: "",
          emailTemplateContent: "",
          emailTemplateState: ""
        });
      }
    } catch (err) {
      errorNotify(err.message);
      console.log(err);
      setLoading(false);
    }
    setLoading(false);
  };

  // Handle set up options for selecing email template state
  const setUpEmailTemplateState = (inquiryCategory, subCategory1) => {
    if (inquiryCategory === "Book rental UMCH library" || (
      inquiryCategory === "Application and Requests" && (
        subCategory1 === "Absence" ||
        subCategory1 === "Change of study group" ||
        subCategory1 === "Change of teaching hospital" ||
        subCategory1 === "Demonstrator student" ||
        subCategory1 === "Online Catalogue (Solaris)" ||
        subCategory1 === "Recognition of Courses" ||
        subCategory1 === "Recognition of Internship" ||
        subCategory1 === "Syllabus of the academic year" ||
        subCategory1 === "Transcript to Targu Mures" ||
        subCategory1 === "Transcript of Records"
      )
    )) {
      setVisibleEmailTemplateOption("accept")
    } else {
      setFormData(prev => ({
        ...prev,
        emailTemplateState: "close"
      }))
      setVisibleEmailTemplateOption("close")
    }
  }

  // Handle selection of subcategory in main select component
  const handleSelectChange = (selectedOption) => {
    setSelectedItems(selectedOption || []);

    let inquiryCategory = selectedOption.value;
    let subCategory1 = "";

    if (selectedOption.value.indexOf("-")) {
      const idx = selectedOption.value.indexOf("-");
      inquiryCategory = selectedOption.value.substring(0, idx);
      subCategory1 = selectedOption.value.substring(idx + 1);
    }

    setFormData({
      ...formData,
      inquiryCategory,
      subCategory1
    });

    setUpEmailTemplateState(inquiryCategory, subCategory1)
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

  const handleSaveEmailTemplate = async () => {
    try {
      setLoading(true);
      const res = await EmailTemplateService.editEmailTemplate(formData);
      setEmailTemplates(res?.emailTemplates);
      setShow(false);
      setFormData({
        id: "",
        emailTemplateTitle: "",
        emailTemplateContent: "",
        emailTemplateState: ""
      });
      setLoading(false);
    } catch (err) {
      console.log(err?.message);
      setLoading(false);
    }
    setLoading(false);
  };

  const handleEditTemplate = async (id) => {
    setBtnType("edit");
    setShow(true);
    try {
      const { data } = await EmailTemplateService.getEmailTemplate(id);

      setFormData({
        ...formData,
        id: data._id,
        emailTemplateTitle: data.emailTemplateTitle,
        emailTemplateContent: data.emailTemplateContent,
        emailTemplateState: data.emailTemplateState
      });

      let value;
      if (data.subCategory1 === 'student') {
        value = "student"
      } else {
        value = data.subCategory1 ? `${data.inquiryCategory}-${data.subCategory1}` : data.inquiryCategory;
      }

      setSelectedItems({
        value: value,
        label: (data.subCategory1 ? data.subCategory1 : data.inquiryCategory),
        isSubcategory: true
      });

      setUpEmailTemplateState(data.inquiryCategory, data.subCategory1)
    } catch (err) {
      console.log(err?.message);
    }
  };

  const handleNewEmailTemplate = () => {
    setBtnType("add");
    setFormData({
      id: "",
      emailTemplateTitle: "",
      emailTemplateContent: "",
      emailTemplateState: ""
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
      selector: (row) => row?.emailTemplateTitle,
      width: "200px",
      sortable: true
    },

    {
      name: "Template Content",

      selector: (row) => (
        <div
          className="template-content"
          dangerouslySetInnerHTML={{ __html: row?.emailTemplateContent }}
          style={{ whiteSpace: "nowrap" }} // Preserve inline styles or add more styles as needed
        />
      ),
      sortable: true
    },
    {
      name: "Inquiry Category",

      selector: (row) => (row.subCategory1 ? (row.subCategory1 === "Other" ? `Other-${row.inquiryCategory}` : row.subCategory1) : row.inquiryCategory),
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
            label: sub.label,
            value: sub.value,
            isSubcategory: true // Mark subcategories for custom styles
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
      paddingLeft: state.data.isSubcategory ? "1.5rem" : "0.5rem", // Apply ms-3 only to subcategories
      "&:hover": {
        backgroundColor: "#e6f7ff",
        color: "#333"
      }
    }),
    singleValue: (provided) => ({
      ...provided,
      paddingLeft: "0rem" // Ensure no ms-3 for selected value
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

  const TemplateContentDescription = () => {
    if (selectedItems?.value === "student") {
      return (
        <>
          <p>
            You can insert this dynamic variable to Template Content. To add, you should type the text inside quotation mark.
            <br />
            eg: <span className="fw-bold">[text1]</span>
          </p>
          <p>
            -Student's Name ( "[student]" )
          </p>
          <p>
            -Inquiry Category ( "[inquiryCategory]" )
          </p>
          <p>
            -Subcategory ( "[subCategory1]" )
          </p>
          <p>
            -Inquiry number ( "[inquiryNumber]" )
          </p>
          <p>
            -Inquiry created time ( "[createdTime]" )
          </p>
        </>
      )
    } else if (selectedItems) {
      return (
        <>
          <div>
            To create default template of seleted ticket type, you select category as "Select All Category"
          </div>
          <div>
            You can insert this dynamic variable to Template Content. To add, you should type the text inside quotation mark.
            <br />
            eg: <span className="fw-bold">[text1]</span>
          </div>
          {EmailTemplateDescription[selectedItems?.value.includes("-") ? selectedItems.value.substring(selectedItems.value.indexOf("-") + 1) : selectedItems.value]}
          <hr />
          <p>
            -Student's Name ( "[student]" )
          </p>
          <p>
            -Admin's name ( "[admin]" )
          </p>
          <p>
            -Institution/Organization Name ( "[position]" )
          </p>
          <p>
            -Contact Information ( "[email]" )
          </p>
        </>
      )
    } else {
      return (
        <>
          <div>
            To create default template for all ticket type, you should select ticket type as "Select All" and type "<span className="fw-bold">Default</span>" to Template Title
          </div>
          <hr />
          <p>
            -Student's Name ( "[student]" )
          </p>
          <p>
            -Admin's name ( "[admin]" )
          </p>
          <p>
            -Institution/Organization Name ( "[position]" )
          </p>
          <p>
            -Contact Information ( "[email]" )
          </p>
        </>
      )
    }
  }

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
        <BlockUI blocking={loading}>
          <Modal.Header closeButton>
            <Modal.Title>
              {btnType != "edit"
                ? "Add New Email Template"
                : "Edit Email Template"}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row className="mt-4">
              <Col lg={12}>
                <Form.Group controlId="emailTemplateTitle" className="mt-3">
                  <Select
                    options={formatOptions(categoryData)}
                    value={selectedItems}
                    onChange={handleSelectChange}
                    isMulti={false}
                    placeholder="Select subcategories"
                    closeMenuOnSelect={true}
                    hideSelectedOptions={false}
                    menuPosition="fixed"
                    styles={customStyles}
                    isDisabled={btnType === "edit"}
                  />
                </Form.Group>
                {errors.subCategories && (
                  <p className="error-content">{errors.subCategories}</p>
                )}
                <Form.Group controlId="emailTemplateTitle" className="mt-3" hidden={selectedItems.value === "student"}>
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
                <Form.Select
                  aria-label="Select State" className="mt-3 custom-input"
                  value={formData.emailTemplateState}
                  onChange={(evt) => {
                    setFormData(prev => ({ ...prev, emailTemplateState: evt.target.value }))
                  }}
                  hidden={selectedItems.value === "student"}
                  disabled={btnType === "edit"}
                >
                  <option value="">Select State</option>
                  {
                    visibleEmailTemplateOption === "accept" && (
                      <>
                        <option value="accept">Accept</option>
                        <option value="reject">Reject</option>
                      </>
                    )
                  }
                  {
                    visibleEmailTemplateOption === "close" && (
                      <option value="close">Close</option>
                    )
                  }
                </Form.Select>
                {errors.emailTemplateState && (
                  <p className="error-content">{errors.emailTemplateState}</p>
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
                <Accordion className="mt-4">
                  <Accordion.Item>
                    <Accordion.Header>Template Content Description</Accordion.Header>
                    <Accordion.Body>
                      <TemplateContentDescription />
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
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
        </BlockUI>
      </Modal>
    </div>
  );
}

export default EmailTemplateManagement;
