import ExtensionsHeader from "@components/extensions-header";
import { useEffect, useState } from "react";
import { FormattedMessage, injectIntl } from "react-intl";
import Select from "react-select";
// import Sidebar from "./Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { getData, deleteUserTokenDetail } from "../store/action";

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
import { useParams, Link } from "react-router-dom";

import "@styles/react/libs/react-select/_react-select.scss";
import "@styles/react/libs/tables/react-dataTable-component.scss";
import { toast } from "react-toastify";

const TokenList = ({ intl }) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const store = useSelector((state) => state.userTokenDetail);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(20);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [disable, setDisable] = useState(false);
  const lang = useSelector((state) => state.common.language);
  const [loadData, setLoadData] = useState(false);
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
    setDisable(false);
  };

  useEffect(() => {
    if (id) {
      dispatch(getData(id));
    }
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
      case "UPDATE_USER_TOKEN_DETAIL":
        if (store?.status == 200) {
          toast.success(<FormattedMessage id={"Update successful!"} />);
          setLoadData(!loadData);
        } else if (store?.status == 400) {
          toast.warn(<FormattedMessage id={"Update failed!"} />);
        }
        break;
      case "DELETE_USER_TOKEN_DETAIL":
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
  }, [store?.status]);

  const typeServiceCloud = {
    0: {
      text: "Free",
    },
    1: {
      text: "Basic",
    },
    2: {
      text: "Standrad",
    },
    3: {
      text: "Premium",
    },
  };

  const columns = [
    {
      name: <FormattedMessage id="Cloud" />,
      selector: "cloud",
      width: "150px",
      cell: (row) => {
        if (typeof row?.type === "number") {
          const type = row?.productPriceType;
          return typeServiceCloud[type]?.text || "";
        } else {
          return "";
        }
      },
    },
    {
      name: <FormattedMessage id="start date" />,
      selector: "fromdate",
      width: "250px",

      cell: (row) => row?.fromdate || "",
    },
    {
      name: <FormattedMessage id="end date" />,
      selector: "enddate",
      width: "250px",
      cell: (row) => row?.enddate || "",
    },
    {
      name: "Token",
      selector: "token",
      width: "300px",
      cell: (row) => (
        <div className="overflow-hidden text-truncate truncate">
          {row?.token || ""}
        </div>
      ),
    },
    {
      name: <FormattedMessage id="actions" />,
      selector: "actions",
      // width: "100px",

      cell: (row) =>
        row?.id && (
          <div className="mh-100 d-flex align-items-center justify-content-center gap-3 mw-100">
            <Badge className=" w-100" pill color="primary">
              <Link
                className="text-edit hover:text-white"
                style={{
                  padding: "7px 20px",
                  display: "block",
                  cursor: "pointer",
                }}
                to={`/apps/user/token-detail/edit/${row.id}`}
              >
                <FormattedMessage id="edit" />
              </Link>
            </Badge>
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
                      dispatch(deleteUserTokenDetail({ id: parseInt(row.id) }));
                    }
                  });
                }}
              >
                <FormattedMessage id="delete" />
              </div>
            </Badge>
          </div>
        ),
    },
  ];

  return (
    <div className="app-user-list">
      <Card>
        <CardHeader>
          <ExtensionsHeader
            title={
              <div>
                <FormattedMessage id="User Token" />
                <span>
                  : {store?.data?.last_name || ""}{" "}
                  {store?.data?.first_name || ""}
                </span>
              </div>
            }
          />
        </CardHeader>
        {store?.data?.usertoken &&
          store?.data?.usertoken?.length > 0 &&
          store?.data?.usertoken?.map((item) => {
            const data =
              item?.userTokenDetails?.length > 0 &&
              item?.userTokenDetails?.map((itemTokenDetail) => ({
                ...itemTokenDetail,
                token: item?.token,
              }));
            return (
              <>
                <Card>
                  <CardBody>
                    <Row>
                      <DataTable
                        title={
                          <div className="text-white">
                            {item?.product &&
                              item?.product?.product_names?.length > 0 &&
                              item?.product?.product_names[0]?.name}
                          </div>
                        }
                        // noHeader
                        // subHeader
                        // responsive
                        highlightOnHover
                        noDataComponent={
                          <div className="sc-fznWqX gnahTY">
                            <div
                              className="sc-AxjAm gIMaKV rdt_Table"
                              role="table"
                            >
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
                        columns={columns}
                        sortIcon={<ChevronDown />}
                        className="react-dataTable"
                        data={data || []}
                      />
                    </Row>
                  </CardBody>
                </Card>
              </>
            );
          })}

        {/* <Sidebar
          open={sidebarOpen}
          toggleSidebar={toggleSidebar}
          {...{
            disable,
            setDisable,
          }}
        /> */}
      </Card>
    </div>
  );
};

export default injectIntl(TokenList);
