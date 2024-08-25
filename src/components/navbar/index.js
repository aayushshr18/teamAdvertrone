import React, { useState, useRef } from "react";
import "./style.scss";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { signout } from "../../services/login/signout";
import { getEmployeeDetails } from "../../services/employees/employee-details";
import { mapNavbarData } from "../../data/navbarData";
import {
  sendErrorNotification,
  sendSuccessNotification,
} from "../../services/notifications";
import { useDispatch, useSelector } from "react-redux";
import { navbarActions } from "../../redux/reducers/other";
import { isHeaderHidden } from "../../utils/isHeaderHidden";
import { employeeActions } from "../../redux/reducers/employee";
import { BsDatabaseGear } from "react-icons/bs";
import { HamburgerIcon } from "../icons";
import { size } from "lodash";

const navicons = {
  home_icon: () => <ion-icon name="home-outline"></ion-icon>,
  employees_icon: () => <ion-icon name="people-outline"></ion-icon>,
  departments_icon: () => <ion-icon name="cellular-outline"></ion-icon>,
  projects_icon: () => <ion-icon name="albums-outline"></ion-icon>,
  tasks_icon: () => <ion-icon name="checkbox-outline"></ion-icon>,
  profile_icon: () => <ion-icon name="person-outline"></ion-icon>,
  logout_icon: () => <ion-icon name="log-out-outline"></ion-icon>,
  data_icon: () => (
    <BsDatabaseGear
      size={35}
      color="white"
      onMouseOver={(e) => (e.currentTarget.style.color = "blue")}
      onMouseOut={(e) => (e.currentTarget.style.color = "white")}
    />
  ),
};

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const pathName = location.pathname;
  const [headerData, setHeaderData] = useState(mapNavbarData({}));
  const [isMobileNavVisible, setMobileNavVisible] = useState(false);
  const navRef = useRef(null);
  const { isActive: isNavActive, isHidden } = useSelector(
    (state) => state.navbar
  );

  useEffect(() => {
    if (!localStorage.getItem("id")) {
      navigate("/login");
    }
  }, []);
  const dispatch = useDispatch();

  const handleLogout = () => {
    signout();
    navigate("/login");
    sendSuccessNotification("Logout successfully");
  };

  const handleItemClick = (item) => {
    item.className = "hovered";
    const list = headerData.navbarItems.map((navItem) => {
      if (item.id === navItem.id) {
        return item;
      }
      navItem.className = "";
      return navItem;
    });
    setHeaderData((prev) => ({
      ...prev,
      navbarItems: list,
    }));
    setMobileNavVisible(false); // Close the navbar on item click in mobile view
  };

  const syncEmployeeDetails = async () => {
    const response = await getEmployeeDetails();
    if (response.status === "unauthorized") {
      signout();
      navigate("/login");
      sendErrorNotification("Session expired login again!");
    }
    dispatch(employeeActions.setLoggedInEmployee(response?.body?.employee));
    setHeaderData(mapNavbarData(response?.body?.employee));
  };

  useEffect(() => {
    dispatch(navbarActions.setHeaderHidden(isHeaderHidden(pathName)));
  }, [pathName]);

  const closeOpenMenus = (e) => {
    if (
      navRef.current &&
      isMobileNavVisible &&
      !navRef.current.contains(e.target)
    ) {
      setMobileNavVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", closeOpenMenus);
    return () => {
      document.removeEventListener("mousedown", closeOpenMenus);
    };
  }, [isMobileNavVisible]);

  const toggleMobileNav = () => {
    setMobileNavVisible(!isMobileNavVisible);
  };

  return !isHidden ? (
    <>
      <button
        onClick={toggleMobileNav}
        style={{
          position: "fixed",
          top: "20px",
          left: "20px",
          zIndex: "1000",
          backgroundColor: "darkBlue",
          color: "white",
          border: "none",
          padding: "10px 15px",
          borderRadius: "5px",
          display: "block", // Make sure the button shows on mobile view
        }}
      >
        Menu{" "}
      </button>
      <div
        className={`navigation ${isMobileNavVisible ? "active" : ""}`}
        ref={navRef}
        style={{
          display: isMobileNavVisible ? "block" : "none", // Control visibility in mobile view
        }}
      >
        <ul>
          <li>
            <Link to={"/"}>
              <span className="icon"></span>
              <span className="title brand">Advertrone</span>
            </Link>
          </li>

          {headerData.navbarItems.map((item) => (
            <li
              key={item.id}
              className={
                item.paths.includes(pathName.split("/")[1]) ? "hovered" : ""
              }
              onClick={() => handleItemClick(item)}
            >
              <Link to={item.to}>
                <span className="icon">{navicons[item.icon]()}</span>
                <span className="title">{item.title}</span>
              </Link>
            </li>
          ))}

          <li onClick={handleLogout}>
            <Link to={"/"}>
              <span className="icon">
                <ion-icon name="log-out-outline"></ion-icon>
              </span>
              <span className="title">Sign Out</span>
            </Link>
          </li>
        </ul>
      </div>
    </>
  ) : null;
};

export default Navbar;
