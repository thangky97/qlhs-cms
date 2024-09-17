import ExtensionsHeader from "@components/extensions-header";
import { useEffect, useState, useRef } from "react";
import { FormattedMessage, injectIntl } from "react-intl";
import Select from "react-select";
import avatarBlank from "./../../../../assets/images/avatars/avatar-blank.png";
import Sidebar from "./Sidebar";
// import { columns } from "./columns";
import { useDispatch, useSelector } from "react-redux";
import { getData, getDataExport } from "../store/action";
import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";
import { ChevronDown, Edit, MoreVertical, Search } from "react-feather";
import ReactPaginate from "react-paginate";
import {
  Button,
  Card,
  CardBody,
  Col,
  Input,
  Row,
  Badge,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
} from "reactstrap";
import SidebarPassword from "./SidebarPassword";
import "@styles/react/libs/react-select/_react-select.scss";
import "@styles/react/libs/tables/react-dataTable-component.scss";
import { toast } from "react-toastify";
import { getData as getDataCourse } from "../../product/store/action";
import XLSX from "xlsx";
import { formatDateTime } from "../../../../utility/Utils";

const statusObj = {
  1: {
    class: "light-success",
    text: <FormattedMessage id="Active" />,
  },
  0: {
    class: "light-warning",
    text: <FormattedMessage id="Deactive" />,
  },
  2: {
    class: "light-secondary",

    text: <FormattedMessage id="Blocked" />,
  },
};

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

