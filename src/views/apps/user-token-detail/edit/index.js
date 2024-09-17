import { useEffect, useState } from "react";
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
import { User } from "react-feather";
import { FormattedMessage } from "react-intl";

import { getUserTokenDetailById } from "../store/action";
import UserTab from "./User";

const UserEdit = () => {
  const [activeTab, setActiveTab] = useState("1"),
    store = useSelector((state) => state.userTokenDetail),
    dispatch = useDispatch(),
    { id } = useParams();

  const toggle = (tab) => setActiveTab(tab);

  useEffect(() => {
    dispatch(getUserTokenDetailById(parseInt(id)));
  }, [dispatch, id]);

  return store.selected !== null && store.selected !== undefined ? (
    <Row className="app-user-edit">
      <Col sm="12">
        <Card>
          <CardBody className="pt-2">
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
