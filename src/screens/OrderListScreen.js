import React, { useEffect, useState, useRef } from 'react'
import moment from 'moment'
import { LinkContainer } from 'react-router-bootstrap'
import {
  Table,
  Button,
  Row,
  Col,
  Dropdown,
  Form,
  Card,
  Spinner,
  ListGroup,
  Image,
  InputGroup,
} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import CenteredModal from '../components/CenteredModal'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'
import Loader from '../components/Loader'
import Fade from 'react-bootstrap/Fade'
import { listOrders, createOrder } from '../actions/orderActions'
import { listProducts } from '../actions/productActions'
import { MODAL_OPEN } from '../constants/appConstants'
import { PRODUCT_LIST_RESET } from '../constants/productConstants'

const OrderListScreen = ({ history }) => {
  const dispatch = useDispatch()

  const orderList = useSelector((state) => state.orderList)
  const { loading, error, orders } = orderList

  const productList = useSelector((state) => state.productList)
  const { products, loading: searchLoading } = productList

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const orderCreate = useSelector((state) => state.orderCreate)
  const {
    order,
    success: orderCreateSuccess,
    error: orderCreateError,
  } = orderCreate

  /*** ORDER FORM ***/
  const searchInput = useRef(null)
  const buttonRef = useRef(null)

  const [searchResult, setSearchResult] = useState([])
  const [orderItems, setOrderItems] = useState([])
  const [isEmptyOrder, setIsemptyOrder] = useState()
  const [firstName, setFirstName] = useState('')
  const [middleName, setMiddleName] = useState('')
  const [lastName, setLastName] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const [city, setCity] = useState('')
  const [email, setEmail] = useState('')
  const [postalCode, setPostalCode] = useState('')
  const [country, setCountry] = useState('philippines')
  const [landMark, setLandMark] = useState()
  const [orderRemarks, setOrderRemarks] = useState()
  const [paymentMethod, setPaymentMethod] = useState()
  const [shippingPrice, setShippingPrice] = useState(0)
  const [discount, setDiscount] = useState('')
  const [discountError, setDiscountError] = useState(false)
  const [totalPrice, setTotalPrice] = useState(0)
  const orderItemsTotalPrice = Math.round(
    orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  ).toFixed(2)
  /*** ORDER FORM ***/

  useEffect(() => {
    const maxDiscount = 20 //%

    setSearchResult(products)

    if (orderItems.length > 0) {
      setIsemptyOrder(false)
    }

    if (discount > maxDiscount) {
      setDiscountError(true)
      setTotalPrice(orderItemsTotalPrice) //set to original Price
    } else {
      setTotalPrice(
        Math.round(
          orderItemsTotalPrice -
            Math.round(orderItemsTotalPrice) * (discount / 100)
        )
      )

      setDiscountError(false)
    }
    console.log(paymentMethod)
  }, [
    paymentMethod,
    setIsemptyOrder,
    orderItemsTotalPrice,
    discount,
    orderItems,
    searchResult,
    setSearchResult,
    products,
  ])

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listOrders())
    } else {
      history.push('/login')
    }
  }, [dispatch, history, userInfo])

  const addOrderHandler = () => {
    dispatch({ type: MODAL_OPEN })
  }

  const searchInputHandler = (e) => {
    if (e.key === 'Enter') {
      buttonRef.current.click()
    }
    if (e.key === 'Backspace') {
      dispatch({ type: PRODUCT_LIST_RESET })
    }
  }
  const searchHandler = (e) => {
    if (searchInput.current.value === 'all') {
      return dispatch(listProducts())
    }
    if (searchInput.current.value === '') {
      return dispatch(listProducts('none'))
    }
    dispatch(listProducts(searchInput.current.value))
    setSearchResult(products)
  }

  const searchResultClick = (id) => {
    const orderItemExist = orderItems.find((item) => item.product === id)

    if (!orderItemExist) {
      const {
        name,
        images,
        price,
        _id: product,
        countInStock,
      } = searchResult.find((product) => product._id === id)

      setOrderItems(
        orderItems.concat({
          product,
          name,
          image: images.length ? images[0].url : '',
          price,
          countInStock,
          qty: 1,
          newItem: true,
        })
      )
    }

    dispatch({ type: PRODUCT_LIST_RESET })
  }

  const removeOrderItemHandler = (id) => {
    setOrderItems(orderItems.filter((item) => item.product !== id))
  }

  const orderFormSubmitHandler = (e) => {
    e.preventDefault()
    if (orderItems.length === 0) {
      setIsemptyOrder(true)
    }
    // dispatch(
    //   createOrder({
    //     salesPerson: userInfo._id,
    //     orderItems,
    //     firstName,
    //     middleName,
    //     lastName,
    //     phone,
    //     email,
    //     shippingAddress: { address, city, postalCode, country, landMark },
    //     paymentMethod,
    //     shippingPrice,
    //     totalPrice,
    //     orderStatus: 'pending',
    //     orderFrom: 'facebook',
    //   })
    // )
    console.log({
      salesPerson: userInfo._id,
      orderItems,
      firstName,
      middleName,
      lastName,
      phone,
      email,
      shippingAddress: { address, city, postalCode, country, landMark },
      paymentMethod,
      shippingPrice,
      totalPrice,
      discount,
      orderStatus: 'pending',
      orderFrom: 'facebook',
      orderRemarks,
    })
  }

  return (
    <>
      <CenteredModal closeButton={true} size='xl' title='ORDER FORM'>
        <Form onSubmit={orderFormSubmitHandler}>
          <Form.Group>
            <Form.Label>Customer Name</Form.Label>
            <Form.Row>
              <Col xs={12} lg={4}>
                {' '}
                <Form.Control
                  type='text'
                  placeholder='First Name *'
                  required
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </Col>
              <Col xs={12} lg={4}>
                {' '}
                <Form.Control
                  type='text'
                  placeholder='Middle Name(Optional)'
                  value={middleName}
                  onChange={(e) => setMiddleName(e.target.value)}
                />
              </Col>
              <Col xs={12} lg={4}>
                {' '}
                <Form.Control
                  type='text'
                  placeholder='Last Name *'
                  required
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </Col>
            </Form.Row>
          </Form.Group>
          <Form.Group>
            <Form.Label>Contact Info</Form.Label>
            <Form.Row>
              <Col xs={12} lg={4}>
                {' '}
                <Form.Control
                  type='tel'
                  pattern='^(09|\+639)\d{9}$'
                  placeholder='Phone'
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </Col>

              <Col xs={12} lg={4}>
                {' '}
                <Form.Control
                  type='text'
                  placeholder='Email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Col>
            </Form.Row>
          </Form.Group>
          <Form.Group controlId='formGridAddress1'>
            <Form.Label>Address *</Form.Label>
            <Form.Control
              required
              placeholder='1234 Main St'
              required
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </Form.Group>
          <Form.Row>
            <Form.Group as={Col} controlId='formGridCity'>
              <Form.Label>City *</Form.Label>
              <Form.Control
                required
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </Form.Group>

            <Form.Group as={Col} controlId='formGridZip'>
              <Form.Label>Zip (Postal Code)</Form.Label>
              <Form.Control
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
              />
            </Form.Group>
          </Form.Row>
          <Form.Group>
            <Form.Label>LandMark *</Form.Label>
            <Form.Control
              as='textarea'
              required
              placeholder='(Enter Nearest LandMark) eg: Infront of SM south Mall'
              value={landMark}
              onChange={(e) => setLandMark(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>Remarks</Form.Label>
            <Form.Control
              as='textarea'
              required
              placeholder=''
              value={orderRemarks}
              onChange={(e) => setOrderRemarks(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group>
            <Form.Label>Select Method</Form.Label>
            <Col>
              <Form.Check
                type='radio'
                label='Cash on Delivery'
                id='COD'
                name='paymentMethod'
                value='Cash on Delivery'
                checked={true}
                onChange={(e) => setPaymentMethod(e.target.value)}
              ></Form.Check>
              <Form.Check
                type='radio'
                label='PayPal or Credit Card'
                id='PayPal'
                name='paymentMethod'
                value='PayPal'
                onChange={(e) => setPaymentMethod(e.target.value)}
              ></Form.Check>
            </Col>
          </Form.Group>
          {/* ----------------------------------------------------------------------------------------- */}
          <h6>ORDER ITEMS * </h6>
          <Card>
            <Card.Body>
              <Form.Group>
                <div className='order-search-btn'>
                  {' '}
                  <Form.Control
                    placeholder='Product Search'
                    ref={searchInput}
                    onKeyDown={searchInputHandler}
                    // onChange={searchHandler}
                  />
                  {searchLoading ? (
                    <Spinner animation='border' className='search-spinner' />
                  ) : (
                    <Button ref={buttonRef} onClick={searchHandler}>
                      <i className='fas fa-search'></i>
                    </Button>
                  )}
                  <div className='search-suggestion'>
                    <ListGroup>
                      {searchResult.length ? (
                        searchResult.length == 0 ? (
                          <ListGroup.Item>'No Result'</ListGroup.Item>
                        ) : (
                          searchResult.map((product) => (
                            <ListGroup.Item
                              key={product._id}
                              onClick={() => searchResultClick(product._id)}
                              className='result-item'
                            >
                              <Row>
                                <Col xs={1}>
                                  <Image
                                    src={
                                      product.images.length &&
                                      product.images[0].url
                                    }
                                    fluid
                                    rounded
                                  />
                                </Col>
                                <Col>
                                  <p>{product.name}</p>
                                </Col>
                              </Row>
                            </ListGroup.Item>
                          ))
                        )
                      ) : (
                        ''
                      )}
                    </ListGroup>
                  </div>
                  {/* ----------------------------------------------------------------------------------------- */}
                </div>
              </Form.Group>
              {/* <div className='search-result'></div> */}
              {orderItems.length ? (
                <Card>
                  <Card.Body>
                    <ListGroup variant='flush'>
                      {orderItems.map((item) => (
                        <Fade
                          in={item.newItem}
                          appear={item.newItem}
                          key={item.product}
                        >
                          <ListGroup.Item
                            style={{ padding: '10px' }}
                            key={item.product}
                            className='order-item'
                          >
                            <Row style={{ alignItems: 'center' }}>
                              <Col md={1}>
                                <Image
                                  src={item.image}
                                  alt={item.name}
                                  fluid
                                  rounded
                                />
                              </Col>
                              <Col md={6}>{item.name}</Col>
                              <Col md={4} className='order-item__qty'>
                                <span className='currency'>
                                  {item.price.toFixed(2)}
                                </span>
                                {' x '}
                                {item.countInStock > 0 ? (
                                  <Form.Control
                                    as='select'
                                    value={item.qty}
                                    style={{ padding: '0px' }}
                                    onChange={(e) => {
                                      setDiscount('')
                                      setOrderItems(
                                        orderItems.map((orderItem) =>
                                          orderItem.product === item.product
                                            ? {
                                                ...orderItem,
                                                qty: Number(e.target.value),
                                              }
                                            : {
                                                ...orderItem,
                                              }
                                        )
                                      )
                                    }}
                                  >
                                    {[...Array(item.countInStock).keys()].map(
                                      (x) => (
                                        <option key={x + 1} value={x + 1}>
                                          {x + 1}
                                        </option>
                                      )
                                    )}
                                  </Form.Control>
                                ) : (
                                  'Out of Stock'
                                )}
                                <div className='orderSubTotal'>
                                  {` = `}
                                  <span className='currency'>
                                    {(item.price * item.qty).toFixed(2)}
                                  </span>
                                </div>
                              </Col>

                              <Col md={1}>
                                <Button
                                  type='button'
                                  variant='light'
                                  onClick={() =>
                                    removeOrderItemHandler(item.product)
                                  }
                                >
                                  <i className='fas fa-trash'></i>
                                </Button>
                              </Col>
                            </Row>
                          </ListGroup.Item>
                        </Fade>
                      ))}
                    </ListGroup>
                  </Card.Body>
                </Card>
              ) : (
                <Card>
                  <Card.Body>
                    {' '}
                    {isEmptyOrder ? (
                      <span style={{ color: 'red' }}>
                        Empty Order (required)
                      </span>
                    ) : (
                      'No Item Selected'
                    )}
                  </Card.Body>
                </Card>
              )}

              <Row>
                <Col
                  md={{ span: 2, offset: 10 }}
                  style={{
                    textAlign: 'right',
                    fontWeight: 700,
                  }}
                >
                  <Form.Control
                    type='text'
                    // placeholder='Discount %'
                    value={discount}
                    disabled={
                      orderItems.reduce((acc, item) => acc + item.qty, 0) > 1 &&
                      totalPrice >= 1500
                        ? false
                        : true
                    }
                    style={{
                      textAlign: 'right',
                      fontWeight: 700,
                      marginTop: '20px',
                      border: discountError
                        ? '1px solid red'
                        : '0px solid #ced4da',
                    }}
                    onChange={(e) => {
                      if (!isNaN(e.target.value)) {
                        setDiscount(Number(e.target.value))
                      }
                    }}
                  ></Form.Control>

                  {discountError ? (
                    <Form.Text style={{ color: 'red' }}>
                      Invalid Discount Max of (20%)
                    </Form.Text>
                  ) : (
                    <Form.Text className='text-muted'>
                      Discount may apply if 2 items purchased and Minimun spent
                      of <span className='currency'>1500</span>
                    </Form.Text>
                  )}
                </Col>
              </Row>
              <Row>
                <Col
                  md={{ span: 2, offset: 10 }}
                  style={{
                    textAlign: 'right',
                    fontWeight: 700,
                    marginTop: '20px',
                  }}
                >
                  Order Total:{' '}
                  {discount > 0 ? (
                    <>
                      <span className='currency strike'>
                        {orderItemsTotalPrice}
                      </span>{' '}
                      <span className='currency new'>
                        {totalPrice.toFixed(2)}
                      </span>
                      <Form.Text className='text-muted'>
                        {discount}% off
                      </Form.Text>
                    </>
                  ) : (
                    <>
                      <span className='currency'>{totalPrice.toFixed(2)}</span>
                    </>
                  )}
                </Col>
              </Row>
            </Card.Body>
          </Card>
          <Button
            type='submit'
            variant='primary'
            className='my-2'
            size='sm'
            onKeyDown={(e) => e.key}
          >
            <i className='fas fa-cart-arrow-down'></i> Save Order
          </Button>
        </Form>
      </CenteredModal>
      <Row className='align-items-center'>
        <Col>
          <h1>Orders</h1>
        </Col>
        <Col className='text-right'>
          <Button className='my-2' size='sm' onClick={addOrderHandler}>
            <i className='fas fa-plus'></i> Add Order
          </Button>
        </Col>
      </Row>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Table
          striped
          bordered
          hover
          responsive
          className='table-sm order-table'
        >
          <thead>
            <tr>
              <th>ID</th>
              <th>CUSTOMER NAME</th>
              <th>PHONE</th>
              <th>STATUS</th>
              <th>DATE</th>
              <th>TOTAL</th>
              {/* <th>PAID</th>
              <th>DELIVERED</th> */}
              <th></th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id} className='order__wrapper'>
                <td>{order._id}</td>
                <td>{`${order.firstName} ${order.lastName}`}</td>
                <td>{order.phone}</td>
                <td>
                  <span
                    className={`status ${
                      order.orderStatus && order.orderStatus.replace(/\s/g, '-')
                    }`}
                  >
                    {order.orderStatus ? order.orderStatus : 'no status'}
                  </span>
                </td>
                <td>{moment(order.createdAt).format('MM-DD-YYYY h:mmA')}</td>
                <td>
                  <span className='currency'>{order.totalPrice}</span>
                </td>
                {/* <td>
                  {order.isPaid ? (
                    order.paidAt.substring(0, 10)
                  ) : (
                    <i className='fas fa-times' style={{ color: 'red' }}></i>
                  )}
                </td> */}
                {/* <td>
                  {order.isDelivered ? (
                    order.deliveredAt.substring(0, 10)
                  ) : (
                    <i className='fas fa-times' style={{ color: 'red' }}></i>
                  )}
                </td> */}
                <td>
                  <div className='actions__wrapper'>
                    <div className='quick-btn-wrap'>
                      <OverlayTrigger
                        overlay={
                          <Tooltip id='tooltip-disabled'>View Order</Tooltip>
                        }
                      >
                        <LinkContainer to={`/order/${order._id}`}>
                          <Button variant='link' size='sm'>
                            <i className='fa fa-eye' aria-hidden='true'></i>
                          </Button>
                        </LinkContainer>
                      </OverlayTrigger>
                    </div>

                    <Dropdown>
                      <Dropdown.Toggle id='dropdown-basic'>
                        <i className='fas fa-ellipsis-h'></i>
                      </Dropdown.Toggle>

                      <Dropdown.Menu>
                        <Dropdown.Item href='#/action-2'>
                          <i className='far fa-eye'></i> Order Details
                        </Dropdown.Item>
                        <Dropdown.Item href='#/action-3'>
                          <i className='fas fa-truck'></i> Mark As Delivered
                        </Dropdown.Item>
                        <Dropdown.Item href='#/action-3'>
                          <i className='fas fa-times'></i> Cancel Order
                        </Dropdown.Item>
                        <Dropdown.Item href='#/action-3'>
                          <i className='fas fa-trash'></i> Remove Order
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>

                    {/* <Button variant='link' size='sm' className='ellipse'>
                      <i className='fas fa-ellipsis-h'></i>
                    </Button> */}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  )
}

export default OrderListScreen
