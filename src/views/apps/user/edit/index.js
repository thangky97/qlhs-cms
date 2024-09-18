import { useEffect, useState } from "react";
import { User, Users } from "react-feather";
import { FormattedMessage } from "react-intl";
import { useDispatch, useSelector } from "react-redux";
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
import { getById } from "../store/action";
import StaffTab from "./Staff";
const StaffEdit = () => {
  const [activeTab, setActiveTab] = useState("1"),
    store = useSelector((state) => state.staffs),
    dispatch = useDispatch(),
    { id } = useParams(),
    toggle = (tab) => setActiveTab(tab);
  useEffect(() => {
    dispatch(getById(parseInt(id)));
  }, []);
  return store.selected !== null && store.selected !== undefined ? (
    <Row className="app-user-edit" id="staff-section">
      <Col sm="12">
        <Card>
          <CardBody className="pt-2">
            <Nav pills>
              <NavItem>
                <NavLink active={activeTab === "1"} onClick={() => toggle("1")}>
                  <Users size={14} />
                  <span className="align-middle d-none d-sm-block">
                    <FormattedMessage id="System staff" />
                  </span>
                </NavLink>
              </NavItem>
            </Nav>
            <TabContent activeTab={activeTab}>
              <TabPane tabId="1">
                <StaffTab selected={store.selected} store={store} />
              </TabPane>
            </TabContent>
          </CardBody>
        </Card>
      </Col>
    </Row>
  ) : (
    <Alert color="danger">
      <h4 className="alert-heading">Not found</h4>
    </Alert>
  );
};
export default StaffEdit;
