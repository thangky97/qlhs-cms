import ExtensionsHeader from "@components/extensions-header";
import "@styles/react/libs/flatpickr/flatpickr.scss";
import { useEffect, useState } from "react";
import { FormattedMessage, injectIntl } from "react-intl";

import { columns } from "./columns";

import { useDispatch, useSelector } from "react-redux";
import { getDataSemester, getDataCourse } from "../store/action";
import Select from "react-select";

import DataTable from "react-data-table-component";
import { ChevronDown } from "react-feather";
import ReactPaginate from "react-paginate";
import { Button, Card, CardBody, Col, Input, Row } from "reactstrap";

import "@styles/react/libs/react-select/_react-select.scss";
import "@styles/react/libs/tables/react-dataTable-component.scss";
import { toast } from "react-toastify";
import Sidebar from "./Sidebar";

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

const SemesterList = ({ intl }) => {
  const dispatch = useDispatch();
  const semesters = useSelector((state) => state.semesters);
  const { courses } = useSelector((state) => state.semesters);

  const [disable, setDisable] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(20);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [Name, setName] = useState();

  const optionProduct = {
    value: "",
    label: "Chọn năm học",
  };
  const [filterProduct, setFilterProduct] = useState(optionProduct);

  const [loadData, setLoadData] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
    setDisable(false);
  };

  useEffect(() => {
    dispatch(
      getDataSemester({
        filter: {
          name: Name || undefined,
          productId: filterProduct.value || undefined,
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
  }, [loadData, semesters?.statusCode]);

  const handleFilter = (val) => {};
  const count = Number(Math.ceil(semesters?.total / rowsPerPage));

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
    if (semesters?.allData?.length > 0) {
      return semesters?.allData;
    }
  };

  const filterData = () => {
    dispatch(
      getDataSemester({
        filter: {
          name: Name || undefined,
          productId: filterProduct.value || undefined,
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
  }, [dispatch]);

  useEffect(() => {
    switch (semesters?.type) {
      case "ADD_SEMESTER":
        if (semesters?.status?.statusCode == 200) {
          toast.success(<FormattedMessage id={"successfully added new!"} />);
          setLoadData(!loadData);
        } else if (semesters?.status?.statusCode == 400) {
          toast.warn(<FormattedMessage id={"Add new failure!"} />);
        }
        break;
      case "UPDATE_SEMESTER":
        if (semesters?.status == 200) {
          toast.success(<FormattedMessage id={"Update successful!"} />);
          setLoadData(!loadData);
        } else if (semesters?.status == 400) {
          toast.warn(<FormattedMessage id={"Update failed!"} />);
        }
        break;
      default:
        break;
    }
  }, [semesters?.status]);

  return (
    <div className="app-user-list">
      <ExtensionsHeader title={<FormattedMessage id="Quản lý kì học" />} />

      <Card>
        <CardBody>
          <Row>
            <Col md="3">
              <Input
                className=" w-100"
                placeholder={intl.formatMessage({ id: "Nhập kì học" })}
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
                options={[
                  { value: null, label: "Chọn năm học" },
                  ...(Array.isArray(courses)
                    ? courses.map((item) => ({
                        value: item?.id,
                        label: item?.product_names[0]?.name || "",
                      }))
                    : []),
                ]}
                value={filterProduct}
                onChange={(data) => {
                  setFilterProduct(data);
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

export default injectIntl(SemesterList);
