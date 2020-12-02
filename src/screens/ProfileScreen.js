import React, { useState, useEffect } from 'react'
import moment from 'moment'
import { Table, Form, Button, Row, Col } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { getUserDetails, updateUserProfile } from '../actions/userActions'
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

  const dispatch = useDispatch()

  const userDetails = useSelector((state) => state.userDetails)
  const { loading, error, user } = userDetails

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile)
  const { success } = userUpdateProfile

  const orderListMy = useSelector((state) => state.orderListMy)
  const { loading: loadingOrders, error: errorOrders, orders } = orderListMy

  useEffect(() => {
    dispatch(listMyOrders())
  }, [dispatch])

  useEffect(() => {
    // console.log()
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
  }, [dispatch, history, userInfo, success, orders])

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

  return (
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
            <Form.Group controlId='name'>
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type='Fisrtname'
                placeholder='Enter First Name'
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId='middleName'>
              <Form.Label>Middle Name</Form.Label>
              <Form.Control
                type='MiddleName'
                placeholder='Enter Middle Name'
                value={middleName}
                onChange={(e) => setMiddleName(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId='name'>
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type='Lastname'
                placeholder='Enter Last Name'
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId='phone'>
              <Form.Label>phone</Form.Label>
              <Form.Control
                type='tel'
                pattern='^(09|\+639)\d{9}$'
                placeholder='E.g 09123456789'
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='email'>
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
              <Form.Control
                type='password'
                placeholder='Enter password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='confirmPassword'>
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type='password'
                placeholder='Confirm password'
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Button type='submit' variant='primary'>
              Update
            </Button>
          </Form>
        )}
      </Col>
      <Col md={9}>
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
                  <td>{moment(order.createdAt).format('MM-DD-YYYY h:mmA')}</td>
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
                      <i className='fas fa-times' style={{ color: 'red' }}></i>
                    )}
                  </td>
                  <td>
                    {order.isDelivered ? (
                      order.deliveredAt.substring(0, 10)
                    ) : (
                      <i className='fas fa-times' style={{ color: 'red' }}></i>
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
    </Row>
  )
}

export default ProfileScreen
