import ExtensionsHeader from "@components/extensions-header";
import { EditorState } from "draft-js";
import { Fragment, useEffect, useState } from "react";
import { FormattedMessage, injectIntl } from "react-intl";
import ReactPaginate from "react-paginate";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Select from "react-select";
import { toast } from "react-toastify";
import { isUserLoggedIn } from "@utils";
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
import { getDataRollCall, remove } from "../store/action";
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
            <div className="justify-content-end">
              <Button.Ripple color="primary" onClick={toggleSidebar}>
                <FormattedMessage id="Add" />
              </Button.Ripple>
            </div>
          </Col>
        </Row>
      </div>
    </Fragment>
  );
};

const RollCallList = ({ intl }) => {
  const [userData, setUserData] = useState(null);
  const dispatch = useDispatch();
  const store = useSelector((state) => state.roll_calls);
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
    removeInvalidEditor();
  };

  useEffect(() => {
    // Lấy userData từ localStorage
    if (isUserLoggedIn() !== null) {
      setUserData(JSON.parse(localStorage.getItem("userData")));
    }
  }, []);
  useEffect(() => {
    if (userData) {
      const filter = {
        status: filterStatus?.value || undefined,
        userId: userData?.id || undefined,
      };

      dispatch(
        getDataRollCall({
          filter,
          skip: (currentPage - 1) * rowsPerPage,
          limit: rowsPerPage,
          order: [
            { key: "status", value: "DESC" },
            { key: "createdAt", value: "DESC" },
          ],
        })
      );
    }
  }, [currentPage, rowsPerPage, filterStatus, userData]); // Loại bỏ loadData nếu không cần thiết

  const removeInvalidEditor = () => {
    const editor = document.getElementsByClassName(
      "rdw-editor-wrapper invalid-editor is-invalid form-control"
    )[0];
    if (editor) editor.className = "rdw-editor-wrapper";
  };

  useEffect(() => {
    switch (store?.type) {
      case "ADD_ROLL_CALL":
        if (store?.status === 200) {
          toast.success(<FormattedMessage id={"successfully added new!"} />);
          setLoadData(!loadData);
          toggleSidebar();
        } else if (store?.status === 400) {
          toast.warn(<FormattedMessage id={"Add new failure!"} />);
        }
        break;

      case "UPDATE_ROLL_CALL":
        if (store?.status === 200) {
          toast.success(<FormattedMessage id={"Update successful!"} />);
          setLoadData(!loadData);
        } else if (store?.status === 400) {
          toast.warn(<FormattedMessage id={"Update failed!"} />);
        }
        break;

      case "DELETE_ROLL_CALL":
        if (store?.status === 200) {
          toast.success(<FormattedMessage id={"Delete successfully!"} />);
          setLoadData(!loadData);
        } else if (store?.status === 400) {
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
      getDataRollCall({
        page: currentPage,
        perPage: rowsPerPage,
        q: val,
      })
    );
  };

  const count = Math.ceil(store.total / rowsPerPage);

  const uniqueRollCalls = () => {
    const uniqueIds = new Set();
    return store.data.filter((item) => {
      if (!uniqueIds.has(item.curriculumSectionId)) {
        uniqueIds.add(item.curriculumSectionId);
        return true;
      }
      return false;
    });
  };

  return (
    <div className="app-user-list">
      <ExtensionsHeader title={<FormattedMessage id="Lịch dạy" />} />
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
        {uniqueRollCalls().map((item, index) => (
          <Col xs={12} sm={12} md={6} lg={4} className="mt-2" key={index}>
            <Card className="card-apply-job">
              <CardBody>
                <div className="d-flex justify-content-between align-items-center mb-1">
                  <Media>
                    <CardText>
                      <h5 style={{ fontWeight: "700", color: "#fff" }}>
                        Năm học:{" "}
                        {item?.curriculumSectionId &&
                          item?.curriculum_section?.product?.product_names[0]
                            ?.name}
                      </h5>
                    </CardText>
                  </Media>
                </div>
                <h5 className="apply-job-title">
                  Lớp: {item?.curriculum_section?.code} -{" "}
                  {item?.curriculum_section?.title}
                </h5>

                <Row>
                  <Col xs={12} sm={6}>
                    <Button
                      className="mt-1 px-3"
                      style={{ minWidth: 160 }}
                      color="success"
                      onClick={() => {
                        history.push(`/apps/roll_call/edit`);
                      }}
                    >
                      Điểm Danh
                    </Button>
                  </Col>

                  <Col xs={12} sm={6}>
                    <Button
                      className="mt-1 px-3"
                      style={{ minWidth: 160 }}
                      color="primary"
                    >
                      Điểm Danh Khuôn Mặt
                    </Button>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        ))}
      </Row>

      {count > 1 && (
        <Row>
          <Col sm="12">
            <ReactPaginate
              previousLabel={"<"}
              nextLabel={">"}
              breakLabel={"..."}
              pageCount={count}
              marginPagesDisplayed={2}
              pageRangeDisplayed={3}
              onPageChange={(page) => {
                setCurrentPage(page.selected + 1);
              }}
              activeClassName={"active"}
              forcePage={currentPage - 1}
              containerClassName={"pagination"}
              pageClassName={"page-item"}
              pageLinkClassName={"page-link"}
              previousClassName={"page-item"}
              previousLinkClassName={"page-link"}
              nextClassName={"page-item"}
              nextLinkClassName={"page-link"}
              breakClassName={"page-item"}
              breakLinkClassName={"page-link"}
            />
          </Col>
        </Row>
      )}
    </div>
  );
};

export default injectIntl(RollCallList);
