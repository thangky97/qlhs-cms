import moment from "moment";
import { FormattedMessage } from "react-intl";
import {
  Badge,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
} from "reactstrap";

export const columns = [
  {
    name: <FormattedMessage id="student_code" />,
    maxWidth: "150px",
    selector: "user.id",
  },
  {
    name: <FormattedMessage id="nameLearn" />,
    minWidth: "120px",
    selector: "userId", 
    cell: (row) => (
      <span>
        {row?.user?.last_name} {row?.user?.first_name}
      </span>
    ),
  },
  {
    name: <FormattedMessage id="Course" />,
    minWidth: "120px",
    selector: "courseId",
    cell: (row) => <span>{row?.course?.product_names[0]?.name}</span>,
  },
  {
    name: <FormattedMessage id="Total study time" />,
    minWidth: "120px",
    selector: "totalDuration",
    cell: (row) => row?.totalDuration && moment.utc(row?.totalDuration * 1000).format("HH:mm:ss")
  },
];
