import { Fragment, useEffect, useState } from "react";

import DataTable from "react-data-table-component";
import { ChevronDown } from "react-feather";
import { FormattedMessage, injectIntl } from "react-intl";
import ReactPaginate from "react-paginate";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import {
  Badge,
  Button,
  Card,
  Col,
  Input,
  Row,
  CustomInput,
  ModalHeader,
  ModalBody,
  Modal,
  Label,
  ModalFooter,
} from "reactstrap";
import {
  getDataRollCall,
  updateRollCall,
  getDataImport,
  getDataExport,
} from "../store/action";
import { convertFileToBase64 } from "../../../../helper/common";
import XLSX from "xlsx";
import templateRollCall from "./IMPORT_ROLL_CALL.xlsx";

const CustomHeader = ({ exportToExcel, onSubmitCertification, openModal }) => (
  <Fragment>
    <div className="invoice-list-table-header w-100 mr-1 ml-50 mt-1 mb-75">
      <Row className="justify-content-end">
        <Col
          xl="6"
          className="d-flex align-items-sm-center justify-content-lg-end justify-content-start flex-lg-nowrap flex-wrap flex-sm-row flex-column pr-lg-1 p-0 mt-lg-0 mt-1"
        >
          <div className="justify-content-end">
            <Button.Ripple color="primary" onClick={openModal}>
              Điểm danh thủ công
            </Button.Ripple>
            <Button.Ripple className="ml-1" color="primary">
              <a
                href={templateRollCall}
                target="_blank"
                download
                style={{ color: "white", textDecoration: "none" }}
              >
                Tải mẫu điểm danh
              </a>
            </Button.Ripple>

            <Button.Ripple
              className="ml-1"
              color="primary"
              onClick={exportToExcel}
            >
              Tải xuống
            </Button.Ripple>
            <Button.Ripple
              className="ml-1"
              color="primary"
              onClick={onSubmitCertification}
            >
              Lưu điểm danh
            </Button.Ripple>
          </div>
        </Col>
      </Row>
    </div>
  </Fragment>
);

