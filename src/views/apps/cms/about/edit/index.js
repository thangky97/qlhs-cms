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
import api from "../../../../../constants/api";
import request from "../../../../../services/request";
import { getById, getData } from "../store/action";
import AboutTab from "./About";
const AboutEdit = () => {
  const [activeTab, setActiveTab] = useState("1"),
    store = useSelector((state) => state.abouts),
    lang = useSelector((state) => state.common.language),
    dispatch = useDispatch(),
    toggle = (tab) => setActiveTab(tab);
const [idAbout,setIdAbout] = useState()
  useEffect(() => {
    const init = async () => {
      await request
        .send({
          method: api.LIST_ABOUT.method,
          path: api.LIST_ABOUT.path,
          query: { lang },
        })
        .then((response) => {
          setIdAbout(response.data.data[0].id)
          if (response?.data?.data) {
            dispatch(getById({ id: parseInt(response.data.data[0].id), lang }));

          }
        });
    };
    init();
  }, []);

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
                    <FormattedMessage id="Home" />
                  </span>
                </NavLink>
              </NavItem>
            </Nav>
            <TabContent activeTab={activeTab}>
              <TabPane tabId="1">
                <AboutTab
                  selected={store.selected}
                  store={store}
                  idAbout={idAbout}
                />
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
export default AboutEdit;
