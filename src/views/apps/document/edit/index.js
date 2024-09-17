import { useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";
import { useParams } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { getById } from "../store/action";

import { FileText, User } from "react-feather";
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

import DocumentTab from "./Document";

const DocumentEdit = () => {
  const [activeTab, setActiveTab] = useState("1"),
    store = useSelector((state) => state.documents),
    common = useSelector((state) => state.common),
    dispatch = useDispatch(),
    { id } = useParams();

  const toggle = (tab) => setActiveTab(tab);

  useEffect(() => {
    dispatch(
      getById({
        document_id: parseInt(id),
        language: common?.language,
      })
    );
  }, [dispatch]);
  return store.selected !== null && store.selected !== undefined ? (
    <Row className="app-user-edit">
      <Col sm="12">
        <Card>
          <CardBody className="pt-2">
            <Nav pills>
              <NavItem>
                <NavLink active={activeTab === "1"} onClick={() => toggle("1")}>
                  <FileText size={14} />
                  <span className="align-middle d-none d-sm-block">
                    <FormattedMessage id="New" />
                  </span>
                </NavLink>
              </NavItem>
            </Nav>
            <TabContent activeTab={activeTab}>
              <TabPane tabId="1">
                <DocumentTab selected={store.selected} {...{ common, store }} />
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
export default DocumentEdit;
