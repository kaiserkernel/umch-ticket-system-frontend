import React from "react";
import { Card, CardHeader, CardBody } from "./../../components/card/card.jsx";
import "lity";
import "lity/dist/lity.min.css";

function Profile() {
  let userData = localStorage.getItem("userData");
  userData = JSON.parse(userData);

  const roleName = ["Admin", "Teacher", "Student"];

  return (
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

                <div className="mb-1">
                  <i className="fa fa-map-marker-alt fa-fw text-inverse text-opacity-50"></i>{" "}
                  New York, NY
                </div>
                <div className="mb-3">
                  <i className="fa fa-link fa-fw text-inverse text-opacity-50"></i>{" "}
                  seantheme.com/hud
                </div>

                <hr className="mt-4 mb-4" />

                <div className="fw-bold mb-3 fs-16px">People to follow</div>
                <div className="d-flex align-items-center mb-3">
                  <img
                    src="/assets/img/user/user-1.jpg"
                    alt=""
                    width="30"
                    className="rounded-circle"
                  />
                  <div className="flex-fill px-3">
                    <div className="fw-bold text-truncate w-100px">
                      Noor Rowe
                    </div>
                    <div className="fs-12px text-inverse text-opacity-50">
                      3.1m followers
                    </div>
                  </div>
                  <a href="#/" className="btn btn-sm btn-outline-theme fs-11px">
                    Follow
                  </a>
                </div>
                <div className="d-flex align-items-center mb-3">
                  <img
                    src="/assets/img/user/user-2.jpg"
                    alt=""
                    width="30"
                    className="rounded-circle"
                  />
                  <div className="flex-fill px-3">
                    <div className="fw-bold text-truncate w-100px">
                      Abbey Parker
                    </div>
                    <div className="fs-12px text-inverse text-opacity-50">
                      302k followers
                    </div>
                  </div>
                  <a href="#/" className="btn btn-sm btn-outline-theme fs-11px">
                    Follow
                  </a>
                </div>
                <div className="d-flex align-items-center mb-3">
                  <img
                    src="/assets/img/user/user-3.jpg"
                    alt=""
                    width="30"
                    className="rounded-circle"
                  />
                  <div className="flex-fill px-3">
                    <div className="fw-bold text-truncate w-100px">
                      Savannah Nicholson
                    </div>
                    <div className="fs-12px text-inverse text-opacity-50">
                      720k followers
                    </div>
                  </div>
                  <a href="#/" className="btn btn-sm btn-outline-theme fs-11px">
                    Follow
                  </a>
                </div>
                <div className="d-flex align-items-center mb-3">
                  <img
                    src="/assets/img/user/user-4.jpg"
                    alt=""
                    width="30"
                    className="rounded-circle"
                  />
                  <div className="flex-fill px-3">
                    <div className="fw-bold text-truncate w-100px">
                      Kenny Bright
                    </div>
                    <div className="fs-12px text-inverse text-opacity-50">
                      1.4m followers
                    </div>
                  </div>
                  <a href="#/" className="btn btn-sm btn-outline-theme fs-11px">
                    Follow
                  </a>
                </div>
                <div className="d-flex align-items-center">
                  <img
                    src="/assets/img/user/user-5.jpg"
                    alt=""
                    width="30"
                    className="rounded-circle"
                  />
                  <div className="flex-fill px-3">
                    <div className="fw-bold text-truncate w-100px">
                      Cara Poole
                    </div>
                    <div className="fs-12px text-inverse text-opacity-50">
                      989k followers
                    </div>
                  </div>
                  <a href="#/" className="btn btn-sm btn-outline-theme fs-11px">
                    Follow
                  </a>
                </div>
              </div>
            </div>

            <div className="profile-content">
              <ul className="profile-tab nav nav-tabs nav-tabs-v2">
                <li className="nav-item">
                  <a
                    href="#profile-post"
                    className="nav-link active"
                    data-bs-toggle="tab"
                  >
                    <div className="nav-field">Posts</div>
                    <div className="nav-value">382</div>
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    href="#profile-followers"
                    className="nav-link"
                    data-bs-toggle="tab"
                  >
                    <div className="nav-field">Followers</div>
                    <div className="nav-value">1.3m</div>
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    href="#profile-media"
                    className="nav-link"
                    data-bs-toggle="tab"
                  >
                    <div className="nav-field">Photos</div>
                    <div className="nav-value">1,397</div>
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    href="#profile-video"
                    className="nav-link"
                    data-bs-toggle="tab"
                  >
                    <div className="nav-field">Videos</div>
                    <div className="nav-value">120</div>
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    href="#profile-followers"
                    className="nav-link"
                    data-bs-toggle="tab"
                  >
                    <div className="nav-field">Following</div>
                    <div className="nav-value">2,592</div>
                  </a>
                </li>
              </ul>
              <div className="profile-content-container">
                <div className="row gx-4">
                  <div className="col-xl-8">
                    <div className="tab-content p-0">
                      <div
                        className="tab-pane fade show active"
                        id="profile-post"
                      ></div>

                      <div className="tab-pane fade" id="profile-followers">
                        <div className="list-group">
                          <div className="list-group-item d-flex align-items-center">
                            <img
                              src="/assets/img/user/user-1.jpg"
                              alt=""
                              width="50"
                              className="rounded-sm ms-n2"
                            />
                            <div className="flex-fill px-3">
                              <div>
                                <a
                                  href="#/"
                                  className="text-inverse fw-bold text-decoration-none"
                                >
                                  Ethel Wilkes
                                </a>
                              </div>
                              <div className="text-inverse text-opacity-50 fs-13px">
                                North Raundspic
                              </div>
                            </div>
                            <a href="#/" className="btn btn-outline-theme">
                              Follow
                            </a>
                          </div>
                          <div className="list-group-item d-flex align-items-center">
                            <img
                              src="/assets/img/user/user-2.jpg"
                              alt=""
                              width="50"
                              className="rounded-sm ms-n2"
                            />
                            <div className="flex-fill px-3">
                              <div>
                                <a
                                  href="#/"
                                  className="text-inverse fw-bold text-decoration-none"
                                >
                                  Shanaya Hansen
                                </a>
                              </div>
                              <div className="text-inverse text-opacity-50 fs-13px">
                                North Raundspic
                              </div>
                            </div>
                            <a href="#/" className="btn btn-outline-theme">
                              Follow
                            </a>
                          </div>
                          <div className="list-group-item d-flex align-items-center">
                            <img
                              src="/assets/img/user/user-3.jpg"
                              alt=""
                              width="50"
                              className="rounded-sm ms-n2"
                            />
                            <div className="flex-fill px-3">
                              <div>
                                <a
                                  href="#/"
                                  className="text-inverse fw-bold text-decoration-none"
                                >
                                  James Allman
                                </a>
                              </div>
                              <div className="text-inverse text-opacity-50 fs-13px">
                                North Raundspic
                              </div>
                            </div>
                            <a href="#/" className="btn btn-outline-theme">
                              Follow
                            </a>
                          </div>
                          <div className="list-group-item d-flex align-items-center">
                            <img
                              src="/assets/img/user/user-4.jpg"
                              alt=""
                              width="50"
                              className="rounded-sm ms-n2"
                            />
                            <div className="flex-fill px-3">
                              <div>
                                <a
                                  href="#/"
                                  className="text-inverse fw-bold text-decoration-none"
                                >
                                  Marie Welsh
                                </a>
                              </div>
                              <div className="text-inverse text-opacity-50 fs-13px">
                                Crencheporford
                              </div>
                            </div>
                            <a href="#/" className="btn btn-outline-theme">
                              Follow
                            </a>
                          </div>
                          <div className="list-group-item d-flex align-items-center">
                            <img
                              src="/assets/img/user/user-5.jpg"
                              alt=""
                              width="50"
                              className="rounded-sm ms-n2"
                            />
                            <div className="flex-fill px-3">
                              <div>
                                <a
                                  href="#/"
                                  className="text-inverse fw-bold text-decoration-none"
                                >
                                  Lamar Kirkland
                                </a>
                              </div>
                              <div className="text-inverse text-opacity-50 fs-13px">
                                Prince Ewoodswan
                              </div>
                            </div>
                            <a href="#/" className="btn btn-outline-theme">
                              Follow
                            </a>
                          </div>
                          <div className="list-group-item d-flex align-items-center">
                            <img
                              src="/assets/img/user/user-6.jpg"
                              alt=""
                              width="50"
                              className="rounded-sm ms-n2"
                            />
                            <div className="flex-fill px-3">
                              <div>
                                <a
                                  href="#/"
                                  className="text-inverse fw-bold text-decoration-none"
                                >
                                  Bentley Osborne
                                </a>
                              </div>
                              <div className="text-inverse text-opacity-50 fs-13px">
                                Red Suvern
                              </div>
                            </div>
                            <a href="#/" className="btn btn-outline-theme">
                              Follow
                            </a>
                          </div>
                          <div className="list-group-item d-flex align-items-center">
                            <img
                              src="/assets/img/user/user-7.jpg"
                              alt=""
                              width="50"
                              className="rounded-sm ms-n2"
                            />
                            <div className="flex-fill px-3">
                              <div>
                                <a
                                  href="#/"
                                  className="text-inverse fw-bold text-decoration-none"
                                >
                                  Ollie Goulding
                                </a>
                              </div>
                              <div className="text-inverse text-opacity-50 fs-13px">
                                Doa
                              </div>
                            </div>
                            <a href="#/" className="btn btn-outline-theme">
                              Follow
                            </a>
                          </div>
                          <div className="list-group-item d-flex align-items-center">
                            <img
                              src="/assets/img/user/user-8.jpg"
                              alt=""
                              width="50"
                              className="rounded-sm ms-n2"
                            />
                            <div className="flex-fill px-3">
                              <div>
                                <a
                                  href="#/"
                                  className="text-inverse fw-bold text-decoration-none"
                                >
                                  Hiba Calvert
                                </a>
                              </div>
                              <div className="text-inverse text-opacity-50 fs-13px">
                                Stemunds
                              </div>
                            </div>
                            <a href="#/" className="btn btn-outline-theme">
                              Follow
                            </a>
                          </div>
                          <div className="list-group-item d-flex align-items-center">
                            <img
                              src="/assets/img/user/user-9.jpg"
                              alt=""
                              width="50"
                              className="rounded-sm ms-n2"
                            />
                            <div className="flex-fill px-3">
                              <div>
                                <a
                                  href="#/"
                                  className="text-inverse fw-bold text-decoration-none"
                                >
                                  Rivka Redfern
                                </a>
                              </div>
                              <div className="text-inverse text-opacity-50 fs-13px">
                                Fallnee
                              </div>
                            </div>
                            <a href="#/" className="btn btn-outline-theme">
                              Follow
                            </a>
                          </div>
                          <div className="list-group-item d-flex align-items-center">
                            <img
                              src="/assets/img/user/user-10.jpg"
                              alt=""
                              width="50"
                              className="rounded-sm ms-n2"
                            />
                            <div className="flex-fill px-3">
                              <div>
                                <a
                                  href="#/"
                                  className="text-inverse fw-bold text-decoration-none"
                                >
                                  Roshni Fernandez
                                </a>
                              </div>
                              <div className="text-inverse text-opacity-50 fs-13px">
                                Mount Lerdo
                              </div>
                            </div>
                            <a href="#/" className="btn btn-outline-theme">
                              Follow
                            </a>
                          </div>
                        </div>
                        <div className="text-center p-3">
                          <a
                            href="#/"
                            className="text-inverse text-decoration-none"
                          >
                            Show more <b className="caret"></b>
                          </a>
                        </div>
                      </div>

                      <div className="tab-pane fade" id="profile-media">
                        <Card className="mb-3">
                          <CardHeader className="fw-bold bg-transparent">
                            May 20
                          </CardHeader>
                          <CardBody>
                            <div className="widget-img-list">
                              <div className="widget-img-list-item">
                                <a
                                  href="/assets/img/gallery/gallery-1.jpg"
                                  data-lity
                                >
                                  <span
                                    className="img"
                                    style={{
                                      backgroundImage:
                                        "url(/assets/img/gallery/gallery-1.jpg)",
                                    }}
                                  ></span>
                                </a>
                              </div>
                              <div className="widget-img-list-item">
                                <a
                                  href="/assets/img/gallery/gallery-2.jpg"
                                  data-lity
                                >
                                  <span
                                    className="img"
                                    style={{
                                      backgroundImage:
                                        "url(/assets/img/gallery/gallery-2.jpg)",
                                    }}
                                  ></span>
                                </a>
                              </div>
                              <div className="widget-img-list-item">
                                <a
                                  href="/assets/img/gallery/gallery-3.jpg"
                                  data-lity
                                >
                                  <span
                                    className="img"
                                    style={{
                                      backgroundImage:
                                        "url(/assets/img/gallery/gallery-3.jpg)",
                                    }}
                                  ></span>
                                </a>
                              </div>
                              <div className="widget-img-list-item">
                                <a
                                  href="/assets/img/gallery/gallery-4.jpg"
                                  data-lity
                                >
                                  <span
                                    className="img"
                                    style={{
                                      backgroundImage:
                                        "url(/assets/img/gallery/gallery-4.jpg)",
                                    }}
                                  ></span>
                                </a>
                              </div>
                              <div className="widget-img-list-item">
                                <a
                                  href="/assets/img/gallery/gallery-5.jpg"
                                  data-lity
                                >
                                  <span
                                    className="img"
                                    style={{
                                      backgroundImage:
                                        "url(/assets/img/gallery/gallery-5.jpg)",
                                    }}
                                  ></span>
                                </a>
                              </div>
                              <div className="widget-img-list-item">
                                <a
                                  href="/assets/img/gallery/gallery-6.jpg"
                                  data-lity
                                >
                                  <span
                                    className="img"
                                    style={{
                                      backgroundImage:
                                        "url(/assets/img/gallery/gallery-6.jpg)",
                                    }}
                                  ></span>
                                </a>
                              </div>
                              <div className="widget-img-list-item">
                                <a
                                  href="/assets/img/gallery/gallery-7.jpg"
                                  data-lity
                                >
                                  <span
                                    className="img"
                                    style={{
                                      backgroundImage:
                                        "url(/assets/img/gallery/gallery-7.jpg)",
                                    }}
                                  ></span>
                                </a>
                              </div>
                              <div className="widget-img-list-item">
                                <a
                                  href="/assets/img/gallery/gallery-8.jpg"
                                  data-lity
                                >
                                  <span
                                    className="img"
                                    style={{
                                      backgroundImage:
                                        "url(/assets/img/gallery/gallery-8.jpg)",
                                    }}
                                  ></span>
                                </a>
                              </div>
                              <div className="widget-img-list-item">
                                <a
                                  href="/assets/img/gallery/gallery-9.jpg"
                                  data-lity
                                >
                                  <span
                                    className="img"
                                    style={{
                                      backgroundImage:
                                        "url(/assets/img/gallery/gallery-9.jpg)",
                                    }}
                                  ></span>
                                </a>
                              </div>
                              <div className="widget-img-list-item">
                                <a
                                  href="/assets/img/gallery/gallery-10.jpg"
                                  data-lity
                                >
                                  <span
                                    className="img"
                                    style={{
                                      backgroundImage:
                                        "url(/assets/img/gallery/gallery-10.jpg)",
                                    }}
                                  ></span>
                                </a>
                              </div>
                              <div className="widget-img-list-item">
                                <a
                                  href="/assets/img/gallery/gallery-11.jpg"
                                  data-lity
                                >
                                  <span
                                    className="img"
                                    style={{
                                      backgroundImage:
                                        "url(/assets/img/gallery/gallery-11.jpg)",
                                    }}
                                  ></span>
                                </a>
                              </div>
                              <div className="widget-img-list-item">
                                <a
                                  href="/assets/img/gallery/gallery-12.jpg"
                                  data-lity
                                >
                                  <span
                                    className="img"
                                    style={{
                                      backgroundImage:
                                        "url(/assets/img/gallery/gallery-12.jpg)",
                                    }}
                                  ></span>
                                </a>
                              </div>
                            </div>
                          </CardBody>
                        </Card>
                        <Card>
                          <CardHeader className="fw-bold bg-transparent">
                            May 16
                          </CardHeader>
                          <CardBody>
                            <div className="widget-img-list">
                              <div className="widget-img-list-item">
                                <a
                                  href="/assets/img/gallery/gallery-13.jpg"
                                  data-lity
                                >
                                  <span
                                    className="img"
                                    style={{
                                      backgroundImage:
                                        "url(/assets/img/gallery/gallery-13.jpg)",
                                    }}
                                  ></span>
                                </a>
                              </div>
                              <div className="widget-img-list-item">
                                <a
                                  href="/assets/img/gallery/gallery-14.jpg"
                                  data-lity
                                >
                                  <span
                                    className="img"
                                    style={{
                                      backgroundImage:
                                        "url(/assets/img/gallery/gallery-14.jpg)",
                                    }}
                                  ></span>
                                </a>
                              </div>
                              <div className="widget-img-list-item">
                                <a
                                  href="/assets/img/gallery/gallery-15.jpg"
                                  data-lity
                                >
                                  <span
                                    className="img"
                                    style={{
                                      backgroundImage:
                                        "url(/assets/img/gallery/gallery-15.jpg)",
                                    }}
                                  ></span>
                                </a>
                              </div>
                              <div className="widget-img-list-item">
                                <a
                                  href="/assets/img/gallery/gallery-16.jpg"
                                  data-lity
                                >
                                  <span
                                    className="img"
                                    style={{
                                      backgroundImage:
                                        "url(/assets/img/gallery/gallery-16.jpg)",
                                    }}
                                  ></span>
                                </a>
                              </div>
                              <div className="widget-img-list-item">
                                <a
                                  href="/assets/img/gallery/gallery-17.jpg"
                                  data-lity
                                >
                                  <span
                                    className="img"
                                    style={{
                                      backgroundImage:
                                        "url(/assets/img/gallery/gallery-17.jpg)",
                                    }}
                                  ></span>
                                </a>
                              </div>
                              <div className="widget-img-list-item">
                                <a
                                  href="/assets/img/gallery/gallery-18.jpg"
                                  data-lity
                                >
                                  <span
                                    className="img"
                                    style={{
                                      backgroundImage:
                                        "url(/assets/img/gallery/gallery-18.jpg)",
                                    }}
                                  ></span>
                                </a>
                              </div>
                              <div className="widget-img-list-item">
                                <a
                                  href="/assets/img/gallery/gallery-19.jpg"
                                  data-lity
                                >
                                  <span
                                    className="img"
                                    style={{
                                      backgroundImage:
                                        "url(/assets/img/gallery/gallery-19.jpg)",
                                    }}
                                  ></span>
                                </a>
                              </div>
                              <div className="widget-img-list-item">
                                <a
                                  href="/assets/img/gallery/gallery-20.jpg"
                                  data-lity
                                >
                                  <span
                                    className="img"
                                    style={{
                                      backgroundImage:
                                        "url(/assets/img/gallery/gallery-20.jpg)",
                                    }}
                                  ></span>
                                </a>
                              </div>
                              <div className="widget-img-list-item">
                                <a
                                  href="/assets/img/gallery/gallery-21.jpg"
                                  data-lity
                                >
                                  <span
                                    className="img"
                                    style={{
                                      backgroundImage:
                                        "url(/assets/img/gallery/gallery-21.jpg)",
                                    }}
                                  ></span>
                                </a>
                              </div>
                              <div className="widget-img-list-item">
                                <a
                                  href="/assets/img/gallery/gallery-22.jpg"
                                  data-lity
                                >
                                  <span
                                    className="img"
                                    style={{
                                      backgroundImage:
                                        "url(/assets/img/gallery/gallery-22.jpg)",
                                    }}
                                  ></span>
                                </a>
                              </div>
                              <div className="widget-img-list-item">
                                <a
                                  href="/assets/img/gallery/gallery-23.jpg"
                                  data-lity
                                >
                                  <span
                                    className="img"
                                    style={{
                                      backgroundImage:
                                        "url(/assets/img/gallery/gallery-23.jpg)",
                                    }}
                                  ></span>
                                </a>
                              </div>
                              <div className="widget-img-list-item">
                                <a
                                  href="/assets/img/gallery/gallery-24.jpg"
                                  data-lity
                                >
                                  <span
                                    className="img"
                                    style={{
                                      backgroundImage:
                                        "url(/assets/img/gallery/gallery-24.jpg)",
                                    }}
                                  ></span>
                                </a>
                              </div>
                              <div className="widget-img-list-item">
                                <a
                                  href="/assets/img/gallery/gallery-25.jpg"
                                  data-lity
                                >
                                  <span
                                    className="img"
                                    style={{
                                      backgroundImage:
                                        "url(/assets/img/gallery/gallery-25.jpg)",
                                    }}
                                  ></span>
                                </a>
                              </div>
                              <div className="widget-img-list-item">
                                <a
                                  href="/assets/img/gallery/gallery-26.jpg"
                                  data-lity
                                >
                                  <span
                                    className="img"
                                    style={{
                                      backgroundImage:
                                        "url(/assets/img/gallery/gallery-26.jpg)",
                                    }}
                                  ></span>
                                </a>
                              </div>
                              <div className="widget-img-list-item">
                                <a
                                  href="/assets/img/gallery/gallery-27.jpg"
                                  data-lity
                                >
                                  <span
                                    className="img"
                                    style={{
                                      backgroundImage:
                                        "url(/assets/img/gallery/gallery-27.jpg)",
                                    }}
                                  ></span>
                                </a>
                              </div>
                              <div className="widget-img-list-item">
                                <a
                                  href="/assets/img/gallery/gallery-28.jpg"
                                  data-lity
                                >
                                  <span
                                    className="img"
                                    style={{
                                      backgroundImage:
                                        "url(/assets/img/gallery/gallery-28.jpg)",
                                    }}
                                  ></span>
                                </a>
                              </div>
                              <div className="widget-img-list-item">
                                <a
                                  href="/assets/img/gallery/gallery-29.jpg"
                                  data-lity
                                >
                                  <span
                                    className="img"
                                    style={{
                                      backgroundImage:
                                        "url(/assets/img/gallery/gallery-29.jpg)",
                                    }}
                                  ></span>
                                </a>
                              </div>
                              <div className="widget-img-list-item">
                                <a
                                  href="/assets/img/gallery/gallery-30.jpg"
                                  data-lity
                                >
                                  <span
                                    className="img"
                                    style={{
                                      backgroundImage:
                                        "url(/assets/img/gallery/gallery-30.jpg)",
                                    }}
                                  ></span>
                                </a>
                              </div>
                            </div>
                          </CardBody>
                        </Card>
                        <div className="text-center p-3">
                          <a
                            href="#/"
                            className="text-inverse text-decoration-none"
                          >
                            Show more <b className="caret"></b>
                          </a>
                        </div>
                      </div>

                      <div className="tab-pane fade" id="profile-video">
                        <Card className="mb-3">
                          <CardHeader className="fw-bold bg-transparent">
                            Collections #1
                          </CardHeader>
                          <CardBody>
                            <div className="row gx-1">
                              <div className="col-md-4 col-sm-6 mb-1">
                                <a
                                  href="https://www.youtube.com/watch?v=RQ5ljyGg-ig"
                                  data-lity=""
                                >
                                  <img
                                    src="https://img.youtube.com/vi/RQ5ljyGg-ig/mqdefault.jpg"
                                    alt=""
                                    className="d-block w-100"
                                  />
                                </a>
                              </div>
                              <div className="col-md-4 col-sm-6 mb-1">
                                <a
                                  href="https://www.youtube.com/watch?v=5lWkZ-JaEOc"
                                  data-lity=""
                                >
                                  <img
                                    src="https://img.youtube.com/vi/5lWkZ-JaEOc/mqdefault.jpg"
                                    alt=""
                                    className="d-block w-100"
                                  />
                                </a>
                              </div>
                              <div className="col-md-4 col-sm-6 mb-1">
                                <a
                                  href="https://www.youtube.com/watch?v=9ZfN87gSjvI"
                                  data-lity=""
                                >
                                  <img
                                    src="https://img.youtube.com/vi/9ZfN87gSjvI/mqdefault.jpg"
                                    alt=""
                                    className="d-block w-100"
                                  />
                                </a>
                              </div>
                              <div className="col-md-4 col-sm-6 mb-1">
                                <a
                                  href="https://www.youtube.com/watch?v=w2H07DRv2_M"
                                  data-lity=""
                                >
                                  <img
                                    src="https://img.youtube.com/vi/w2H07DRv2_M/mqdefault.jpg"
                                    alt=""
                                    className="d-block w-100"
                                  />
                                </a>
                              </div>
                              <div className="col-md-4 col-sm-6 mb-1">
                                <a
                                  href="https://www.youtube.com/watch?v=PntG8KEVjR8"
                                  data-lity=""
                                >
                                  <img
                                    src="https://img.youtube.com/vi/PntG8KEVjR8/mqdefault.jpg"
                                    alt=""
                                    className="d-block w-100"
                                  />
                                </a>
                              </div>
                              <div className="col-md-4 col-sm-6 mb-1">
                                <a
                                  href="https://www.youtube.com/watch?v=q8kxKvSQ7MI"
                                  data-lity=""
                                >
                                  <img
                                    src="https://img.youtube.com/vi/q8kxKvSQ7MI/mqdefault.jpg"
                                    alt=""
                                    className="d-block w-100"
                                  />
                                </a>
                              </div>
                              <div className="col-md-4 col-sm-6 mb-1">
                                <a
                                  href="https://www.youtube.com/watch?v=cutu3Bw4ep4"
                                  data-lity=""
                                >
                                  <img
                                    src="https://img.youtube.com/vi/cutu3Bw4ep4/mqdefault.jpg"
                                    alt=""
                                    className="d-block w-100"
                                  />
                                </a>
                              </div>
                              <div className="col-md-4 col-sm-6 mb-1">
                                <a
                                  href="https://www.youtube.com/watch?v=gCspUXGrraM"
                                  data-lity=""
                                >
                                  <img
                                    src="https://img.youtube.com/vi/gCspUXGrraM/mqdefault.jpg"
                                    alt=""
                                    className="d-block w-100"
                                  />
                                </a>
                              </div>
                            </div>
                          </CardBody>
                        </Card>
                        <Card className="mb-3">
                          <CardHeader className="fw-bold bg-transparent">
                            Collections #2
                          </CardHeader>
                          <CardBody>
                            <div className="row gx-1">
                              <div className="col-md-4 col-sm-6 mb-1">
                                <a
                                  href="https://www.youtube.com/watch?v=COtpTM1MpAA"
                                  data-lity=""
                                >
                                  <img
                                    src="https://img.youtube.com/vi/COtpTM1MpAA/mqdefault.jpg"
                                    alt=""
                                    className="d-block w-100"
                                  />
                                </a>
                              </div>
                              <div className="col-md-4 col-sm-6 mb-1">
                                <a
                                  href="https://www.youtube.com/watch?v=8NVkGHVOazc"
                                  data-lity=""
                                >
                                  <img
                                    src="https://img.youtube.com/vi/8NVkGHVOazc/mqdefault.jpg"
                                    alt=""
                                    className="d-block w-100"
                                  />
                                </a>
                              </div>
                              <div className="col-md-4 col-sm-6 mb-1">
                                <a
                                  href="https://www.youtube.com/watch?v=ZtT3jaTcCsY"
                                  data-lity=""
                                >
                                  <img
                                    src="https://img.youtube.com/vi/ZtT3jaTcCsY/mqdefault.jpg"
                                    alt=""
                                    className="d-block w-100"
                                  />
                                </a>
                              </div>
                              <div className="col-md-4 col-sm-6 mb-1">
                                <a
                                  href="https://www.youtube.com/watch?v=Dmw0ucCv8aQ"
                                  data-lity=""
                                >
                                  <img
                                    src="https://img.youtube.com/vi/Dmw0ucCv8aQ/mqdefault.jpg"
                                    alt=""
                                    className="d-block w-100"
                                  />
                                </a>
                              </div>
                              <div className="col-md-4 col-sm-6 mb-1">
                                <a
                                  href="https://www.youtube.com/watch?v=r1d7ST2TG2U"
                                  data-lity=""
                                >
                                  <img
                                    src="https://img.youtube.com/vi/r1d7ST2TG2U/mqdefault.jpg"
                                    alt=""
                                    className="d-block w-100"
                                  />
                                </a>
                              </div>
                              <div className="col-md-4 col-sm-6 mb-1">
                                <a
                                  href="https://www.youtube.com/watch?v=WUR-XWBcHvs"
                                  data-lity=""
                                >
                                  <img
                                    src="https://img.youtube.com/vi/WUR-XWBcHvs/mqdefault.jpg"
                                    alt=""
                                    className="d-block w-100"
                                  />
                                </a>
                              </div>
                              <div className="col-md-4 col-sm-6 mb-1">
                                <a
                                  href="https://www.youtube.com/watch?v=A7sQ8RWj0Cw"
                                  data-lity=""
                                >
                                  <img
                                    src="https://img.youtube.com/vi/A7sQ8RWj0Cw/mqdefault.jpg"
                                    alt=""
                                    className="d-block w-100"
                                  />
                                </a>
                              </div>
                              <div className="col-md-4 col-sm-6 mb-1">
                                <a
                                  href="https://www.youtube.com/watch?v=IMN2VfiXls4"
                                  data-lity=""
                                >
                                  <img
                                    src="https://img.youtube.com/vi/IMN2VfiXls4/mqdefault.jpg"
                                    alt=""
                                    className="d-block w-100"
                                  />
                                </a>
                              </div>
                            </div>
                          </CardBody>
                        </Card>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-4">
                    <div className="desktop-sticky-top d-none d-lg-block"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}

export default Profile;
