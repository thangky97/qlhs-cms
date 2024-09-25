import ExtensionsHeader from "@components/extensions-header";
import { EditorState } from "draft-js";
import { Fragment, useEffect, useState } from "react";
import { FormattedMessage, injectIntl } from "react-intl";
import ReactPaginate from "react-paginate";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Select from "react-select";
import { toast } from "react-toastify";
import {
  Badge,
  Button,
  Card,
  CardBody,
  CardText,
  Col,
  Media,
  Row,
} from "reactstrap";
import Swal from "sweetalert2";
import { formatDateTime } from "../../../../utility/Utils";
import {
  getData,
  getDataDepartment,
  getInstractors,
  remove,
} from "../store/action";
import avatarBlank from "./../../../../assets/images/avatars/bg-blank.png";
import Sidebar from "./Sidebar";

const CustomHeader = ({ toggleSidebar }) => {
  return (
    <Fragment>
      <div className="invoice-list-table-header w-100 mr-1 ml-50 mt-1 mb-75">
        <Row className="justify-content-end">
          <Col
            xl="6"
            className="d-flex align-items-sm-center justify-content-lg-end justify-content-start flex-lg-nowrap flex-wrap flex-sm-row flex-column pr-lg-1 p-0 mt-lg-0 mt-1"
          >
            {
              <div className="justify-content-end">
                <Button.Ripple color="primary" onClick={toggleSidebar}>
                  <FormattedMessage id="Add" />
                </Button.Ripple>
              </div>
            }
          </Col>
        </Row>
      </div>
    </Fragment>
  );
};

