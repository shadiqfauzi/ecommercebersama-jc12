import React, { useState } from 'react';
import  { Logout } from '../Redux/Action'
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavbarText,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faShoppingCart} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'


const Example = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);
  const dispatch = useDispatch()

  const isLoggedIn = useSelector(state => state.auth.logged)
  const username = useSelector(state => state.auth.username)
  const role = useSelector(state => state.auth.role)

  const logOut = () => {
    dispatch(Logout())
    localStorage.removeItem('token')
  }

  return (
    <div>
      <Navbar expand="md" light style={{ backgroundColor : 'none' }}>
          <NavbarBrand tag={Link} to={'/'}>Shoesilo</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink tag={Link} to={'/product'}>Men</NavLink>
            </NavItem>
            <NavItem>
              <NavLink>Women</NavLink>
            </NavItem>
            <NavItem>
              <NavLink>Kids</NavLink>
            </NavItem>
          {/* </Nav> */}
          {/* <Nav navbar> */}
            <UncontrolledDropdown nav inNavbar style={{ float: 'right' }}>
              <DropdownToggle nav caret>
                {
                  isLoggedIn ?
                  <div style={{display: 'inline', fontWeight: '700'}}>
                    {username}
                  </div>
                  :
                  <FontAwesomeIcon icon={faUser}/>
                }
              </DropdownToggle>
              <DropdownMenu right>
                {
                  !isLoggedIn ?
                  <div>
                    <Link to='/login'>
                      <DropdownItem>
                        Login
                      </DropdownItem>
                    </Link>
                    <Link to='/register'>
                      <DropdownItem>
                        Register
                      </DropdownItem>
                    </Link>
                  </div>
                  :
                  <div>
                    {
                      role === 'admin' 
                      ?
                      <Link to='/manage-product'>
                        <DropdownItem>
                          Manage Product
                        </DropdownItem>
                      </Link>
                      :
                      null
                    }
                    <Link to='/cart'>
                      <DropdownItem>
                        Cart
                      </DropdownItem>
                    </Link>
                    <Link to='/product'>
                      <DropdownItem>
                        Product
                      </DropdownItem>
                    </Link>
                    <Link to='/transaction'>
                      <DropdownItem>
                        Transaction History
                      </DropdownItem>
                    </Link>
                    <Link to='/' onClick={logOut}>
                      <DropdownItem>
                        Logout
                      </DropdownItem>
                    </Link>
                  
                  </div>
                }
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
            {
              isLoggedIn
              &&
              <NavbarText>
              <Link to='/cart'><FontAwesomeIcon icon={faShoppingCart}/></Link>
              </NavbarText>
            }
        </Collapse>
      </Navbar>
    </div>
  );
}

export default Example;