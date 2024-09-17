import { Edit, MoreVertical, Search, FileText, Trash2 } from "react-feather";
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
    name: <FormattedMessage id="username" />,
    minWidth: "120px",
    selector: "username",
    cell: (row) => row.user?.last_name + " " + row.user?.first_name,
  },
  {
    name: <FormattedMessage id="Product" />,
    minWidth: "120px",
    selector: "Product",
    cell: (row) => row.product?.product_names[0]?.name,
  },
  {
    name: <FormattedMessage id="token" />,
    minWidth: "20px",
    selector: "token",
    cell: (row) => row?.token?.substring(0, 90),
  },

  {
    name: <FormattedMessage id="action" />,
    minWidth: "40px",

    cell: (row) => {
      return (
        row?.id && (
          <div className="mh-100 d-flex align-items-center justify-content-center mw-40">
            <Badge className=" w-40" pill color="primary">
              <Link
                className="text-edit hover:text-white"
                style={{
                  padding: "7px 20px",
                  display: "block",
                  cursor: "pointer",
                }}
                to={`/apps/instructors/edit/${row.id}`}
              >
                {" "}
                <FormattedMessage id="edit" />
              </Link>
            </Badge>
            <Badge className=" w-40" pill color="primary">
              <Link
                className="text-edit hover:text-white"
                style={{
                  padding: "7px 20px",
                  display: "block",
                  cursor: "pointer",
                }}
                to={`/apps/user/token-detail/list/${row.id}`}
              >
                Chi tiết
              </Link>
            </Badge>
          </div>
        )
      );
    },
  },
];
