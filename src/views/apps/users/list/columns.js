import { Edit, MoreVertical, Search, FileText } from "react-feather";
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
    name: <FormattedMessage id="avatar" />,
    minWidth: "80px",

    cell: (row) => (
      <div class="avatar me-1" width="32" height="32">
        <img src={row.avatar} alt="" width="32" height="32" />
      </div>
    ),
  },
  {
    name: <FormattedMessage id="student_code" />,
    minWidth: "120px",
    selector: "id",
    cell: (row) => {
      let number = row.id;
      return (number = ("00000" + number).slice(-5));
      // row.id
    },
  },
  {
    name: <FormattedMessage id="lastName" />,
    minWidth: "120px",
    selector: "last_name",
    cell: (row) => row.last_name,
  },
  {
    name: <FormattedMessage id="firstName" />,
    minWidth: "120px",
    selector: "first_name",
    cell: (row) => row.first_name,
  },
  {
    name: <FormattedMessage id="username" />,
    minWidth: "170px",
    selector: "username",
    cell: (row) => row.username,
  },
  {
    name: <FormattedMessage id="Email" />,
    minWidth: "200px",
    selector: "email",
    cell: (row) => row.email,
  },
  {
    name: <FormattedMessage id="phoneNumber" />,
    minWidth: "150px",
    selector: "phone",
    cell: (row) => <span className="text-capitalize">{row.phone}</span>,
  },

  {
    name: <FormattedMessage id="status" />,
    minWidth: "120px",
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
    cell: (row) => (
      <UncontrolledDropdown>
        <DropdownToggle tag="div" className="btn btn-sm">
          <MoreVertical size={14} className="cursor-pointer" />
        </DropdownToggle>
        <DropdownMenu right>
          <DropdownItem
            tag={Link}
            to={`/apps/users/edit/${row.id}`}
            className="w-100"
          >
            <Edit size={14} className="mr-50" />
            <span className="align-middle">
              <FormattedMessage id="edit" />
            </span>
          </DropdownItem>

          <DropdownItem
            className="w-100"
            tag={Link}
            to={`/apps/user-product/list/${row.id}`}
          >
            <Search size={14} className="mr-50" />
            <span className="align-middle">
              <FormattedMessage id="product bought" />
            </span>
          </DropdownItem>
          <DropdownItem
            className="w-100"
            tag={Link}
            to={`/apps/user/token-detail/list/${row.id}`}
          >
            <Search size={14} className="mr-50" />
            <span className="align-middle">
              <FormattedMessage id="token bought" />
            </span>
          </DropdownItem>
        </DropdownMenu>
      </UncontrolledDropdown>
    ),
  },
];
