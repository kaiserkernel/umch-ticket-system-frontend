import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardBody } from "./../../components/card/card.jsx";
import "lity";
import "lity/dist/lity.min.css";
import { Link } from "react-router-dom";
import {
  Modal,
  Form,
  Row,
  Col,
  Tooltip,
  ButtonToolbar,
  OverlayTrigger
} from "react-bootstrap";
import authService from "../../sevices/auth-service.js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../../context/authProvider.js";

function Profile() {
  const {
    isAuthenticated,
    setIsAuthenticated,
    isAvatarUpdated,
    setAvatarUpdated
  } = useAuth();

  const [userData, setUserData] = useState(
    JSON.parse(localStorage.getItem("userData"))
  );

  const roleName = ["Admin", "Teacher", "Student"];
  const [profileModalVisible, setProfileModalVisible] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [profileData, setProfileData] = useState({
    firstName: userData.firstName,
    lastName: userData.lastName,
    password: "",
    avatar: userData.avatar,
    confirmPassword: ""
  });
  const [validated, setValidated] = useState(false);
  const [confirmPasswordValidate, setConfirmPasswordValidate] = useState(true);

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

  const tooltipComponent = (
    <Tooltip id="tooltip">Click and Update your image</Tooltip>
  );

  // Handle image selection
  const onImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Create a preview URL for the selected image
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
      setProfileData((prev) => ({
        ...prev,
        avatar: file
      }));

      // Call a parent-provided function to update the image in the profileData
      // handleImageChange(file);
    }
  };

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setProfileData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (profileData.password !== profileData.confirmPassword) {
      setConfirmPasswordValidate(false);
      setValidated(false);
      return;
    }
    if (
      form.checkValidity() === false ||
      profileData.password !== profileData.confirmPassword
    ) {
      setValidated(true);
      return;
    }
    setProfileModalVisible(false);
    const sendData = { ...profileData, email: userData.email };
    const formDataToSend = new FormData();
    for (const key in sendData) {
      formDataToSend.append(key, sendData[key]);
    }

    const { user, message } = await authService.updateProfile(formDataToSend);
    if (message == "User profile updated successfully.") {
      successNotify(message);
      const newUser = { ...userData, ...user };
      const newUserDataStr = JSON.stringify(newUser);
      localStorage.setItem("userData", newUserDataStr);
      setUserData(newUser);
      setAvatarUpdated(new Date());
    } else {
      errorNotify(message);
    }
  };

  useEffect(() => {
    if (profileModalVisible) {
      setProfileData({
        firstName: userData.firstName,
        lastName: userData.lastName,
        password: "",
        confirmPassword: "",
        avatar: userData.avatar
      });
      setValidated(false);
      setConfirmPasswordValidate(true);
    }
  }, [profileModalVisible]);

  return (
    <>
      <Card className="">
        <CardBody className="p-0">
          <div className="profile">
            <div className="profile-container">
              <div className="profile-sidebar">
                <div className="desktop-sticky-top">
                  <div className="profile-img">
                    {userData?.avatar ? (
                      <img
                        src={`${process.env.REACT_APP_API_URL}${userData.avatar}`}
                        alt=""
                      />
                    ) : (
                      <img src="/assets/img/user_placeholder.webp" alt="" />
                    )}
                  </div>

                  <h4>{userData?.firstName + " " + userData?.lastName}</h4>
                  <div className="mb-3 text-inverse text-opacity-50 fw-bold mt-n2">
                    {roleName[userData.role]}
                  </div>

                  {/* <div className="mb-1">
                  <i className="fa fa-map-marker-alt fa-fw text-inverse text-opacity-50"></i>{" "}
                  New York, NY
                </div>
                <div className="mb-3">
                  <i className="fa fa-link fa-fw text-inverse text-opacity-50"></i>{" "}
                  seantheme.com/hud
                </div> */}

                  <hr className="mt-4 mb-4" />
                </div>
              </div>

              <div className="profile-content">
                <div className="profile-content-headerCaption">
                  Welcome to your UMCH Ticket System
                </div>

                <div className="profile-content-textCaption">
                  What do you want to do next?
                </div>
                {userData.role == 2 && (
                  <Link
                    to="/home"
                    className="btn btn-primary btn-lg d-block w-100 fw-500 mb-3 mx-5 py-3 fs-20px text-white"
                  >
                    Create a new ticket
                  </Link>
                )}
                <Link
                  to="/email/inbox"
                  className="btn btn-primary btn-lg d-block w-100 fw-500 mb-3 py-3 fs-20px text-white"
                >
                  Open your latest ticket
                </Link>
                <Link
                  to="/email/inbox"
                  className="btn btn-primary btn-lg d-block w-100 fw-500 mb-3 mr-5 py-3 fs-20px text-white"
                >
                  Check all tickets
                </Link>
                <button
                  className="btn btn-primary btn-lg d-block w-100 fw-500 mb-3 py-3 fs-20px text-white mb-5"
                  onClick={(evt) =>
                    setProfileModalVisible(!profileModalVisible)
                  }
                >
                  Edit your user profile
                </button>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>
      <Modal
        show={profileModalVisible}
        onHide={() => setProfileModalVisible(!profileModalVisible)}
        centered
      >
        <Modal.Header closeButton>
          <h4>Edit Your Profile</h4>
        </Modal.Header>
        <Modal.Body>
          <Form
            className="px-md-5 px-4 py-md-4 py-3"
            noValidate
            validated={validated}
            onSubmit={handleSubmit}
          >
            <ButtonToolbar className="mb-md-4 mb-3">
              <OverlayTrigger placement="top" overlay={tooltipComponent}>
                <div
                  className="cursor-pointer mx-auto"
                  onClick={() => document.getElementById("imageUpload").click()}
                >
                  {imagePreview ? (
                    <img
                      src={imagePreview}
                      width={150}
                      height={150}
                      alt={profileData.avatar}
                      className="object-fit-contain"
                    />
                  ) : userData?.avatar ? (
                    <img
                      src={`${process.env.REACT_APP_API_URL}${userData.avatar}`}
                      width={150}
                      height={150}
                      alt={process.env.REACT_APP_API_URL}
                      className="object-fit-contain"
                    />
                  ) : (
                    <img
                      src="/assets/img/user_placeholder.webp"
                      alt="placeholder"
                      width={150}
                      height={150}
                    />
                  )}
                </div>
              </OverlayTrigger>
            </ButtonToolbar>
            {/* Hidden file input for image upload */}
            <input
              type="file"
              id="imageUpload"
              accept="image/*"
              className="d-none"
              onChange={onImageChange}
            />
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>First Name *</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    name="firstName"
                    value={profileData.firstName}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Last Name *</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    name="lastName"
                    value={profileData.lastName}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Form.Group className="mb-3">
              <Form.Label>Password *</Form.Label>
              <Form.Control
                required
                type="password"
                name="password"
                placeholder="New Password"
                value={profileData.password}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Confirm Password *</Form.Label>
              <Form.Control
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={profileData.confirmPassword}
                onChange={handleChange}
                isInvalid={!confirmPasswordValidate}
              />
            </Form.Group>
            <button
              type="submit"
              className="btn btn-primary rounded-2 px-md-4 px-3 py-md-2 py-1 mt-md-3 mt-2"
            >
              Submit
            </button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Profile;
