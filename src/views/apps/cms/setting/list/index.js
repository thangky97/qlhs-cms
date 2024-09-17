import { useEffect, useState } from "react";
import TableAbout from "./../../about/list/index";
import TabPrivacy from "./../../setting/tab/privacy/index";
import TabFAQ from "./../../setting/tab/faq/index";
import TabTerms from "./../../setting/tab/term/index";

import { AlertOctagon, FileText, HelpCircle, Home, Tv } from "react-feather";
import { FormattedMessage } from "react-intl";
import {
  CardBody,
  CardHeader,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
} from "reactstrap";
const ListSetting = () => {
  const [hashList] = useState({
    "#about": "1",
    "#privacy": "2",
    "#faq": "3",
    "#terms": "4",
  });
  const [activeTab, setActiveTab] = useState("1");

  useEffect(() => {
    if (window.location.hash) {
      setActiveTab(hashList[window.location.hash]);
    } else {
      window.location.hash = "#about";
    }
  }, [window.location.hash]);

  return (
    <div className="app-user-list">
      <CardHeader>
        <Nav pills>
          <NavItem>
            <NavLink
              active={activeTab === "1"}
              onClick={() => {
                window.location.hash = "#about";
                setActiveTab("1");
              }}
            >
              <Home size={14} />
              <span className="align-middle d-none d-sm-block">
                {<FormattedMessage id="Home" />}
              </span>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              active={activeTab === "2"}
              onClick={() => {
                window.location.hash = "#privacy";
                setActiveTab("2");
              }}
            >
              <AlertOctagon size={14} />
              <span className="align-middle d-none d-sm-block">
                {<FormattedMessage id="privacy" />}
              </span>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              active={activeTab === "3"}
              onClick={() => {
                window.location.hash = "#faq";
                setActiveTab("3");
              }}
            >
              <HelpCircle size={14} />
              <span className="align-middle d-none d-sm-block">
                {<FormattedMessage id="FAQ" />}
              </span>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              active={activeTab === "4"}
              onClick={() => {
                window.location.hash = "#terms";
                setActiveTab("4");
              }}
            >
              <FileText size={14} />
              <span className="align-middle d-none d-sm-block">
                {<FormattedMessage id="terms of use" />}
              </span>
            </NavLink>
          </NavItem>
        </Nav>
      </CardHeader>
      <CardBody className="pt-2">
        <TabContent activeTab={activeTab}>
          <TabPane tabId="1">{activeTab == "1" && <TableAbout />}</TabPane>
        </TabContent>
        <TabContent activeTab={activeTab}>
          <TabPane tabId="2">{activeTab == "2" && <TabPrivacy />}</TabPane>
        </TabContent>
        <TabContent activeTab={activeTab}>
          <TabPane tabId="3">{activeTab == "3" && <TabFAQ />}</TabPane>
        </TabContent>
        <TabContent activeTab={activeTab}>
          <TabPane tabId="4">{activeTab == "4" && <TabTerms />}</TabPane>
        </TabContent>
        <TabContent activeTab={activeTab}>
          <TabPane tabId="5">
            {activeTab == "5" && <TabCompanyInformation />}
          </TabPane>
        </TabContent>
      </CardBody>
    </div>
  );
};

export default ListSetting;
