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
import BeatLoader from "react-spinners/BeatLoader";
import BlockUI from "react-block-ui";
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
  const [loading, setLoading] = useState(false);

  const [profileData, setProfileData] = useState({
    firstName: userData.firstName,
    lastName: userData.lastName,
    enrollmentNumber: userData.enrollmentNumber,
    firstYearOfStudy: userData.firstYearOfStudy,
    password: "",
    avatar: userData.avatar,
    confirmPassword: "",
    position: userData.position,
    title: userData.title,
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

  const handleDrop = (event) => {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files[0];

    if (droppedFile) {
      // Create a mock event to reuse the handleFileChange logic
      const mockEvent = {
        target: {
          files: [droppedFile],
        },
      };
      onImageChange(mockEvent);
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

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

    const sendData = { ...profileData, email: userData.email };
    const formDataToSend = new FormData();
    for (const key in sendData) {
      formDataToSend.append(key, sendData[key]);
    }

    setLoading(true);
    try {
      const { user, message } = await authService.updateProfile(formDataToSend);

      if (message == "User profile updated successfully.") {
        successNotify(message);
        const newUser = { ...userData, ...user };
        const newUserDataStr = JSON.stringify(newUser);
        localStorage.setItem("userData", newUserDataStr);
        setUserData(newUser);
        setAvatarUpdated(new Date());
        setLoading(false);
      } else {
        errorNotify(message);
      }
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
    setLoading(false);
    setProfileModalVisible(false);
  };

  useEffect(() => {
    if (profileModalVisible) {
      setProfileData({
        firstName: userData.firstName,
        lastName: userData.lastName,
        enrollmentNumber: userData.enrollmentNumber,
        firstYearOfStudy: userData.firstYearOfStudy,
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
      <BlockUI blocking={loading}>
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
      </BlockUI>
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
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
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
            {userData?.role == 2 && (
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Enrollment Number *</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      name="enrollmentNumber"
                      value={profileData.enrollmentNumber}
                      onChange={handleChange}
                      disabled
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>First year of Study *</Form.Label>
                    <Form.Select
                      required
                      name="firstYearOfStudy"
                      value={profileData.firstYearOfStudy}
                      onChange={handleChange}
                    >
                      <option value="">Select year</option>
                      <option value="2024">2024</option>
                      <option value="2023">2023</option>
                      <option value="2022">2022</option>
                      <option value="2021">2021</option>
                      <option value="2020">2020</option>
                      <option value="2019">2019</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>
            )}

            {userData?.role == 0 && (
              <>
                <Row>
                  <Col md={12}>
                    <Form.Group className="mb-3">
                      <Form.Label>Title *</Form.Label>
                      <Form.Control
                        required
                        type="text"
                        name="title"
                        value={userData.title}
                        onChange={handleChange}
                        disabled
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col md={12}>
                    <Form.Group controlId="position" className="">
                      <Form.Label>Position *</Form.Label>
                      <Form.Control
                        as="select"
                        name="position"
                        value={userData.position}
                        style={{
                          appearance: "none", // Hides the default arrow
                          MozAppearance: "none", // For Firefox
                          WebkitAppearance: "none", // For Safari/Chrome
                          backgroundColor: "white",
                          color: "gray !important"
                        }}
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
                        <option value="6">
                          UMCH Teaching Hospital Coordination
                        </option>
                        <option value="7">UMCH IT-SUPPORT</option>
                        <option value="8">
                          UMFST - Rector (UMFST Targu Mures)
                        </option>
                        <option value="9">Admin</option>
                      </Form.Control>
                    </Form.Group>
                  </Col>
                </Row>
              </>
            )}

            <Form.Group className="my-3">
              <Form.Label>Password </Form.Label>
              <Form.Control
                type="password"
                name="password"
                placeholder="New Password"
                value={profileData.password}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Confirm Password </Form.Label>
              <Form.Control
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={profileData.confirmPassword}
                onChange={handleChange}
                isInvalid={!confirmPasswordValidate}
              />
            </Form.Group>
            <div className="d-flex justify-content-end">
              <button
                type="submit"
                className="btn btn-primary rounded-2 px-md-4 px-3 py-md-2 py-1 mt-md-3 mt-2"
              >
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
                  <span>Submit</span>
                )}
              </button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Profile;
