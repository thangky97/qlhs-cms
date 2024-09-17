import ExtensionsHeader from "@components/extensions-header";
import { useEffect, useState } from "react";
import { FormattedMessage, injectIntl } from "react-intl";
import Select from "react-select";
import Sidebar from "./Sidebar";
import { useDispatch, useSelector } from "react-redux";
import DataTable from "react-data-table-component";
import { ChevronDown, Trash2 } from "react-feather";
import { getData as getDataProduct } from "../../product/store/action";
import { Edit, MoreVertical, Search } from "react-feather";
import { Link } from "react-router-dom";
import {
  Badge,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
} from "reactstrap";
import Swal from "sweetalert2";
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
} from "reactstrap";

import "@styles/react/libs/react-select/_react-select.scss";
import "@styles/react/libs/tables/react-dataTable-component.scss";
import { toast } from "react-toastify";
import { getData, getDataExport, remove } from "../store/action";
import XLSX from "xlsx";

const CustomHeader = ({ toggleSidebar, exportToExcel }) => {
  return (
    <div className="invoice-list-table-header w-100 mr-1 ml-50 mt-1 mb-75">
      <Row className="justify-content-end">
        <Col
          xl="6"
          className="d-flex align-items-sm-center justify-content-lg-end justify-content-start flex-lg-nowrap flex-wrap flex-sm-row flex-column gap-3 pr-lg-1 p-0 mt-lg-0 mt-1"
        >
          <Button.Ripple color="primary" onClick={exportToExcel}>
            Export Excel
          </Button.Ripple>
          <Button.Ripple color="primary" onClick={toggleSidebar}>
            <FormattedMessage id="Add" />
          </Button.Ripple>
        </Col>
      </Row>
    </div>
  );
};

