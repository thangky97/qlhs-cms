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

const typeServiceCloud = {
  0: {
    text: "Free",
  },
  1: {
    text: "Basic",
  },
  2: {
    text: "Standrad",
  },
  3: {
    text: "Premium",
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
    name: <FormattedMessage id="service" />,
    minWidth: "200px",
    selector: "service",
    sortable: false,
    cell: (row) =>
      (row?.userTokenDetails &&
        row?.userTokenDetails?.length > 0 &&
        row?.userTokenDetails[0]?.user_token &&
        row?.userTokenDetails[0]?.user_token?.product &&
        row?.userTokenDetails[0]?.user_token?.product?.product_names?.length >
          0 &&
        row?.userTokenDetails[0]?.user_token?.product?.product_names[0]
          ?.name) ||
      "",
  },
  {
    name: "Token",
    minWidth: "300px",
    selector: "token",
    sortable: false,
    cell: (row) =>
      (row?.userTokenDetails &&
        row?.userTokenDetails?.length > 0 &&
        row?.userTokenDetails[0]?.user_token &&
        row?.userTokenDetails[0]?.user_token?.token?.substring(0, 90)) ||
      "",
  },
  {
    name: <FormattedMessage id="cloud_type" />,
    minWidth: "200px",
    selector: "package",
    sortable: false,
    cell: (row) =>
      (row?.userTokenDetails &&
        row?.userTokenDetails?.length > 0 &&
        (typeof row?.userTokenDetails[0]?.productPriceType === "number" ||
          row?.userTokenDetails[0]?.productPriceType === 0) &&
        typeServiceCloud[row?.userTokenDetails[0]?.productPriceType].text) ||
      "",
  },

  {
    name: <FormattedMessage id="Start date" />,
    minWidth: "150px",
    selector: "dateStart",
    sortable: false,
    cell: (row) =>
      (row?.userTokenDetails &&
        row?.userTokenDetails?.length > 0 &&
        row?.userTokenDetails[0]?.user_token &&
        row?.userTokenDetails[0]?.fromdate) ||
      "",
  },

  {
    name: <FormattedMessage id="End date" />,
    minWidth: "150px",
    selector: "dateEnd",
    sortable: false,
    cell: (row) =>
      (row?.userTokenDetails &&
        row?.userTokenDetails?.length > 0 &&
        row?.userTokenDetails[0]?.user_token &&
        row?.userTokenDetails[0]?.enddate) ||
      "",
  },

  {
    name: <FormattedMessage id="createdAt" />,
    minWidth: "200px",
    selector: "createdAt",
    sortable: false,
    cell: (row) => (
      <span className="text-capitalize">{formatDateTime(row?.createdAt)}</span>
    ),
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
];
