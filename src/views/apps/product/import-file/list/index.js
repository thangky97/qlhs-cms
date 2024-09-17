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
  Col,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Row,
  UncontrolledDropdown,
} from "reactstrap";
import Swal from "sweetalert2";
import { getData, remove } from "../store/action";
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
                <FormattedMessage id="Add New File" />
              </Button.Ripple>
            </div>
          </Col>
        </Row>
      </div>
    </Fragment>
  );
};

const VersionList = ({ intl }) => {
  const dispatch = useDispatch();
  const store = useSelector((state) => state.versions);

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(20);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [disable, setDisable] = useState(false);
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

  const columns = [
    {
      name: <FormattedMessage id="id" />,
      minWidth: "20px",
      selector: "id",
      sortable: false,
      cell: (row) => row.id,
    },

    {
      name: <FormattedMessage id="FileName" />,
      minWidth: "120px",
      selector: "link_document_api",
      sortable: false,
      cell: (row) => <span className="text-ellipse-1">{row.version}</span>,
    },
    {
      name: <FormattedMessage id="TypeFile" />,
      minWidth: "120px",
      selector: "link_download",
      sortable: false,

      cell: (row) => (
        <span className="text-ellipse-1">
          <a href={row?.link}>{row?.link}</a>
        </span>
      ),
    },
    // {
    //   name: <FormattedMessage id="info" />,
    //   minWidth: "120px",
    //   selector: "link_trial",
    //   sortable: false,
    //   cell: (row) => <span className="text-ellipse-1">{row.info}</span>,
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
              to={`/apps/product/import-file/edit/${row.id}`}
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

  const [currentRole, setCurrentRole] = useState({
    value: "",
    label: "Select Role",
  });
  const [currentPlan, setCurrentPlan] = useState({
    value: "",
    label: "Select Plan",
  });
  const [currentStatus, setCurrentStatus] = useState({
    value: "",
    label: "Select Status",
    number: 0,
  });
  const [loadData, setLoadData] = useState(false);
  const { id } = useParams();
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
    setDisable(false);
  };
  const FilterStatus = (status) => {
    dispatch(
      getData({
        filter: {
          product_id: parseInt(id),
        },
        skip: (currentPage - 1) * rowsPerPage,
        limit: rowsPerPage,
        order: {
          key: "id",
          value: "DESC",
        },
      })
    );
  };
  useEffect(() => {
    dispatch(
      getData({
        filter: {
          product_id: parseInt(id),
        },
        skip: (currentPage - 1) * rowsPerPage,
        limit: rowsPerPage,
        order: {
          key: "id",
          value: "DESC",
        },
      })
    );
  }, [loadData, currentPage]);
  useEffect(() => {
    switch (store?.type) {
      case "ADD_VERSION_PRODUCT":
        if (store?.status == 200) {
          toast.success(<FormattedMessage id={"successfully added new!"} />);
          setLoadData(!loadData);
          toggleSidebar();
        } else if (store?.status == 400) {
          toast.warn(<FormattedMessage id={"Add new failure!"} />);
        }

        break;
      case "UPDATE_VERSION_PRODUCT":
        if (store?.status == 200) {
          toast.success(<FormattedMessage id={"Update successful!"} />);
          setLoadData(!loadData);
        } else if (store?.status == 400) {
          toast.warn(<FormattedMessage id={"Update failed!"} />);
        }

        break;
      case "DELETE_VERSION_PRODUCT":
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
        role: currentRole.value,
        currentPlan: currentPlan.value,
        status: currentStatus.value,
        q: val,
      })
    );
  };
  const count = Number(Math.ceil(store.total / rowsPerPage));

  const dataToRender = () => {
    if (store?.data?.length > 0) {
      return store?.data;
    }
  };

  return (
    <div className="app-user-list">
      <ExtensionsHeader title={<FormattedMessage id="Import Management" />} />
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

export default injectIntl(VersionList);