const NotificationList = ({ intl }) => {
  const dispatch = useDispatch();
  const store = useSelector((state) => state.notification);
  const product = useSelector((state) => state?.products?.data);

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(20);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [disable, setDisable] = useState(false);
  const lang = useSelector((state) => state.common.language);
  const [editorState, setEditorState] = useState(null);
  const [filterStatus, setFilterStatus] = useState({
    value: "",
    label: <FormattedMessage id="status" />,
  });
  const [filterType, setFilterType] = useState({
    value: "",
    label: <FormattedMessage id="Notification Type" />,
  });
  const [searchCode, setsearchCode] = useState(null);

  const optionProduct = {
    value: "",
    label: <FormattedMessage id="Select Course" />,
  };
  const [filterProduct, setFilterProduct] = useState(optionProduct);

  const [loadData, setLoadData] = useState(false);
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
    setDisable(false);
    setEditorState(null);
  };

  useEffect(() => {
    dispatch(
      getData({
        filter: {
          code: searchCode || undefined,
          status: filterStatus.value || undefined,
          message_type: filterType.value || undefined,
          productId: filterProduct.value || undefined,
          lang,
        },
        skip: (currentPage - 1) * rowsPerPage,
        limit: rowsPerPage,
        order: {
          key: "createdAt",
          value: "desc",
        },
      })
    );
  }, [loadData, currentPage, rowsPerPage, lang]);

  useEffect(() => {
    dispatch(
      getDataExport({
        filter: {},
        order: {
          key: "createdAt",
          value: "desc",
        },
      })
    );
  }, [lang]);

  useEffect(() => {
    dispatch(
      getDataProduct({
        filter: {
          status: 1,
          lang,
          product_type: 0,
        },

        order: [
          {
            key: "id",
            value: "asc",
          },
        ],
      })
    );
  }, [lang, store.status]);

  const statusObj = {
    1: {
      class: "light-success",
      text: <FormattedMessage id="Active" />,
    },
    // 0: {
    //   class: "light-warning",
    //   text: <FormattedMessage id="Deactive" />,
    // },
    0: {
      class: "light-secondary",

      text: <FormattedMessage id="Blocked" />,
    },
  };

  const typesObjs = {
    1: {
      class: "light-success",
      text: <FormattedMessage id="much" />,
    },
    0: {
      class: "light-warning",
      text: <FormattedMessage id="one" />,
    },
  };

  const columns = [
    {
      name: <FormattedMessage id="Token" />,
      maxWidth: "170px",
      selector: "code",
      cell: (row) => row.code,
    },
    {
      name: <FormattedMessage id="Notification Type" />,
      minWidth: "120px",
      selector: "message_type",
      cell: (row) => (
        <Badge
          className="text-capitalize"
          color={statusObj[row.message_type]?.class}
        >
          {typesObjs[row.message_type]?.text}
        </Badge>
      ),
    },
    {
      name: <FormattedMessage id="Course" />,
      minWidth: "120px",
      selector: "course",
      cell: (row) =>
        row?.product?.product_names?.length > 0 &&
        row?.product?.product_names[0]?.name,
    },
    {
      name: <FormattedMessage id="Content" />,
      minWidth: "120px",
      selector: "message_content",
      cell: (row) => {
        console.log(row);
        let maxLength = 45; // Giả sử độ dài tối đa của chuỗi là 20 ký tự.
        let contentString = row.message_content;
        if (contentString.length > maxLength) {
          contentString = contentString.slice(0, maxLength) + "...";
        }
        return (
          <span
            dangerouslySetInnerHTML={{
              __html: contentString,
            }}
          ></span>
        );
      },
    },
    {
      name: <FormattedMessage id="status" />,
      minWidth: "170px",
      selector: "status",
      cell: (row) => (
        <Badge className="text-capitalize" color={statusObj[row.status]?.class}>
          {statusObj[row.status]?.text}
        </Badge>
      ),
    },
    {
      name: <FormattedMessage id="action" />,
      minWidth: "100px",

      cell: (row) => (
        <UncontrolledDropdown>
          <DropdownToggle tag="div" className="btn btn-sm">
            <MoreVertical size={14} className="cursor-pointer" />
          </DropdownToggle>
          <DropdownMenu right>
            <DropdownItem
              tag={Link}
              to={`/apps/notification/edit/${row.id}`}
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
                    dispatch(remove({ code: row.code }));
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

  useEffect(() => {
    switch (store?.type) {
      case "ADD_NOTIFICATION":
        if (store?.status == 200) {
          toast.success(<FormattedMessage id={"successfully added new!"} />);
          setLoadData(!loadData);
          toggleSidebar();
        } else if (store?.status == 400) {
          toast.warn(<FormattedMessage id={"Add new failure!"} />);
        }
        break;
      case "UPDATE_NOTIFICATION":
        if (store?.status == 200) {
          toast.success(<FormattedMessage id={"Update successful!"} />);
          setLoadData(!loadData);
        } else if (store?.status == 400) {
          toast.warn(<FormattedMessage id={"Update failed!"} />);
        }
        break;
      case "DELETE_NOTIFICATION":
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
    { value: "0", label: <FormattedMessage id="Blocked" /> },
  ];

  const typeObjs = [
    { value: "", label: <FormattedMessage id="Notification Type" /> },
    { value: "0", label: <FormattedMessage id="one" /> },
    { value: "1", label: <FormattedMessage id="much" /> },
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

  const exportToExcel = () => {
    if (store?.dataExport?.length > 0) {
      const data = store?.dataExport;
      const cols = [
        { header: "ID", key: "id" },
        { header: "Code", key: "code" },
        { header: "Nội dung tin nhắn", key: "message_content" },
        { header: "Khoá học", key: "product" },
        { header: "Trạng thái", key: "status" },
        { header: "Ngôn ngữ", key: "lang" },
        { header: "Ngày tạo", key: "createdAt" },
        { header: "Ngày cập nhật", key: "updatedAt" },
      ];
      const mappedData = data.map((item) =>
        Object.fromEntries(
          Object.entries(item).map(([key, val]) => {
            if (key === "product" && val) {
              return [
                cols.find((col) => col.key === key)?.header || key,
                val?.product_names?.length > 0 && val?.product_names[0]?.name,
              ];
            }
            return [cols.find((col) => col.key === key)?.header || key, val];
          })
        )
      );

      const worksheet = XLSX.utils.json_to_sheet(mappedData, {
        header: cols.map((col) => col.header),
      });
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Thông báo");
      XLSX.writeFile(workbook, "notification.xlsx");
    }
  };

  return (
    <div className="app-user-list">
      <ExtensionsHeader title={<FormattedMessage id="Notification" />} />
      <Card>
        <CardBody>
          <Row>
            <Col md="4">
              <Select
                isClearable={false}
                className="react-select"
                classNamePrefix="select"
                options={[
                  optionProduct,
                  ...product?.map((item, index) => {
                    return {
                      value: item?.id,
                      label: item?.product_names[0]?.name || "",
                    };
                  }),
                ]}
                value={filterProduct}
                onChange={(data) => {
                  setFilterProduct(data);
                }}
              />
            </Col>

            <Col md="4">
              <Input
                id="search-invoice"
                className=" w-100"
                placeholder={intl.formatMessage({ id: "Token" })}
                type="text"
                value={searchCode}
                onChange={(e) => {
                  setsearchCode(e.target.value);
                }}
              />
            </Col>
            <Col md="4">
              <Select
                isClearable={false}
                className="react-select"
                classNamePrefix="select"
                options={typeObjs}
                value={filterType}
                onChange={(data) => {
                  setFilterType(data);
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
              exportToExcel={exportToExcel}
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
          editorState,
          setEditorState,
        }}
      />
    </div>
  );
};

export default injectIntl(NotificationList);
