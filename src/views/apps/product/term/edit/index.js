import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";
import { useHistory, useParams } from "react-router-dom";
import {
  Alert,
  Card,
  CardBody,
  Col,
  Row,
  TabContent,
  TabPane,
} from "reactstrap";
import { getById } from "../store/action";
import TermTab from "./Term";

const TermEdit = ({ intl }) => {
  const history = useHistory();
  const [activeTab, setActiveTab] = useState("1"),
    store = useSelector((state) => state.terms),
    dispatch = useDispatch(),
    { id } = useParams();

  //load currTerm
  useEffect(() => {
    dispatch(
      getById({
        id: parseInt(id),
      })
    );
  }, [dispatch, id]);

  return store.selected !== null && store.selected !== undefined ? (
    <Row className="app-user-edit">
      <Col sm="12">
        <span>
          <a href={"/apps/product/term/list/" + id}>
            {" "}
            {<FormattedMessage id="term" />}
          </a>
        </span>{" "}
        /<span>{<FormattedMessage id="Update term" />}</span>
        <Card>
          <CardBody className="pt-2">
            <TabContent activeTab={activeTab}>
              <TabPane tabId="1">
                <TermTab selected={store.selected} />
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
export default TermEdit;
