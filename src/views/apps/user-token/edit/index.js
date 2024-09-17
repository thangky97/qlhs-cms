import { useEffect, useState } from "react";
import { User } from "react-feather";
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
import { getListUser, getUser } from "../store/action";
import UserTab from "./User";

const UserEdit = () => {
  const [activeTab, setActiveTab] = useState("1"),
    store = useSelector((state) => state.users),
    dispatch = useDispatch(),
    { id } = useParams();
  useEffect(() => {
    dispatch(
      getListUser({
        filter: {},
        skip: 0,
        limit: 20,
        order: {
          key: "id",
          value: "desc",
        },
      })
    );
  }, [dispatch]);
  const toggle = (tab) => setActiveTab(tab);

  useEffect(() => {
    dispatch(getUser(parseInt(id)));
  }, [dispatch, id]);

  return store.selected !== null && store.selected !== undefined ? (
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
