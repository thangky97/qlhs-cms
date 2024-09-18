import ExtensionsHeader from "@components/extensions-header";
import "@styles/react/libs/flatpickr/flatpickr.scss";
import { useEffect, useState } from "react";
import { FormattedMessage, injectIntl } from "react-intl";

import { columns } from "./columns";

import { useDispatch, useSelector } from "react-redux";
import { getData, getDataExport } from "../store/action";

import DataTable from "react-data-table-component";
import { ChevronDown } from "react-feather";
import ReactPaginate from "react-paginate";
import Select from "react-select";
import { Button, Card, CardBody, Col, Input, Row } from "reactstrap";

import "@styles/react/libs/react-select/_react-select.scss";
import "@styles/react/libs/tables/react-dataTable-component.scss";
import { toast } from "react-toastify";
import Sidebar from "./Sidebar";
import avatarBlank from "./../../../../assets/images/avatars/bg-blank.png";
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

const InstructorsList = ({ intl }) => {
  const dispatch = useDispatch();
  const common = useSelector((state) => state.common);
  const instructors = useSelector((state) => state.instructors);

  const [disable, setDisable] = useState(false);
  const [avatar, setAvatar] = useState(avatarBlank);

  const [phoneNumber, setPhoneNumber] = useState("");
  const [invalidPhone, setInvalidPhone] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(20);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [searchEmail, setSearchEmail] = useState(null);
  const [currentStatus, setCurrentStatus] = useState({
    value: "",
    label: <FormattedMessage id={"Select status"} />,
    number: 0,
  });

  const [loadData, setLoadData] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
    setDisable(false);
    setPhoneNumber(" ");
    setInvalidPhone(false);
  };

  useEffect(() => {
    dispatch(
      getData({
        filter: {
          lang: common?.language,
        },
        skip: 0,
        limit: 20,
        order: [
          {
            key: "id",
            value: "asc",
          },
        ],
      })
    );
  }, [loadData, common?.language, instructors?.statusCode]);

  useEffect(() => {
    dispatch(
      getDataExport({
        filter: {
          lang: common?.language,
        },
        order: [
          {
            key: "id",
            value: "asc",
          },
        ],
      })
    );
  }, [loadData, common?.language, instructors?.statusCode]);

  const statusOptions = [
    { value: "", label: <FormattedMessage id={"Select status"} />, number: 0 },
    { value: 0, label: <FormattedMessage id={"Active"} />, number: 0 },
    { value: 1, label: <FormattedMessage id={"Deactive"} />, number: 1 },
    { value: 2, label: <FormattedMessage id={"Blocked"} />, number: 2 },
  ];
  const handleFilter = (val) => {};
  const count = Number(Math.ceil(instructors?.total / rowsPerPage));
  const CustomPagination = () => {
    return (
      <ReactPaginate
        previousLabel={""}
        nextLabel={""}
        pageCount={count || 1}
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
          "pagination react-paginate justify-content-end my-2 pr-1"
        }
      />
    );
  };

  const dataToRender = () => {
    if (instructors?.allData?.length > 0) {
      return instructors?.allData;
    }
  };

  const filterData = () => {
    dispatch(
      getData({
        filter: {
          lang: common?.language,
          first_name: firstName || undefined,
          last_name: lastName || undefined,
          contact_email: searchEmail || undefined,
        },
        skip: 0,
        limit: 20,
        order: [
          {
            key: "id",
            value: "asc",
          },
        ],
      })
    );
  };

  const exportToExcel = () => {
    if (instructors?.dataExport?.length > 0) {
      const data = instructors?.dataExport;
      const cols = [
        { header: "ID", key: "id" },
        { header: "Họ", key: "first_name" },
        { header: "Tên", key: "last_name" },
        { header: "Địa chỉ email liên hệ", key: "contact_email" },
        { header: "Điện thoại", key: "telephone" },
        { header: "Di động", key: "mobile" },
        { header: "Facebook", key: "link_facebook" },
        { header: "Linkedin", key: "link_linkedin" },
        { header: "Twitter", key: "link_twitter" },
        { header: "Google plus", key: "link_googleplus" },
        { header: "Tiểu sử", key: "biography" },
        { header: "Hình ảnh", key: "instructor_image" },
        { header: "Ngôn ngữ", key: "lang" },
        { header: "Trạng thái", key: "status" },
        { header: "Ngày tạo", key: "createdAt" },
        { header: "Ngày cập nhật", key: "updatedAt" },
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
      XLSX.utils.book_append_sheet(workbook, worksheet, "Giảng viên");
      XLSX.writeFile(workbook, "instructors.xlsx");
    }
  };

  useEffect(() => {
    switch (instructors?.type) {
      case "ADD_INSTRUCTORS":
        if (instructors?.status == 200) {
          toast.success(<FormattedMessage id={"successfully added new!"} />);
          setLoadData(!loadData);
          toggleSidebar();
        } else if (instructors?.status == 400) {
          toast.warn(<FormattedMessage id={"Add new failure!"} />);
        }
        break;
      case "UPDATE_INSTRUCTORS":
        if (instructors?.status == 200) {
          toast.success(<FormattedMessage id={"Update successful!"} />);
          setLoadData(!loadData);
        } else if (instructors?.status == 400) {
          toast.warn(<FormattedMessage id={"Update failed!"} />);
        }
        break;
      default:
        break;
    }
  }, [instructors?.status]);

  return (
    <div className="app-user-list">
      <ExtensionsHeader
        title={<FormattedMessage id="Instructor management" />}
      />

      <Card>
        <CardBody>
          <Row>
            <Col md="2">
              <Input
                // id=""
                className=" w-100"
                placeholder={intl.formatMessage({ id: "Enter last name" })}
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </Col>

            <Col md="2">
              <Input
                // id="search-instructor"
                className=" w-100"
                placeholder={intl.formatMessage({ id: "Enter first name" })}
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </Col>

            <Col md="3">
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

            <Col md="2">
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

            <Col md="2">
              <Button color="primary" className="m-0" onClick={filterData}>
                <FormattedMessage id={"Search"} />
              </Button>
            </Col>
          </Row>
        </CardBody>
      </Card>
      <Card>
        <CardBody>
          <Row>
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
                        <FormattedMessage
                          id={"There are no records to display"}
                        />
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
              paginationComponent={CustomPagination}
              data={dataToRender()}
              subHeaderComponent={
                <CustomHeader
                  toggleSidebar={toggleSidebar}
                  rowsPerPage={rowsPerPage}
                  searchTerm={searchTerm}
                  handleFilter={handleFilter}
                  exportToExcel={exportToExcel}
                />
              }
            />
          </Row>
        </CardBody>
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
          avatar,
          setAvatar,
          phoneNumber,
          setPhoneNumber,
          invalidPhone,
          setInvalidPhone,
        }}
      />
    </div>
  );
};

export default injectIntl(InstructorsList);
