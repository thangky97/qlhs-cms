import { getMoneyByLang, number_to_price } from "./../../../../helper/common";
import { formatDateTime } from "./../../../../utility/Utils";

import { FormattedMessage } from "react-intl";

import { Badge } from "reactstrap";

const statusObj = {
  paid: {
    class: "light-success",
    text: <FormattedMessage id="paid" />,
  },
  pending: {
    class: "light-warning",
    text: <FormattedMessage id="pending" />,
  },
  failed: {
    class: "light-danger",

    text: <FormattedMessage id="failed" />,
  },
};

export const columns = [
  {
    name: <FormattedMessage id="ID" />,
    maxWidth: "120px",
    selector: "id",
    sortable: false,
    cell: (row) => row.id,
  },
  {
    name: <FormattedMessage id="name" />,
    minWidth: "150px",
    selector: "name",
    sortable: false,
    cell: (row) => row.user_payment,
  },
  {
    name: <FormattedMessage id="Payment Money" />,
    minWidth: "120px",
    selector: "total_money",
    sortable: false,
    cell: (row) => (
      <span className="text-capitalize">
        {number_to_price(row.total_money) + " " + getMoneyByLang(row?.lang)}
      </span>
    ),
  },
  {
    name: <FormattedMessage id="Payment Type" />,
    minWidth: "150px",
    selector: "payment_type",
    sortable: false,
    cell: (row) => row.payment_type,
  },

  {
    name: <FormattedMessage id="status" />,
    minWidth: "140px",
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
    name: <FormattedMessage id="createdAt" />,
    minWidth: "200px",
    selector: "createdAt",
    sortable: false,
    cell: (row) => (
      <span className="text-capitalize">{formatDateTime(row.createdAt)}</span>
    ),
  },
];
