import { useEffect, useState } from "react";
import { User } from "react-feather";
import { FormattedMessage } from "react-intl";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
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
import SettingTab from "./Setting";

const SettingEdit = () => {
  const history = useHistory();
  const [activeTab, setActiveTab] = useState("1"),
    store = useSelector((state) => state.settings),
    dispatch = useDispatch(),
    { id } = useParams(),
    toggle = (tab) => setActiveTab(tab);
  useEffect(() => {
    dispatch(getById());
  }, []);
  useEffect(() => {
    if (store.statusSetting == 200) {
      history.goBack()
    }
  }, [store.statusSetting]);
  return store.data !== null && store.data !== undefined ? (
    <Row className="app-user-edit">
      <Col sm="12">
        <Card>
          <CardBody className="pt-2">
            <Nav pills>
              <NavItem>
                <NavLink active={activeTab === "1"} onClick={() => toggle("1")}>
                  <User size={14} />
                  <span className="align-middle d-none d-sm-block">
                    <FormattedMessage id="Setting" />
                  </span>
                </NavLink>
              </NavItem>
            </Nav>
            <TabContent activeTab={activeTab}>
              <TabPane tabId="1">
                <SettingTab selected={store.data} store={store} />
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
export default SettingEdit;
