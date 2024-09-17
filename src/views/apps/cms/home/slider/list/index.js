import { useRTL } from "@hooks/useRTL";
import "@styles/react/libs/swiper/swiper.scss";
import { EditorState } from "draft-js";
import { useEffect, useState } from "react";
import { FormattedMessage, injectIntl } from "react-intl";
import SwiperCore, { Thumbs } from "swiper";

import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { Button, Card, CardBody, CardHeader, Col, Row } from "reactstrap";
import Swal from "sweetalert2";
import { Swiper, SwiperSlide } from "swiper/react";
import { getData, remove } from "../store/action";
import avatarBlank from "./../../../../../../assets/images/avatars/bg-blank.png";
import Second from "./../../../../../../views/extensions/swiper/index";
import SidebarAdd from "./Sidebar";
SwiperCore.use([Thumbs]);

const ListSlider = ({ intl }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  const store = useSelector((state) => state.sliders);
  const lang = useSelector((state) => state.common.language);
  const dispatch = useDispatch();
  const [disable, setDisable] = useState(false);

  const [isRtl, setIsRtl] = useRTL();

  const [selected, setSelected] = useState();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loadData, setLoadData] = useState(false);
  const [valueContent, setValueContent] = useState(EditorState.createEmpty());

  const [avatar, setAvatar] = useState(avatarBlank);
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
    setAvatar(avatarBlank);
    setValueContent();

    setDisable(false);
  };
  useEffect(() => {
    dispatch(
      getData({
        lang,
      })
    );
  }, [lang, loadData]);
  useEffect(() => {
    if (store?.data?.data) {
      setSelected(store?.data?.data[0]);
    }
  }, [store?.data?.data]);
  const params = {
    spaceBetween: 50,
    slidesPerView: 1,
    navigation: true,
    thumbs: { swiper: thumbsSwiper },
  };
  const paramsThumbs = {
    className: "gallery-thumbs",
    spaceBetween: 10,
    slidesPerView: 4,
    freeMode: true,
    watchSlidesVisibility: true,
    watchSlidesProgress: true,
    onSwiper: setThumbsSwiper,
  };
  useEffect(() => {
    switch (store?.type) {
      case "ADD_SLIDER":
        if (store?.status == 200) {
          toast.success(<FormattedMessage id={"successfully added new!"} />);
          toggleSidebar();
          setLoadData(!loadData);
        } else if (store?.status == 400) {
          toast.warn(<FormattedMessage id={"Add new failure!"} />);
        }

        break;
      case "UPDATE_SLIDER":
        if (store?.status == 200) {
          toast.success(<FormattedMessage id={"Update successful!"} />);
        } else if (store?.status == 400) {
          toast.warn(<FormattedMessage id={"Update failed!"} />);
        }

        break;
      case "DELETE_SLIDER":
        if (store?.status == 200) {
          toast.success(<FormattedMessage id={"Delete successfully!"} />);

          setLoadData(!loadData);
        } else if (store?.status == 400) {
          toast.warn(<FormattedMessage id={"Delete failed!"} />);
        }

        break;

      default:
        break;
    }
  }, [store.status]);

  return (
    <>
      <Card className="mb-0" id="section-slider">
        <Second />
        <CardBody className="justify-content-center">
          <Swiper dir={isRtl ? "rtl" : "ltr"} {...params}>
            {store?.data?.data?.map((item, index) => (
              <SwiperSlide key={index}>
                <div className="banner-slider">
                  <img
                    src={item.image}
                    className="img-fluid"
                    style={{
                      width: "100%",
                      maxHeight: "400px",
                    }}
                  />

                  {/* <div className="content-slider ">
                      <h2 className="title-slider"
                      style={{background:"linear-gradient(91.97deg, #5c9af8 25.86%, #d150ff 74.79%)",
                      WebkitBackgroundClip:"text",
                      WebkitTextFillColor:"transparent"}}>
                        {" "}
                        {item?.title && item.title}
                      </h2>
                      {item?.content ? (
                        <div className="description-slider text-white description text-base"
                          dangerouslySetInnerHTML={{
                            __html: item?.content + "",
                          }}
                        ></div>
                      ) : (
                        ""
                      )}
                    </div> */}
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          <Swiper {...paramsThumbs}>
            {store?.data?.data?.map((item, index) => (
              <SwiperSlide
                key={index}
                onClick={() => {
                  setSelected(item);
                }}
              >
                <div className="banner-slider">
                  <img
                    src={item.image}
                    className="img-fluid"
                    style={{
                      width: "100%",
                      maxHeight: "400px",
                    }}
                  />

                  {/* <div className="content-slider ">
                      <h2 className="title-slider"
                      style={{background:"linear-gradient(91.97deg, #5c9af8 25.86%, #d150ff 74.79%)",
                      WebkitBackgroundClip:"text",
                      WebkitTextFillColor:"transparent"}}>
                        {" "}
                        {item?.title && item.title}
                      </h2>
                      {item?.content ? (
                        <div className="description-slider text-white description text-base"
                          dangerouslySetInnerHTML={{
                            __html: item?.content + "",
                          }}
                        ></div>
                      ) : (
                        ""
                      )}
                    </div> */}
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="demo-inline-spacing justify-content-center">
            <Button
              className=""
              color="primary"
              outline
              onClick={toggleSidebar}
            >
              <FormattedMessage id="add" />
            </Button>
            <Button
              color="warning"
              outline
              tag={Link}
              to={`/apps/slider/edit/${selected?.id}`}
            >
              <FormattedMessage id="edit" />
            </Button>

            <Button
              color="danger"
              outline
              onClick={() => {
                Swal.fire({
                  title: intl.formatMessage({
                    id: "Are you sure you want to delete?",
                  }),
                  icon: "warning",
                  showCancelButton: true,
                  confirmButtonColor: "#ea5455",
                  cancelButtonColor: "#3085d6",
                  confirmButtonText: intl.formatMessage({
                    id: "delete",
                  }),
                  cancelButtonText: intl.formatMessage({
                    id: "Cancel",
                  }),
                  reverseButtons: true,
                }).then((result) => {
                  if (result.isConfirmed) {
                    dispatch(remove({ id: parseInt(selected?.id) }));
                  }
                });
              }}
            >
              <FormattedMessage id="delete" />
            </Button>
          </div>
        </CardBody>
      </Card>
      {store?.data?.data?.length == 0 && (
        <div className="sc-fznWqX gnahTY">
          <div className="sc-AxjAm gIMaKV rdt_Table" role="table">
            <div className="sc-fzqARJ icdHOq">
              <div
                style={{
                  padding: "25px ",
                  textAlign: "center",
                  color: "black",
                  background: "white",
                }}
              >
                <FormattedMessage id={"There are no records to display"} />
              </div>
            </div>
          </div>
        </div>
      )}

      <SidebarAdd
        open={sidebarOpen}
        toggleSidebar={toggleSidebar}
        {...{
          avatar,
          setAvatar,
          avatarBlank,
          valueContent,
          setValueContent,
          disable,
          setDisable,
        }}
      />
    </>
  );
};

export default injectIntl(ListSlider);
