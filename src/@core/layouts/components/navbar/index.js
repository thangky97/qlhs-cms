// ** React Imports
import { Fragment } from 'react'
import { FormattedMessage } from 'react-intl'

// ** Custom Components
import {ArrowLeft } from "react-feather"
import NavbarUser from './NavbarUser'
import NavbarBookmarks from './NavbarBookmarks'
import { Button, NavItem } from 'reactstrap'
import { Link, useHistory } from 'react-router-dom'

const ThemeNavbar = props => {
  // ** Props
  const { skin, setSkin, setMenuVisibility } = props
const history = useHistory()
  return (
    <Fragment>
      <div className='bookmark-wrapper d-flex align-items-center'>
        <NavbarBookmarks setMenuVisibility={setMenuVisibility} />
        {/* <NavItem className='d-none d-lg-block'>
        <NavLink className='nav-link-style'>
          <ThemeToggler />
        </NavLink>
      </NavItem> */}
      
      {/* <div className='text-white' onClick={()=>history.goBack()}><ArrowLeft size={19} />  <FormattedMessage id={"back"} /> </div> */}
      </div>
      <NavbarUser skin={skin} setSkin={setSkin} />
    </Fragment>
  )
}

export default ThemeNavbar
