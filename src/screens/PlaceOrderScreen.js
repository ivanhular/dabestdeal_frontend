import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import CheckoutSteps from '../components/CheckoutSteps'
import { createOrder, listMyOrders } from '../actions/orderActions'
import { ORDER_CREATE_RESET } from '../constants/orderConstants'
import freeShipping from '../assets/free.png'

const PlaceOrderScreen = ({ history }) => {
  const dispatch = useDispatch()

  const { userInfo } = useSelector((state) => state.userLogin)
  const cart = useSelector((state) => state.cart)

  //   Calculate prices
  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2)
  }

  cart.itemsPrice = addDecimals(
    cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  )
  cart.shippingPrice = addDecimals(cart.itemsPrice > 100 ? 0 : 100)
  cart.taxPrice = addDecimals(Number((0.15 * cart.itemsPrice).toFixed(2)))
  cart.totalPrice = Number(cart.itemsPrice).toFixed(2)

  // cart.totalPrice = (
  //   Number(cart.itemsPrice) +
  //   Number(cart.shippingPrice) +
  //   Number(cart.taxPrice)
  // ).toFixed(2)

  const orderCreate = useSelector((state) => state.orderCreate)
  const { order, success, error } = orderCreate

  useEffect(() => {
    if (success) {
      history.push(`/order/${order._id}`)
      dispatch({ type: ORDER_CREATE_RESET })
    }
    // eslint-disable-next-line
  }, [history, success])

  const placeOrderHandler = () => {
    dispatch(
      createOrder({
        user: userInfo._id,
        orderItems: cart.cartItems,
        firstName: userInfo.firstName,
        middleName: userInfo.middleName,
        lastName: userInfo.lastName,
        phone: userInfo.phone,
        email: userInfo.email,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod.toLowerCase(),
        shippingPrice: cart.shippingPrice,
        totalPrice: cart.totalPrice,
        orderStatus: 'pending',
        orderFrom: 'website',
      })
    )

    dispatch(listMyOrders())

    // console.log({
    //   orderItems: cart.cartItems,
    //   firstName: userInfo.firstName,
    //   middleName: userInfo.middleName,
    //   lastName: userInfo.lastName,
    //   phone: userInfo.phone,
    //   shippingAddress: cart.shippingAddress,
    //   paymentMethod: cart.paymentMethod,
    //   shippingPrice: cart.shippingPrice,
    //   totalPrice: cart.totalPrice,
    //   orderStatus: 'pending',
    //   orderFrom: 'website',
    // })
  }

  return (
    <>
      <CheckoutSteps step1 step2 step3 step4 />
      <Row>
        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Address:</strong>
                {cart.shippingAddress.address}, {cart.shippingAddress.city}{' '}
                {cart.shippingAddress.postalCode},{' '}
                {cart.shippingAddress.country}
              </p>
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Payment Method</h2>
              <strong>Method: </strong>
              {cart.paymentMethod}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order Items</h2>
              {cart.cartItems.length === 0 ? (
                <Message>Your cart is empty</Message>
              ) : (
                <ListGroup variant='flush'>
                  {cart.cartItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col xs={3} md={1}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col xs={5}>
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </Col>
                        <Col xs={4} md={4}>
                          {item.qty} x <span>&#8369;</span>
                          {item.price} = <span>&#8369;</span>
                          {(item.qty * item.price).toFixed(2)}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>
                    <span>&#8369;</span>
                    {cart.itemsPrice}
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>
                    <Image src={freeShipping} style={{ maxWidth: '50px' }} />
                    {/* {cart.shippingPrice}
                    {cart.shippingPrice > 0 && <span>&#8369;</span>}
                    {cart.shippingPrice === 0.0 && 'Free'} */}
                  </Col>
                </Row>
              </ListGroup.Item>
              {/* <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>
                    <span>&#8369;</span>
                    {cart.taxPrice}
                  </Col>
                </Row>
              </ListGroup.Item> */}
              <ListGroup.Item>
                <Row>
                  <Col>
                    <strong>Total</strong>
                  </Col>
                  <Col>
                    <span>&#8369;</span>
                    {cart.totalPrice}
                  </Col>
                </Row>
              </ListGroup.Item>
              {error && (
                <ListGroup.Item>
                  <Message variant='danger'>{error}</Message>
                </ListGroup.Item>
              )}

              <ListGroup.Item>
                <Button
                  type='button'
                  className='btn-block'
                  disabled={cart.cartItems === 0}
                  onClick={placeOrderHandler}
                >
                  Place Order
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default PlaceOrderScreen
