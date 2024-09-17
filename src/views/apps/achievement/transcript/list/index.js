import ExtensionsHeader from "@components/extensions-header";
import { useEffect, useState } from "react";
import { FormattedMessage, injectIntl } from "react-intl";
import Select from "react-select";
import Sidebar from "./Sidebar";
import { columns } from "./columns";
import { useDispatch, useSelector } from "react-redux";
import { getData, getDataExport } from "../store/action";

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
} from "reactstrap";

import "@styles/react/libs/react-select/_react-select.scss";
import "@styles/react/libs/tables/react-dataTable-component.scss";
import XLSX from "xlsx";

import { getData as getDataProduct } from "../../../product/store/action";
import { getData as getDataStudent } from "../../../user/store/action";

const CustomHeader = ({ exportToExcel }) => {
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
        </Col>
      </Row>
    </div>
  );
};

const KindList = ({ intl }) => {
  const dispatch = useDispatch();
  const store = useSelector((state) => state.transcript);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(20);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const lang = useSelector((state) => state.common.language);
  const product = useSelector((state) => state?.products?.data);
  const student = useSelector((state) => state.users);

  const [filterStatus, setFilterStatus] = useState({
    value: "",
    label: <FormattedMessage id="status" />,
  });

  const [loadData, setLoadData] = useState(false);

  const [detailTranscript, setDetailTranscript] = useState();
  const optionProduct = {
    value: "",
    label: <FormattedMessage id="Select Course" />,
  };
  const [filterProduct, setFilterProduct] = useState(optionProduct);

  const [studentOptions, setStudentOptions] = useState();
  const [filterStudent, setFilterStudent] = useState({
    value: "",
    label: <FormattedMessage id="Select Student" />,
  });

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  useEffect(() => {
    dispatch(
      getData({
        filter: {
          status: filterStatus.value || undefined,
          productId: filterProduct.value || undefined,
          usersId: filterStudent.value || undefined,
          lang,
        },
        skip: (currentPage - 1) * rowsPerPage,
        limit: rowsPerPage,
        order: [
          {
            key: "status",
            value: "asc",
          },
        ],
      })
    );
  }, [loadData, currentPage, rowsPerPage, lang]);

  useEffect(() => {
    dispatch(
      getDataExport({
        filter: {
          lang,
        },
        order: [
          {
            key: "status",
            value: "asc",
          },
        ],
      })
    );
  }, [lang]);

  useEffect(() => {
    dispatch(
      getDataStudent({
        filter: {},
        order: {
          key: "id",
          value: "asc",
        },
      })
    );
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
  }, [lang]);

  useEffect(() => {
    if (student?.data?.length > 0) {
      let data = [];
      data[0] = {
        value: null,
        label: <FormattedMessage id="Select Student" />,
      };
      student?.data?.forEach((item, index) => {
        data[index + 1] = {
          value: item?.id && item?.id,
          label: item.last_name + " " + item.first_name,
        };
      });
      setStudentOptions(data);
    }
  }, [student?.data?.length]);

  const statusOptions = [
    { value: "", label: <FormattedMessage id="Select status" /> },
    { value: "0", label: <FormattedMessage id="Deactive" /> },
    { value: "1", label: <FormattedMessage id="Active" /> },
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

  const selectDetailTranscript = (row) => {
    setDetailTranscript(row);
    setSidebarOpen(!sidebarOpen);
  };

  const exportToExcel = () => {
    if (store?.dataExport?.length > 0) {
      const data = store?.dataExport;
      const cols = [
        { header: "ID", key: "id" },
        { header: "Khoá học", key: "product" },
        { header: "Học viên", key: "user" },
        { header: "Tổng điểm", key: "total_score" },
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
            if (key === "user" && val) {
              return [
                cols.find((col) => col.key === key)?.header || key,
                val?.first_name &&
                  val?.last_name &&
                  val?.first_name + " " + val?.last_name,
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
      XLSX.utils.book_append_sheet(workbook, worksheet, "Bảng điểm");
      XLSX.writeFile(workbook, "transcript.xlsx");
    }
  };

  return (
    <div className="app-user-list">
      <ExtensionsHeader title={<FormattedMessage id="Transcript" />} />
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
              <Select
                isClearable={false}
                className="react-select"
                classNamePrefix="select"
                options={studentOptions}
                value={filterStudent}
                onChange={(data) => {
                  setFilterStudent(data);
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
          onRowClicked={(row) => selectDetailTranscript(row)}
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
          subHeaderComponent={<CustomHeader exportToExcel={exportToExcel} />}
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
        data={detailTranscript}
      />
    </div>
  );
};

export default injectIntl(KindList);