const RollCallEdit = ({ intl }) => {
  const dispatch = useDispatch();
  const store = useSelector((state) => state.roll_calls);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(50);
  const [selectedRows, setSelectedRows] = useState([]);
  const [clearSelectedRows, setClearSelectedRows] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility

  const toggleModal = () => setIsModalOpen(!isModalOpen); // Function to toggle modal visibility

  const [notes, setNotes] = useState({});
  const [statuses, setStatuses] = useState({});

  // Lấy dữ liệu từ store để điền vào notes và statuses khi lần đầu tải trang
  useEffect(() => {
    const initialNotes = {};
    const initialStatuses = {};
    store?.data?.forEach((row) => {
      initialNotes[row.id] = row.note || "";
      initialStatuses[row.id] = row.status || 0; // Mặc định là Vắng mặt (0)
    });
    setNotes(initialNotes);
    setStatuses(initialStatuses);
  }, [store.data]);

  const handleNoteBlur = (id, value) => {
    setNotes((prevNotes) => ({
      ...prevNotes,
      [id]: value,
    }));
  };

  const handleStatusChange = (id, status) => {
    setStatuses((prevStatuses) => ({
      ...prevStatuses,
      [id]: status,
    }));
  };

  const columns = [
    {
      name: <FormattedMessage id="id" />,
      maxWidth: "11%",
      selector: "id",
      sortable: false,
      cell: (row) => row.id,
    },
    {
      name: "Mã lớp học",
      minWidth: "10%",
      selector: "curriculumSectionId",
      sortable: false,
      cell: (row) => row?.curriculum_section?.code,
    },
    {
      name: "Tên lớp học",
      minWidth: "15%",
      selector: "curriculumSectionId",
      sortable: false,
      cell: (row) => row?.curriculum_section?.title,
    },
    {
      name: "Sinh viên",
      minWidth: "15%",
      selector: "userId",
      sortable: false,
      cell: (row) => row?.staff?.last_name + " " + row?.staff?.first_name,
    },
    {
      name: <FormattedMessage id="Note" />,
      minWidth: "25%",
      selector: "note",
      sortable: false,
      cell: (row) => (
        <Input
          type="text"
          defaultValue={notes[row.id] || ""}
          onBlur={(e) => handleNoteBlur(row.id, e.target.value)}
        />
      ),
    },
    {
      name: "Trạng thái",
      maxWidth: "30%",
      selector: "status",
      sortable: false,
      cell: (row) => (
        <div>
          <CustomInput
            type="radio"
            id={`present-${row.id}`}
            name={`status-${row.id}`}
            label="Có mặt"
            checked={statuses[row.id] === 1}
            onChange={() => handleStatusChange(row.id, 1)}
          />
          <CustomInput
            type="radio"
            id={`absent-${row.id}`}
            name={`status-${row.id}`}
            label="Vắng mặt"
            checked={statuses[row.id] === 0}
            onChange={() => handleStatusChange(row.id, 0)}
          />
          <CustomInput
            type="radio"
            id={`late-${row.id}`}
            name={`status-${row.id}`}
            label="Trễ"
            checked={statuses[row.id] === 2}
            onChange={() => handleStatusChange(row.id, 2)}
          />
        </div>
      ),
    },
  ];

  const [loadData, setLoadData] = useState(false);

  useEffect(() => {
    dispatch(
      getDataRollCall({
        filter: {},
        skip: (currentPage - 1) * rowsPerPage,
        limit: rowsPerPage,
        order: [
          {
            key: "status",
            value: "DESC",
          },
          {
            key: "createdAt",
            value: "DESC",
          },
        ],
      })
    );
    dispatch(
      getDataExport({
        filter: {},
        order: [
          {
            key: "createdAt",
            value: "desc",
          },
        ],
      })
    );
  }, [dispatch, loadData, currentPage, rowsPerPage]);

  useEffect(() => {
    if (store?.type === "UPDATE_ROLL_CALL") {
      if (store?.status === 200) {
        toast.success(<FormattedMessage id="Update successful!" />);
      }
      setLoadData((prevLoadData) => !prevLoadData);
    }
    if (store?.type === "IMPORT") {
      if (store?.status === 200) {
        toast.success(<FormattedMessage id="Tải lên thành công!" />);
      } else if (store?.status == 400) {
        toast.warn(<FormattedMessage id={"Upload failed"} />);
      }
      setLoadData((prevLoadData) => !prevLoadData);
    }
  }, [store?.type, store?.status]);

  const onSubmitCertification = () => {
    const currentTime = new Date();
    const time = currentTime.toTimeString().slice(0, 5); // Lấy giờ và phút (HH:mm)
    const date = currentTime.toISOString().slice(0, 10); // Lấy ngày (YYYY-MM-DD)

    // Tạo một đối tượng ánh xạ id sang userId
    const idToUserIdMap = {};
    store?.data.forEach((row) => {
      idToUserIdMap[row.id] = row.userId; // Ánh xạ id sang userId
    });

    const updatedData = store?.data
      ?.filter((row) => {
        return notes[row.id] !== row.note || statuses[row.id] !== row.status;
      })
      .map((row) => ({
        id: row.id,
        data: {
          // Chú ý rằng bạn phải truyền 'data' ở đây
          note: notes[row.id],
          status: statuses[row.id],
          time: time, // Thêm thời gian hiện tại
          date: date, // Thêm ngày hiện tại
          userId: idToUserIdMap[row.id], // Lấy userId từ ánh xạ
        },
      }));

    if (updatedData.length > 0) {
      dispatch(updateRollCall(updatedData));
      setClearSelectedRows((prev) => !prev);
    } else {
      toast.warn(<FormattedMessage id="Không có thay đổi để cập nhật" />);
    }
  };

  const handleRowSelect = (state) => {
    setSelectedRows(state.selectedRows.map((row) => row.id));
  };

  const count = Math.ceil(store?.data?.length / rowsPerPage) || 0;

  const dataToRender = () => store?.data || [];

  const onChangeFileImport = async (files) => {
    let data = {};

    const file = files[0]?.name?.split(".");
    const fileFormat = file[file.length - 1];
    await convertFileToBase64(files[0]).then(async (imageBase64) => {
      const newData = imageBase64.replace(/,/gi, "").split("base64");
      data = {
        file: newData[1],
        fileFormat,
      };
    });
    await dispatch(getDataImport(data));

    setIsModalOpen(false);
  };

  console.log(store);

  const exportToExcel = () => {
    if (store?.dataExport?.length > 0) {
      const data = store?.dataExport;
      const cols = [
        { header: "ID", key: "id" },
        { header: "Lớp", key: "curriculumSectionId" },
        { header: "Lớp", key: "curriculumSectionId" },
        { header: "Thời gian", key: "time" },
        { header: "Ngày", key: "date" },
        { header: "Sinh viên", key: "userId" },
        { header: "Trạng thái", key: "status" },
        { header: "Ghi chú", key: "note" },
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
      XLSX.utils.book_append_sheet(workbook, worksheet, "Điểm Danh");
      XLSX.writeFile(workbook, "Điểm Danh.xlsx");
    }
  };

  return (
    <div className="app-user-list">
      <span>
        <a href="/apps/roll_call/list">Điểm danh</a>
      </span>{" "}
      /<span>Danh sách học sinh</span>
      <Card>
        <DataTable
          noHeader
          subHeader
          onSelectedRowsChange={handleRowSelect}
          clearSelectedRows={clearSelectedRows}
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
                    <FormattedMessage id="There are no records to display" />
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
          data={dataToRender()}
          subHeaderComponent={
            <CustomHeader
              onSubmitCertification={onSubmitCertification}
              onChangeFileImport={onChangeFileImport}
              openModal={toggleModal}
              exportToExcel={exportToExcel}
            />
          }
        />
      </Card>
      {count > 0 && (
        <ReactPaginate
          previousLabel={""}
          nextLabel={""}
          pageCount={count}
          activeClassName="active"
          forcePage={currentPage - 1}
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
      <Modal isOpen={isModalOpen} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>
          <FormattedMessage id="Upload" />
        </ModalHeader>
        <ModalBody>
          {/* <Label for="productSelect">
            <FormattedMessage id="Product" />
          </Label> */}
          <div className="mt-2">
            <Label for="fileInput">
              <FormattedMessage id="importFile" />
            </Label>
            <Input
              type="file"
              onChange={(e) => {
                onChangeFileImport(e?.target?.files);
              }}
              accept="csv/*"
            />
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggleModal}>
            <FormattedMessage id="Cancel" />
          </Button>
          {/* <Button
            color="primary"
            onClick={() => {
              document.getElementById("fileUploadInput").click();
            }}
            disabled={!selectedProduct}
          >
            Upload
          </Button> */}
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default injectIntl(RollCallEdit);
