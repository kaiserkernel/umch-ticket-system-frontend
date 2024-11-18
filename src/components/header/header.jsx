import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { slideToggle } from "./../../composables/slideToggle.js";
import { useAuth } from "../../context/authProvider.js";

function Header() {
  const notificationData = [];
  const navigate = useNavigate();
  const {
    isAuthenticated,
    setIsAuthenticated,
    isAvatarUpdated,
    setAvatarUpdated
  } = useAuth();
  const [userData, setUserData] = useState(() => {
    const storedData = localStorage.getItem("userData");
    return storedData ? JSON.parse(storedData) : null;
  });

  useEffect(() => {
    if (userData && isAvatarUpdated) {
      const updatedData = JSON.parse(localStorage.getItem("userData"));
      setUserData(updatedData);
    }
  }, [isAvatarUpdated]);

  const handleClickOpenTicket = (e) => {
    e.preventDefault();
    navigate("/home", { replace: true });
  };

  const toggleAppSidebarDesktop = () => {
    var elm = document.querySelector(".app");
    if (elm) {
      if (
        !(
          elm.classList.contains("app-with-top-nav") &&
          elm.classList.contains("app-without-sidebar")
        )
      ) {
        elm.classList.toggle("app-sidebar-collapsed");

        setTimeout(() => {
          window.dispatchEvent(new Event("resize"));
        }, 150);
      }
    }
  };

  const toggleAppSidebarMobile = () => {
    var elm = document.querySelector(".app");
    if (elm) {
      if (
        !(
          elm.classList.contains("app-with-top-nav") &&
          elm.classList.contains("app-without-sidebar")
        )
      ) {
        elm.classList.toggle("app-sidebar-mobile-toggled");
      } else {
        slideToggle(document.querySelector(".app-top-nav"));
      }
    }
  };

  const toggleAppHeaderSearch = () => {
    var elm = document.querySelector(".app");
    elm.classList.toggle("app-header-menu-search-toggled");
  };

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
    localStorage.removeItem("isAuthenticated");
    sessionStorage.removeItem("isAuthenticated");
    localStorage.removeItem("userData");
    setIsAuthenticated(false);
    navigate("/login");
  };

  return (
    <div id="header" className="app-header bg-dark-blue px-3 h-100px">
      <div className="desktop-toggler">
        <button
          type="button"
          className="menu-toggler"
          onClick={toggleAppSidebarDesktop}
        >
          <span className="bar bg-white"></span>
          <span className="bar bg-white"></span>
          <span className="bar bg-white"></span>
        </button>
      </div>

      <div className="mobile-toggler">
        <button
          type="button"
          className="menu-toggler"
          onClick={toggleAppSidebarMobile}
        >
          <span className="bar bg-white"></span>
          <span className="bar bg-white"></span>
          <span className="bar bg-white"></span>
        </button>
      </div>

      <div className="brand">
        <Link to="/" className="brand-logo">
          <img
            src="/assets/img/UMCH_logo.svg"
            alt="logo"
            width={40}
            height={40}
          />

          <span className="brand-text text-white">UMCH Ticket System</span>
        </Link>
      </div>

      <div className="menu">
        {(userData?.role == 2 || userData?.role == 1) && (
          <div className="menu-item dropdown dropdown-mobile-full">
            <a
              href="#/"
              data-bs-toggle="dropdown"
              data-bs-display="static"
              className="menu-link"
            >
              <div className="menu-icon text-white">
                <i className="bi bi-pencil-square nav-icon"></i>
              </div>
            </a>
            <div className="dropdown-menu fade dropdown-menu-end w-100px text-center p-0 mt-1">
              <div className="row gx-0">
                <div className="">
                  <Link
                    to="#"
                    className="dropdown-item text-decoration-none p-3 bg-none"
                    onClick={handleClickOpenTicket}
                  >
                    <div className="position-relative">
                      <i className="bi bi-pencil-square h2 opacity-5 d-block my-1"></i>
                    </div>
                    <div className="fw-500 fs-10px text-inverse">
                      OPEN TICKET
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="menu-item dropdown dropdown-mobile-full">
          <a
            href="#/"
            data-bs-toggle="dropdown"
            data-bs-display="static"
            className="menu-link"
          >
            <div className="menu-icon text-white text-white">
              <i className="bi bi-bell nav-icon"></i>
            </div>
            <div className="menu-badge bg-theme"></div>
          </a>
          <div className="dropdown-menu dropdown-menu-end mt-1 w-300px fs-11px pt-1">
            <h6 className="dropdown-header fs-10px mb-1">NOTIFICATIONS</h6>
            <div className="dropdown-divider mt-1"></div>
            {notificationData.length > 0 ? (
              notificationData.map((notification, index) => (
                <a
                  href="#/"
                  key={index}
                  className="d-flex align-items-center py-10px dropdown-item text-wrap fw-semibold"
                >
                  <div className="fs-20px">
                    <i className={notification.icon}></i>
                  </div>
                  <div className="flex-1 flex-wrap ps-3">
                    <div className="mb-1 text-inverse">
                      {notification.title}
                    </div>
                    <div className="small text-inverse text-opacity-50">
                      {notification.time}
                    </div>
                  </div>
                  <div className="ps-2 fs-16px">
                    <i className="bi bi-chevron-right"></i>
                  </div>
                </a>
              ))
            ) : (
              <div className="dropdown-notification-item p-3 text-center">
                No record found
              </div>
            )}
            <hr className="mb-0 mt-2" />
            <div className="py-10px mb-n2 text-center">
              <a href="#/" className="text-decoration-none fw-bold">
                SEE ALL
              </a>
            </div>
          </div>
        </div>
        <div className="menu-item dropdown dropdown-mobile-full">
          <a
            href="#/"
            data-bs-toggle="dropdown"
            data-bs-display="static"
            className="menu-link"
          >
            <div className="menu-img online">
              <div className="d-flex align-items-center justify-content-center w-100 h-100 bg-inverse bg-opacity-25 text-inverse text-opacity-50 rounded-circle">
                {userData?.avatar ? (
                  <img
                    src={`${process.env.REACT_APP_API_URL}${userData?.avatar}`}
                    className="rounded-circle w-100 h-100 object-fit-cover object"
                    style={{ objectPosition: "top" }}
                    alt=""
                  />
                ) : (
                  <div className="d-flex align-items-center justify-content-center w-100 h-100 bg-inverse bg-opacity-25 text-inverse text-opacity-50 rounded-circle overflow-hidden">
                    <i className="bi bi-person-fill fs-32px mb-n3 text-white"></i>
                  </div>
                )}
              </div>
            </div>
            <div className="menu-text d-sm-block d-none w-170px text-white">
              {userData?.firstName + " " + userData?.lastName}
            </div>
          </a>
          <div className="dropdown-menu dropdown-menu-end me-lg-3 fs-11px mt-1">
            <Link
              to="/profile"
              className="dropdown-item d-flex align-items-center"
            >
              PROFILE{" "}
              <i className="bi bi-person-circle ms-auto text-theme fs-16px my-n1"></i>
            </Link>
            <Link
              to="/email/inbox"
              className="dropdown-item d-flex align-items-center"
            >
              INBOX{" "}
              <i className="bi bi-envelope ms-auto text-theme fs-16px my-n1"></i>
            </Link>
            <Link
              to="/calendar"
              className="dropdown-item d-flex align-items-center"
            >
              CALENDAR{" "}
              <i className="bi bi-calendar ms-auto text-theme fs-16px my-n1"></i>
            </Link>
            <Link
              to="/settings"
              className="dropdown-item d-flex align-items-center"
            >
              SETTINGS{" "}
              <i className="bi bi-gear ms-auto text-theme fs-16px my-n1"></i>
            </Link>
            <div className="dropdown-divider"></div>
            <Link
              to="#"
              className="dropdown-item d-flex align-items-center"
              onClick={handleLogout}
            >
              LOGOUT{" "}
              <i className="bi bi-toggle-off ms-auto text-theme fs-16px my-n1"></i>
            </Link>
          </div>
        </div>
      </div>

      <form className="menu-search" method="POST" name="header_search_form">
        <div className="menu-search-container">
          <div className="menu-search-icon">
            <i className="bi bi-search"></i>
          </div>
          <div className="menu-search-input">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Search menu..."
            />
          </div>
          <div className="menu-search-icon">
            <a href="#/" onClick={toggleAppHeaderSearch}>
              <i className="bi bi-x-lg"></i>
            </a>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Header;
