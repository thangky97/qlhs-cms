import { useEffect, useState } from "react";
import { AlignJustify, Table } from "react-feather";
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
import { getKind } from "../store/action";
import KindTab from "./Transcript";

const KindEdit = () => {
  const [activeTab, setActiveTab] = useState("1"),
    store = useSelector((state) => state.transcript),
    dispatch = useDispatch(),
    { id } = useParams();

  const toggle = (tab) => setActiveTab(tab);

  useEffect(() => {
    dispatch(getKind(parseInt(id)));
  }, [dispatch]);

  return store.selected !== null && store.selected !== undefined ? (
    <Row className="app-user-edit">
      <Col sm="12">
        <Card>
          <CardBody className="pt-2">
            <Nav pills>
              <NavItem>
                <NavLink active={activeTab === "1"} onClick={() => toggle("1")}>
                  <Table size={14} />
                  <span className="align-middle d-none d-sm-block">
                    <FormattedMessage id="Transcript" />
                  </span>
                </NavLink>
              </NavItem>
            </Nav>
            <TabContent activeTab={activeTab}>
              <TabPane tabId="1">
                <KindTab selected={store.selected} />
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
export default KindEdit;
