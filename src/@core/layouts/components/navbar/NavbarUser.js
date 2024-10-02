// ** Dropdowns Imports
import IntlDropdown from "./IntlDropdown";
import CartDropdown from "./CartDropdown";
import UserDropdown from "./UserDropdown";
import NavbarSearch from "./NavbarSearch";
import NotificationDropdown from "./NotificationDropdown";

// ** Third Party Components
import { Sun, Moon } from "react-feather";
import { NavItem, NavLink } from "reactstrap";
import { useState } from "react";

const NavbarUser = (props) => {
  // ** Props
  const { setSkin } = props;
  const skin = "dark"; // Replace with state if needed

  // ** Theme options
  const [theme, setTheme] = useState("dark");

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
    setSkin(newTheme);
  };

  // ** Function to toggle Theme (Light/Dark)
  const ThemeToggler = () => {
    return theme === "dark" ? (
      <Sun className="ficon" onClick={() => handleThemeChange("light")} />
    ) : (
      <Moon className="ficon" onClick={() => handleThemeChange("dark")} />
    );
  };

  return (
    <ul className="nav navbar-nav align-items-center ml-auto">
      <IntlDropdown />
      {/* <NavItem className="d-none d-lg-block">
        <NavLink className="nav-link-style">
          <ThemeToggler />
        </NavLink>
      </NavItem>
      <li className="nav-item dropdown-style-switcher dropdown">
        <button
          className="nav-link btn btn-text-secondary btn-icon rounded-pill dropdown-toggle hide-arrow waves-effect waves-light"
          data-bs-toggle="dropdown"
        >
          <i className="ti ti-md ti-moon-stars"></i>
        </button>
        <ul className="dropdown-menu dropdown-menu-end dropdown-styles">
          <li>
            <button
              className={`dropdown-item waves-effect ${
                theme === "light" ? "active" : ""
              }`}
              onClick={() => handleThemeChange("light")}
            >
              <span className="align-middle">
                <i className="ti ti-sun ti-md me-3"></i>Light
              </span>
            </button>
          </li>
          <li>
            <button
              className={`dropdown-item waves-effect ${
                theme === "dark" ? "active" : ""
              }`}
              onClick={() => handleThemeChange("dark")}
            >
              <span className="align-middle">
                <i className="ti ti-moon-stars ti-md me-3"></i>Dark
              </span>
            </button>
          </li>
          <li>
            <button
              className={`dropdown-item waves-effect ${
                theme === "system" ? "active" : ""
              }`}
              onClick={() => handleThemeChange("system")}
            >
              <span className="align-middle">
                <i className="ti ti-device-desktop-analytics ti-md me-3"></i>
                System
              </span>
            </button>
          </li>
        </ul>
      </li> */}
      {/* <NavbarSearch /> */}
      {/* <CartDropdown /> */}
      {/* <NotificationDropdown /> */}
      <UserDropdown />
    </ul>
  );
};

export default NavbarUser;
