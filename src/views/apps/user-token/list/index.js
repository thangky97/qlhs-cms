import ExtensionsHeader from "@components/extensions-header";
import { useEffect, useState } from "react";
import { FormattedMessage, injectIntl } from "react-intl";
import Select from "react-select";
import Sidebar from "./Sidebar";
import { useDispatch, useSelector } from "react-redux";
import {
  getData,
  getListUser,
  getProduct,
  deleteUserToken,
} from "../store/action";

import DataTable from "react-data-table-component";
import { ChevronDown } from "react-feather";
import ReactPaginate from "react-paginate";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Col,
  Input,
  Row,
  Badge,
} from "reactstrap";
import Swal from "sweetalert2";

import "@styles/react/libs/react-select/_react-select.scss";
import "@styles/react/libs/tables/react-dataTable-component.scss";
import { toast } from "react-toastify";

const CustomHeader = ({ toggleSidebar }) => {
  return (
    <div className="invoice-list-table-header w-100 mr-1 ml-50 mt-1 mb-75">
      <Row className="justify-content-end">
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
  );
};

const TokenList = ({ intl }) => {
  const dispatch = useDispatch();
  const store = useSelector((state) => state.userToken);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(20);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [disable, setDisable] = useState(false);
  const lang = useSelector((state) => state.common.language);
  const [filterStatus, setFilterStatus] = useState({
    value: "",
    label: <FormattedMessage id="status" />,
  });
  const [filterProduct, setFilterProduct] = useState({
    value: "",
    label: <FormattedMessage id="service" />,
  });

  const [searchFirstName, setSearchFirstName] = useState(null);
  const [searchLastName, setSearchLastName] = useState(null);

  const [loadData, setLoadData] = useState(false);
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
    setDisable(false);
  };

  useEffect(() => {
    dispatch(
      getProduct({
        filter: {
          lang: lang,
          product_type: 3,
          status: 1,
        },
        order: [{ key: "id", value: "ASC" }],
      })
    );
  }, [lang]);

  useEffect(() => {
    dispatch(
      getListUser({
        filter: {
          status: 1,
        },
        order: {
          key: "id",
          value: "asc",
        },
      })
    );
  }, [lang]);

  useEffect(() => {
    dispatch(
      getData({
        filter: {
          status: filterStatus.value || undefined,
          productId: filterProduct.value || undefined,
        },
        first_name: searchFirstName || undefined,
        last_name: searchLastName || undefined,
        skip: (currentPage - 1) * rowsPerPage,
        limit: rowsPerPage,
        order: [
          {
            key: "id",
            value: "desc",
          },
        ],
      })
    );
  }, [loadData, currentPage, rowsPerPage, lang]);

  useEffect(() => {
    switch (store?.type) {
      case "ADD_USER_TOKEN":
        if (store?.status == 200) {
          toast.success(<FormattedMessage id={"successfully added new!"} />);
          setLoadData(!loadData);
          toggleSidebar();
        } else if (store?.status == 400) {
          toast.warn(<FormattedMessage id={"Add new failure!"} />);
        }
        break;
      case "UPDATE_USER_TOKEN":
        if (store?.status == 200) {
          toast.success(<FormattedMessage id={"Update successful!"} />);
          setLoadData(!loadData);
        } else if (store?.status == 400) {
          toast.warn(<FormattedMessage id={"Update failed!"} />);
        }
        break;
      case "DELETE_USER_TOKEN":
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

  const statusOptions = [
    { value: "", label: <FormattedMessage id="Select status" /> },
    // { value: "0", label: <FormattedMessage id="Deactive" /> },
    { value: "1", label: <FormattedMessage id="Active" /> },
    { value: "2", label: <FormattedMessage id="Blocked" /> },
  ];

  const handlePerPage = (e) => {
    const value = parseInt(e.currentTarget.value);
    setRowsPerPage(value);
  };
  const count = Number(Math.ceil(store.total / rowsPerPage));
  const dataToRender = () => {
    if (store?.data?.length > 0) {
      return store?.data;
    }
  };
  const isSearchable = (event) => {
    console.log(event.target.value);
  };

  const columns = [
    {
      name: <FormattedMessage id="username" />,
      minWidth: "120px",
      selector: "username",
      cell: (row) => row.user.last_name + " " + row.user.first_name,
    },
    {
      name: <FormattedMessage id="service" />,
      minWidth: "120px",
      selector: "service",
      cell: (row) => row.product.product_names[0].name,
    },
    {
      name: <FormattedMessage id="token" />,
      minWidth: "20px",
      selector: "token",
      cell: (row) => row.token.substring(0, 90),
    },

    {
      name: <FormattedMessage id="action" />,
      minWidth: "40px",

      cell: (row) => {
        return (
          row?.id && (
            <div className="mh-100 d-flex align-items-center justify-content-center mw-40">
              <Badge className=" w-40" pill color="danger">
                <div
                  className="text-edit hover:text-white"
                  style={{
                    padding: "7px 20px",
                    display: "block",
                    cursor: "pointer",
                  }}
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
                        dispatch(deleteUserToken({ id: parseInt(row.id) }));
                      }
                    });
                  }}
                >
                  <FormattedMessage id="delete" />
                </div>
              </Badge>
            </div>
          )
        );
      },
    },
  ];

  return (
    <div className="app-user-list">
      <ExtensionsHeader title={<FormattedMessage id="User Token" />} />
      <Card>
        <CardBody>
          <Row>
            <Col md="4">
              <Input
                id="search-invoice"
                className=" w-100"
                placeholder={intl.formatMessage({ id: "lastName" })}
                type="text"
                value={searchLastName}
                onChange={(e) => {
                  setSearchLastName(e.target.value);
                }}
              />
            </Col>
            <Col md="4">
              <Input
                id="search-invoice"
                className=" w-100"
                placeholder={intl.formatMessage({ id: "firstName" })}
                type="text"
                value={searchFirstName}
                onChange={(e) => {
                  setSearchFirstName(e.target.value);
                }}
              />
            </Col>
            <Col md="4">
              <Select
                isClearable={false}
                className="react-select"
                classNamePrefix="select"
                options={
                  store?.product?.length > 0
                    ? [
                        {
                          value: "",
                          label: <FormattedMessage id="service" />,
                        },
                        ...store?.product?.map((item) => ({
                          value: item?.id,
                          label:
                            (item?.product_names?.length > 0 &&
                              item?.product_names[0]?.name) ||
                            "",
                        })),
                      ]
                    : []
                }
                value={filterProduct}
                onChange={(data) => {
                  setFilterProduct(data);
                }}
              />
            </Col>
            <Col md="4">
              <Select
                isClearable={false}
                className="react-select"
                classNamePrefix="select"
                options={statusOptions}
                value={filterStatus}
                onChange={(data) => {
                  setFilterStatus(data);
                }}
              />
            </Col>
            <Col md="4">
              <Button
                color="primary"
                onClick={() => {
                  setLoadData(!loadData);
                  setCurrentPage(1);
                }}
              >
                <FormattedMessage id="Search" />
              </Button>
            </Col>
          </Row>
        </CardBody>
      </Card>
      <Card>
        <DataTable
          noHeader
          subHeader
          responsive
          highlightOnHover
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
          paginationServer
          columns={columns}
          sortIcon={<ChevronDown />}
          className="react-dataTable"
          data={dataToRender()}
          subHeaderComponent={
            <CustomHeader
              toggleSidebar={toggleSidebar}
              handlePerPage={handlePerPage}
              rowsPerPage={rowsPerPage}
              searchTerm={searchTerm}
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
        {...{
          disable,
          setDisable,
        }}
      />
    </div>
  );
};

export default injectIntl(TokenList);
