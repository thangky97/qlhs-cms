import { Link } from "react-router-dom";
import { FormattedMessage } from "react-intl";

import { Badge } from "reactstrap";

export const columns = [
  {
    name: <FormattedMessage id="Semester" />,
    minWidth: "150px",
    selector: "name",
    sortable: false,
    cell: (row) => row?.name,
  },
  {
    name: <FormattedMessage id="Course" />,
    minWidth: "150px",
    selector: "productId",
    sortable: false,
    cell: (row) => row?.product?.product_names[0]?.name,
  },
  {
    name: <FormattedMessage id="actions" />,
    minWidth: "100px",
    cell: (row) => {
      return (
        row?.id && (
          <div className="mh-100 d-flex align-items-center justify-content-center mw-100">
            <Badge className=" w-100" pill color="primary">
              <Link
                className="text-edit hover:text-white"
                style={{
                  padding: "7px 20px",
                  display: "block",
                  cursor: "pointer",
                }}
                to={`/apps/semester/edit/${row?.id}`}
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
