import { Edit, MoreVertical, Search } from "react-feather";
import { FormattedMessage } from "react-intl";
import { Link } from "react-router-dom";
import {
  Badge,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
} from "reactstrap";

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
    class: "light-secondary",

    text: <FormattedMessage id="Blocked" />,
  },
};

export const columns = [
  {
    name: <FormattedMessage id="Solution" />,
    minWidth: "120px",
    selector: "name",
    cell: (row) => row.name,
  },
  {
    name: <FormattedMessage id="status" />,
    minWidth: "170px",
    selector: "status",
    cell: (row) => (
      <Badge className="text-capitalize" color={statusObj[row.status]?.class}>
        {statusObj[row.status]?.text}
      </Badge>
    ),
  },
  {
    name: <FormattedMessage id="actions" />,
    minWidth: "100px",

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
                to={`/apps/kind/edit/${row.id}`}
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
