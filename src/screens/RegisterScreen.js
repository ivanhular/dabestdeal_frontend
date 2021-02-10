import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import ReactPixel from 'react-facebook-pixel'
import ReactGA from 'react-ga'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { register } from '../actions/userActions'

const RegisterScreen = ({ location, history }) => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [middleName, setMiddleName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState(null)
  const [checkPassword, setCheckPassword] = useState(false)
  const [checkConfirmPassword, setCheckConfirmPassword] = useState(false)
  const dispatch = useDispatch()

  const userRegister = useSelector((state) => state.userRegister)
  const { loading, error, userInfo } = userRegister

  const redirect = location.search ? location.search.split('=')[1] : '/'

  useEffect(() => {
    if (userInfo) {
      history.push(redirect)
    }
  }, [history, userInfo, redirect])

  const submitHandler = (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      setMessage('Passwords do not match')
    } else {
      setMessage('')
      dispatch(
        register({ firstName, middleName, lastName, phone, email, password })
      )
      ReactPixel.track('CompleteRegistration', {
        content_name: 'register',
        status: true,
      })
      ReactPixel.track('Lead', {
        content_name: 'login',
      })

      ReactGA.event({
        category: 'register',
        action: 'click',
        label: 'user registration',
      })
    }
  }

  return (
    <FormContainer>
      <h1>Sign Up</h1>
      {message && <Message variant='danger'>{message}</Message>}
      {error && <Message variant='danger'>{error}</Message>}
      {loading && <Loader />}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='first'>
          <Form.Label>First Name</Form.Label>
          <Form.Control
            type='firstname'
            placeholder='Enter First name(required)'
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId='first'>
          <Form.Label>Middle Name</Form.Label>
          <Form.Control
            type='middlename'
            placeholder='Enter Middle name'
            value={middleName}
            onChange={(e) => setMiddleName(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId='lastname'>
          <Form.Label>Last Name(required)</Form.Label>
          <Form.Control
            type='lastname'
            placeholder='Enter Last name'
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='email'>
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type='email'
            placeholder='Enter email(required)'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='phone'>
          <Form.Label>Phone Number</Form.Label>
          <Form.Control
            type='tel'
            pattern='^(09|\+639)\d{9}$'
            placeholder='Enter Phone e.g 09123456789 (required)'
            value={phone}
            required
            onChange={(e) => setPhone(e.target.value)}
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
              required
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
              <i className={`fas fa-eye${!checkPassword ? '-slash' : ''}`}></i>
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
              required
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
                className={`fas fa-eye${!checkConfirmPassword ? '-slash' : ''}`}
              ></i>
            </Button>
          </div>
        </Form.Group>

        <Button type='submit' variant='primary'>
          Register
        </Button>
      </Form>

      <Row className='py-3'>
        <Col>
          Have an Account?{' '}
          <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>
            Login
          </Link>
        </Col>
      </Row>
    </FormContainer>
  )
}

export default RegisterScreen