const ProductList = ({ intl }) => {
  const dispatch = useDispatch();
  const store = useSelector((state) => state.products);
  const lang = useSelector((state) => state.common.language);
  const history = useHistory();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(9);
  const [avatar, setAvatar] = useState(avatarBlank);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [disable, setDisable] = useState(false);

  const [filterStatus, setFilterStatus] = useState({
    value: null,
    label: <FormattedMessage id="status" />,
  });
  const [filterOpen, setFilterOpen] = useState({
    value: null,
    label: <FormattedMessage id="open" />,
  });
  const [valueDescription, setValueDescription] = useState(
    EditorState.createEmpty()
  );

  const statusOptions = [
    { value: null, label: <FormattedMessage id="Select status" /> },
    { value: "1", label: <FormattedMessage id="Active" /> },
    { value: "2", label: <FormattedMessage id="OutOfStock" /> },
  ];

  const [loadData, setLoadData] = useState(false);
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
    setAvatar(avatarBlank);
    setValueDescription("");
    setDisable(false);
    try {
      removeInvalidEditor();
    } catch (error) {}
  };

  useEffect(() => {
    dispatch(
      getInstractors({
        filter: {
          lang,
        },
        skip: (currentPage - 1) * rowsPerPage,
        limit: 20,
        order: [
          {
            key: "id",
            value: "desc",
          },
        ],
      })
    );
  }, [dispatch]);

  useEffect(() => {
    dispatch(
      getData({
        filter: {
          status: filterStatus?.value || undefined,
        },
        skip: (currentPage - 1) * rowsPerPage,
        limit: rowsPerPage,
        order: [
          {
            key: "status",
            value: "DESC",
          },
          {
            key: "createdAt",
            value: "DESC",
          },
        ],
      })
    );
    dispatch(
      getDataDepartment({
        filter: {},
        skip: (currentPage - 1) * rowsPerPage,
        limit: 20,
        order: [
          {
            key: "id",
            value: "desc",
          },
        ],
      })
    );
  }, [loadData, currentPage, lang]);

  const removeInvalidEditor = () => {
    document.getElementsByClassName(
      "rdw-editor-wrapper invalid-editor is-invalid form-control"
    )[0].className = "rdw-editor-wrapper";
  };

  useEffect(() => {
    switch (store?.type) {
      case "ADD_PRODUCT":
        if (store?.status == 200) {
          toast.success(<FormattedMessage id={"successfully added new!"} />);
          setLoadData(!loadData);

          toggleSidebar();
        } else if (store?.status == 400) {
          toast.warn(<FormattedMessage id={"Add new failure!"} />);
        }

        break;
      case "UPDATE_PRODUCT":
        if (store?.status == 200) {
          toast.success(<FormattedMessage id={"Update successful!"} />);
          setLoadData(!loadData);
        } else if (store?.status == 400) {
          toast.warn(<FormattedMessage id={"Update failed!"} />);
        }

        break;
      case "DELETE_PRODUCT":
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

  const handlePerPage = (e) => {
    const value = parseInt(e.currentTarget.value);
    setRowsPerPage(value);
  };

  const handleFilter = (val) => {
    setSearchTerm(val);
    dispatch(
      getData({
        page: currentPage,
        perPage: rowsPerPage,
        q: val,
      })
    );
  };
  const count = Math.ceil(store.total / rowsPerPage);

  const statusOpen = {
    1: {
      class: "light-success",
      text: <FormattedMessage id="Opened" />,
    },
    0: {
      class: "light-warning",
      text: <FormattedMessage id="Not opened" />,
    },
  };

  return (
    <div className="app-user-list">
      <ExtensionsHeader title={<FormattedMessage id="Product_Course" />} />
      <Card>
        <CardBody>
          <Row>
            <Col md="4">
              <Select
                isClearable={false}
                className="react-select"
                classNamePrefix="select"
                options={statusOptions}
                value={filterStatus}
                onChange={(data) => {
                  setCurrentPage(1);
                  setFilterStatus(data);
                  setLoadData(!loadData);
                }}
              />
            </Col>
          </Row>
          <CustomHeader
            toggleSidebar={toggleSidebar}
            handlePerPage={handlePerPage}
            rowsPerPage={rowsPerPage}
            searchTerm={searchTerm}
            handleFilter={handleFilter}
          />
        </CardBody>
      </Card>

      <Row>
        {store?.data?.map((item, index) => (
          <Col xs={12} sm={12} md={6} lg={4} className="mt-2">
            <Card className="card-apply-job" key={index}>
              {/* <CardHeader>
                <Badge
                  className="text-capitalize"
                  color={statusOpen[item.open]?.class}
                  pill
                >
                  {statusOpen[item.open]?.text}
                </Badge>
              </CardHeader> */}

              <CardBody>
                <div className="d-flex justify-content-between align-items-center mb-1">
                  <Media>
                    {/* <Avatar
                      className="mr-1"
                      img={item?.image || avatarBlank}
                      imgHeight="42"
                      imgWidth="42"
                    /> */}
                    <CardText>
                      {/* <Badge
                        className="text-capitalize"
                        color={typeOptions[item.product_type]?.class}
                        pill
                      >
                        {typeOptions[item.product_type]?.text}
                      </Badge> */}
                      <span
                        // className="text-ellipse-1"
                        style={{ fontWeight: "700", color: "#a5a9ab" }}
                      >
                        Năm học:{" "}
                        {item?.product_names && item?.product_names[0]?.name} -{" "}
                        Nghành: {item?.department?.name}
                      </span>
                      <Media body>
                        <small className="text-muted">
                          <FormattedMessage id="createdAt" />:{" "}
                          {formatDateTime(item?.createdAt)}
                        </small>
                      </Media>
                    </CardText>
                  </Media>
                  {/* <Badge
                    className="text-capitalize"
                    color={statusObj[item.status]?.class}
                    pill
                  >
                    {statusObj[item.status]?.text}
                  </Badge> */}
                  <Badge
                    className="text-capitalize"
                    color={statusOpen[item.open]?.class}
                    pill
                  >
                    {statusOpen[item.open]?.text}
                  </Badge>
                </div>
                <h5 className="apply-job-title">
                  <FormattedMessage id="Description" /> :{" "}
                </h5>
                <CardText
                  className="mb-2 text-ellipse-1"
                  style={{ height: 25 }}
                >
                  {item?.product_descriptions[0]?.description ? (
                    <div
                      dangerouslySetInnerHTML={{
                        __html: item?.product_descriptions[0]?.description + "",
                      }}
                      onClick={(e) => {
                        history.push(`/apps/roll_call/edit/${item.id}`);
                      }}
                    ></div>
                  ) : (
                    <FormattedMessage id="No data" />
                  )}
                  <a href="/"></a>
                </CardText>

                <Row>
                  {/* <Col xs={12} sm={6}>
                    <Button
                      className="mt-1 px-3"
                      style={{ minWidth: 160 }}
                      onClick={(e) => {
                        history.push(
                          `/apps/product/import-file/list/${item.id}`
                        );
                      }}
                    >
                      <FormattedMessage id="importFile" />
                    </Button>
                  </Col> */}

                  {/* <Col
                    xs={12}
                    sm={6}
                    className={item.product_type == 0 ? "d-block" : "d-none"}
                  >
                    <Button
                      className="mt-1 px-3"
                      style={{ minWidth: 160 }}
                      onClick={(e) => {
                        history.push(
                          `/apps/product/import-video/list/${item.id}`
                        );
                      }}
                    >
                      <FormattedMessage id="importVideo" />
                    </Button>
                  </Col> */}

                  <Col
                    xs={12}
                    sm={6}
                    className={item.product_type == 0 ? "d-block" : "d-none"}
                  >
                    <Button
                      className="mt-1 px-3"
                      style={{ minWidth: 160 }}
                      onClick={(e) => {
                        history.push(`/apps/product/term/list/${item.id}`);
                      }}
                    >
                      <FormattedMessage id="term" />
                    </Button>
                  </Col>

                  <Col xs={12} sm={6}>
                    <Button
                      className="mt-1 px-3"
                      style={{ minWidth: 160 }}
                      color="danger"
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
                            dispatch(remove({ id: parseInt(item.id) }));
                          }
                        });
                      }}
                    >
                      <FormattedMessage id="delete" />
                    </Button>
                  </Col>
                </Row>

                <Row className="justify-content-between ">
                  <Col xs={12} sm={6}>
                    <Button
                      className="mt-1 px-3"
                      style={{ minWidth: 160 }}
                      color="primary"
                      onClick={(e) => {
                        history.push(`/apps/roll_call/edit/${item.id}`);
                      }}
                    >
                      <FormattedMessage id="edit" />
                    </Button>
                  </Col>
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
        {...{
          avatar,
          setAvatar,
          valueDescription,
          setValueDescription,
          disable,
          setDisable,
        }}
      />
    </div>
  );
};

export default injectIntl(ProductList);
