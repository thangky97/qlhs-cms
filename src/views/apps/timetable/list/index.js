import ExtensionsHeader from "@components/extensions-header";
import "@styles/react/libs/flatpickr/flatpickr.scss";
import { useEffect, useState } from "react";
import { FormattedMessage, injectIntl } from "react-intl";
import Select from "react-select";
import { columns } from "./columns";

import { useDispatch, useSelector } from "react-redux";
import {
  getDataTimetable,
  getDataCourse,
  getDataStaff,
  getDataClassroom,
  getDataSemester,
  getDataTerm,
} from "../store/action";
import { isUserLoggedIn } from "@utils";

import DataTable from "react-data-table-component";
import { ChevronDown } from "react-feather";
import ReactPaginate from "react-paginate";
import { Button, Card, CardBody, Col, Input, Row } from "reactstrap";

import "@styles/react/libs/react-select/_react-select.scss";
import "@styles/react/libs/tables/react-dataTable-component.scss";
import { toast } from "react-toastify";
import Sidebar from "./Sidebar";
import { STAFF_ROLE } from "../../../../constants/app";

const CustomHeader = ({ toggleSidebar }) => {
  return (
    <div className="invoice-list-table-header w-100 mr-1 ml-50 mt-1 mb-75">
      <Row className="justify-content-end">
        <Col
          xl="6"
          className="d-flex align-items-sm-center justify-content-lg-end justify-content-start flex-lg-nowrap flex-wrap flex-sm-row flex-column gap-3 pr-lg-1 p-0 mt-lg-0 mt-1"
        >
          <Button.Ripple color="primary" onClick={toggleSidebar}>
            <FormattedMessage id="Add" />
          </Button.Ripple>
        </Col>
      </Row>
    </div>
  );
};

const TimetableList = ({ intl }) => {
  const dispatch = useDispatch();
  const timetable = useSelector((state) => state.timetable);
  const { courses } = useSelector((state) => state.timetable);
  const { staffs } = useSelector((state) => state.timetable);
  const { terms } = useSelector((state) => state.timetable);

  const [userData, setUserData] = useState(null);

  //** ComponentDidMount
  useEffect(() => {
    if (isUserLoggedIn() !== null) {
      setUserData(JSON.parse(localStorage.getItem("userData")));
    }
  }, []);

  const [disable, setDisable] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(20);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [lesson, setLesson] = useState();

  const optionCourse = {
    value: "",
    label: "Môn học",
  };
  const [filterCourse, setFilterCourse] = useState(optionCourse);

  const optionTerm = {
    value: "",
    label: "Lớp học",
  };
  const [filterTerm, setFilterTerm] = useState(optionTerm);

  const optionStaff = {
    value: "",
    label: "Giảng viên",
  };
  const [filterStaff, setFilterStaff] = useState(optionStaff);

  const [loadData, setLoadData] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
    setDisable(false);
  };

  useEffect(() => {
    if (userData?.id) {
      // Gọi API để kiểm tra xem có bản ghi nào trùng với userId không
      dispatch(
        getDataTimetable({
          filter: {
            staffId: userData.id, // Lọc theo userData.id
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
      ).then((response) => {
        // Kiểm tra kết quả trả về
        if (response?.data?.length === 0) {
          // Nếu không có bản ghi trùng khớp, hiển thị tất cả
          dispatch(
            getDataTimetable({
              filter: {}, // Không lọc theo staffId
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
        }
      });
    } else {
      // Nếu không có userData.id, hiển thị tất cả
      dispatch(
        getDataTimetable({
          filter: {}, // Không có filter, hiển thị tất cả
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
    }
  }, [userData, loadData, timetable?.statusCode]);

  useEffect(() => {
    dispatch(
      getDataTimetable({
        filter: {
          staffId: userData?.id,
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
    dispatch(
      getDataCourse({
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
    dispatch(
      getDataStaff({
        filter: {
          role: [STAFF_ROLE.MANAGE_STAFF, STAFF_ROLE.MANAGE_SYSTEM],
        },
        skip: (currentPage - 1) * rowsPerPage,
        limit: 20,
        order: {
          key: "id",
          value: "desc",
        },
      })
    );
    dispatch(
      getDataClassroom({
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
    dispatch(
      getDataSemester({
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
    dispatch(
      getDataTerm({
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
  }, [loadData, timetable?.statusCode]);

  const handleFilter = (val) => {};
  const count = Number(Math.ceil(timetable?.total / rowsPerPage));

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
    if (timetable?.allData?.length > 0) {
      return timetable?.allData;
    }
  };

  const filterData = () => {
    dispatch(
      getDataTimetable({
        filter: {
          lesson: lesson || undefined,
          courseId: filterCourse.value || undefined,
          staffId: filterStaff.value || undefined,
          curriculumSectionId: filterTerm.value || undefined,
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
    switch (timetable?.type) {
      case "ADD_TIMETABLE":
        if (timetable?.status?.statusCode == 200) {
          toast.success(<FormattedMessage id={"successfully added new!"} />);
          setLoadData(!loadData);
        } else if (timetable?.status?.statusCode == 400) {
          toast.warn(<FormattedMessage id={"Add new failure!"} />);
        }
        break;
      case "UPDATE_TIMETABLE":
        if (timetable?.status == 200) {
          toast.success(<FormattedMessage id={"Update successful!"} />);
          setLoadData(!loadData);
        } else if (timetable?.status == 400) {
          toast.warn(<FormattedMessage id={"Update failed!"} />);
        }
        break;
      default:
        break;
    }
  }, [timetable?.status]);

  return (
    <div className="app-user-list">
      <ExtensionsHeader title={<FormattedMessage id="Timetable" />} />

      <Card>
        <CardBody>
          <Row>
            {/* <Col md="3">
              <Input
                className=" w-100"
                placeholder={intl.formatMessage({ id: "Nhập thứ" })}
                type="text"
                value={lesson}
                onChange={(e) => setLesson(e.target.value)}
              />
            </Col> */}
            <Col md="3">
              <Select
                isClearable={false}
                className="react-select"
                classNamePrefix="select"
                options={[
                  { value: null, label: "Chọn lớp học" },
                  ...(Array.isArray(terms)
                    ? terms.map((item) => ({
                        value: item?.id,
                        label: `${item?.code} - ${item?.title}`,
                      }))
                    : []),
                ]}
                value={filterTerm}
                onChange={(data) => {
                  setFilterTerm(data);
                }}
              />
            </Col>

            <Col md="3">
              <Select
                isClearable={false}
                className="react-select"
                classNamePrefix="select"
                options={[
                  { value: null, label: "Chọn môn học" },
                  ...(Array.isArray(courses)
                    ? courses.map((item) => ({
                        value: item?.id,
                        label: `${item?.code} - ${item?.name}`,
                      }))
                    : []),
                ]}
                value={filterCourse}
                onChange={(data) => {
                  setFilterCourse(data);
                }}
              />
            </Col>

            <Col md="3">
              <Select
                isClearable={false}
                className="react-select"
                classNamePrefix="select"
                options={[
                  { value: null, label: "Chọn giảng viên" },
                  ...(Array.isArray(staffs)
                    ? staffs.map((item) => ({
                        value: item?.id,
                        label: `${item?.last_name}  ${item?.first_name}`,
                      }))
                    : []),
                ]}
                value={filterStaff}
                onChange={(data) => {
                  setFilterStaff(data);
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
        }}
      />
    </div>
  );
};

export default injectIntl(TimetableList);
