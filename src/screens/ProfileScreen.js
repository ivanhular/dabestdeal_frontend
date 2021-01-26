import React, { useState, useEffect } from 'react'
import moment from 'moment'
import { Table, Form, Button, Row, Col, Modal, Spinner } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import {
  getUserDetails,
  updateUserProfile,
  deleteUser,
  logout,
} from '../actions/userActions'
import { listMyOrders } from '../actions/orderActions'
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants'

const ProfileScreen = ({ location, history }) => {
  const [firstName, setFirstName] = useState('')
  const [middleName, setMiddleName] = useState('')
  const [lastName, setLastName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState(null)
  const [checkPassword, setCheckPassword] = useState(false)
  const [checkConfirmPassword, setCheckConfirmPassword] = useState(false)
  const dispatch = useDispatch()

  const userDetails = useSelector((state) => state.userDetails)
  const { loading, error, user } = userDetails

  const userDelete = useSelector((state) => state.userDelete)
  const {
    loading: deleteLoading,
    // error: deleteError,
    success: deleteSuccess,
  } = userDelete

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile)
  const { success } = userUpdateProfile

  const orderListMy = useSelector((state) => state.orderListMy)
  const { loading: loadingOrders, error: errorOrders, orders } = orderListMy

  const [deleleteModal, setDeleteModal] = useState(false)

  useEffect(() => {
    dispatch(listMyOrders())
  }, [dispatch])

  useEffect(() => {
    // console.log()
    if (deleteSuccess) {
      setTimeout(() => {
        dispatch(logout())
      }, 2000)
    }
    if (!userInfo) {
      history.push('/login')
    } else {
      if (!userInfo || !userInfo.firstName || success) {
        dispatch({ type: USER_UPDATE_PROFILE_RESET })
        dispatch(getUserDetails('profile'))
      } else {
        setFirstName(userInfo.firstName)
        setMiddleName(userInfo.middleName)
        setLastName(userInfo.lastName)
        setPhone(userInfo.phone)
        setEmail(userInfo.email)
      }
    }
  }, [dispatch, deleteSuccess, history, userInfo, success, orders])

  // dispatch, history, userInfo, user, success

  const submitHandler = (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      setMessage('Passwords do not match')
    } else {
      password !== ''
        ? dispatch(
            updateUserProfile({
              id: user._id,
              firstName,
              middleName,
              lastName,
              phone,
              email,
              password,
            })
          )
        : dispatch(
            updateUserProfile({
              id: user._id,
              firstName,
              middleName,
              lastName,
              phone,
              email,
            })
          )
    }
  }

  const deleteAccount = (e) => {
    console.log('click')
    dispatch(deleteUser(userInfo._id))
  }

  return (
    <>
      <Row>
        <Col md={3}>
          <h2>User Profile</h2>
          {message && <Message variant='danger'>{message}</Message>}
          {}
          {success && <Message variant='success'>Profile Updated</Message>}
          {loading ? (
            <Loader />
          ) : error ? (
            <Message variant='danger'>{error}</Message>
          ) : (
            <Form onSubmit={submitHandler}>
              <Form.Group>
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type='Fisrtname'
                  placeholder='Enter First Name'
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group>
                <Form.Label>Middle Name</Form.Label>
                <Form.Control
                  type='MiddleName'
                  placeholder='Enter Middle Name'
                  value={middleName}
                  onChange={(e) => setMiddleName(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group>
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type='Lastname'
                  placeholder='Enter Last Name'
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group>
                <Form.Label>phone</Form.Label>
                <Form.Control
                  type='tel'
                  pattern='^(09|\+639)\d{9}$'
                  placeholder='E.g 09123456789'
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group>
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                  type='email'
                  placeholder='Enter email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId='password'>
                <Form.Label>Password</Form.Label>
                <div style={{ position: 'relative' }}>
                  <Form.Control
                    type={checkPassword ? 'text' : 'password'}
                    placeholder='Enter password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  ></Form.Control>
                  <Button
                    variant='link'
                    onClick={(e) => {
                      e.preventDefault()
                      setCheckPassword(!checkPassword)
                    }}
                    style={{
                      position: 'absolute',
                      right: '20px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                    }}
                  >
                    <i
                      className={`fas fa-eye${!checkPassword ? '-slash' : ''}`}
                    ></i>
                  </Button>
                </div>
              </Form.Group>

              <Form.Group controlId='confirmPassword'>
                <Form.Label>Confirm Password</Form.Label>
                <div style={{ position: 'relative' }}>
                  <Form.Control
                    type={checkConfirmPassword ? 'text' : 'password'}
                    placeholder='Confirm password'
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  ></Form.Control>
                  <Button
                    variant='link'
                    onClick={(e) => {
                      e.preventDefault()
                      setCheckConfirmPassword(!checkConfirmPassword)
                    }}
                    style={{
                      position: 'absolute',
                      right: '20px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                    }}
                  >
                    <i
                      className={`fas fa-eye${
                        !checkConfirmPassword ? '-slash' : ''
                      }`}
                    ></i>
                  </Button>
                </div>
              </Form.Group>
              <Button
                type='button'
                variant='primary'
                onClick={(e) => setDeleteModal(true)}
                size='sm'
                style={{ marginRight: '10px' }}
              >
                Delete Account
              </Button>
              <Button type='submit' variant='primary' size='sm'>
                Update
              </Button>
            </Form>
          )}
        </Col>
        <Col md={9} className='profile__orders'>
          <h2>My Orders</h2>
          {loadingOrders ? (
            <Loader />
          ) : errorOrders ? (
            <Message variant='danger'>{errorOrders}</Message>
          ) : (
            <Table striped bordered hover responsive className='table-sm'>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>DATE</th>
                  <th>PURCHASED</th>
                  <th>TOTAL</th>
                  <th>PAID</th>
                  <th>DELIVERED</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order._id}>
                    <td>{order._id}</td>
                    <td>
                      {moment(order.createdAt).format('MM-DD-YYYY h:mmA')}
                    </td>
                    <td>
                      {`${order.orderItems.reduce(
                        (acc, item) => acc + item.qty,
                        0
                      )} item${
                        order.orderItems.reduce(
                          (acc, item) => acc + item.qty,
                          0
                        ) > 1
                          ? 's'
                          : ''
                      }`}
                    </td>
                    <td>
                      {' '}
                      <span className='currency'>{order.totalPrice}</span>
                    </td>
                    <td>
                      {order.isPaid ? (
                        order.paidAt.substring(0, 10)
                      ) : (
                        <i
                          className='fas fa-times'
                          style={{ color: 'red' }}
                        ></i>
                      )}
                    </td>
                    <td>
                      {order.isDelivered ? (
                        order.deliveredAt.substring(0, 10)
                      ) : (
                        <i
                          className='fas fa-times'
                          style={{ color: 'red' }}
                        ></i>
                      )}
                    </td>
                    <td>
                      <LinkContainer to={`/order/${order._id}`}>
                        <Button className='btn-sm' variant='light'>
                          Details
                        </Button>
                      </LinkContainer>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Col>
        {/* Delete Modal START*/}
        <Modal
          //   {...props}
          show={deleleteModal}
          size={'md'}
          aria-labelledby='contained-modal-title-vcenter'
          centered
          onHide={() => setDeleteModal(false)}
        >
          <Modal.Header closeButton={true}>
            <Modal.Title id='contained-modal-title-vcenter'>
              <i className='fas fa-trash'></i> Deleting your dabestdeal account
              ?
            </Modal.Title>
          </Modal.Header>
          <Modal.Body style={{ textAlign: 'center' }}>
            {deleteLoading ? (
              <Spinner animation='grow' style={{ color: '#258085' }} />
            ) : deleteSuccess ? (
              <Message variant='success'>Account Deleted!</Message>
            ) : (
              <>
                {' '}
                <Message>
                  This is permanent. When you delete your account, you won't be
                  able to access your previous orders or view your transactions.
                </Message>
                <Form.Text>
                  <strong>
                    Note: Orders sent for delivery will still be delivered.
                  </strong>
                </Form.Text>
              </>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant='primary'
              onClick={() => setDeleteModal(false)}
              size='sm'
            >
              Cancel
            </Button>
            <Button variant='primary' size='sm' onClick={deleteAccount}>
              Continue to Account Deletion
            </Button>
          </Modal.Footer>
        </Modal>
        {/* Delete Modal END */}
      </Row>
    </>
  )
}

export default ProfileScreen
