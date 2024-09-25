// ** React Imports
import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { getData } from "./../../../../../views/apps/cms/setting/store/action/index";
// ** Third Party Components
import { Disc, X, Circle } from "react-feather";
import logo from "./../../../../../assets/images/logo/logo.png";
// ** Config
import themeConfig from "@configs/themeConfig";
import { useDispatch, useSelector } from "react-redux";

const VerticalMenuHeader = (props) => {
  // ** Props
  const {
    menuCollapsed,
    setMenuCollapsed,
    setMenuVisibility,
    setGroupOpen,
    menuHover,
  } = props;
  const dispatch = useDispatch();
  const store = useSelector((state) => state.settings);
  // ** Reset open group
  useEffect(() => {
    if (!menuHover && menuCollapsed) setGroupOpen([]);
  }, [menuHover, menuCollapsed]);

  useEffect(() => {
    dispatch(getData());
  }, []);
  // ** Menu toggler component
  const Toggler = () => {
    if (!menuCollapsed) {
      return (
        <Disc
          size={20}
          data-tour="toggle-icon"
          className="text-primary toggle-icon d-none d-xl-block"
          onClick={() => setMenuCollapsed(true)}
        />
      );
    } else {
      return (
        <Circle
          size={20}
          data-tour="toggle-icon"
          className="text-primary toggle-icon d-none d-xl-block"
          onClick={() => setMenuCollapsed(false)}
        />
      );
    }
  };

  return (
    <div className="navbar-header">
      <ul className="nav navbar-nav flex-row">
        <li className="nav-item mr-auto">
          <NavLink to="/" className="navbar-brand">
            <span className="brand-logo">
              <img src={logo} alt="logo" />
            </span>

            <div className="brand-text mb-0" style={{ fontSize: "1rem" }}>
              Hệ thống điểm danh SV
            </div>
          </NavLink>
        </li>
        <li className="nav-item nav-toggle">
          <div className="nav-link modern-nav-toggle cursor-pointer">
            {/* <Toggler /> */}
            {/* <X onClick={() => setMenuVisibility(false)} className='toggle-icon icon-x d-block d-xl-none' size={20} /> */}
          </div>
        </li>
      </ul>
    </div>
  );
};

export default VerticalMenuHeader;
