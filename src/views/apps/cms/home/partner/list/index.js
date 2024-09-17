import { Fragment, useEffect, useState } from "react";

import Avatar from "@components/avatar";
import "@styles/react/libs/swiper/swiper.scss";
import { FormattedMessage, injectIntl } from "react-intl";
import ReactPaginate from "react-paginate";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
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
import Swal from "sweetalert2";
import { getData, remove } from "../store/action";
import avatarBlank from "./../../../../../../assets/images/avatars/bg-blank.png";
import Sidebar from "./Sidebar";


const ListPartner = ({ intl }) => {
  const store = useSelector((state) => state.partners);
  const lang = useSelector((state) => state.common.language);
  const dispatch = useDispatch();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loadData, setLoadData] = useState(false);
  const [disable, setDisable] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(3);
  const [avatar, setAvatar] = useState(avatarBlank);
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
    setAvatar(avatarBlank);
    setDisable(false);
  };

 
  useEffect(() => {
    dispatch(
      getData({
        filter: {},

        skip: (currentPage - 1) * rowsPerPage,
        limit: rowsPerPage,
      })
    );
  }, [lang, loadData, currentPage]);
  useEffect(() => {
    switch (store?.type) {
      case "ADD_PARTNER":
        if (store?.status == 200) {
          toast.success(<FormattedMessage id={"successfully added new!"} />);
          toggleSidebar();
          setLoadData(!loadData);
        } else if (store?.status == 400) {
          toast.warn(<FormattedMessage id={"Add new failure!"} />);
        }

        break;

      case "UPDATE_PARTNER":
        if (store?.status == 200) {
          toast.success(<FormattedMessage id={"Update successful!"} />);
          setLoadData(!loadData);
        } else if (store?.status == 400) {
          toast.warn(<FormattedMessage id={"Update failed!"} />);
        }

        break;

      case "DELETE_PARTNER":
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


  const count = Math.ceil(store.total / rowsPerPage);

  return (
    <div className="app-user-list">
      <Card className="mb-0" id="section-slider">
        <CardHeader className="justify-content-end ">
          <Row>
            <Col
              xl="12"
              className="d-flex align-items-sm-center justify-content-lg-end justify-content-start flex-lg-nowrap flex-wrap flex-sm-row flex-column pr-lg-1 p-0 mt-lg-0 mt-1"
            >
              <Button.Ripple color="primary" onClick={toggleSidebar}>
                <FormattedMessage id="Add" />
              </Button.Ripple>
            </Col>
          </Row>
        </CardHeader>
      </Card>
      <Row>
        {store?.data?.data?.map((item, index) => (

          <Col xs={12} sm={12} md={6} lg={4} className="mt-2">
            <Card
              className="card-apply-job "
              key={index}
              style={{ background: "#2f374f" }}
            >
              <CardBody>
                <div>
                  <div className="d-flex justify-content-center align-items-center mb-1">
                    <Media>
                      <Avatar
                        className="mr-1 text-center objectFit-contain"
                        img={item?.image}
                        imgHeight="100"
                        imgWidth="100"
                      />
                    </Media>
                  </div>
                  <div className="text-center  pt-1">
                    <h5> {item?.name && item.name}</h5>
                  </div>
                </div>
                <Row className="justify-content-center mt-3">
                  <Button
                    style={{ marginRight: "20px" }}
                    color="danger"
                    className="px-3 text-center"
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
                          dispatch(remove({ id: item.id }));
                        }
                      });
                    }}
                  >
                    <span className="align-middle">
                      <FormattedMessage id="delete" />
                    </span>
                  </Button>

                  <Button
                    color="primary"
                    tag={Link}
                    to={`/apps/partner/edit/${item.id}`}
                    className=" px-3 text-center"
                  >
                    <span className="align-middle">
                      <FormattedMessage id="edit" />
                    </span>
                  </Button>
                </Row>
              </CardBody>
            </Card>
          </Col>
        ))}
      </Row>
      {store?.data?.length == 0 && (
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
      {count > 0 && (
        <ReactPaginate
          previousLabel={""}
          nextLabel={""}
          pageCount={count || 0}
          activeClassName="active"
          forcePage={currentPage !== 0 ? currentPage - 1 : 0}
          onPageChange={(page) => setCurrentPage(page.selected + 1)}
          pageClassName={"page-item"}
          nextLinkClassName={"page-link"}
          nextClassName={"page-item next"}
          previousClassName={"page-item prev"}
          previousLinkClassName={"page-link"}
          pageLinkClassName={"page-link"}
          containerClassName={
            "pagination react-paginate justify-content-center my-2 pr-1"
          }
        />
      )}

      <Sidebar
        open={sidebarOpen}
        toggleSidebar={toggleSidebar}
        {...{ avatar, setAvatar, avatarBlank, disable, setDisable }}
      />
    </div>
  );
};

export default injectIntl(ListPartner);
