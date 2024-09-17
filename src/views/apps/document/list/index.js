import Avatar from "@components/avatar";
import ExtensionsHeader from "@components/extensions-header";
import "@styles/react/libs/editor/editor.scss";
import { Fragment, useEffect, useState } from "react";
import { FormattedMessage, injectIntl } from "react-intl";
import Select from "react-select";
import { formatDateTime } from "../../../../utility/Utils";
import avatarBlank from "./../../../../assets/images/avatars/bg-blank.png";

import Sidebar from "./Sidebar";

import { useDispatch, useSelector } from "react-redux";
import { getData } from "../store/action";

import ReactPaginate from "react-paginate";
import {
  Badge,
  Button,
  Card,
  CardBody,
  CardHeader,
  CardText,
  CardTitle,
  Col,
  Media,
  Row,
} from "reactstrap";

import { EditorState } from "draft-js";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";

const CustomHeader = ({
  toggleSidebar,
  handlePerPage,
  rowsPerPage,
  handleFilter,
  searchTerm,
}) => {
  return (
    <Fragment>
      <div className="invoice-list-table-header w-100 mr-1 ml-50 mt-4">
        <Row className="justify-content-end ">
          {/* <Col xl='6' className='d-flex align-items-center p-0'>
            <div className='d-flex align-items-center w-100'>
              <Label for='rows-per-page'><FormattedMessage id="show"/></Label>
              <CustomInput
                className='form-control mx-50'
                type='select'
                id='rows-per-page'
                value={rowsPerPage}
                onChange={handlePerPage}
                style={{
                  width: '5rem',
                  padding: '0 0.8rem',
                  backgroundPosition: 'calc(100% - 3px) 11px, calc(100% - 20px) 13px, 100% 0'
                }}
              >
                <option value='10'>10</option>
                <option value='25'>25</option>
                <option value='50'>50</option>
                <option value='100'>100</option>
              </CustomInput>
            </div>
          </Col> */}
          <Col
            xl="6"
            className="d-flex align-items-sm-center justify-content-lg-end justify-content-start flex-lg-nowrap flex-wrap flex-sm-row flex-column pr-lg-1 p-0 mt-lg-0 mt-1"
          >
            <Button.Ripple color="primary" onClick={toggleSidebar}>
              <FormattedMessage id="Add" />
            </Button.Ripple>
          </Col>
        </Row>
      </div>
    </Fragment>
  );
};

