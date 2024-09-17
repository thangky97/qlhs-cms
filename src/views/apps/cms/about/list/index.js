import ExtensionsHeader from "@components/extensions-header";
import { useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import SectionSlider from "./../../../cms/home/slider/list/index";
import SectionPartner from "./../../../cms/home/partner/list/index";
import SectionContract from "./../../setting/list/TableCommon";
import { Button, Card, CardBody, CardHeader, Col, Row } from "reactstrap";

import { useHistory } from "react-router-dom";
import { getData } from "../store/action";
import Sidebar from "./Sidebar";
const CustomHeader = ({ toggleSidebar, id }) => {
  const history = useHistory();
  return (
    <div
      className="invoice-list-table-header w-100  "
      style={{ marginBottom: 10 }}
    >
      {
        <Row className="justify-content-end">
          <Col
            xl="6"
            className="d-flex align-items-sm-center justify-content-lg-end justify-content-start flex-lg-nowrap flex-wrap flex-sm-row flex-column pr-lg-1 p-0 mt-lg-0 mt-1"
          >
            <Button.Ripple
              color="primary"
              className={"mx-3"}
              onClick={() => {
                history.push(`/apps/cms/about/edit/${id}`);
              }}
            >
              <FormattedMessage id="update content landing" />
            </Button.Ripple>
          </Col>
        </Row>
      }
    </div>
  );
};

const AboutList = () => {
  const dispatch = useDispatch();
  const store = useSelector((state) => state.abouts);
  const lang = useSelector((state) => state.common.language);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [disable, setDisable] = useState(false);
  const [loadData, setLoadData] = useState(false);
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
    setDisable(false);
  };
  useEffect(() => {
    dispatch(
      getData({
        lang,
      })
    );
  }, [lang]);
  useEffect(() => {
    switch (store?.type) {
      case "ADD_ABOUT":
        if (store?.status == 200) {
          toast.success(<FormattedMessage id={"successfully added new!"} />);
          setLoadData(!loadData);
          toggleSidebar();
        } else if (store?.status == 400) {
          toast.warn(<FormattedMessage id={"Add new failure!"} />);
        }
        break;
      default:
        break;
    }
  }, []);
  useEffect(() => {
    switch (store?.type) {
      case "UPDATE_ABOUT":
        if (store?.status == 200) {
          toast.success(<FormattedMessage id={"Update successful!"} />);
          setLoadData(!loadData);
        } else if (store?.status == 400) {
          toast.warn(<FormattedMessage id={"Update failed!"} />);
        }
        break;
      default:
        break;
    }
  }, []);

  const [intro1, setIntro1] = useState();
  const [intro2, setIntro2] = useState();
  const [intro3, setIntro3] = useState();
  const [introProduct, setIntroProduct] = useState();
  const [introPartner, setIntroPartner] = useState();
  const [introAbout, setIntroAbout] = useState();
  const [introSystem, setIntroSystem] = useState();
  const [introService, setIntroService] = useState();
  useEffect(() => {
    if (store?.data) {
      store?.data[0]?.section_intro_1
        ? setIntro1(JSON.parse(store?.data[0].section_intro_1))
        : setIntro1(null);

      store?.data[0]?.section_intro_2
        ? setIntro2(JSON.parse(store?.data[0].section_intro_2))
        : setIntro2(null);
      store?.data[0]?.section_intro_3
        ? setIntro3(JSON.parse(store?.data[0].section_intro_3))
        : setIntro3(null);
      store?.data[0]?.section_product
        ? setIntroProduct(JSON.parse(store?.data[0].section_product))
        : setIntroProduct(null);

      store?.data[0]?.section_partner
        ? setIntroPartner(JSON.parse(store?.data[0].section_partner))
        : setIntroPartner(null);
      store?.data[0]?.section_about
        ? setIntroAbout(JSON.parse(store?.data[0].section_about))
        : setIntroAbout(null);

      store?.data[0]?.section_system
        ? setIntroSystem(JSON.parse(store?.data[0].section_system))
        : setIntroSystem(null);

      store?.data[0]?.section_service
        ? setIntroService(JSON.parse(store?.data[0].section_service))
        : setIntroService(null);
    }
  }, [store, lang]);

  return (
    <div className="app-user-list">
      <ExtensionsHeader title={<FormattedMessage id="Slide banner" />} />
      <SectionSlider />
      <br></br>
      <Card>
        <CardBody>
          <CustomHeader
            id={store?.data && store?.data[0]?.id}
            toggleSidebar={toggleSidebar}
          />
        </CardBody>
      </Card>
      <br></br>
      <ExtensionsHeader title={<FormattedMessage id="section content 1" />} />
      <Card className="card-apply-job " style={{ height: "unset" }}>
        <CardBody>
          <div className="d-flex justify-content-between align-items-center mb-1"></div>

          <h5 className="mt-2 ">
            <FormattedMessage id="youtube_url" /> :
          </h5>
          <div
            className="apply-job-package bg-light-primary rounded"
            style={{ overflow: "scroll" }}
          >
            <div>
              <span className="text-white" style={{ maxWidth: "100%" }}>
                {intro1?.embed_content1}
              </span>
            </div>
          </div>
          <h5 className="mt-2 ">
            <FormattedMessage id="intro_title" /> :
          </h5>
          <div
            className="apply-job-package bg-light-primary rounded"
            style={{ overflow: "scroll" }}
          >
            <div>
              <span className="text-white" style={{ maxWidth: "100%" }}>
                {intro1?.title_content1}
              </span>
            </div>
          </div>
          <h5 className="mt-2 ">
            <FormattedMessage id="intro_content" /> :
          </h5>
          <div
            className="apply-job-package bg-light-primary rounded"
            style={{ overflow: "scroll" }}
          >
            <div>
              <span
                className="text-white"
                style={{ maxWidth: "100%" }}
                dangerouslySetInnerHTML={{
                  __html: intro1 && intro1?.content_content1 + "",
                }}
              ></span>
            </div>
          </div>
        </CardBody>
      </Card>
      <br></br>
      {/* Giai phap */}
      <ExtensionsHeader title={<FormattedMessage id="section content 2" />} />
      <Card className="card-apply-job " style={{ height: "unset" }}>
        <CardBody>
          <div className="d-flex justify-content-between align-items-center mb-1"></div>

          <h5 className="mt-2 ">
            <FormattedMessage id="header_solution" /> :
          </h5>
          <div
            className="apply-job-package bg-light-primary rounded"
            style={{ overflow: "scroll" }}
          >
            <div>
              <span className="text-white" style={{ maxWidth: "100%" }}>
                {intro2?.header_content2}
              </span>
            </div>
          </div>
          <h5 className="mt-2 ">
            <FormattedMessage id="solution_title" /> :
          </h5>
          <div
            className="apply-job-package bg-light-primary rounded"
            style={{ overflow: "scroll" }}
          >
            <div>
              <span className="text-white" style={{ maxWidth: "100%" }}>
                {intro2?.title_content2}
              </span>
            </div>
          </div>
          <h5 className="mt-2 ">
            <FormattedMessage id="solution_content" /> :
          </h5>
          <div
            className="apply-job-package bg-light-primary rounded"
            style={{ overflow: "scroll" }}
          >
            <div>
              <span
                className="text-white"
                style={{ maxWidth: "100%" }}
                dangerouslySetInnerHTML={{
                  __html: intro2 && intro2?.content_content2 + "",
                }}
              ></span>
            </div>
          </div>
          <h5 className="mt-2 ">
            <FormattedMessage id="link_image" /> :
          </h5>
          <div
            className="apply-job-package bg-light-primary rounded"
            style={{ overflow: "scroll" }}
          >
            <div>
              <span className="text-white" style={{ maxWidth: "100%" }}>
                {intro2?.image_content2}
              </span>
            </div>
          </div>
        </CardBody>
      </Card>
      <br></br>
      <ExtensionsHeader title={<FormattedMessage id="section content 3" />} />
      <Card className="card-apply-job " style={{ height: "unset" }}>
        <CardBody>
          <div className="d-flex justify-content-between align-items-center mb-1"></div>

          <h5 className="mt-2 ">
            <FormattedMessage id="header_benefit" /> :
          </h5>
          <div
            className="apply-job-package bg-light-primary rounded"
            style={{ overflow: "scroll" }}
          >
            <div>
              <span className="text-white" style={{ maxWidth: "100%" }}>
                {intro3?.header_content3}
              </span>
            </div>
          </div>
          <h5 className="mt-2 ">
            <FormattedMessage id="benefit_title" /> :
          </h5>
          <div
            className="apply-job-package bg-light-primary rounded"
            style={{ overflow: "scroll" }}
          >
            <div>
              <span className="text-white" style={{ maxWidth: "100%" }}>
                {intro3?.short_header_content3}
              </span>
            </div>
          </div>
          <h4>
            <FormattedMessage id="post 1" />
          </h4>
          <h5 className="mt-2 ">
            <FormattedMessage id="post1_title" /> :
          </h5>
          <div
            className="apply-job-package bg-light-primary rounded"
            style={{ overflow: "scroll" }}
          >
            <div>
              <span className="text-white" style={{ maxWidth: "100%" }}>
                {intro3?.title1_content3}
              </span>
            </div>
          </div>
          <h5 className="mt-2 ">
            <FormattedMessage id="post1_content" /> :
          </h5>
          <div
            className="apply-job-package bg-light-primary rounded"
            style={{ overflow: "scroll" }}
          >
            <div>
              <span
                className="text-white"
                style={{ maxWidth: "100%" }}
                dangerouslySetInnerHTML={{
                  __html: intro3 && intro3?.content1_content3 + "",
                }}
              ></span>
            </div>
          </div>
          <h5 className="mt-2 ">
            <FormattedMessage id="link_image" /> :
          </h5>
          <div
            className="apply-job-package bg-light-primary rounded"
            style={{ overflow: "scroll" }}
          >
            <div>
              <span className="text-white" style={{ maxWidth: "100%" }}>
                {intro3?.image1_content3}
              </span>
            </div>
          </div>

          <h4>
            <FormattedMessage id="post 2" />
          </h4>
          <h5 className="mt-2 ">
            <FormattedMessage id="post2_title" /> :
          </h5>
          <div
            className="apply-job-package bg-light-primary rounded"
            style={{ overflow: "scroll" }}
          >
            <div>
              <span className="text-white" style={{ maxWidth: "100%" }}>
                {intro3?.title2_content3}
              </span>
            </div>
          </div>
          <h5 className="mt-2 ">
            <FormattedMessage id="post2_content" /> :
          </h5>
          <div
            className="apply-job-package bg-light-primary rounded"
            style={{ overflow: "scroll" }}
          >
            <div>
              <span
                className="text-white"
                style={{ maxWidth: "100%" }}
                dangerouslySetInnerHTML={{
                  __html: intro3 && intro3?.content2_content3 + "",
                }}
              ></span>
            </div>
          </div>
          <h5 className="mt-2 ">
            <FormattedMessage id="link_image" /> :
          </h5>
          <div
            className="apply-job-package bg-light-primary rounded"
            style={{ overflow: "scroll" }}
          >
            <div>
              <span className="text-white" style={{ maxWidth: "100%" }}>
                {intro3?.image2_content3}
              </span>
            </div>
          </div>
          <h4>
            <FormattedMessage id="post 3" />
          </h4>
          <h5 className="mt-2 ">
            <FormattedMessage id="post3_title" /> :
          </h5>
          <div
            className="apply-job-package bg-light-primary rounded"
            style={{ overflow: "scroll" }}
          >
            <div>
              <span className="text-white" style={{ maxWidth: "100%" }}>
                {intro3?.title3_content3}
              </span>
            </div>
          </div>
          <h5 className="mt-2 ">
            <FormattedMessage id="post3_content" /> :
          </h5>
          <div
            className="apply-job-package bg-light-primary rounded"
            style={{ overflow: "scroll" }}
          >
            <div>
              <span
                className="text-white"
                style={{ maxWidth: "100%" }}
                dangerouslySetInnerHTML={{
                  __html: intro3 && intro3?.content3_content3 + "",
                }}
              ></span>
            </div>
          </div>
          <h5 className="mt-2 ">
            <FormattedMessage id="link_image" /> :
          </h5>
          <div
            className="apply-job-package bg-light-primary rounded"
            style={{ overflow: "scroll" }}
          >
            <div>
              <span className="text-white" style={{ maxWidth: "100%" }}>
                {intro3?.image3_content3}
              </span>
            </div>
          </div>
        </CardBody>
      </Card>
      <br></br>
      <ExtensionsHeader
        title={<FormattedMessage id="section content product" />}
      />
      <Card className="card-apply-job " style={{ height: "unset" }}>
        <CardBody>
          <div className="d-flex justify-content-between align-items-center mb-1"></div>

          <h5 className="mt-2 ">
            <FormattedMessage id="Title" /> :
          </h5>
          <div
            className="apply-job-package bg-light-primary rounded"
            style={{ overflow: "scroll" }}
          >
            <div>
              <span className="text-white" style={{ maxWidth: "100%" }}>
                {introProduct && introProduct.data?.[0]?.title}
                {introProduct?.title_product}
              </span>
            </div>
          </div>
          <h5 className="mt-2 ">
            <FormattedMessage id="Content" /> :
          </h5>
          <div
            className="apply-job-package bg-light-primary rounded"
            style={{ overflow: "scroll" }}
          >
            <div>
              <span
                className="text-white"
                style={{ maxWidth: "100%" }}
                dangerouslySetInnerHTML={{
                  __html: introProduct && introProduct?.content_product + "",
                }}
              ></span>
            </div>
          </div>
        </CardBody>
      </Card>
      <br></br>
      <ExtensionsHeader
        title={<FormattedMessage id="section content partner" />}
      />
      <Card className="card-apply-job " style={{ height: "unset" }}>
        <CardBody>
          <div className="d-flex justify-content-between align-items-center mb-1"></div>

          <h5 className="mt-2 ">
            <FormattedMessage id="Title" /> :
          </h5>
          <div
            className="apply-job-package bg-light-primary rounded"
            style={{ overflow: "scroll" }}
          >
            <div>
              <span className="text-white" style={{ maxWidth: "100%" }}>
                {introPartner?.title_partner}
              </span>
            </div>
          </div>
          <h5 className="mt-2 ">
            <FormattedMessage id="Content" /> :
          </h5>
          <div
            className="apply-job-package bg-light-primary rounded"
            style={{ overflow: "scroll" }}
          >
            <div>
              <span
                className="text-white"
                style={{ maxWidth: "100%" }}
                dangerouslySetInnerHTML={{
                  __html: introPartner && introPartner?.content_partner + "",
                }}
              ></span>
            </div>
          </div>
        </CardBody>
      </Card>
      <br></br>
      <ExtensionsHeader
        title={<FormattedMessage id="section content service" />}
      />
      <Card className="card-apply-job " style={{ height: "unset" }}>
        <CardBody>
          <div className="d-flex justify-content-between align-items-center mb-1"></div>

          <h5 className="mt-2 ">
            <FormattedMessage id="header" /> :
          </h5>
          <div
            className="apply-job-package bg-light-primary rounded"
            style={{ overflow: "scroll" }}
          >
            <div>
              <span className="text-white" style={{ maxWidth: "100%" }}>
                {introService?.header_service}
              </span>
            </div>
          </div>
          <h5 className="mt-2 ">
            <FormattedMessage id="Title" /> :
          </h5>
          <div
            className="apply-job-package bg-light-primary rounded"
            style={{ overflow: "scroll" }}
          >
            <div>
              <span className="text-white" style={{ maxWidth: "100%" }}>
                {introService?.short_header_service}
              </span>
            </div>
          </div>

          {introService?.data?.length > 0 &&
            introService?.data?.map((item) => (
              <>
                <h4>- {item?.title_service}</h4>
                <h5 className="mt-2 ">
                  <FormattedMessage id="Content" /> :
                </h5>
                <div
                  className="apply-job-package bg-light-primary rounded"
                  style={{ overflow: "scroll" }}
                >
                  <div>
                    <span
                      className="text-white"
                      style={{ maxWidth: "100%" }}
                      dangerouslySetInnerHTML={{
                        __html: item && item?.content_service + "",
                      }}
                    ></span>
                  </div>
                </div>
                <div
                  className="apply-job-package bg-light-primary rounded"
                  style={{ overflow: "scroll" }}
                >
                  <div>
                    <span
                      className="text-white"
                      style={{ maxWidth: "100%" }}
                      dangerouslySetInnerHTML={{
                        __html: item && item?.feature_service + "",
                      }}
                    ></span>
                  </div>
                </div>
              </>
            ))}
        </CardBody>
      </Card>
      <br></br>
      <ExtensionsHeader
        title={<FormattedMessage id="section content about" />}
      />
      <Card className="card-apply-job " style={{ height: "unset" }}>
        <CardBody>
          <div className="d-flex justify-content-between align-items-center mb-1"></div>

          <h5 className="mt-2 ">
            <FormattedMessage id="header" /> :
          </h5>
          <div
            className="apply-job-package bg-light-primary rounded"
            style={{ overflow: "scroll" }}
          >
            <div>
              <span className="text-white" style={{ maxWidth: "100%" }}>
                {introAbout?.header_about}
              </span>
            </div>
          </div>
          <h5 className="mt-2 ">
            <FormattedMessage id="Title" /> :
          </h5>
          <div
            className="apply-job-package bg-light-primary rounded"
            style={{ overflow: "scroll" }}
          >
            <div>
              <span className="text-white" style={{ maxWidth: "100%" }}>
                {introAbout?.title_about}
              </span>
            </div>
          </div>
          <h5 className="mt-2 ">
            <FormattedMessage id="Content" /> :
          </h5>
          <div
            className="apply-job-package bg-light-primary rounded"
            style={{ overflow: "scroll" }}
          >
            <div>
              <span
                className="text-white"
                style={{ maxWidth: "100%" }}
                dangerouslySetInnerHTML={{
                  __html: introAbout && introAbout?.content_about + "",
                }}
              ></span>
            </div>
          </div>
          <h5 className="mt-2 ">
            <FormattedMessage id="Logo" /> :
          </h5>
          <div
            className="apply-job-package bg-light-primary rounded"
            style={{ overflow: "scroll" }}
          >
            <div>
              <span className="text-white" style={{ maxWidth: "100%" }}>
                {introAbout?.image_about}
              </span>
            </div>
          </div>
        </CardBody>
      </Card>
      <br></br>
      <ExtensionsHeader title={<FormattedMessage id="partner" />} />
      <SectionPartner />
      <br></br>
      <ExtensionsHeader title={<FormattedMessage id="contact" />} />
      <Card className="card-apply-job " style={{ height: "unset" }}>
        <CardBody>
          <div className="d-flex justify-content-between align-items-center mb-1"></div>

          <h5 className="mt-2 ">
            <FormattedMessage id="company name" /> :
          </h5>
          <div
            className="apply-job-package bg-light-primary rounded"
            style={{ overflow: "scroll" }}
          >
            <div>
              <span className="text-white" style={{ maxWidth: "100%" }}>
                {store?.data[0]?.company_name && store.data?.[0].company_name}
              </span>
            </div>
          </div>
          <h5 className="mt-2 ">
            <FormattedMessage id="founded" /> :
          </h5>
          <div
            className="apply-job-package bg-light-primary rounded"
            style={{ overflow: "scroll" }}
          >
            <div>
              <span className="text-white" style={{ maxWidth: "100%" }}>
                {store?.data[0]?.founded && store.data?.[0].founded}
              </span>
            </div>
          </div>
          <h5 className="mt-2 ">
            <FormattedMessage id="officer" /> :
          </h5>
          <div
            className="apply-job-package bg-light-primary rounded"
            style={{ overflow: "scroll" }}
          >
            <div>
              <span className="text-white" style={{ maxWidth: "100%" }}>
                {store?.data[0]?.officer && store.data?.[0].officer}
              </span>
            </div>
          </div>
          <h5 className="mt-2 ">
            <FormattedMessage id="advisor" /> :
          </h5>
          <div
            className="apply-job-package bg-light-primary rounded"
            style={{ overflow: "scroll" }}
          >
            <div>
              <span className="text-white" style={{ maxWidth: "100%" }}>
                {store?.data[0]?.advisor && store.data?.[0].advisor}
              </span>
            </div>
          </div>
          <h5 className="mt-2 ">
            <FormattedMessage id="About" /> :
          </h5>
          <div
            className="apply-job-package bg-light-primary rounded"
            style={{ overflow: "scroll" }}
          >
            <div>
              <span className="text-white" style={{ maxWidth: "100%" }}>
                {store?.data[0]?.about && store.data?.[0].about}
              </span>
            </div>
          </div>
          <h5 className="mt-2 ">
            <FormattedMessage id="Address 1" /> :
          </h5>
          <div
            className="apply-job-package bg-light-primary rounded"
            style={{ overflow: "scroll" }}
          >
            <div>
              <span className="text-white" style={{ maxWidth: "100%" }}>
                {store?.data[0]?.address_1 && store.data?.[0].address_1}
              </span>
            </div>
          </div>
          <h5 className="mt-2 ">
            <FormattedMessage id="Address 2" /> :
          </h5>
          <div
            className="apply-job-package bg-light-primary rounded"
            style={{ overflow: "scroll" }}
          >
            <div>
              <span className="text-white" style={{ maxWidth: "100%" }}>
                {store?.data[0]?.address_2 && store.data?.[0].address_2}
              </span>
            </div>
          </div>
        </CardBody>
      </Card>
      <ExtensionsHeader title={<FormattedMessage id="section_system" />} />
      <Card className="card-apply-job " style={{ height: "unset" }}>
        <CardBody>
          <div className="d-flex justify-content-between align-items-center mb-1"></div>

          <h5 className="mt-2 ">
            <FormattedMessage id="system_facebook" /> :
          </h5>
          <div
            className="apply-job-package bg-light-primary rounded"
            style={{ overflow: "scroll" }}
          >
            <div>
              <span className="text-white" style={{ maxWidth: "100%" }}>
                {introSystem?.link_facebook && introSystem?.link_facebook}
              </span>
            </div>
          </div>

          <h5 className="mt-2 ">
            <FormattedMessage id="system_zalo" /> :
          </h5>
          <div
            className="apply-job-package bg-light-primary rounded"
            style={{ overflow: "scroll" }}
          >
            <div>
              <span className="text-white" style={{ maxWidth: "100%" }}>
                {introSystem?.link_zalo && introSystem?.link_zalo}
              </span>
            </div>
          </div>

          <h5 className="mt-2 ">
            <FormattedMessage id="system_instagram" /> :
          </h5>
          <div
            className="apply-job-package bg-light-primary rounded"
            style={{ overflow: "scroll" }}
          >
            <div>
              <span className="text-white" style={{ maxWidth: "100%" }}>
                {introSystem?.link_instagram && introSystem?.link_instagram}
              </span>
            </div>
          </div>
          <h5 className="mt-2 ">
            <FormattedMessage id="system_youtube" /> :
          </h5>
          <div
            className="apply-job-package bg-light-primary rounded"
            style={{ overflow: "scroll" }}
          >
            <div>
              <span className="text-white" style={{ maxWidth: "100%" }}>
                {introSystem?.link_youtube && introSystem?.link_youtube}
              </span>
            </div>
          </div>

          <h5 className="mt-2 ">
            <FormattedMessage id="system_bank" /> :
          </h5>
          <div
            className="apply-job-package bg-light-primary rounded"
            style={{ overflow: "scroll" }}
          >
            <div>
              <span className="text-white" style={{ maxWidth: "100%" }}>
                {introSystem?.bank && introSystem?.bank}
              </span>
            </div>
          </div>
          <h5 className="mt-2 ">
            <FormattedMessage id="system_bank_number" /> :
          </h5>
          <div
            className="apply-job-package bg-light-primary rounded"
            style={{ overflow: "scroll" }}
          >
            <div>
              <span className="text-white" style={{ maxWidth: "100%" }}>
                {introSystem?.bank_number && introSystem?.bank_number}
              </span>
            </div>
          </div>
          <h5 className="mt-2 ">
            <FormattedMessage id="system_bank_user" /> :
          </h5>
          <div
            className="apply-job-package bg-light-primary rounded"
            style={{ overflow: "scroll" }}
          >
            <div>
              <span className="text-white" style={{ maxWidth: "100%" }}>
                {introSystem?.bank_user && introSystem?.bank_user}
              </span>
            </div>
          </div>
        </CardBody>
      </Card>
      <br></br>
      <SectionContract />
      <Sidebar
        open={sidebarOpen}
        toggleSidebar={toggleSidebar}
        {...{ disable, setDisable }}
      />
    </div>
  );
};

export default AboutList;
