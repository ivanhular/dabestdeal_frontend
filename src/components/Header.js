import React from 'react'
import { Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import {
  Navbar,
  Nav,
  Container,
  NavDropdown,
  Badge,
  Image,
} from 'react-bootstrap'
import SearchBox from './SearchBox'
import SocialList from './SocialList'
import { logout } from '../actions/userActions'
import logo from '../assets/logo.png'
import mobileLogo from '../assets/mobile-logo.png'

const Header = () => {
  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const cart = useSelector((state) => state.cart)
  const { cartItems } = cart
  const logoutHandler = () => {
    dispatch(logout())
  }

  return (
    <header className='header-wrapper'>
      <Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect>
        <div className='top-bar'>
          <Container>
            <div className='social-wrap'> Follow us on: </div>
            <SocialList />
          </Container>
        </div>
        <div className='bottom-bar'>
          <Container>
            <LinkContainer to='/'>
              <Navbar.Brand className='logo-wrap'>
                <Image src={logo} className='desktop-logo' />
                <Image src={mobileLogo} className='mobile-logo' />
              </Navbar.Brand>
            </LinkContainer>
            <Navbar.Toggle aria-controls='basic-navbar-nav' />
            <Navbar.Collapse id='basic-navbar-nav'>
              <Route
                render={({ history }) => <SearchBox history={history} />}
              />
              <Nav className='ml-auto'>
                <LinkContainer to='/cart'>
                  <Nav.Link>
                    <i className='fas fa-shopping-cart'></i> Cart
                    {cartItems.length > 0 ? (
                      <Badge pill variant='danger'>
                        {cartItems.length}
                      </Badge>
                    ) : (
                      ''
                    )}
                  </Nav.Link>
                </LinkContainer>
                {userInfo ? (
                  <NavDropdown title={userInfo.firstName} id='username'>
                    <LinkContainer to='/profile'>
                      <NavDropdown.Item>Profile</NavDropdown.Item>
                    </LinkContainer>
                    <NavDropdown.Item onClick={logoutHandler}>
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                ) : (
                  <LinkContainer to='/login'>
                    <Nav.Link>
                      <i className='fas fa-user'></i> Sign In
                    </Nav.Link>
                  </LinkContainer>
                )}
                {userInfo && userInfo.isAdmin && (
                  <NavDropdown title='Admin' id='adminmenu'>
                    {userInfo.role.toLowerCase() === 'admin' && (
                      <LinkContainer to='/admin/userlist'>
                        <NavDropdown.Item>Users</NavDropdown.Item>
                      </LinkContainer>
                    )}
                    {userInfo.role.toLowerCase() === 'admin' && (
                      <LinkContainer to='/admin/productlist'>
                        <NavDropdown.Item>Products</NavDropdown.Item>
                      </LinkContainer>
                    )}

                    <LinkContainer to='/admin/orderlist'>
                      <NavDropdown.Item>Orders</NavDropdown.Item>
                    </LinkContainer>
                  </NavDropdown>
                )}
              </Nav>
            </Navbar.Collapse>
          </Container>
        </div>
      </Navbar>
    </header>
  )
}

export default Header
