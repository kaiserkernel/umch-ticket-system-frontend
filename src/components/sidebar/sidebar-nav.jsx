import React from "react";
import {
  useResolvedPath,
  useMatch,
  NavLink,
  useLocation,
  matchPath
} from "react-router-dom";
import menus from "./../../config/app-menu.jsx";

function NavItem({ menu, ...props }) {
  let path = menu.path ? menu.path : "";
  let resolved = useResolvedPath(path);
  let match = useMatch({ path: resolved.pathname });
  let location = useLocation();

  if (menu.is_header) {
    return <div className="menu-header">{menu.title}</div>;
  }

  if (menu.is_divider) {
    return <div className="menu-divider"></div>;
  }

  let match2 = matchPath({ path: path, end: false }, location.pathname);

  let icon = menu.icon && (
    <div className="menu-icon">
      <i className={menu.icon}></i>
    </div>
  );
  let img = menu.img && (
    <div className="menu-icon-img">
      <img src={menu.img} alt="" />
    </div>
  );
  let caret = menu.children && !menu.badge && (
    <div className="menu-caret">
      <b className="caret"></b>
    </div>
  );
  let label = menu.label && (
    <span className="menu-label ms-5px">{menu.label}</span>
  );
  let badge = menu.badge && <div className="menu-badge">{menu.badge}</div>;
  let highlight = menu.highlight && (
    <i className="fa fa-paper-plane text-theme"></i>
  );
  let title = menu.title && (
    <div className="menu-text">
      {menu.title} {label} {highlight}
    </div>
  );

  return (
    <div
      className={
        "menu-item" +
        (match || match2 ? " active" : "") +
        (menu.children ? " has-sub" : "")
      }
    >
      <NavLink className="menu-link" to={menu.path} {...props}>
        {img} {icon} {title}
        {caret} {badge}
      </NavLink>

      {menu.children && (
        <div className="menu-submenu">
          {menu.children.map((submenu, i) => (
            <NavItem key={i} menu={submenu} />
          ))}
        </div>
      )}
    </div>
  );
}

function SidebarNav() {
  let userData = localStorage.getItem("userData");
  let userRole = "";

  if (!userData) {
    userData = sessionStorage.getItem("userData");
  }
  if (userData) {
    userData = JSON.parse(userData);
    userRole = userData.role;
  }

  const filteredMenu = menus.filter((menu) => {
    // Only include "Account Management" if the role permits

    if (
      menu.title === "Account Management" &&
      userData?.role != 0 &&
      userData?.position != 1
    ) {
      return false;
    }
    if (
      (menu.title === "Account Management" ||
        menu.title === "Email Template") &&
      userRole !== 0
    ) {
      return false; // Exclude for non-admins
    }

    return true; // Include other items
  });

  const updatedMenuItems = filteredMenu.map((item) => {
    if (item.children) {
      return {
        ...item,
        children: item.children.filter((child) => {
          if (child.title === "Internal Message" && userRole !== 0) {
            return false;
          }
          return true;
        })
      };
    }
    return item;
  });
  return (
    <div className="menu mt-3 mt-md-4">
      {updatedMenuItems.map((menu, i) => (
        <NavItem key={i} menu={menu} />
      ))}
    </div>
  );
}

export default SidebarNav;
