import { request } from "http";
import { useEffect, useState } from "react";
import { HelpCircle, User } from "react-feather";
import { FormattedMessage } from "react-intl";
import { useParams } from "react-router-dom";
import {
  Alert,
  Card,
  CardBody,
  Col,
  Nav,
  NavItem,
  NavLink,
  Row,
  TabContent,
  TabPane,
} from "reactstrap";
import Country from "./privacy";
const CityEdit = () => {
  const [selected, setSelected] = useState(null);
  const [activeTab, setActiveTab] = useState("1");
  const { id } = useParams();
  const toggle = (tab) => setActiveTab(tab);
  return (
    <Row className="app-user-edit">
      <Col sm="12">
        <Card>
          <CardBody className="pt-2">
            <Nav pills>
              <NavItem>
                <NavLink active={activeTab === "1"} onClick={() => toggle("1")}>
                  <HelpCircle size={14} />
                  <span className="align-middle d-none d-sm-block">
                    <FormattedMessage id="FAQ" />
                  </span>
                </NavLink>
              </NavItem>
            </Nav>
            <TabContent activeTab={activeTab}>
              <TabPane tabId="1">
                <Country selected={selected} />
              </TabPane>
            </TabContent>
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
};
export default CityEdit;
