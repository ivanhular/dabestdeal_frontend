import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Form, Button, Row, Col } from 'react-bootstrap'
import FacebookLogin from 'react-facebook-login'
import Message from '../components/Message'
import Loader from '../components/Loader'
import CenteredModal from '../components/CenteredModal'
import FormContainer from '../components/FormContainer'
import { login, register, isRegistered } from '../actions/userActions'
import { MODAL_OPEN } from '../constants/appConstants'

const LoginScreen = ({ location, history }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [phone, setPhone] = useState('')

  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { loading, error, userInfo } = userLogin

  const userCheck = useSelector((state) => state.userCheck)
  const { userExist, isFacebookButtonClicked } = userCheck

  const redirect = location.search ? location.search.split('=')[1] : '/'

  const extractName = (fullname) => {
    const names = fullname.split(' ')
    return {
      firstName: names.filter((name, i) => i !== names.length - 1).join(' '),
      lastName: names[names.length - 1],
    }
  }

  // const [isLogin, setLogin] = useState(false)
  const [data, setData] = useState({})

  // const [picture, setPicture] = useState('')

  const responseFacebook = (response) => {
    // console.log(response)
    if (response.accessToken) {
      // setPicture(response.picture.data.url)
      // setLogin(true)
      dispatch(isRegistered(response.email))
      setData({ ...response, ...extractName(response.name) })
      console.log(userCheck)
    }
  }

  useEffect(() => {
    if (userInfo) {
      history.push(redirect)
    }
    if (isFacebookButtonClicked) {
      if (userExist) {
        dispatch(login(data.email))
      } else {
        // console.log(data)
        dispatch({ type: MODAL_OPEN })
      }
    }
  }, [
    dispatch,
    data,
    userExist,
    // firstName,
    // lastName,
    // email,
    // id,
    isFacebookButtonClicked,
    // login,
    // register,
    history,
    userInfo,
    redirect,
  ])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(login(email, password))
  }
  const onSubmitFacebookLogin = (e) => {
    e.preventDefault()
    const { firstName, lastName, email, id: facebookID } = data
    dispatch(
      register({
        firstName,
        lastName,
        phone,
        email,
        isFbAutheticated: true,
        facebookID,
      })
    )
    // console.log({
    //   firstName,
    //   lastName,
    //   phone,
    //   email,
    //   isFbAutheticated: true,
    //   facebookID,
    // })
  }
  return (
    <>
      <CenteredModal
        size='md'
        title='Enter Your Phone Number'
        showClose={false}
      >
        <Form onSubmit={onSubmitFacebookLogin}>
          <Form.Group controlId='formPhone'>
            {/* <Form.Label>Phone Number</Form.Label> */}
            <Form.Control
              type='tel'
              pattern='^(09|\+639)\d{9}$'
              placeholder='E.g 09123456789'
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </Form.Group>
          <Button variant='primary' type='submit'>
            Submit
          </Button>
        </Form>
      </CenteredModal>
      <FormContainer>
        <h1>Sign In</h1>
        {error && <Message variant='danger'>{error}</Message>}
        {loading && <Loader />}
        <Form onSubmit={submitHandler}>
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

          <Button type='submit' variant='primary' size='md' block>
            Sign In
          </Button>
          <div className='separator'>or</div>
          <FacebookLogin
            appId='1068718970238644'
            // autoLoad={true}
            fields='name,email,picture'
            scope='public_profile,email'
            callback={responseFacebook}
            icon='fa-facebook'
          />
        </Form>

        <Row className='py-3'>
          <Col>
            New Customer?{' '}
            <Link
              to={redirect ? `/register?redirect=${redirect}` : '/register'}
            >
              Register
            </Link>
          </Col>
        </Row>
      </FormContainer>
    </>
  )
}

export default LoginScreen
