import React, { useState, useEffect, lazy, Suspense } from 'react'
import { Form, Button, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import Message from '../components/Message'
import CheckoutSteps from '../components/CheckoutSteps'
import { savePaymentMethod } from '../actions/cartActions'

const Messenger = lazy(() => import('../components/Messenger'))

const PaymentScreen = ({ history }) => {
  const cart = useSelector((state) => state.cart)
  const { shippingAddress } = cart

  if (!shippingAddress) {
    history.push('/shipping')
  }

  const [paymentMethod, setPaymentMethod] = useState(
    cart.paymentMethod ? cart.paymentMethod : ''
  )

  const [error, setError] = useState(false)

  const dispatch = useDispatch()

  const submitHandler = (e) => {
    e.preventDefault()
    if (paymentMethod === '' || Object.keys(paymentMethod).length === 0) {
      setError(true)
    } else {
      dispatch(savePaymentMethod(paymentMethod))
      history.push('/placeorder')
    }
  }

  useEffect(() => {})

  return (
    <>
      <Suspense fallback={null}>
        <Messenger />
      </Suspense>
      <FormContainer>
        <CheckoutSteps step1 step2 step3 />
        <h1>Payment Method</h1>
        <Form onSubmit={submitHandler}>
          <Form.Group>
            <Form.Label as='legend'>Select Method</Form.Label>
            <Col>
              <Form.Check
                type='radio'
                label='PayPal or Credit Card'
                id='PayPal'
                name='paymentMethod'
                value='PayPal'
                checked={paymentMethod === 'PayPal'}
                onChange={(e) => setPaymentMethod(e.target.value)}
              ></Form.Check>
              <Form.Check
                type='radio'
                label='Cash on Delivery'
                id='COD'
                name='paymentMethod'
                value='Cash on Delivery'
                checked={paymentMethod === 'Cash on Delivery'}
                onChange={(e) => setPaymentMethod(e.target.value)}
              ></Form.Check>
            </Col>
          </Form.Group>
          {error && (
            <Message variant='danger'>Please Select Payment Method</Message>
          )}
          <Button type='submit' variant='primary'>
            Continue
          </Button>
        </Form>
      </FormContainer>
    </>
  )
}

export default PaymentScreen
