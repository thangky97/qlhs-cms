import { FormattedMessage } from "react-intl";
import { getMoneyByLang, number_to_price } from "./../../../../helper/common";
import { formatDateTime } from "../../../../utility/Utils";

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
    name: <FormattedMessage id="img_product" />,
    minWidth: "80px",

    cell: (row) => (
      <div class="avatar me-1" width="50" height="50">
        <img
          src={row?.user_token?.product?.image || ""}
          alt=""
          width="32"
          height="32"
        />
      </div>
    ),
  },
  {
    name: <FormattedMessage id="Service" />,
    minWidth: "120px",
    selector: "product_name",
    cell: (row) => {
      return (
        (row?.user_token?.product?.product_names &&
          row?.user_token?.product?.product_names[0]?.name) ||
        ""
      );
    },
  },
  {
    name: <FormattedMessage id="cloud_type" />,
    minWidth: "120px",
    selector: "cloud_type",
    cell: (row) => {
      return (
        ((typeof row?.productPriceType === "number" ||
          row?.productPriceType === 0) &&
          typeServiceCloud[row?.productPriceType].text) ||
        ""
      );
    },
  },
  {
    name: <FormattedMessage id="price" />,
    minWidth: "70px",
    selector: "price",
    cell: (row) => (
      <span className="text-capitalize">
        {number_to_price((row?.productPrice && row?.productPrice) || 0) +
          " " +
          getMoneyByLang(
            row?.user_token?.product?.lang && row?.user_token?.product?.lang
          )}
      </span>
    ),
  },
  {
    name: <FormattedMessage id="Product Discount" />,
    minWidth: "70px",
    selector: "productdiscount",
    cell: (row) => (
      <span className="text-capitalize">
        {number_to_price(
          (row?.user_token?.product?.product_price_discounts[0]?.discount &&
            row?.user_token?.product?.product_price_discounts[0]?.discount) ||
            0
        ) +
          " " +
          getMoneyByLang(
            row?.user_token?.product?.lang && row?.user_token?.product?.lang
          )}
      </span>
    ),
  },
  {
    name: <FormattedMessage id="vat" />,
    minWidth: "70px",
    selector: "vat",
    cell: (row) =>
      String(
        ((row?.user_token?.product?.vat && row?.user_token?.product?.vat) ||
          0) + " %"
      ),
  },
  {
    name: <FormattedMessage id="Start date" />,
    minWidth: "150px",
    selector: "payment_type",
    sortable: false,
    cell: (row) => <span>{formatDateTime(row?.fromdate)}</span>,
  },
  {
    name: <FormattedMessage id="End date" />,
    minWidth: "150px",
    selector: "payment_type",
    sortable: false,
    cell: (row) => <span>{formatDateTime(row?.enddate)}</span>,
  },
  {
    name: <FormattedMessage id="Total Money" />,
    minWidth: "70px",
    selector: "totalmoney",
    cell: (row) => (
      <span className="text-capitalize">
        {number_to_price(row?.total_money) +
          " " +
          getMoneyByLang(
            row?.user_token?.product?.lang && row?.user_token?.product?.lang
          )}
      </span>
    ),
  },
];
