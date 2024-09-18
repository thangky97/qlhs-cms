import ExtensionsHeader from "@components/extensions-header";
import "@styles/react/libs/react-select/_react-select.scss";
import { useEffect, useState } from "react";
import { FormattedMessage, injectIntl } from "react-intl";
import { useDispatch, useSelector } from "react-redux";
import { getData, getDataExport } from "../store/action";

import Select from "react-select";
import { columns } from "./columns";
import Sidebar from "./Sidebar";

import DataTable from "react-data-table-component";
import { ChevronDown } from "react-feather";
import ReactPaginate from "react-paginate";
import { toast } from "react-toastify";
import { Button, Card, CardBody, Col, Input, Row } from "reactstrap";
import XLSX from "xlsx";
import { STAFF_ROLE } from "./../../../../constants/app";

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

const StaffList = ({ intl }) => {
  const dispatch = useDispatch();
  const store = useSelector((state) => state.staffs);
  const [searchPhone, setSearchPhone] = useState("");
  const [disable, setDisable] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");

  const [rowsPerPage, setRowsPerPage] = useState(20);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [loadData, setLoadData] = useState(false);
  const [filterStatus, setFilterStatus] = useState({
    value: "",
    label: <FormattedMessage id="status" />,
  });
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
    setDisable(false);
    setPhoneNumber(" ");
    setInvalidPhone(false);
  };
  const [searchLastName, setSearchLastName] = useState(null);
  const [searchFirstName, setSearchFirstName] = useState(null);
  const [invalidPhone, setInvalidPhone] = useState(false);

  const [filterRole, setFilterRolte] = useState(null);
  const [searchEmail, setSearchEmail] = useState(null);
  useEffect(() => {
    dispatch(
      getData({
        filter: {
          phone: searchPhone || undefined,
          status: filterStatus?.value || undefined,
          last_name: searchLastName || undefined,
          first_name: searchFirstName || undefined,
          roleId: filterRole?.value || undefined,
          email: searchEmail || undefined,
          role: STAFF_ROLE.MANAGE_USER,
        },
        skip: (currentPage - 1) * rowsPerPage,
        limit: rowsPerPage,
        order: {
          key: "createdAt",
          value: "desc",
        },
      })
    );
  }, [loadData, currentPage, rowsPerPage]);

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
  }, [store.status]);

  useEffect(() => {
    switch (store?.type) {
      case "ADD_STAFF":
        if (store?.status == 200) {
          toast.success(<FormattedMessage id={"successfully added new!"} />);
          setLoadData(!loadData);
          toggleSidebar();
        } else if (store?.status == 400) {
          toast.warn(<FormattedMessage id={"Add new failure!"} />);
        }

        break;
      case "UPDATE_STAFF":
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

  const handleSearchPhone = (val) => {
    setSearchPhone(val);
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
        { header: "Tài khoản", key: "username" },
        { header: "Email", key: "email" },
        { header: "Họ", key: "first_name" },
        { header: "Tên", key: "last_name" },
        { header: "Số điện thoại", key: "phone" },
        { header: "Vai trò", key: "role" },
        { header: "Trạng thái", key: "status" },
        { header: "Ngày tạo", key: "createdAt" },
      ];
      const mappedData = data.map((item) =>
        Object.fromEntries(
          Object.entries(item).map(([key, val]) => {
            return [cols.find((col) => col.key === key)?.header || key, val];
          })
        )
      );

      const worksheet = XLSX.utils.json_to_sheet(mappedData, {
        header: cols.map((col) => col.header),
      });
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Nhân viên");
      XLSX.writeFile(workbook, "staff.xlsx");
    }
  };

  return (
    <div className="app-user-list">
      <ExtensionsHeader title={<FormattedMessage id="Học sinh" />} />
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
                onChange={(data) => {
                  setSearchEmail(data.target.value);
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
                onChange={(data) => {
                  setSearchPhone(data.target.value);
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
          highlightOnHover
          subHeader
          responsive
          paginationServer
          columns={columns}
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
          sortIcon={<ChevronDown />}
          className="react-dataTable"
          data={dataToRender()}
          subHeaderComponent={
            <CustomHeader
              toggleSidebar={toggleSidebar}
              handlePerPage={handlePerPage}
              rowsPerPage={rowsPerPage}
              searchPhone={searchPhone}
              handleSearchPhone={handleSearchPhone}
              setSearchPhone={setSearchPhone}
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
          phoneNumber,
          setPhoneNumber,
          invalidPhone,
          setInvalidPhone,
        }}
      />
    </div>
  );
};

export default injectIntl(StaffList);
