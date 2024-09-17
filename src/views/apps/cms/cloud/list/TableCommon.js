import Avatar from "@components/avatar";
import { useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";
import { useDispatch, useSelector } from "react-redux";
import { getData } from "../store/action";
import avatarBlank from "./../../../../../assets/images/avatars/bg-blank.png";
import Sidebar from "./Sidebar";

import "@styles/react/libs/react-select/_react-select.scss";
import "@styles/react/libs/tables/react-dataTable-component.scss";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Media,
  Row,
} from "reactstrap";
const CustomHeader = ({ toggleSidebar, id }) => {
  const history = useHistory();
  return (
    <div className="invoice-list-table-header w-100  ">
      {
        <Row className="justify-content-end">
          <Col
            xl="6"
            className="d-flex align-items-sm-center justify-content-lg-end justify-content-start flex-lg-nowrap flex-wrap flex-sm-row flex-column pr-lg-1 p-0 mt-lg-0 mt-1"
          >
            {!id ? (
              <Button.Ripple
                color="primary"
                className={"mx-3"}
                onClick={toggleSidebar}
              >
                <FormattedMessage id="add" />
              </Button.Ripple>
            ) : (
              <Button.Ripple
                color="primary"
                className={"mx-3"}
                onClick={() => {
                  history.push(`/apps/cms/about/setting/edit/${id}`);
                }}
              >
                <FormattedMessage id="update-infomation" />
              </Button.Ripple>
            )}
          </Col>
        </Row>
      }
    </div>
  );
};

const SettingList = () => {
  const dispatch = useDispatch();
  const store = useSelector((state) => state.settings);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loadData, setLoadData] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState();
  const [phoneNumber2, setPhoneNumber2] = useState();
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
    setAvatar(avatarBlank);
    setPhoneNumber("");
    setPhoneNumber2("");
  };
  const [avatar, setAvatar] = useState(avatarBlank);
  useEffect(() => {
    dispatch(getData());
  }, [loadData]);
  useEffect(() => {
    switch (store?.type) {
      case "ADD_SETTING":
        if (store?.statusSetting == 200) {
          toast.success(<FormattedMessage id={"Update successful!"} />);
          setLoadData(!loadData);
          toggleSidebar();
        } else if (store?.statusSetting == 400) {
          toast.warn(<FormattedMessage id={"Update failed!"} />);
        }

        break;
      default:
        break;
    }
  }, [store]);

  useEffect(() => {
    switch (store?.type) {
      case "UPDATE_SETTING":
        if (store?.statusSetting == 200) {
          toast.success(<FormattedMessage id={"Update successful!"} />);
          setLoadData(!loadData);
        } else if (store?.statusSetting == 400) {
          toast.warn(<FormattedMessage id={"Update failed!"} />);
        }

        break;
      default:
        break;
    }
  }, []);

  return (
    <div className="app-user-list">
      <Card>
        <CardBody>
          <CustomHeader id={store?.data?.id} toggleSidebar={toggleSidebar} />
        </CardBody>
      </Card>
      <div style={{ marginTop: 20 }}></div>
      <Card className="card-apply-job" style={{ height: "unset" }}>
        <CardHeader>
          {/* store?.data */}
          <h4>{<FormattedMessage id="General Information" />}</h4>
        </CardHeader>

        <CardBody>
          <div className="d-flex justify-content-between align-items-center mb-1">
            <h5 className="apply-job-title">
              <FormattedMessage id="Logo" /> :{" "}
            </h5>
            <Media>
              <Avatar
                className="mr-1 objectFit-contain"
                img={store?.data?.logo}
                imgHeight="72"
                imgWidth="72"
              />
            </Media>
          </div>
          <h5 className="apply-job-title">
            <FormattedMessage id="phone 1" /> :{" "}
            <span style={{ fontWeight: "normal" }}>{store?.data?.phone_1}</span>
          </h5>
          <br></br>
          <h5 className="apply-job-title">
            <FormattedMessage id="phone 2" /> :{" "}
            <span style={{ fontWeight: "normal" }}>
              {store?.data?.phone_2}{" "}
            </span>
          </h5>
          <br></br>
          <h5 className="apply-job-title">
            <FormattedMessage id="Email" /> :{" "}
            <span style={{ fontWeight: "normal" }}>{store?.data?.email} </span>
          </h5>
          <h5 className="mt-2 ">
            <FormattedMessage id="Map source" /> :
          </h5>
          <div
            className="apply-job-package bg-light-primary rounded"
            style={{ overflow: "scroll" }}
          >
            <div>
              <sup className="text-body">
                <small>{}</small>
              </sup>
              <h2 className="d-inline mr-25">{}</h2>

              <span className="text-white" style={{ maxWidth: "100%" }}>
                {store?.data?.map_source}
              </span>
            </div>
          </div>
          <h5 className="mt-2 ">
            <FormattedMessage id="Footer text" /> :
          </h5>
          <div
            className="apply-job-package bg-light-primary rounded"
            style={{ overflow: "scroll" }}
          >
            <div>
              <sup className="text-body">
                <small>{}</small>
              </sup>
              <h2 className="d-inline mr-25">{}</h2>

              <span
                className="text-white"
                dangerouslySetInnerHTML={{
                  __html: store?.data?.footer_text + "",
                }}
                style={{ maxWidth: "100%" }}
              ></span>
            </div>
          </div>
        </CardBody>
      </Card>
      <Sidebar
        open={sidebarOpen}
        toggleSidebar={toggleSidebar}
        {...{
          avatar,
          setAvatar,
          avatarBlank,
          phoneNumber,
          setPhoneNumber,
          phoneNumber2,
          setPhoneNumber2,
        }}
      />
    </div>
  );
};

export default SettingList;
