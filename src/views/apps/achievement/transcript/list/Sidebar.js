import Sidebar from "@components/sidebar";
import { FormattedMessage, injectIntl } from "react-intl";
import DataTable from "react-data-table-component";
import { Button, Card, Badge } from "reactstrap";
import { useEffect, useState } from "react";
import { getDataUserProduct, resetDataUserProduct } from "../store/action";
import { useDispatch, useSelector } from "react-redux";
import SpinnerComponent from "@components/spinner/Fallback-spinner";

const SidebarNewKind = ({ open, toggleSidebar, data = {} }) => {
  const dispatch = useDispatch();
  const store = useSelector((state) => state.transcript);
  const [quizResults, setQuizResults] = useState([]);
  const [loading, setLoading] = useState(true);

  const statusObj = {
    1: {
      class: "light-success",
      text: <FormattedMessage id="Complete" />,
    },
    0: {
      class: "light-warning",
      text: <FormattedMessage id="InComplete" />,
    },
  };

  const columns = [
    {
      name: <FormattedMessage id="term" />,
      minWidth: "60%",
      selector: "term",
      cell: (row) => row.section || "",
    },
    {
      name: <FormattedMessage id="Score" />,
      minWidth: "15%",
      selector: "score",
      cell: (row) => row.score || 0,
    },
    {
      name: <FormattedMessage id="status" />,
      minWidth: "25%",
      selector: "status",
      cell: (row) => (
        <Badge className="text-capitalize" color={statusObj[row.status]?.class}>
          {statusObj[row.status]?.text}
        </Badge>
      ),
    },
  ];

  useEffect(() => {
    setQuizResults([]);
  }, [data?.id]);

  useEffect(() => {
    if (Object.keys(data).length > 0) {
      dispatch(
        getDataUserProduct({
          productId: data?.productId,
          lang: data?.lang,
          usersId: data?.usersId,
        })
      );
    }
  }, [data, dispatch]);

  useEffect(() => {
    if (
      Object.keys(store?.dataUserProduct || {}).length > 0 &&
      Object.keys(data).length > 0
    ) {
      setLoading(false);
      const dataDetailTranscript = {
        ...data,
        productTranscript: store?.dataUserProduct,
      };

      if (dataDetailTranscript?.productTranscript?.sections?.length > 0) {
        if (
          dataDetailTranscript?.productTranscript?.course_progress?.length > 0
        ) {
          for (
            let i = 0;
            i < dataDetailTranscript?.productTranscript?.sections?.length;
            i++
          ) {
            const section =
              dataDetailTranscript?.productTranscript?.sections[i];
            if (section.isQuiz === 1) {
              const sectionId = section.id;
              const sectionTitle = section.title;
              let totalScore = 0;
              let userScore = 0;
              let status = 0;

              for (
                let j = 0;
                j <
                dataDetailTranscript?.productTranscript?.course_progress.length;
                j++
              ) {
                const progress =
                  dataDetailTranscript?.productTranscript?.course_progress[j];
                if (progress.curriculumSectionId === sectionId) {
                  const quizScore = progress.progress;
                  totalScore++;
                  userScore += quizScore;
                  status = 1;
                }
              }

              const scoreResult = (
                (Number(userScore) / Number(totalScore)) *
                10
              ).toFixed(1);

              const quizResult = {
                section: sectionTitle,
                score:
                  parseFloat(scoreResult) === parseInt(scoreResult)
                    ? parseInt(scoreResult)
                    : parseFloat(scoreResult),
                status,
              };
              setQuizResults((state) => [...state, quizResult]);
            }
          }
        } else {
          dataDetailTranscript?.productTranscript?.sections.forEach(
            (element) => {
              setQuizResults((state) => [
                ...state,
                {
                  section: element?.title,
                  score: 0,
                  status: 0,
                },
              ]);
            }
          );
        }
      }
    }
  }, [data, Object.keys(store?.dataUserProduct || {}).length]);

  return (
    <Sidebar
      size="lg"
      open={open}
      title={<FormattedMessage id="Scores for each course" />}
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
            data={quizResults}
          />

          <div style={{ textAlign: "end", marginTop: "15px" }}>
            <Button
              type="reset"
              color="secondary"
              outline
              onClick={() => {
                setQuizResults([]);
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

export default injectIntl(SidebarNewKind);
