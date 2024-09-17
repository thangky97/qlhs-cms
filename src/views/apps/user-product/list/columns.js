import { Edit, MoreVertical } from "react-feather";
import { FormattedMessage } from "react-intl";
import { Link } from "react-router-dom";
import {
  Badge,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
} from "reactstrap";
import { formatDateTime } from "../../../../utility/Utils";
import { getMoneyByLang, number_to_price } from "./../../../../helper/common";

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
    name: <FormattedMessage id="img_product" />,
    minWidth: "80px",

    cell: (row) => (
      <div class="avatar me-1" width="50" height="50">
        <img
          src={row?.product && row?.product?.image}
          alt=""
          width="32"
          height="32"
        />
      </div>
    ),
  },
  {
    name: <FormattedMessage id="product_name" />,
    minWidth: "120px",
    selector: "product_name",
    cell: (row) => {
      console.log(row);
      return (
        row?.product &&
        row?.product?.product_names?.length > 0 &&
        row?.product?.product_names[0]?.name
      );
    },
  },
  {
    name: <FormattedMessage id="price" />,
    minWidth: "70px",
    selector: "price",
    cell: (row) => (
      <span className="text-capitalize">
        {number_to_price(row?.price) + " " + getMoneyByLang(row?.lang)}
      </span>
    ),
  },
  {
    name: <FormattedMessage id="Product Discount" />,
    minWidth: "70px",
    selector: "productdiscount",
    cell: (row) => String(row.discount),
  },
  {
    name: <FormattedMessage id="vat" />,
    minWidth: "70px",
    selector: "vat",
    cell: (row) => String(row.vat),
  },
  {
    name: <FormattedMessage id="quantity" />,
    minWidth: "70px",
    selector: "total_product",
    cell: (row) => row.total_product,
  },
  {
    name: <FormattedMessage id="Total Money" />,
    minWidth: "70px",
    selector: "totalmoney",
    cell: (row) => (
      <span className="text-capitalize">
        {number_to_price(row.total_price) + " " + getMoneyByLang(row?.lang)}
      </span>
    ),
  },
  {
    name: <FormattedMessage id="createdAt" />,
    minWidth: "120px",
    selector: "createdAt",
    cell: (row) => <span>{formatDateTime(row.createdAt)}</span>,
  },
  // {
  //   name: <FormattedMessage id="status" />,
  //   minWidth: "120px",
  //   selector: "status",
  //   cell: (row) => (
  //     <Badge className="text-capitalize" color={statusObj[row.status]?.class}>
  //       {statusObj[row.status]?.text}
  //     </Badge>
  //   ),
  // },
];
