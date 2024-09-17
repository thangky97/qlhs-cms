import ExtensionsHeader from "@components/extensions-header";
import { useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import {
  CardBody
} from "reactstrap";

import { Button, Card, Col, Row } from "reactstrap";
import api from "../../../../../../constants/api";
import request from "../../../../../../services/request";
import Sidebar from "./add/index";

const CustomHeader = ({  }) => {
  const history = useHistory();
  return (
    <div className="invoice-list-table-header w-100 mr-1 ml-50 ">
      {
        <Row className="justify-content-end">
          <Col
            xl="6"
            className="d-flex align-items-sm-center justify-content-lg-end justify-content-start flex-lg-nowrap flex-wrap flex-sm-row flex-column pr-lg-1 p-0 mt-lg-0 mt-1"
          >
            <Button.Ripple
              color="primary"
              onClick={() => history.push("/apps/cms/cloud/link_cloud/edit")}
            >
              <FormattedMessage id="update_tab" />
            </Button.Ripple>
          </Col>
        </Row>
      }
    </div>
  );
};

const LinkCloudList = () => {
  const lang = useSelector((state) => state.common.language);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [disable, setDisable] = useState(false);
  const [linkCloudData, setLinkCloudData] = useState();
  useEffect(() => {
    (async () => {
      const listAbout = await request.send({
        method: api.LIST_ABOUT.method,
        path: api.LIST_ABOUT.path,
        query: { lang },
      });
      if (listAbout?.data?.data?.length > 0) {
        setLinkCloudData(listAbout?.data?.data[0]);
      }
    })();
  }, []);
  const toggleSidebar = () => {
    setDisable(false);
    setSidebarOpen(!sidebarOpen);
  };


  return (
    <div className="app-user-list">
      <CustomHeader toggleSidebar={toggleSidebar} />
      <ExtensionsHeader title={<FormattedMessage id="Link Cloud" />} />
     <Row >
      <Col md={6}>
      <Card className="card-apply-job " style={{ height: "unset" }}>
        <CardBody>
          <div  dangerouslySetInnerHTML={{
                  __html: linkCloudData?.link_cloud+ "",
                }}>
          </div>
          
        </CardBody>
      </Card>
      </Col>
     </Row>
      <Sidebar
        open={sidebarOpen}
        toggleSidebar={toggleSidebar}
        disabled={disable}
        {...{ disable, setDisable }}
      />
    </div>
  );
};

export default LinkCloudList;
