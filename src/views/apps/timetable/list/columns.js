import { Link } from "react-router-dom";
import { FormattedMessage } from "react-intl";

import { Badge } from "reactstrap";

export const columns = [
  {
    name: <FormattedMessage id="term" />,
    minWidth: "150px",
    selector: "curriculumSectionId",
    sortable: false,
    cell: (row) => row?.curriculum_section?.title,
  },
  {
    name: <FormattedMessage id="Thứ" />,
    minWidth: "150px",
    selector: "date",
    sortable: false,
    cell: (row) => row?.date,
  },
  {
    name: <FormattedMessage id="Tiết" />,
    minWidth: "150px",
    selector: "lesson",
    sortable: false,
    cell: (row) => row?.lesson,
  },
  {
    name: <FormattedMessage id="Môn học" />,
    minWidth: "150px",
    selector: "courseId",
    sortable: false,
    cell: (row) => row?.course?.name,
  },
  {
    name: <FormattedMessage id="Instructors" />,
    minWidth: "150px",
    selector: "staffId",
    sortable: false,
    cell: (row) => row?.staff?.last_name + " " + row?.staff?.first_name,
  },
  {
    name: <FormattedMessage id="Số giờ lý thuyết" />,
    minWidth: "150px",
    selector: "practice_hours",
    sortable: false,
    cell: (row) => row?.practice_hours,
  },
  {
    name: <FormattedMessage id="Số giờ thực hành" />,
    minWidth: "150px",
    selector: "theory_hours",
    sortable: false,
    cell: (row) => row?.theory_hours,
  },
  {
    name: <FormattedMessage id="Phòng học" />,
    minWidth: "150px",
    selector: "classroomId",
    sortable: false,
    cell: (row) =>
      row?.classroomId
        ? row?.classroom?.name + " " + row?.classroom?.area
        : null,
  },
  {
    name: <FormattedMessage id="actions" />,
    minWidth: "100px",
    cell: (row) => {
      return (
        row?.id && (
          <div className="mh-100 d-flex align-items-center justify-content-center mw-100">
            <Badge className=" w-100" pill color="primary">
              <Link
                className="text-edit hover:text-white"
                style={{
                  padding: "7px 20px",
                  display: "block",
                  cursor: "pointer",
                }}
                to={`/apps/timetable/edit/${row?.id}`}
              >
                {" "}
                <FormattedMessage id="edit" />
              </Link>
            </Badge>
          </div>
        )
      );
    },
  },
];
