import { FormattedMessage } from "react-intl";
import { Link } from "react-router-dom";
import { Badge } from "reactstrap";

const statusObj = {
  1: {
    class: "light-success",
    text: <FormattedMessage id="Active" />,
  },
  0: {
    class: "light-warning",
    text: <FormattedMessage id="Deactive" />,
  },
  2: {
    class: "light-danger",
    text: <FormattedMessage id="Blocked" />,
  },
};

const roleOptions = {
  MANAGE_SYSTEM: {
    text: <FormattedMessage id="Management System" />,
  },
  MANAGE_STAFF: {
    text: <FormattedMessage id="Staff" />,
  },
};

export const columns = [
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
    name: <FormattedMessage id="role" />,
    minWidth: "170px",
    selector: "phone",
    cell: (row) => {
      // Sử dụng return để trả về JSX
      return <span>{roleOptions[row?.role]?.text}</span>;
    },
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
                to={`/apps/staff/edit/${row.id}`}
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
