import { useEffect, useState } from "react";
import { Archive, Bell, ChevronDown } from "react-feather";
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
import { getNotification } from "../store/action";
import NotificationTab from "./Notification";

const NotificationEdit = () => {
  const [activeTab, setActiveTab] = useState("1"),
    store = useSelector((state) => state.notification),
    dispatch = useDispatch(),
    { id } = useParams();

  const toggle = (tab) => setActiveTab(tab);

  useEffect(() => {
    dispatch(getNotification(parseInt(id)));
  }, [dispatch]);

  return store.selected !== null && store.selected !== undefined ? (
    <Row className="app-user-edit">
      <Col sm="12">
        <Card>
          <CardBody className="pt-2">
            <Nav pills>
              <NavItem>
                <NavLink active={activeTab === "1"} onClick={() => toggle("1")}>
                  <Bell size={14} />
                  <span className="align-middle d-none d-sm-block">
                    <FormattedMessage id="Notification" />
                  </span>
                </NavLink>
              </NavItem>
            </Nav>
            <TabContent activeTab={activeTab}>
              <TabPane tabId="1">
                <NotificationTab selected={store.selected} store={store} />
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
export default NotificationEdit;