const UserList = ({ intl }) => {
  const dispatch = useDispatch();
  const store = useSelector((state) => state.user);
  const [phoneNumber, setPhoneNumber] = useState();
  const lang = useSelector((state) => state.common.language);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(20);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [avatar, setAvatar] = useState(avatarBlank);
  const [searchLastName, setSearchLastName] = useState(null);
  const [searchFirstName, setSearchFirstName] = useState(null);
  const [disable, setDisable] = useState(false);
  const [filterStatus, setFilterStatus] = useState({
    value: "",
    label: <FormattedMessage id="status" />,
  });

  const [userTypeOptions, setUserTypeOptions] = useState([
    {
      value: undefined,
      label: <FormattedMessage id="select" />,
    },
    {
      value: 0,
      label: <FormattedMessage id="Student" />,
    },
    {
      value: 1,
      label: <FormattedMessage id="Customer" />,
    },
  ]);

  const [filterUserType, setFilterUserType] = useState(userTypeOptions[0]);

  const [searchEmail, setSearchEmail] = useState(null);
  const [searchPhone, setSearchPhone] = useState(null);

  const [disablePassword, setDisablePassword] = useState(false);
  const [sidebarPasswordOpen, setSidebarPasswordOpen] = useState(false);
  const [idPassword, setIdPassword] = useState(null);

  const [loadData, setLoadData] = useState(false);
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
    setAvatar(avatarBlank);
    setDisable(false);
    setPhoneNumber("");
  };

  useEffect(() => {
    dispatch(
      getDataCourse({
        filter: {
          lang: lang,
          product_type: 0,
          status: 1,
        },
        order: [{ key: "id", value: "ASC" }],
      })
    );
  }, [lang]);

  useEffect(() => {
    dispatch(
      getData(
        {
          filter: {
            status: filterStatus.value || undefined,
            last_name: searchLastName || undefined,
            first_name: searchFirstName || undefined,
            email: searchEmail || undefined,
            phone: searchPhone || undefined,
          },
          skip: (currentPage - 1) * rowsPerPage,
          limit: rowsPerPage,
          order: {
            key: "createdAt",
            value: "desc",
          },
        },
        filterUserType.value
      )
    );

    dispatch(
      getDataExport({
        filter: {},
        order: {
          key: "createdAt",
          value: "desc",
        },
      })
    );
  }, [loadData, currentPage, rowsPerPage]);

  useEffect(() => {
    switch (store?.type) {
      case "ADD_USER":
        if (store?.status == 200) {
          toast.success(<FormattedMessage id={"successfully added new!"} />);
          setLoadData(!loadData);
          setAvatar(null);
          toggleSidebar();
        } else if (store?.status == 400) {
          toast.warn(<FormattedMessage id={"Add new failure!"} />);
        }
        break;
      case "UPDATE_USER":
        if (store?.status == 200) {
          toast.success(<FormattedMessage id={"Update successful!"} />);
          setLoadData(!loadData);
        } else if (store?.status == 400) {
          toast.warn(<FormattedMessage id={"Update failed!"} />);
        }
        break;
      case "UPDATE_PASSWORD_USER":
        if (store?.status == 200) {
          toast.success(<FormattedMessage id={"Update successful!"} />);
          setLoadData(!loadData);
          toggleSidebarPassword();
        } else if (store?.status == 400) {
          toast.warn(<FormattedMessage id={"Update failed!"} />);
        }
        break;
      default:
        break;
    }
  }, [store.status]);

  const statusOptions = [
    { value: "", label: <FormattedMessage id="Select status" /> },
    { value: "0", label: <FormattedMessage id="Deactive" /> },
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

  const exportToExcel = () => {
    if (store?.dataExport?.length > 0) {
      const data = store?.dataExport;

      const cols = [
        { header: "ID", key: "id" },
        { header: "Tên tài khoản", key: "username" },
        { header: "Email", key: "email" },
        { header: "Họ", key: "first_name" },
        { header: "Tên", key: "last_name" },
        { header: "Số điện thoại", key: "phone" },
        { header: "Địa chỉ", key: "address" },
        { header: "Ảnh đại diện", key: "avatar" },
        { header: "Trạng thái", key: "status" },
        { header: "Ngày tạo", key: "createdAt" },
      ];

      const worksheet = XLSX.utils.json_to_sheet({
        header: cols.map((col) => col.header),
      });

      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Học viên");
      XLSX.writeFile(workbook, "student.xlsx");
    }
  };

  const columns = [
    {
      name: <FormattedMessage id="avatar" />,
      minWidth: "80px",

      cell: (row) => (
        <div class="avatar me-1" width="32" height="32">
          <img src={row.avatar} alt="" width="32" height="32" />
        </div>
      ),
    },
    {
      name: <FormattedMessage id="customer_student_code" />,
      minWidth: "150px",
      selector: "id",
      cell: (row) => {
        let number = row.id;
        return (number = ("00000" + number).slice(-5));
        // row.id
      },
    },
    {
      name: <FormattedMessage id="lastName" />,
      minWidth: "120px",
      selector: "last_name",
      cell: (row) => row.last_name,
    },
    {
      name: <FormattedMessage id="firstName" />,
      minWidth: "120px",
      selector: "first_name",
      cell: (row) => row.first_name,
    },
    {
      name: <FormattedMessage id="username" />,
      minWidth: "170px",
      selector: "username",
      cell: (row) => row.username,
    },
    {
      name: <FormattedMessage id="Email" />,
      minWidth: "200px",
      selector: "email",
      cell: (row) => row.email,
    },
    {
      name: <FormattedMessage id="phoneNumber" />,
      minWidth: "150px",
      selector: "phone",
      cell: (row) => <span className="text-capitalize">{row.phone}</span>,
    },
    {
      name: <FormattedMessage id="Created at" />,
      minWidth: "160px",
      selector: "createdAt",
      cell: (row) => <span>{formatDateTime(row.createdAt)}</span>,
    },
    {
      name: <FormattedMessage id="status" />,
      minWidth: "120px",
      selector: "status",
      cell: (row) => (
        <Badge className="text-capitalize" color={statusObj[row.status]?.class}>
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
              to={`/apps/users/edit/${row.id}`}
              className="w-100"
            >
              <Edit size={14} className="mr-50" />
              <span className="align-middle">
                <FormattedMessage id="edit" />
              </span>
            </DropdownItem>

            <DropdownItem
              className="w-100"
              onClick={() => toggleSidebarPassword(row?.id)}
            >
              <Edit size={14} className="mr-50" />
              <span className="align-middle">
                <FormattedMessage id="Re-issue password" />
              </span>
            </DropdownItem>

            <DropdownItem
              className="w-100"
              tag={Link}
              to={`/apps/user-product/list/${row.id}`}
            >
              <Search size={14} className="mr-50" />
              <span className="align-middle">
                <FormattedMessage id="product bought" />
              </span>
            </DropdownItem>
            <DropdownItem
              className="w-100"
              tag={Link}
              to={`/apps/user/token-detail/list/${row.id}`}
            >
              <Search size={14} className="mr-50" />
              <span className="align-middle">
                <FormattedMessage id="token bought" />
              </span>
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      ),
    },
  ];

  const toggleSidebarPassword = (id = null) => {
    setIdPassword(id);
    setSidebarPasswordOpen(!sidebarPasswordOpen);
    setDisablePassword(false);
  };

  return (
    <div className="app-user-list">
      <ExtensionsHeader title={<FormattedMessage id="User - Customers" />} />
      <Card>
        <CardBody>
          <Row>
            <Col md="4">
              <Select
                isClearable={false}
                isSearchable={true}
                className="react-select text-color:red"
                classNamePrefix="select"
                options={userTypeOptions}
                value={filterUserType}
                onChange={(data) => {
                  setFilterUserType(data);
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
              <Input
                id="search-invoice"
                className=" w-100"
                placeholder={intl.formatMessage({ id: "lastName" })}
                type="text"
                value={searchLastName}
                onChange={(data) => {
                  setSearchLastName(data.target.value);
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
                onChange={(data) => {
                  setSearchFirstName(data.target.value);
                }}
              />
            </Col>
            <Col md="4">
              <Input
                id="search-invoice"
                className=" w-100"
                placeholder={intl.formatMessage({ id: "Email" })}
                type="text"
                value={searchEmail}
                onChange={(e) => {
                  setSearchEmail(e.target.value);
                }}
              />
            </Col>
            <Col md="4">
              <Input
                id="search-invoice"
                className=" w-100"
                placeholder={intl.formatMessage({ id: "phoneNumber" })}
                type="text"
                value={searchPhone}
                onChange={(e) => {
                  setSearchPhone(e.target.value);
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
          avatar,
          setAvatar,
          avatarBlank,
          disable,
          setDisable,
          phoneNumber,
          setPhoneNumber,
        }}
      />

      <SidebarPassword
        open={sidebarPasswordOpen}
        toggleSidebarPassword={toggleSidebarPassword}
        {...{
          disablePassword,
          setDisablePassword,
          idPassword,
        }}
      />
    </div>
  );
};

export default injectIntl(UserList);
