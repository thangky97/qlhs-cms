// import { Fragment, useEffect, useState } from "react";

// import DataTable from "react-data-table-component";
// import { ChevronDown } from "react-feather";
// import { FormattedMessage, injectIntl } from "react-intl";
// import ReactPaginate from "react-paginate";
// import { useDispatch, useSelector } from "react-redux";
// import { useParams } from "react-router-dom";
// import { toast } from "react-toastify";
// import { Badge, Button, Card, CardBody, Col, Input, Row } from "reactstrap";
// import { getDataCourse, getByIdRollCall } from "../store/action";
// import Select from "react-select";
// import { STAFF_ROLE } from "../../../../constants/app";

// const CustomHeader = ({}) => {
//   return (
//     <Fragment>
//       <div className="invoice-list-table-header w-100 mr-1 ml-50 mt-1 mb-75">
//         <Row className="justify-content-end">
//           <Col
//             xl="6"
//             className="d-flex align-items-sm-center justify-content-lg-end justify-content-start flex-lg-nowrap flex-wrap flex-sm-row flex-column pr-lg-1 p-0 mt-lg-0 mt-1"
//           >
//             <div className="justify-content-end"></div>
//           </Col>
//         </Row>
//       </div>
//     </Fragment>
//   );
// };

// const TermList = ({ intl }) => {
//   const dispatch = useDispatch();
//   const store = useSelector((state) => state.roll_calls);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [rowsPerPage, setRowsPerPage] = useState(20);

//   const statusObj = {
//     1: {
//       class: "light-success",
//       text: <FormattedMessage id="Active" />,
//     },
//     0: {
//       class: "light-warning",
//       text: <FormattedMessage id="Deactive" />,
//     },
//   };
//   const columns = [
//     {
//       name: <FormattedMessage id="id" />,
//       maxWidth: "11%",
//       selector: "id",
//       sortable: false,
//       cell: (row) => row.id,
//     },
//     {
//       name: <FormattedMessage id="Mã lớp học" />,
//       minWidth: "10%",
//       selector: "code",
//       sortable: false,
//       cell: (row) => row?.code,
//     },
//     {
//       name: <FormattedMessage id="Tên lớp học" />,
//       minWidth: "15%",
//       selector: "title",
//       sortable: false,
//       cell: (row) => row?.title,
//     },
//     // {
//     //   name: <FormattedMessage id="Số sinh viên" />,
//     //   minWidth: "7%",
//     //   selector: "number_students",
//     //   sortable: false,
//     //   cell: (row) => row?.number_students,
//     // },
//     // {
//     //   name: <FormattedMessage id="Ngày giờ" />,
//     //   minWidth: "10%",
//     //   selector: "time",
//     //   sortable: false,
//     //   cell: (row) => {
//     //     return `${row?.time || ""} ${row?.date || ""}`;
//     //   },
//     // },
//     {
//       name: <FormattedMessage id="Giảng viên" />,
//       minWidth: "15%",
//       selector: "staffId",
//       sortable: false,
//       cell: (row) => row?.staff?.last_name + " " + row?.staff?.first_name,
//     },
//     // {
//     //   name: <FormattedMessage id="Môn học" />,
//     //   minWidth: "15%",
//     //   selector: "courseId",
//     //   sortable: false,
//     //   cell: (row) => row?.course?.name,
//     // },
//     // {
//     //   name: <FormattedMessage id="Description" />,
//     //   minWidth: "30%",
//     //   selector: "description",
//     //   sortable: false,
//     //   cell: (row) => <span className="text-ellipse-1">{row?.description}</span>,
//     // },
//     {
//       name: <FormattedMessage id="status" />,
//       minWidth: "100px",
//       selector: "status",
//       sortable: false,
//       cell: (row) => (
//         <Badge
//           className="text-capitalize"
//           color={statusObj[row.status]?.class}
//           pill
//         >
//           {statusObj[row.status]?.text}
//         </Badge>
//       ),
//     },
//   ];

//   const [loadData, setLoadData] = useState(false);
//   const lang = useSelector((state) => state.common.language);
//   const { id } = useParams();

//   useEffect(() => {
//     dispatch(
//       getByIdRollCall({
//         id: parseInt(id),
//       })
//     );
//   }, [id, dispatch, lang, loadData]);

//   useEffect(() => {
//     switch (store?.type) {
//       case "ADD_TERM_PRODUCT":
//         if (store?.status == 200) {
//           toast.success(<FormattedMessage id={"successfully added new!"} />);
//           setLoadData(!loadData);
//         } else if (store?.status == 400) {
//           toast.warn(<FormattedMessage id={"Add new failure!"} />);
//         }

//         break;
//       case "UPDATE_TERM_PRODUCT":
//         if (store?.status == 200) {
//           toast.success(<FormattedMessage id={"Update successful!"} />);
//           setLoadData(!loadData);
//         } else if (store?.status == 400) {
//           toast.warn(<FormattedMessage id={"Update failed!"} />);
//         }

//         break;
//       case "DELETE_TERM_PRODUCT":
//         if (store?.status == 200) {
//           toast.success(<FormattedMessage id={"Delete successfully!"} />);
//           setLoadData(!loadData);
//         } else if (store?.status == 400) {
//           toast.warn(<FormattedMessage id={"Delete failed!"} />);
//         }

//         break;

//       default:
//         break;
//     }
//   }, [store.status]);

//   const count = Number(Math.ceil(store?.length / rowsPerPage));

//   const dataToRender = () => {
//     if (store?.length > 0) {
//       return store;
//     }
//   };

//   console.log(columns);

//   return (
//     <div className="app-user-list">
//       <span>
//         <a href="/apps/roll_call/list">Điểm danh</a>
//       </span>{" "}
//       /<span>Danh sách học sinh</span>
//       <Card>
//         <DataTable
//           noHeader
//           subHeader
//           noDataComponent={
//             <div className="sc-fznWqX gnahTY">
//               <div className="sc-AxjAm gIMaKV rdt_Table" role="table">
//                 <div className="sc-fzqARJ icdHOq">
//                   <div
//                     style={{
//                       padding: "25px ",
//                       textAlign: "center",
//                       color: "black",
//                       background: "white",
//                     }}
//                   >
//                     <FormattedMessage id={"There are no records to display"} />
//                   </div>
//                 </div>
//               </div>
//             </div>
//           }
//           responsive
//           paginationServer
//           columns={columns}
//           sortIcon={<ChevronDown />}
//           className="react-dataTable"
//           data={dataToRender()}
//           subHeaderComponent={
//             <CustomHeader rowsPerPage={rowsPerPage} searchTerm={searchTerm} />
//           }
//         />
//       </Card>
//       {count > 0 && (
//         <ReactPaginate
//           previousLabel={""}
//           nextLabel={""}
//           pageCount={count || 0}
//           activeClassName="active"
//           forcePage={currentPage !== 0 ? currentPage - 1 : 0}
//           onPageChange={(page) => setCurrentPage(page.selected + 1)}
//           pageClassName={"page-item"}
//           nextLinkClassName={"page-link"}
//           nextClassName={"page-item next"}
//           previousClassName={"page-item prev"}
//           previousLinkClassName={"page-link"}
//           pageLinkClassName={"page-link"}
//           containerClassName={
//             "pagination react-paginate justify-content-center my-2 pr-1"
//           }
//         />
//       )}
//     </div>
//   );
// };

// export default injectIntl(TermList);
