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
import { getUser } from "../store/action";
import UserTab from "./UserProduct";

const UserEdit = () => {
  const [activeTab, setActiveTab] = useState("1");
  const store = useSelector((state) => state.user_product);
  const dispatch = useDispatch();
  const { id } = useParams();
  const history = useHistory();
  const toggle = (tab) => setActiveTab(tab);

  useEffect(() => {
    if (store?.status == 200) {
      history.goBack();
    }
  }, [store?.status]);

  useEffect(() => {
    dispatch(getUser(parseInt(id)));
  }, [dispatch]);
  return store?.selected !== null && store.selected !== undefined ? (
    <Row className="app-user-edit">
      <Col sm="12">
        <Card>
          <CardBody className="pt-2">
            <Nav pills>
              <NavItem>
                <NavLink active={activeTab === "1"} onClick={() => toggle("1")}>
                  <User size={14} />
                  <span className="align-middle d-none d-sm-block">
                    <FormattedMessage id="User" />
                  </span>
                </NavLink>
              </NavItem>
            </Nav>
            <TabContent activeTab={activeTab}>
              <TabPane tabId="1">
                <UserTab selected={store.selected} store={store} />
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
export default UserEdit;
