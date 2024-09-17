import { useEffect, useState } from "react";
import TabCloud from "./../../cloud/tab/cloud/index";
import TabLinkCloud from "./../../cloud/tab/link_cloud/index";
import TabUserGuideCloud from "./../../cloud/tab/user_guide_cloud/index";

import { CloudLightning, HelpCircle, Link } from "react-feather";
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

const CloudSetting = () => {
  const [hashList] = useState({
    "#cloud": "1",
    "#user_guide_cloud": "2",
    "#link_cloud": "3",
  });
  const [activeTab, setActiveTab] = useState("1");

  useEffect(() => {
    if (window.location.hash) {
      setActiveTab(hashList[window.location.hash]);
    } else {
      window.location.hash = "#cloud";
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
                window.location.hash = "#cloud";
                setActiveTab("1");
              }}
            >
              <CloudLightning size={14} />
              <span className="align-middle d-none d-sm-block">
                {<FormattedMessage id="Cloud" />}
              </span>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              active={activeTab === "2"}
              onClick={() => {
                window.location.hash = "#user_guide_cloud";
                setActiveTab("2");
              }}
            >
              <HelpCircle size={14} />
              <span className="align-middle d-none d-sm-block">
                {<FormattedMessage id="User guide cloud" />}
              </span>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              active={activeTab === "3"}
              onClick={() => {
                window.location.hash = "#link_cloud";
                setActiveTab("3");
              }}
            >
              <Link size={14} />
              <span className="align-middle d-none d-sm-block">
                {<FormattedMessage id="Link Cloud" />}
              </span>
            </NavLink>
          </NavItem>
        </Nav>
      </CardHeader>
      <CardBody className="pt-2">
        <TabContent activeTab={activeTab}>
          <TabPane tabId="1">{activeTab == "1" && <TabCloud />}</TabPane>
        </TabContent>
        <TabContent activeTab={activeTab}>
          <TabPane tabId="2">{activeTab == "2" && <TabUserGuideCloud />}</TabPane>
        </TabContent>
        <TabContent activeTab={activeTab}>
          <TabPane tabId="3">{activeTab == "3" && <TabLinkCloud />}</TabPane>
        </TabContent>
      </CardBody>
    </div>
  );
};

export default CloudSetting;
