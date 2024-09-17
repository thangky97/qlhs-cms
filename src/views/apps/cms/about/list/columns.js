import { Edit, MoreVertical } from "react-feather";
import { FormattedMessage } from "react-intl";
import { Link } from "react-router-dom";
import { DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown } from "reactstrap";
export const columns = [
  {
    name: <FormattedMessage id='About' />,
    minWidth: '320px',
    selector: 'about',
    sortable: false,
    cell: (row) =>  <span className="text-ellipse-1">{row?.about}</span>,
  },
  {
    name: <FormattedMessage id='Address 1' />,
    minWidth: '390px',
    selector: 'address_1',
    sortable: false,
    cell: (row) => row?.address_1,
  },
  {
    name: <FormattedMessage id='Address 2' />,
    minWidth: '390px',
    selector: 'address_2',
    sortable: false,
    cell: (row) => row?.address_2,
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
            to={`/apps/cms/about/edit/${row.id}`}
            className="w-100"
          >
            <Edit size={14} className='mr-50' />
            <span className='align-middle'><FormattedMessage id="edit" /></span>
          </DropdownItem>

          

         
        </DropdownMenu>
      
      </UncontrolledDropdown>
    ),
  },
];
