import { Link } from "react-router-dom";
import { FormattedMessage } from "react-intl";

import { Badge } from "reactstrap";

const statusObj = {
  1: {
    class: "light-success",
    text: <FormattedMessage id="Active" />,
  },
  0: {
    class: "light-warning",
    text: <FormattedMessage id="Deactive" />,
  },
};

export const columns = [
  {
    name: <FormattedMessage id="Mã chương trình học" />,
    minWidth: "150px",
    selector: "code",
    sortable: false,
    cell: (row) => row?.code,
  },
  {
    name: <FormattedMessage id="Tên chương trình học" />,
    minWidth: "150px",
    selector: "name",
    sortable: false,
    cell: (row) => row?.name,
  },
  {
    name: <FormattedMessage id="description" />,
    minWidth: "150px",
    selector: "description",
    sortable: false,
    cell: (row) => {
      return (
        <span
          dangerouslySetInnerHTML={{
            __html: row?.description,
          }}
        ></span>
      );
    },
  },
  // {
  //   name: <FormattedMessage id="status" />,
  //   minWidth: "140px",
  //   selector: "status",
  //   sortable: false,
  //   cell: (row) => (
  //     <Badge
  //       className="text-capitalize"
  //       color={statusObj[row.status]?.class}
  //       pill
  //     >
  //       {statusObj[row.status]?.text}
  //     </Badge>
  //   ),
  // },
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
                to={`/apps/training_program/edit/${row?.id}`}
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