const DocumentList = ({ intl }) => {
  const dispatch = useDispatch();
  const store = useSelector((state) => state.documents);
  const lang = useSelector((state) => state.common.language);
  const [disable, setDisable] = useState(false);
  const [editorState, setEditorState] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [avatar, setAvatar] = useState(avatarBlank);
  const [valueContent, setValueContent] = useState(EditorState.createEmpty());

  const [rowsPerPage, setRowsPerPage] = useState(9);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [filterOpen, setFilterOpen] = useState({
    value: null,
    label: <FormattedMessage id="status" />,
  });
  const [currentRole, setCurrentRole] = useState({
    value: "",
    label: "Open",
  });
  const [currentPlan, setCurrentPlan] = useState({
    value: "",
    label: "Type",
  });
  const [currentStatus, setCurrentStatus] = useState({
    value: "",
    label: <FormattedMessage id={"Select status"} />,
    number: 0,
  });
  const [loadData, setLoadData] = useState(false);
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
    setValueContent(EditorState.createEmpty());
    setAvatar(avatarBlank);
    setDisable(false);
    setEditorState(null);
  };
  const history = useHistory();
  useEffect(() => {
    dispatch(
      getData({
        filter: {
          open: filterOpen?.value || undefined,
          lang,
        },
        language: lang,
        skip: (currentPage - 1) * rowsPerPage,
        limit: rowsPerPage,
        order: {
          key: "open",
          value: "desc",
        },
      })
    );
  }, [loadData, currentPage, lang]);

  const statusOptions = [
    { value: null, label: "Select Status" },
    { value: "0", label: "Opened" },
    { value: "1", label: "Not opened" },
  ];
  const openOptions = [
    { value: null, label: <FormattedMessage id="Select status" /> },
    { value: "1", label: <FormattedMessage id="Opened" /> },
    { value: "0", label: <FormattedMessage id="Not opened" /> },
  ];
  useEffect(() => {
    switch (store?.type) {
      case "ADD_DOCUMENT":
        if (store?.status == 200) {
          toast.success(<FormattedMessage id={"successfully added new!"} />);
          setLoadData(!loadData);
          toggleSidebar();
        } else if (store?.status == 400) {
          toast.warn(<FormattedMessage id={"Add new failure!"} />);
        }

        break;
      case "UPDATE_DOCUMENT":
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
  }, [store.status]);

  const handleFilter = (val) => {
    setSearchTerm(val);
    dispatch(
      getData({
        page: currentPage,
        perPage: rowsPerPage,
        role: currentRole.value,
        currentPlan: currentPlan.value,
        status: currentStatus.value,
        q: val,
      })
    );
  };
  const count = Number(Math.ceil(store.total / rowsPerPage));

  const statusObj = {
    1: {
      class: "light-success",
      text: <FormattedMessage id="Active" />,
    },
    0: {
      class: "light-warning",
      text: <FormattedMessage id="Deactive" />,
    },
    3: {},
  };
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
  const handlePerPage = (e) => {
    const value = parseInt(e.currentTarget.value);
    setRowsPerPage(value);
  };

  return (
    <div className="app-user-list">
      <ExtensionsHeader title={<FormattedMessage id="New" />} />

      <Card>
        <CardHeader>
          <CardTitle tag="h4">
            <FormattedMessage id="Filters" />
          </CardTitle>
        </CardHeader>
        <CardBody>
          <Row>
            <Col md="4">
              <Select
                isClearable={false}
                className="react-select"
                classNamePrefix="select"
                options={openOptions}
                value={filterOpen}
                onChange={(data) => {
                  setCurrentPage(1);
                  setFilterOpen(data);
                  setLoadData(!loadData);
                }}
              />
            </Col>
          </Row>
          <CustomHeader
            toggleSidebar={toggleSidebar}
            rowsPerPage={rowsPerPage}
            searchTerm={searchTerm}
            handleFilter={handleFilter}
            handlePerPage={handlePerPage}
          />
        </CardBody>
      </Card>

      <Row>
        {store?.data?.map((item, index) => (
          <Col xs={12} sm={12} md={6} lg={4} className="mt-2">
            <Card className="card-apply-job " key={index}>
              <CardHeader>
                <Badge
                  className="text-capitalize "
                  color={statusOpen[item.open]?.class}
                  pill
                >
                  {statusOpen[item.open]?.text}
                </Badge>
              </CardHeader>
              <CardBody>
                <div className="d-flex justify-content-between align-items-center mb-1">
                  <Media>
                    <Avatar
                      className="mr-1"
                      img={item?.image}
                      imgHeight="42"
                      imgWidth="42"
                    />
                    <Media body>
                      <h6 className="mb-0 text-ellipse-1">
                        {item?.document_labels &&
                          item?.document_labels[0]?.label}
                      </h6>
                      <small className="text-muted">
                        <FormattedMessage id="Update at" />:{" "}
                        {formatDateTime(item.updatedAt)}
                      </small>
                    </Media>
                  </Media>
                  <Badge
                    className="text-capitalize text-ellipse-1"
                    color={statusObj[item.status]?.class}
                    pill
                  >
                    {statusObj[item.status]?.text}
                  </Badge>
                </div>
                <h5 className="apply-job-title">
                  <FormattedMessage id="Short Content" /> :
                </h5>
                <CardText className="mb-2 text-ellipse-1">
                  {item?.document_contents[0]?.short_content || (
                    <FormattedMessage id="No data" />
                  )}
                </CardText>
                <h5 className="apply-job-title">
                  <FormattedMessage id="Content" /> :
                </h5>
                <CardText className="mb-2 text-ellipse-1">
                  {item?.document_contents[0]?.content ? (
                    <div
                      dangerouslySetInnerHTML={{
                        __html: item?.document_contents[0]?.content + "",
                      }}
                    ></div>
                  ) : (
                    <FormattedMessage id="No data" />
                  )}
                </CardText>

                <Row className="justify-content-end">
                  <Col xs={12} sm={4}>
                    <Button
                      color="primary"
                      className="w-100"
                      onClick={() => {
                        history.push(`/apps/blog/edit/${item?.id}`);
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
      <Sidebar
        open={sidebarOpen}
        toggleSidebar={toggleSidebar}
        {...{
          avatar,
          setAvatar,
          valueContent,
          setValueContent,
          disable,
          setDisable,
          editorState,
          setEditorState,
        }}
      />
    </div>
  );
};

export default injectIntl(DocumentList);
