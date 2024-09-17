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
    name: <FormattedMessage id="student_code" />,
    maxWidth: "150px",
    selector: "name",
    cell: (row) => row?.user?.id,
  },
  {
    name: <FormattedMessage id="nameLearn" />,
    minWidth: "120px",
    selector: "name",
    cell: (row) =>
      row?.user?.last_name &&
      row?.user?.first_name &&
      row?.user?.last_name + " " + row?.user?.first_name,
  },
  {
    name: <FormattedMessage id="Course" />,
    minWidth: "120px",
    selector: "name",
    cell: (row) => row?.product?.product_names[0]?.name,
  },
  // {
  //   name: <FormattedMessage id="study form" />,
  //   minWidth: "120px",
  //   selector: "name",
  //   cell: (row) => row.name,
  // },
  {
    name: <FormattedMessage id="final score" />,
    minWidth: "120px",
    selector: "name",
    cell: (row) => row.total_score,
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
  //
];
