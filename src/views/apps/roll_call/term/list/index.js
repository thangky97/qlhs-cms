import ExtensionsHeader from "@components/extensions-header";
import { Fragment, useEffect, useState } from "react";

import DataTable from "react-data-table-component";
import { ChevronDown, Edit, MoreVertical, Trash2 } from "react-feather";
import { FormattedMessage, injectIntl } from "react-intl";
import ReactPaginate from "react-paginate";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  Badge,
  Button,
  Card,
  CardBody,
  Col,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Input,
  Row,
  UncontrolledDropdown,
} from "reactstrap";
import Swal from "sweetalert2";
import {
  getData,
  getDataCourse,
  getDetail,
  getInstractors,
  remove,
} from "../store/action";
import Sidebar from "./Sidebar";
import Select from "react-select";
import { STAFF_ROLE } from "../../../../../constants/app";

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

const TermList = ({ intl }) => {
  const dispatch = useDispatch();
  const store = useSelector((state) => state.terms);
  const { productDetail } = useSelector((state) => state.terms);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(20);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [disable, setDisable] = useState(false);

  const [Name, setName] = useState();

  const statusObj = {
    1: {
      class: "light-success",
      text: <FormattedMessage id="Active" />,
    },
    0: {
      class: "light-warning",
      text: <FormattedMessage id="Deactive" />,
    },
  };

  const statusOptions = [
    { value: "", label: <FormattedMessage id={"Select status"} />, number: 0 },
    { value: "1", label: <FormattedMessage id={"Active"} />, number: 0 },
    { value: "0", label: <FormattedMessage id={"Deactive"} />, number: 1 },
  ];

  const columns = [
    {
      name: <FormattedMessage id="id" />,
      maxWidth: "11%",
      selector: "id",
      sortable: false,
      cell: (row) => row.id,
    },
    {
      name: <FormattedMessage id="Mã lớp học" />,
      minWidth: "10%",
      selector: "code",
      sortable: false,
      cell: (row) => row?.code,
    },
    {
      name: <FormattedMessage id="Tên lớp học" />,
      minWidth: "15%",
      selector: "title",
      sortable: false,
      cell: (row) => row?.title,
    },
    // {
    //   name: <FormattedMessage id="Số sinh viên" />,
    //   minWidth: "7%",
    //   selector: "number_students",
    //   sortable: false,
    //   cell: (row) => row?.number_students,
    // },
    // {
    //   name: <FormattedMessage id="Ngày giờ" />,
    //   minWidth: "10%",
    //   selector: "time",
    //   sortable: false,
    //   cell: (row) => {
    //     return `${row?.time || ""} ${row?.date || ""}`;
    //   },
    // },
    {
      name: <FormattedMessage id="Giảng viên" />,
      minWidth: "15%",
      selector: "staffId",
      sortable: false,
      cell: (row) => row?.staff?.last_name + " " + row?.staff?.first_name,
    },
    // {
    //   name: <FormattedMessage id="Môn học" />,
    //   minWidth: "15%",
    //   selector: "courseId",
    //   sortable: false,
    //   cell: (row) => row?.course?.name,
    // },
    // {
    //   name: <FormattedMessage id="Description" />,
    //   minWidth: "30%",
    //   selector: "description",
    //   sortable: false,
    //   cell: (row) => <span className="text-ellipse-1">{row?.description}</span>,
    // },
    {
      name: <FormattedMessage id="status" />,
      minWidth: "100px",
      selector: "status",
      sortable: false,
      cell: (row) => (
        <Badge
          className="text-capitalize"
          color={statusObj[row.status]?.class}
          pill
        >
          {statusObj[row.status]?.text}
        </Badge>
      ),
    },

    {
      name: <FormattedMessage id="actions" />,
      minWidth: "100px",
      cell: (row) => (
        <UncontrolledDropdown>
          <DropdownToggle tag="div" className="btn btn-sm">
            <MoreVertical size={14} className="cursor-pointer" />
          </DropdownToggle>
          <DropdownMenu right>
            <DropdownItem
              tag={Link}
              to={`/apps/product/term/edit/${row.id}`}
              className="w-100"
            >
              <Edit size={14} className="mr-50" />
              <span className="align-middle">
                <FormattedMessage id="edit" />
              </span>
            </DropdownItem>
            <DropdownItem
              tag={Link}
              to={"#"}
              className="w-100"
              onClick={() => {
                Swal.fire({
                  title: intl.formatMessage({
                    id: "Are you sure you want to delete?",
                  }),
                  icon: "warning",
                  showCancelButton: true,
                  confirmButtonColor: "#ea5455",
                  cancelButtonColor: "#3085d6",
                  confirmButtonText: intl.formatMessage({ id: "delete" }),
                  cancelButtonText: intl.formatMessage({ id: "Cancel" }),
                  reverseButtons: true,
                }).then((result) => {
                  if (result.isConfirmed) {
                    dispatch(remove({ id: parseInt(row.id) }));
                  }
                });
              }}
            >
              <Trash2 size={14} className="mr-50" />
              <span className="align-middle">
                <FormattedMessage id="delete" />
              </span>
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      ),
    },
  ];

  const [currentStatus, setCurrentStatus] = useState({
    value: "",
    label: <FormattedMessage id={"Select status"} />,
    number: 0,
  });
  const [loadData, setLoadData] = useState(false);
  const lang = useSelector((state) => state.common.language);
  const { id } = useParams();
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
    setDisable(false);
  };
  const FilterStatus = (status) => {
    dispatch(
      getData({
        product_id: parseInt(id),
        lang,
      })
    );
  };
  useEffect(() => {
    dispatch(
      getDetail({
        id: parseInt(id),
        lang: lang,
      })
    );
  }, [id, dispatch, lang, loadData]);

  useEffect(() => {
    dispatch(
      getDataCourse({
        filter: {
          status: 1,
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
    dispatch(
      getInstractors({
        filter: {
          status: 1,
          role: [STAFF_ROLE.MANAGE_STAFF, STAFF_ROLE.MANAGE_SYSTEM],
        },
        skip: (currentPage - 1) * rowsPerPage,
        limit: 20,
        order: {
          key: "createdAt",
          value: "desc",
        },
      })
    );
  }, [dispatch]);

  const filterData = () => {
    dispatch(
      getDataCourse({
        filter: {
          name: Name || undefined,
          status: currentStatus?.value || undefined,
        },
        skip: 0,
        limit: 20,
        order: [
          {
            key: "id",
            value: "desc",
          },
        ],
      })
    );
  };

  useEffect(() => {
    switch (store?.type) {
      case "ADD_TERM_PRODUCT":
        if (store?.status == 200) {
          toast.success(<FormattedMessage id={"successfully added new!"} />);
          setLoadData(!loadData);
          toggleSidebar();
        } else if (store?.status == 400) {
          toast.warn(<FormattedMessage id={"Add new failure!"} />);
        }

        break;
      case "UPDATE_TERM_PRODUCT":
        if (store?.status == 200) {
          toast.success(<FormattedMessage id={"Update successful!"} />);
          setLoadData(!loadData);
        } else if (store?.status == 400) {
          toast.warn(<FormattedMessage id={"Update failed!"} />);
        }

        break;
      case "DELETE_TERM_PRODUCT":
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

  const handleFilter = (val) => {
    setSearchTerm(val);
    dispatch(
      getData({
        page: currentPage,
        perPage: rowsPerPage,
        status: currentStatus.value,
        q: val,
      })
    );
  };

  const count = Number(
    Math.ceil(productDetail?.sections?.length / rowsPerPage)
  );

  const dataToRender = () => {
    if (productDetail?.sections?.length > 0) {
      return productDetail?.sections?.sort(
        (a, b) => b.sort_order - a.sort_order
      );
    }
  };
  return (
    <div className="app-user-list">
      <span>
        <a href="/apps/product/list">
          {" "}
          {<FormattedMessage id="Product_Course" />}
        </a>
      </span>{" "}
      /<span>{<FormattedMessage id="term" />}</span>
      <Card>
        <CardBody>
          <Row>
            <Col md="3">
              <Input
                className=" w-100"
                placeholder={intl.formatMessage({ id: "Nhập tên môn học" })}
                type="text"
                value={Name}
                onChange={(e) => setName(e.target.value)}
              />
            </Col>

            <Col md="3">
              <Select
                isClearable={false}
                className="react-select"
                classNamePrefix="select"
                options={statusOptions}
                value={currentStatus}
                onChange={(data) => {
                  setCurrentStatus(data);
                }}
              />
            </Col>

            <Col md="3">
              <Button color="primary" className="m-0" onClick={filterData}>
                <FormattedMessage id={"Search"} />
              </Button>
            </Col>
          </Row>
        </CardBody>
      </Card>
      <Card>
        <DataTable
          noHeader
          subHeader
          noDataComponent={
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
          }
          responsive
          paginationServer
          columns={columns}
          sortIcon={<ChevronDown />}
          className="react-dataTable"
          data={dataToRender()}
          subHeaderComponent={
            <CustomHeader
              toggleSidebar={toggleSidebar}
              rowsPerPage={rowsPerPage}
              searchTerm={searchTerm}
              handleFilter={handleFilter}
              FilterStatus={FilterStatus}
            />
          }
        />
      </Card>
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
        {...{ disable, setDisable }}
      />
    </div>
  );
};

export default injectIntl(TermList);
