// ** React Imports
import { useContext, useEffect } from "react";

import { UncontrolledDropdown } from "reactstrap";

// ** Internationalization Context
import { IntlContext } from "@src/utility/context/Internationalization";

const IntlDropdown = () => {
  // ** Context
  const intlContext = useContext(IntlContext);

  useEffect(() => {
    intlContext.switchLanguage(localStorage.getItem("language") || "vn");
  }, []);

  return (
    <UncontrolledDropdown
      href="/"
      tag="li"
      className="dropdown-language nav-item"
    ></UncontrolledDropdown>
  );
};

export default IntlDropdown;
