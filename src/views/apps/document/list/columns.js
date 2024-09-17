import { store } from "@store/storeConfig/store";
import { FormattedMessage } from "react-intl";
import { Link } from "react-router-dom";
import { getById } from "../store/action";
import { formatDateTime } from "./../../../../utility/Utils";

import { Edit, MoreVertical } from "react-feather";
import {
  Badge,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
} from "reactstrap";

const isOpen = {
  1: {
    class: "light-success",
    text: <FormattedMessage id="Yes" />,
  },
  0: {
    class: "light-warning",
    text: <FormattedMessage id="No" />,
  },
};
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

    text: "Blocked",
  },
};
export const columns = [
  {
    name: <FormattedMessage id="ID" />,
    minWidth: "100px",
    selector: "email",
    sortable: false,
    cell: (row) => row.id,
  },

  {
    name: <FormattedMessage id="Image" />,
    minWidth: "138px",
    selector: "currentPlan",
    sortable: false,
    cell: (row) => (
      <div class="avatar me-1" width="32" height="32">
        <img src={row.image} alt="" width="32" height="32" />
      </div>
    ),
  },
  {
    name: <FormattedMessage id="Title" />,
    minWidth: "120px",
    selector: "email",
    sortable: false,
    cell: (row) => row.type && row?.document_labels[0]?.label,
  },
  {
    name: <FormattedMessage id="type" />,
    minWidth: "138px",
    selector: "currentPlan",
    sortable: false,
    cell: (row) => row.type,
  },
  {
    name: <FormattedMessage id="Created at" />,
    minWidth: "258px",
    selector: "currentPlan",
    sortable: false,
    cell: (row) => formatDateTime(row.createdAt),
  },

  {
    name: <FormattedMessage id="status" />,
    minWidth: "138px",
    selector: "currentPlan",
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
    name: <FormattedMessage id="open" />,
    minWidth: "138px",
    selector: "currentPlan",
    sortable: false,
    cell: (row) => (
      <Badge className="text-capitalize" color={isOpen[row.open]?.class} pill>
        {isOpen[row.open]?.text}
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
            to={`/apps/blog/edit/${row.id}`}
            className="w-100"
            onClick={() => store.dispatch(getById(row.id))}
          >
            <Edit size={14} className="mr-50" />
            <span className="align-middle">
              <FormattedMessage id="edit" />
            </span>
          </DropdownItem>
        </DropdownMenu>
      </UncontrolledDropdown>
    ),
  },
];
