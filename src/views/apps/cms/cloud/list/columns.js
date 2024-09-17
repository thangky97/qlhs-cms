import { Edit, MoreVertical } from "react-feather";
import { FormattedMessage } from "react-intl";
import { Link } from "react-router-dom";
import {
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
} from "reactstrap";

export const columns = [
  {
    name: <FormattedMessage id="Logo" />,
    minWidth: "130px",
    cell: (row) => (
      <div class="avatar me-1 objectFit-contain" width="32" height="32">
        <img src={row.logo} alt="" width="32" height="32" />
      </div>
    ),
  },
  {
    name: <FormattedMessage id="Phone1" />,
    minWidth: "258px",
    selector: "phone_1",
    sortable: false,
    cell: (row) => row?.phone_1,
  },

  {
    name: <FormattedMessage id="Phone2" />,
    minWidth: "258px",
    selector: "phone_2",
    sortable: false,
    cell: (row) => row?.phone_2,
  },
  {
    name: <FormattedMessage id="Map source" />,
    minWidth: "308px",
    selector: "map_source",
    sortable: false,
    cell: (row) => <span className="text-ellipse-1">{row?.map_source}</span>,
  },
  {
    name: <FormattedMessage id="Footer text" />,
    minWidth: "308px",
    selector: "map_source",
    sortable: false,
    cell: (row) => <span className="text-ellipse-1">{row?.footer_text}</span>,
  },
  {
    name: <FormattedMessage id="Local service intro" />,
    minWidth: "308px",
    selector: "map_source",
    sortable: false,
    cell: (row) => (
      <span className="text-ellipse-1">{row?.local_service_intro}</span>
    ),
  },
  {
    name: <FormattedMessage id="Cloud service intro" />,
    minWidth: "308px",
    selector: "map_source",
    sortable: false,
    cell: (row) => (
      <span className="text-ellipse-1">{row?.cloud_service_intro}</span>
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
            to={`/apps/cms/about/setting/edit/${row.id}`}
            className="w-100"
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
