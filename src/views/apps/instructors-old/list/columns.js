import { Link } from "react-router-dom";
import { FormattedMessage } from "react-intl";
import Image from "../../../../assets/images/avatars/9.png";

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
  2: {
    class: "light-secondary",

    text: <FormattedMessage id="Blocked" />,
  },
};

export const columns = [
  {
    name: <FormattedMessage id="Image" />,
    minWidth: "150px",
    selector: "instructor_image",
    sortable: false,
    cell: (row) => (
      <div class="avatar me-1" width="32" height="32">
        <img src={row.instructor_image} alt={Image} width="32" height="32" />
      </div>
    ),
  },
  {
    name: <FormattedMessage id="lastName" />,
    minWidth: "150px",
    selector: "lastName",
    sortable: false,
    cell: (row) => row.last_name || "",
  },
  {
    name: <FormattedMessage id="firstName" />,
    minWidth: "150px",
    selector: "firstName",
    sortable: false,
    cell: (row) => row.first_name || "",
  },
  {
    name: <FormattedMessage id="Email" />,
    minWidth: "150px",
    selector: "contact_email",
    sortable: false,
    cell: (row) => row.contact_email,
  },
  {
    name: <FormattedMessage id="phoneNumber" />,
    minWidth: "150px",
    selector: "telephone",
    sortable: false,
    cell: (row) => row.telephone,
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
                to={`/apps/instructors/edit/${row.id}`}
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
