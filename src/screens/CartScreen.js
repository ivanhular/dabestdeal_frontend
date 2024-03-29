import React, { useEffect, lazy, Suspense } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap'
import Message from '../components/Message'
import { addToCart, removeFromCart } from '../actions/cartActions'
import ReactPixel from 'react-facebook-pixel'
import ReactGA from 'react-ga'

const Messenger = lazy(() => import('../components/Messenger'))

const CartScreen = ({ match, location, history }) => {
  const productId = match.params.id

  const qty = location.search ? Number(location.search.split('=')[1]) : 1

  const dispatch = useDispatch()

  const cart = useSelector((state) => state.cart)
  const { cartItems } = cart

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty))
    }
  }, [dispatch, productId, qty])

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id))
  }

  const checkoutHandler = () => {
    ReactPixel.track('InitiateCheckout', {
      num_items: cart?.cartItems?.length,
      currency: 'PHP',
    })
    ReactGA.event({
      category: 'conversion activity',
      action: 'click',
      label: 'add to cart',
    })

    history.push('/login?redirect=shipping')
  }

  return (
    <>
      <Suspense fallback={null}>
        <Messenger />
      </Suspense>
      <Row>
        <Col md={8}>
          <h1>
            <i className='fas fa-cart-arrow-down'></i> Shopping Cart
          </h1>
          {cartItems.length === 0 ? (
            <Message>
              Your cart is empty{' '}
              <Link to='/'>
                {' '}
                <i className='fas fa-store'></i> Go Back
              </Link>
            </Message>
          ) : (
            <ListGroup variant='flush'>
              {cartItems.map((item) => (
                <ListGroup.Item key={item.product}>
                  <Row>
                    <Col xs={3} md={2}>
                      <Image src={item.image} alt={item.name} fluid rounded />
                    </Col>
                    <Col xs={9}>
                      <Row>
                        <Col xs={7} md={3}>
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </Col>
                        <Col xs={3} md={2}>
                          ₱{item?.price?.toFixed(2)}
                        </Col>
                        <Col xs={5} md={2}>
                          <Form.Control
                            as='select'
                            value={item.qty}
                            onChange={(e) =>
                              dispatch(
                                addToCart(item.product, Number(e.target.value))
                              )
                            }
                          >
                            {[...Array(item.countInStock).keys()].map((x) => (
                              <option key={x + 1} value={x + 1}>
                                {x + 1}
                              </option>
                            ))}
                          </Form.Control>
                        </Col>
                        <Col xs={2} md={2}>
                          <Button
                            type='button'
                            variant='light'
                            onClick={() => removeFromCartHandler(item.product)}
                          >
                            <i className='fas fa-trash'></i>
                          </Button>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
          {cartItems.length > 0 && (
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <Link to='/'>
                  <Button type='button' size='md'>
                    <i className='fas fa-store'></i> Continue Shopping
                  </Button>
                </Link>
              </ListGroup.Item>
            </ListGroup>
          )}
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h2>
                  Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)}
                  ) items
                </h2>
                ₱
                {cartItems
                  .reduce((acc, item) => acc + item.qty * item.price, 0)
                  .toFixed(2)}
              </ListGroup.Item>
              <ListGroup.Item>
                <Button
                  type='button'
                  className='btn-block'
                  disabled={cartItems.length === 0}
                  onClick={checkoutHandler}
                >
                  Proceed To Checkout
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default CartScreen
