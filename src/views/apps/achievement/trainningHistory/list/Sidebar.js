import Sidebar from "@components/sidebar";
import moment from "moment";
import { FormattedMessage, injectIntl } from "react-intl";
import DataTable from "react-data-table-component";
import { Button, Card, Badge } from "reactstrap";
import { useEffect, useState } from "react";
import { getDataUserProduct, resetDataUserProduct } from "../store/action";
import { useDispatch, useSelector } from "react-redux";
import SpinnerComponent from "@components/spinner/Fallback-spinner";

const SidebarTrainningHistory = ({ open, toggleSidebar, data = {} }) => {
  const dispatch = useDispatch();
  const store = useSelector((state) => state.trainninghistory);
  const [loading, setLoading] = useState(true);
  const [dataTable, setDataTable] = useState(null);

  const columns = [
    {
      name: <FormattedMessage id="term" />,
      minWidth: "60%",
      selector: "term",
      cell: (row) => row?.curriculum_section?.title || "",
    },
    {
      name: <FormattedMessage id="Total study time" />,
      minWidth: "15%",
      selector: "score",
      cell: (row) => row?.duration && moment.utc(row?.duration * 1000).format("HH:mm:ss") || "",
    },
  ];

  useEffect(() => {
    if (Object.keys(data).length > 0) {
      dispatch(
        getDataUserProduct({
          userId: data?.userId,
          productId: data?.courseId,
        })
      );
    }
  }, [data]);
  
  useEffect(() => {
    if (store?.dataUserProduct?.length > 0) {
      setLoading(false);
      const curriculumDurationMap = {};
      store?.dataUserProduct.forEach((item) => {
        const curriculumSectionId = item.curriculumSectionId;
        const duration = item.duration;
        const curriculum_section = item.curriculum_section;

        if (curriculumDurationMap[curriculumSectionId]) {
          curriculumDurationMap[curriculumSectionId].duration += duration;
        } else {
          curriculumDurationMap[curriculumSectionId] = {
            duration: duration,
            curriculum_section: curriculum_section
          };
        }
      });

      const result = Object.keys(curriculumDurationMap).map(
        
        (itemId) => {
          return {
            curriculumSectionId: Number(itemId),
            curriculum_section:
              curriculumDurationMap[Number(itemId)]?.curriculum_section,
            duration: curriculumDurationMap[Number(itemId)]?.duration
          };
        }
      );
      setDataTable(result);
    }
  }, [store]);
  

  return (
    <Sidebar
      size="lg"
      open={open}
      title={<FormattedMessage id="trainningHistory" />}
      headerClassName="mb-1"
      contentClassName="pt-0"
      toggleSidebar={toggleSidebar}
    >
      {loading ? (
        <SpinnerComponent />
      ) : (
        <Card>
          <DataTable
            noHeader
            responsive
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
            columns={columns}
            className="react-dataTable"
            data={dataTable}
          />

          <div style={{ textAlign: "end", marginTop: "15px" }}>
            <Button
              type="reset"
              color="secondary"
              outline
              onClick={() => {
                setDataTable();
                setLoading(true);
                dispatch(resetDataUserProduct());
                toggleSidebar();
              }}
            >
              <FormattedMessage id="Close" />
            </Button>
          </div>
        </Card>
      )}
    </Sidebar>
  );
};

export default injectIntl(SidebarTrainningHistory);
