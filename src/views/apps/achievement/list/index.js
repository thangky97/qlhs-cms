import ExtensionsHeader from "@components/extensions-header";
import "@styles/react/libs/flatpickr/flatpickr.scss";
import { useEffect, useState } from "react";
import Flatpickr from "react-flatpickr";
import { FormattedMessage, injectIntl } from "react-intl";

import { columns } from "./columns";

import { useDispatch, useSelector } from "react-redux";
import { getData } from "../store/action";

import DataTable from "react-data-table-component";
import { ChevronDown } from "react-feather";
import ReactPaginate from "react-paginate";
import Select from "react-select";
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
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import moment from "moment";
import { formatDateTime } from "../../../../utility/Utils";

const CustomHeader = ({}) => {
  return (
    <div className="invoice-list-table-header w-100 mr-1 ml-50 mt-1 mb-75">
      <Row className="justify-content-end">
        <Col xl="6" className="d-flex align-items-center p-0"></Col>
        <Col
          xl="6"
          className="d-flex align-items-sm-center justify-content-lg-end justify-content-start flex-lg-nowrap flex-wrap flex-sm-row flex-column pr-lg-1 p-0 mt-lg-0 mt-1"
        ></Col>
      </Row>
    </div>
  );
};

const UserList = ({ intl }) => {
  const dispatch = useDispatch();
  const store = useSelector((state) => state.transactions);
  console.log(store);
  const history = useHistory();
  /**
   *
   */
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(20);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [fromDate, setFromDate] = useState();
  const [username, setUsername] = useState();
  const [toDate, setTodate] = useState();
  const [productId, setProductId] = useState();
  const [currentRole, setCurrentRole] = useState({
    value: "",
    label: "Status",
  });
  const [paymentType, setPaymentType] = useState({
    value: "",
    label: <FormattedMessage id={"Select payment type"} />,
  });
  const [currentStatus, setCurrentStatus] = useState({
    value: "",
    label: <FormattedMessage id={"Select status"} />,
    number: 0,
  });
  const [loadData, setLoadData] = useState(false);
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  useEffect(() => {
    dispatch(
      getData({
        filter: {
          payment_type: paymentType.value || undefined,
          status: currentStatus.value || undefined,
          product_id: productId || undefined,
        },
        startDate: (fromDate && fromDate[0]) || undefined,
        endDate: (toDate && toDate[0]) || undefined,
        searchUser: username || undefined,
        skip: (currentPage - 1) * rowsPerPage,
        limit: rowsPerPage,
        order: {
          key: "createdAt",
          value: "desc",
        },
      })
    );
  }, [loadData, currentPage]);

  useEffect(() => {
    switch (store?.type) {
      case "UPDATE_TRANSACTION":
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

  const paymenTypeOptions = [
    { value: "", label: <FormattedMessage id={"Select payment type"} /> },
    { value: "online", label: "Online" },
    { value: "offline", label: "Offline" },
  ];

  const statusOptions = [
    { value: "", label: <FormattedMessage id={"Select status"} />, number: 0 },
    { value: "pending", label: <FormattedMessage id={"pending"} />, number: 1 },
    { value: "paid", label: <FormattedMessage id={"paid"} />, number: 2 },
    { value: "failed", label: <FormattedMessage id={"failed"} />, number: 2 },
  ];
  const handleFilter = (val) => {
    setSearchTerm(val);
    dispatch(
      getData({
        page: currentPage,
        perPage: rowsPerPage,
        role: currentRole.value,
        paymentType: paymentType.value,
        status: currentStatus.value,
        q: val,
      })
    );
  };
  const count = Number(Math.ceil(store.data.count / rowsPerPage));
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
    if (store?.data?.data?.length > 0) {
      return store?.data.data;
    }
  };

  return (
    <div className="app-user-list">
      {/* <ExtensionsHeader title={<FormattedMessage id="transaction" />} /> */}
      <ExtensionsHeader title="Thành tích" />
      <Card>
        <CardHeader>
          <CardTitle tag="h4">
            <FormattedMessage id="Filters" />
          </CardTitle>
        </CardHeader>
        <CardBody>
          <Row>
            <Col md="4">
              <Input
                id="search-invoice"
                className=" w-100"
                placeholder={intl.formatMessage({ id: "username" })}
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </Col>
            <Col md="4">
              <Select
                isClearable={false}
                className="react-select"
                classNamePrefix="select"
                options={paymenTypeOptions}
                value={paymentType}
                onChange={(data) => {
                  setPaymentType(data);
                }}
              />
            </Col>
            <Col md="4">
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

            <Col md="4">
              <Flatpickr
                value={fromDate}
                data-enable-time
                placeholder={intl.formatMessage({ id: "start date" })}
                id="date-time-picker"
                className="form-control"
                onChange={(date) => setFromDate(date)}
              />
            </Col>
            <Col md="4">
              <Flatpickr
                value={toDate}
                data-enable-time
                placeholder={intl.formatMessage({ id: "end date" })}
                id="date-time-picker"
                className="form-control"
                onChange={(date) => setTodate(date)}
              />
            </Col>
            <Col md="4">
              <Button
                color="primary"
                className="m-0"
                onClick={() => {
                  setLoadData(!loadData);
                  setCurrentPage(1);
                }}
              >
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
              pointerOnHover
              highlightOnHover
              responsive
              paginationServer
              onRowClicked={(row) =>
                history.push("/apps/transaction/edit/" + row.id)
              }
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
    </div>
  );
};

export default injectIntl(UserList);
