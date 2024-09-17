// ** React Imports
import { Fragment, useState, useRef } from 'react'

// ** Vertical Menu Items Array
import navigations from '@src/navigation/vertical'

// ** Third Party Components
import classnames from 'classnames'
import PerfectScrollbar from 'react-perfect-scrollbar'

// ** Vertical Menu Components
import VerticalMenuHeader from './VerticalMenuHeader'
import VerticalNavMenuItems from './VerticalNavMenuItems'
import { toast } from 'react-toastify'
import { FormattedMessage } from 'react-intl'

const Sidebar = props => {
  // ** Props
  const { menuCollapsed, routerProps, menu, currentActiveItem, skin } = props

  // ** States
  const [groupOpen, setGroupOpen] = useState([])
  const [groupActive, setGroupActive] = useState([])
  const [activeItem, setActiveItem] = useState(null)
const [navigation,setNavigation]= useState(()=>{
  const arrRole =JSON.parse(localStorage.getItem("userData"))?.role?.split(";")
if (arrRole?.length==0) {
  localStorage.clear()
  toast.error(<FormattedMessage id="you have no rights"/>)
  setTimeout(() => {
  window.location.href="/"
    
  }, 2000);
}
 const navigationsNew = navigations?.filter((item)=>{
   return arrRole?.includes(item?.role)
  })
  return navigationsNew
})
  // ** Menu Hover State
  const [checkDevide,setCheckDevide]=useState(()=>{
    if (window.screen.availWidth>768) {
      return true
    }
    return false
  })
  const [menuHover, setMenuHover] = useState(!checkDevide)
 
  // ** Ref
  const shadowRef = useRef(null)

  // ** Function to handle Mouse Enter
  const onMouseEnter = () => {
    if (menuCollapsed&checkDevide) {
      
      setMenuHover(true)
    }
  }

  // ** Scroll Menu
  const scrollMenu = container => {
    if (shadowRef && container.scrollTop > 0) {
      if (!shadowRef.current.classList.contains('d-block')) {
        shadowRef.current.classList.add('d-block')
      }
    } else {
      if (shadowRef.current.classList.contains('d-block')) {
        shadowRef.current.classList.remove('d-block')
      }
    }
  }

  return (
    <Fragment>
      <div
        className={classnames('main-menu  menu-accordion menu-shadow', {
          // className={classnames('main-menu menu-fixed menu-accordion menu-shadow', {
          expanded: menuHover ,
          expanded: menuHover || menuCollapsed === false,
          'menu-light': skin !== 'semi-dark' && skin !== 'dark',
          'menu-dark': skin === 'semi-dark' || skin === 'dark'
        })}
        style={{position:"fixed"}}
        onMouseEnter={onMouseEnter}
        onMouseLeave={() =>{checkDevide&& setMenuHover(false)}}
      >
        {menu ? (
          menu
        ) : (
          <Fragment>
            {/* Vertical Menu Header */}
            <VerticalMenuHeader setGroupOpen={setGroupOpen} menuHover={menuHover} {...props} />
            {/* Vertical Menu Header Shadow */}
            <div className='shadow-bottom' ref={shadowRef}></div>
            {/* Perfect Scrollbar */}
            <PerfectScrollbar
              className='main-menu-content'
              options={{ wheelPropagation: false }}
              onScrollY={container => scrollMenu(container)}
            >
              <ul className='navigation navigation-main'>
                <VerticalNavMenuItems
                  items={navigation}
                  groupActive={groupActive}
                  setGroupActive={setGroupActive}
                  activeItem={activeItem}
                  setActiveItem={setActiveItem}
                  groupOpen={groupOpen}
                  setGroupOpen={setGroupOpen}
                  routerProps={routerProps}
                  // menuCollapsed={true}
                  menuCollapsed={menuCollapsed}
                  menuHover={menuHover}
                  currentActiveItem={currentActiveItem}
                />
              </ul>
            </PerfectScrollbar>
          </Fragment>
        )}
      </div>
    </Fragment>
  )
}

export default Sidebar
