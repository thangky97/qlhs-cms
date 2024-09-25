import { FormattedMessage } from "react-intl";
import { Link } from "react-router-dom";
import { Badge } from "reactstrap";

const statusObj = {
  2: {
    class: "light-success",
    text: <FormattedMessage id="Joined" />,
  },
  3: {
    class: "light-warning",
    text: <FormattedMessage id="Not yet joined" />,
  },
};

export const columns = [
  {
    name: <FormattedMessage id="Image" />,
    minWidth: "120px",
    selector: "avatar",
    cell: (row) => (
      <div class="avatar me-1" width="32" height="32">
        <img src={row?.avatar} alt="" width="32" height="32" />
      </div>
    ),
  },
  {
    name: <FormattedMessage id="student_code" />,
    minWidth: "100px",
    selector: "code",
    sortable: false,
    cell: (row) => row.code,
  },
  {
    name: <FormattedMessage id="lastName" />,
    minWidth: "100px",
    selector: "last_name",
    sortable: false,
    cell: (row) => row.last_name,
  },
  {
    name: <FormattedMessage id="firstName" />,
    minWidth: "100px",
    selector: "first_name",
    sortable: false,
    cell: (row) => row.first_name,
  },
  {
    name: <FormattedMessage id="username" />,
    minWidth: "170px",
    selector: "username",
    sortable: false,
    cell: (row) => row.username,
  },
  {
    name: <FormattedMessage id="Email" />,
    minWidth: "258px",
    selector: "email",
    sortable: false,
    cell: (row) => row.email,
  },
  {
    name: <FormattedMessage id="phoneNumber" />,
    minWidth: "170px",
    selector: "phone",
    cell: (row) => <span className="text-capitalize">{row.phone}</span>,
  },
  {
    name: <FormattedMessage id="term" />,
    minWidth: "170px",
    selector: "curriculumSectionId",
    cell: (row) => row?.curriculum_section?.title,
  },
  {
    name: <FormattedMessage id="Course" />,
    minWidth: "170px",
    selector: "curriculumSectionId",
    cell: (row) => row?.curriculum_section?.product?.product_names[0]?.name,
  },
  {
    name: <FormattedMessage id="status" />,
    minWidth: "120px",
    selector: "status",
    sortable: false,
    cell: (row) => (
      <Badge
        className="text-capitalize"
        color={statusObj[row.status]?.class}
        pill
      >
        {statusObj[row.status]?.text}
      </Badge>
    ),
  },
  {
    name: <FormattedMessage id="actions" />,
    minWidth: "130px",
    cell: (row) => {
      return (
        row?.id && (
          <div className="mh-100 d-flex align-items-center justify-content-center mw-100">
            <Badge
              className=" w-100"
              pill
              color="primary"
              style={{ padding: "10px 25px" }}
            >
              <Link
                className="text-edit hover:text-white"
                to={`/apps/user/edit/${row.id}`}
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
