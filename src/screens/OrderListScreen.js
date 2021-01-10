import React, { useEffect, useState, useRef } from 'react'
import axios from 'axios'
import moment from 'moment'
import { Link } from 'react-router-dom'
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
  Modal,
  Badge,
  Toast,
} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import CenteredModal from '../components/CenteredModal'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'
import Loader from '../components/Loader'
import Fade from 'react-bootstrap/Fade'
import 'react-dates/initialize'
import { DateRangePicker } from 'react-dates'
import 'react-dates/lib/css/_datepicker.css'
import {
  listOrders,
  createOrder,
  updateOrder,
  deleteOrder,
  deliverOrder,
} from '../actions/orderActions'
import { listProducts } from '../actions/productActions'
import { MODAL_OPEN, MODAL_CLOSE } from '../constants/appConstants'
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
    // order,
    loading: orderCreateLoading,
    success: orderCreateSuccess,
    error: orderCreateError,
  } = orderCreate

  const orderUpdate = useSelector((state) => state.orderUpdate)
  const {
    order: orderUpdated,
    loading: orderUpdateLoading,
    success: orderUpdateSuccess,
    error: orderUpdateError,
  } = orderUpdate

  const orderDelete = useSelector((state) => state.orderDelete)
  const {
    loading: orderDeleteLoading,
    success: orderDeleteSuccess,
  } = orderDelete

  const orderDeliver = useSelector((state) => state.orderDeliver)
  const { loading: derliverLoading, success: deliverSuccess } = orderDeliver

  /*** ORDER FORM ***/
  const searchInput = useRef(null)
  const buttonRef = useRef(null)
  const orderSearchbuttonRef = useRef(null)

  const [searchResult, setSearchResult] = useState([])
  const [orderItems, setOrderItems] = useState([])
  const [isEmptyOrder, setIsemptyOrder] = useState()
  const [firstName, setFirstName] = useState('')
  const [middleName, setMiddleName] = useState('')
  const [lastName, setLastName] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const [city, setCity] = useState('')
  const [province, setProvince] = useState('')
  const [email, setEmail] = useState('')
  const [postalCode, setPostalCode] = useState('')
  const country = 'philippines'
  const [landMark, setLandMark] = useState()
  const [orderRemarks, setOrderRemarks] = useState()
  const [paymentMethod, setPaymentMethod] = useState()
  const [shippingPrice, setShippingPrice] = useState(0)
  const [discount, setDiscount] = useState('')
  const [discountError, setDiscountError] = useState(false)
  const [totalPrice, setTotalPrice] = useState(0)
  const orderItemsTotalPrice = Math.round(
    orderItems.reduce(
      (acc, item) =>
        item.countInStock > 0 ? acc + item.price * item.qty : acc + 0,
      0
    )
  ).toFixed(2)
  const [proofOfSale, setProofOfSale] = useState('')
  const [proofOfSaleError, setProofOfSaleError] = useState('')
  const [isEditView, setIsEditView] = useState(false)
  /*** ORDER FORM ***/

  /*** VIEW ORDER FORM ***/
  const [orderViewModal, setOrderViewModal] = useState(false)
  const [orderViewDetail, setOrderViewDetail] = useState({})
  /*** VIEW ORDER FORM ***/

  /*** NOTIFICATION ***/
  const [showNotif, setShowNotif] = useState(false)
  const [toastMessage, setToastMessage] = useState('')
  /*** NOTIFICATION ***/

  /*** COURIER INFO FORM ***/
  const [shippingModal, setShippingModal] = useState(false)
  const [courierName, setCourierName] = useState('')
  const [courierOrderNo, setCourierOrderNo] = useState('')
  const [courierTrackingNo, setCourierTrackingNo] = useState('')
  const [courierRate, setCourierRate] = useState('')
  const [processingRemarks, setProcessingRemarks] = useState('')
  const [trackingError, setTrackingError] = useState(false)
  const [trackingErrorMessage, setTrackingErrorMessage] = useState('')
  /*** COURIER INFO FORM ***/

  /*** CANCELLATION FORM ***/
  const [cancellationModal, setCancellationModal] = useState(false)
  const [cancellationRemarks, setCancellationRemarks] = useState('')

  /*** RETURNED FORM ***/
  const [returnedModal, setReturnedModal] = useState(false)
  const [returnedRemarks, setReturnedRemarks] = useState('')

  /*** DELETE FORM ***/
  const [deleteModal, setDeleteModal] = useState(false)

  /*** SEARCH ***/
  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)
  const [focusedInput, setFocusedInput] = useState(null)
  const [search, setSearch] = useState('')

  useEffect(() => {
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && e.target.nodeName === 'INPUT') {
        e.preventDefault()
        return false
      }
    })
    if (orderUpdateSuccess) {
      setOrderViewDetail({})
      setOrderViewModal(false)
      dispatch({ type: MODAL_CLOSE })
      dispatch(listOrders())
      setShowNotif(true)
    }
    if (orderDeleteSuccess) {
      setDeleteModal(false)
      setOrderViewModal(false)
      setOrderViewDetail({})
      dispatch({ type: MODAL_CLOSE })
      dispatch(listOrders())
      setShowNotif(true)
    }
    if (deliverSuccess) {
      setOrderViewModal(false)
      setOrderViewDetail({})
      dispatch({ type: MODAL_CLOSE })
      dispatch(listOrders())
      setShowNotif(true)
    }
    if (orderCreateSuccess) {
      setSearchResult([])
      setOrderItems([])
      setFirstName('')
      setMiddleName('')
      setLastName('')
      setPhone('')
      setAddress('')
      setCity('')
      setEmail('')
      setPostalCode('')
      setLandMark('')
      setOrderRemarks('')
      setPaymentMethod('')
      setShippingPrice(0)
      setDiscount('')
      setTotalPrice(0)
      dispatch({ type: MODAL_CLOSE })
      dispatch(listOrders())
      setShowNotif(true)
    }
  }, [
    deliverSuccess,
    orderDeleteSuccess,
    orderUpdateSuccess,
    orderUpdated,
    orderCreateSuccess,
    dispatch,
  ])

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
        ).toFixed(2)
      )

      setDiscountError(false)
    }
  }, [
    proofOfSale,
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
      dispatch({ type: PRODUCT_LIST_RESET })
    } else {
      history.push('/login')
    }
  }, [dispatch, history, userInfo])

  const addOrderHandler = () => {
    resetState()
    dispatch({ type: MODAL_OPEN })
  }

  const resetState = () => {
    setSearchResult([])
    setOrderItems([])
    setFirstName('')
    setMiddleName('')
    setLastName('')
    setPhone('')
    setAddress('')
    setCity('')
    setEmail('')
    setPostalCode('')
    setLandMark('')
    setOrderRemarks('')
    setPaymentMethod('')
    setShippingPrice(0)
    setDiscount('')
    setTotalPrice(0)
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

  const orderFormSubmitHandler = async (e) => {
    e.preventDefault()
    const formData = new FormData()
    // const data = {
    //   folder: 'pos',
    //   modelName: 'order',
    // }
    // formData.append('body', JSON.stringify(data))
    formData.append('folder', 'pos')
    formData.append('modelName', 'order')
    formData.append('images', proofOfSale)

    if (orderItems.length > 0 && totalPrice > 0) {
      const config = {
        withCredentials: true,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
          // Authorization: `Bearer ${userInfo.token}`,
        },
      }

      try {
        setProofOfSaleError('')
        if (!isEditView) {
          //Create order from sales
          const { data: url } = await axios.post(
            '/api/upload',
            formData,
            config
          )
          dispatch(
            createOrder({
              salesPerson: userInfo._id,
              orderItems,
              firstName,
              middleName,
              lastName,
              phone,
              email,
              shippingAddress: {
                address,
                city,
                province,
                postalCode,
                country,
                landMark,
              },
              paymentMethod,
              shippingPrice,
              totalPrice,
              discount,
              orderStatus: 'processing',
              orderFrom: 'facebook',
              orderRemarks,
              proofOfSale: url[0],
            })
          )
          setToastMessage('Order Created')
        } else {
          if (orderViewDetail.orderFrom !== 'website') {
            //update order from sales
            const { data: url } = await axios.post(
              '/api/upload',
              formData,
              config
            )
            dispatch(
              updateOrder(orderViewDetail._id, {
                salesPerson: userInfo._id,
                orderItems,
                firstName,
                middleName,
                lastName,
                phone,
                email,
                shippingAddress: {
                  address,
                  city,
                  postalCode,
                  country,
                  landMark,
                },
                paymentMethod,
                shippingPrice,
                totalPrice,
                discount,
                orderStatus: 'processing',
                orderFrom: 'facebook',
                orderRemarks,
                proofOfSale: url[0],
              })
            )
            setToastMessage('Updated Successfully')
          } else {
            //update order from website
            dispatch(
              updateOrder(orderViewDetail._id, {
                salesPerson: userInfo._id,
                orderItems,
                firstName,
                middleName,
                lastName,
                phone,
                email,
                shippingAddress: {
                  address,
                  city,
                  postalCode,
                  country,
                  landMark,
                },
                paymentMethod,
                shippingPrice,
                totalPrice,
                discount,
                orderStatus: orderViewDetail.orderStatus,
                orderFrom: orderViewDetail.orderFrom,
                orderRemarks,
              })
            )
            setToastMessage('Updated Successfully')
          }

          setIsEditView(false)
        }
      } catch (error) {
        setProofOfSaleError(
          error && error.response && error.response.data.message
        )
      }
    } else {
      setIsemptyOrder(true)
    }
  }

  const uploadProofOfSaleHandler = (e) => {
    setProofOfSale(e.target.files[0])
  }

  const orderViewHandler = (id) => {
    const selectedOrder = orders.find((order) => order._id === id)
    setOrderViewDetail(selectedOrder)
    setOrderViewModal(true)
  }

  const editOrderHandler = async (e) => {
    console.log(orderViewDetail)

    //Update countInStock in realtime
    const updatedViewDetailWithStock = await Promise.all(
      orderViewDetail.orderItems.map(async (item) => {
        const {
          data: { countInStock },
        } = await axios.get(`/api/products/${item.product}`)

        return {
          ...item,
          countInStock,
        }
      })
    )

    setSearchResult([])
    setOrderItems(updatedViewDetailWithStock)
    setFirstName(orderViewDetail.firstName)
    setMiddleName(orderViewDetail.middleName)
    setLastName(orderViewDetail.lastName)
    setPhone(orderViewDetail.phone)
    setAddress(orderViewDetail.shippingAddress.address)
    setCity(orderViewDetail.shippingAddress.city)
    setEmail(orderViewDetail.email)
    setPostalCode(orderViewDetail.shippingAddress.postalCode)
    setLandMark(orderViewDetail.shippingAddress.landMark)
    setOrderRemarks(orderViewDetail.orderRemarks)
    setPaymentMethod(orderViewDetail.paymentMethod)
    setShippingPrice(0)
    setDiscount(orderViewDetail.discount)
    setTotalPrice(orderViewDetail.totalPrice.toFixed(2))
    setIsEditView(true)
    dispatch({ type: MODAL_OPEN })
  }

  const confirmHandler = () => {
    dispatch(
      updateOrder(orderViewDetail._id, {
        orderStatus: 'processing',
        confirmedBy: userInfo._id,
        confirmedAt: Date.now(),
      })
    )
    setToastMessage('Order Confirmed')
  }

  const sendForShippingHandler = () => {
    setShippingModal(true)
  }

  const courierFormSubmit = async (e) => {
    e.preventDefault()
    try {
      if (isNaN(courierTrackingNo)) {
        setTrackingErrorMessage('Invalid Tracking #')
        setTrackingError(true)
        return true
      }
      await axios.get(`/api/orders/tracking/${courierTrackingNo}`)
      // if (status === 200) {
      dispatch(
        updateOrder(orderViewDetail._id, {
          orderStatus: 'to deliver',
          processedAt: Date.now(),
          processedBy: userInfo._id,
          processingRemarks,
          courier: {
            name: courierName,
            orderNo: courierOrderNo,
            trackingNo: courierTrackingNo,
            rate: courierRate,
          },
        })
      )
      orderViewDetail.orderItems.map(async (item) => {
        const {
          data: { countInStock, status },
        } = await axios.get(`/api/products/${item.product}`)

        const config = {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
            // Authorization: `Bearer ${userInfo.token}`,
          },
        }

        // await axios.put(
        //   `/api/products/${item.product}`,
        //   { ...orderViewDetail, countInStock: countInStock - item.qty },
        //   config
        // )

        await axios.put(
          `/api/products/${item.product}`,
          { status, countInStock: countInStock - item.qty },
          config
        )
      })
      setShippingModal(false)
      setCourierName('')
      setCourierOrderNo('')
      setCourierOrderNo('')
      setCourierTrackingNo('')
      setCourierRate('')
      setProcessingRemarks('')
      setTrackingErrorMessage('')
      setTrackingError(false)
      setToastMessage('Order Sent For Delivery')
      // }
    } catch (error) {
      setTrackingErrorMessage(error.response.message)
      setTrackingError(true)
    }
  }

  const cancelHandler = async (e) => {
    setCancellationModal(true)
  }

  const cancellationSubmit = (e) => {
    e.preventDefault()
    dispatch(
      updateOrder(orderViewDetail._id, {
        orderStatus: 'cancelled',
        cancellationRemarks,
      })
    )
    setCancellationRemarks('')
    setToastMessage('Order Cancelled')
    setCancellationModal(false)
  }

  const returnedSubmitHandler = (e) => {
    e.preventDefault()

    orderViewDetail.orderItems.map(async (item) => {
      const {
        data: { countInStock, status },
      } = await axios.get(`/api/products/${item.product}`)

      const config = {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
          // Authorization: `Bearer ${userInfo.token}`,
        },
      }

      // await axios.put(
      //   `/api/products/${item.product}`,
      //   { ...orderViewDetail, countInStock: countInStock + item.qty },
      //   config
      // )
      await axios.put(
        `/api/products/${item.product}`,
        { status, countInStock: countInStock + item.qty },
        config
      )
    })

    dispatch(
      updateOrder(orderViewDetail._id, {
        orderStatus: 'returned',
        returnedRemarks,
      })
    )
    setToastMessage('Updated Successfully')
    setReturnedRemarks('')
    setReturnedModal(false)
  }

  const returnHandler = (e) => {
    setReturnedModal(true)
  }

  const removeHandler = (e) => {
    setDeleteModal(true)
  }
  const removeConfirmationHandler = () => {
    dispatch(deleteOrder(orderViewDetail._id))
    setToastMessage('Order Deleted Successfully')
  }
  const deliveredHandler = () => {
    dispatch(deliverOrder(orderViewDetail))
    setToastMessage('Order Completed')
  }

  const orderSearchHandler = () => {
    if (startDate && endDate) {
      dispatch(
        listOrders({
          search,
          startDate: startDate.startOf('day').valueOf(),
          endDate: endDate.endOf('day').valueOf(),
        })
      )
    } else {
      dispatch(
        listOrders({
          search,
        })
      )
    }
  }

  const orderInputHandler = (e) => {
    if (e.key === 'Enter') orderSearchbuttonRef.current.click()
  }

  return (
    <>
      <Row className='align-items-center'>
        <Col md={1}>
          <h1>Orders</h1>
        </Col>
        <Col className='text-right'>
          <Row>
            <Col xs={12} md={5} className='date-wrapper'>
              <div>
                <DateRangePicker
                  startDate={startDate} // momentPropTypes.momentObj or null,
                  startDateId='startDate' // PropTypes.string.isRequired,
                  endDate={endDate} // momentPropTypes.momentObj or null,
                  endDateId='endDate' // PropTypes.string.isRequired,
                  onDatesChange={({ startDate, endDate }) => {
                    setStartDate(startDate)
                    setEndDate(endDate)
                  }} // PropTypes.func.isRequired,
                  focusedInput={focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
                  onFocusChange={(focusedInput) =>
                    setFocusedInput(focusedInput)
                  } // PropTypes.func.isRequired,
                  isOutsideRange={() => false}
                  minimumNights={0}
                  // showClearDate={true}
                  onClose={() => orderSearchbuttonRef.current.focus()}
                  numberOfMonths={1}
                  // small={true}
                />
                {startDate && endDate && (
                  <button
                    className='fas fa-times clearDate'
                    onClick={(e) => {
                      e.preventDefault()
                      setStartDate(null)
                      setEndDate(null)
                      dispatch(
                        listOrders({
                          search,
                        })
                      )
                    }}
                  ></button>
                )}
              </div>
            </Col>
            <Col xs={12} md={5} className='order-search-wrapper'>
              <Form.Group style={{ marginBottom: 0 }}>
                <Form.Control
                  placeholder='Enter Search Keyword'
                  onKeyDown={orderInputHandler}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </Form.Group>
              <Button
                className='order-search-btn'
                ref={orderSearchbuttonRef}
                onClick={orderSearchHandler}
              >
                <i className='fa fa-search'></i>
              </Button>
            </Col>

            <Col md={2} className='order-btn-wrapper'>
              <Button className='my-2' size='sm' onClick={addOrderHandler}>
                <i className='fas fa-plus'></i> Add Order
              </Button>
            </Col>
          </Row>
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
                <td
                  style={{ cursor: 'pointer' }}
                  onClick={() => {
                    orderViewHandler(order._id)
                  }}
                >
                  <Badge pill variant='info' style={{ marginRight: '5px' }}>
                    {order.orderFrom}
                  </Badge>
                  {order._id}
                </td>
                <td
                  className='name'
                  style={{ cursor: 'pointer' }}
                  onClick={() => {
                    orderViewHandler(order._id)
                  }}
                >{`${order.firstName} ${order.lastName}`}</td>
                <td>{order.phone}</td>
                <td>
                  <span
                    className={`status ${
                      order.orderStatus && order.orderStatus.replace(/\s/g, '-')
                    }`}
                  >
                    {order.orderStatus
                      ? order.orderStatus.toLowerCase() === 'processing' &&
                        order.courier.name === undefined
                        ? 'Ready to process'
                        : order.orderStatus
                      : 'no status'}
                  </span>
                </td>
                <td>{moment(order.createdAt).format('MM-DD-YYYY h:mmA')}</td>
                <td>
                  <span className='currency'>
                    {order.totalPrice.toFixed(2)}
                  </span>
                </td>
                <td>
                  <div className='actions__wrapper'>
                    <div className='quick-btn-wrap'>
                      <OverlayTrigger
                        overlay={
                          <Tooltip id='tooltip-disabled'>View Order</Tooltip>
                        }
                      >
                        {/* <LinkContainer to={`/order/${order._id}`}> */}
                        <Button
                          variant='link'
                          size='sm'
                          onClick={() => {
                            orderViewHandler(order._id)
                          }}
                        >
                          <i className='fa fa-eye' aria-hidden='true'></i>
                        </Button>
                        {/* </LinkContainer> */}
                      </OverlayTrigger>
                    </div>

                    <Dropdown>
                      <Dropdown.Toggle id='dropdown-basic'>
                        <i className='fas fa-ellipsis-h'></i>
                      </Dropdown.Toggle>

                      <Dropdown.Menu>
                        <Dropdown.Item
                          onClick={() => {
                            orderViewHandler(order._id)
                          }}
                        >
                          <i className='far fa-eye'></i> Order Details
                        </Dropdown.Item>
                        <Dropdown.Item>
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

                    {/* Quick Actions */}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
      <Row
        className='toast-wrapper'
        style={{
          position: 'fixed',
          left: '2%',
          bottom: '2%',
        }}
      >
        <Col xs={12}>
          <Toast
            onClose={() => setShowNotif(false)}
            show={showNotif}
            delay={5000}
            autohide
          >
            <Toast.Header>
              <img src='' className='rounded mr-2' alt='' />
              <strong className='mr-auto'>dabestdeal.com</strong>
              <small>now</small>
            </Toast.Header>
            <Toast.Body style={{ background: '#ffffff' }}>
              {toastMessage}
            </Toast.Body>
          </Toast>
        </Col>
      </Row>
      <CenteredModal
        closeButton={true}
        size='xl'
        title='ORDER FORM'
        className='order-modal'
      >
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
              placeholder='1234 Main St'
              required
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </Form.Group>
          <Form.Row>
            <Form.Group as={Col} controlId='formGridCity'>
              <Form.Label>Province *</Form.Label>
              <Form.Control
                required
                value={province}
                onChange={(e) => setProvince(e.target.value)}
              />
            </Form.Group>
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
              <Form.Group>
                <Form.Check
                  type='radio'
                  label='Cash on Delivery'
                  id='COD'
                  name='paymentMethod'
                  value='Cash on Delivery'
                  // checked={
                  //   paymentMethod &&
                  //   paymentMethod.toLowerCase() === 'cash on delivery'
                  // }
                  onChange={(e) => setPaymentMethod(e.target.value)}
                ></Form.Check>
                <Form.Check
                  type='radio'
                  label='PayPal or Credit Card'
                  id='PayPal'
                  name='paymentMethod'
                  value='PayPal'
                  // checked={
                  //   paymentMethod && paymentMethod.toLowerCase() === 'paypal'
                  // }
                  onChange={(e) => setPaymentMethod(e.target.value)}
                ></Form.Check>
              </Form.Group>
            </Col>
          </Form.Group>
          {/* ----------------------------------------------------------------------------------------- */}

          <Form.Group>
            <h6>ORDER ITEMS * </h6>
            <Card>
              <Card.Body>
                <Form.Group>
                  <div className='product-search-btn'>
                    {' '}
                    <Form.Control
                      placeholder='Product Search'
                      ref={searchInput}
                      onKeyDown={searchInputHandler}
                      onKeyPress={(e) =>
                        e.target.key === 'Enter' && e.preventDefault()
                      }
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
                          searchResult.length === 0 ? (
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
                            in={true}
                            // appear={item.newItem}
                            appear={true}
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
                                  {item.countInStock > 0 ? (
                                    <>
                                      <span className='currency'>
                                        {item.price.toFixed(2)}
                                      </span>
                                      {' x '}
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
                                        {[
                                          ...Array(item.countInStock).keys(),
                                        ].map((x) => (
                                          <option key={x + 1} value={x + 1}>
                                            {x + 1}
                                          </option>
                                        ))}
                                      </Form.Control>
                                      <div className='orderSubTotal'>
                                        {` = `}
                                        <span className='currency'>
                                          {Math.round(
                                            item.price * item.qty
                                          ).toFixed(2)}
                                        </span>
                                      </div>
                                    </>
                                  ) : (
                                    'Out of Stock'
                                  )}
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
                        orderItems.reduce((acc, item) => acc + item.qty, 0) >
                          1 && totalPrice >= 1500
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
                        Discount may apply if 2 items purchased and Minimun
                        spent of <span className='currency'>1500</span>
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
                        <span className='currency new'>{totalPrice}</span>
                        <Form.Text className='text-muted'>
                          {discount}% off
                        </Form.Text>
                      </>
                    ) : (
                      <>
                        <span className='currency'>{totalPrice}</span>
                      </>
                    )}
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Form.Group>
          <Form.Group>
            {(Object.keys(orderViewDetail).length === 0 ||
              orderViewDetail.orderFrom === 'facebook') && (
              <>
                <Form.File.Label>Proof Of Sale </Form.File.Label>
                <input
                  type='file'
                  onChange={uploadProofOfSaleHandler}
                  required
                />
                <Form.Text>
                  <strong>Note:</strong>
                  Sale will only be credited to you if POS(Proof Of Sale) is
                  verified. POS is a screenshot of your conversation with the
                  client, must include their contact details and your name as
                  marketer.
                </Form.Text>
              </>
            )}

            {proofOfSaleError && (
              <Message variant='danger'>{proofOfSaleError}</Message>
            )}
            {orderCreateError ||
              (orderUpdateError && (
                <Message variant='danger'>
                  {orderCreateError || orderUpdateError}
                </Message>
              ))}
          </Form.Group>

          <Button
            type='submit'
            variant='primary'
            className='my-2'
            size='sm'
            disabled={totalPrice > 0 && !discountError ? false : true}
          >
            {orderCreateLoading || orderUpdateLoading ? (
              <Spinner animation='border' size='sm' />
            ) : (
              <i className='fas fa-cart-arrow-down'></i>
            )}{' '}
            Save Order
          </Button>
        </Form>
      </CenteredModal>
      {/* Order View Modal */}
      <Modal
        //   {...props}
        show={orderViewModal}
        size={'xl'}
        aria-labelledby='contained-modal-title-vcenter'
        centered
        className='order-view__modal'
        onHide={() => {
          setOrderViewModal(false)
          setOrderViewDetail({})
        }}
      >
        <Modal.Header closeButton={true}>
          <Row>
            <Col xs={12}>
              <span
                className={`status ${
                  orderViewDetail.orderStatus &&
                  orderViewDetail.orderStatus.replace(/\s/g, '-')
                }`}
                style={{ marginRight: '20px' }}
              >
                {orderViewDetail.orderStatus
                  ? orderViewDetail.orderStatus
                  : 'no status'}
              </span>
            </Col>
            <Col xs={12}>
              <Modal.Title id='contained-modal-title-vcenter'>
                Order ID:{' '}
                <span className='order-detail-id'>{orderViewDetail._id}</span>
              </Modal.Title>
            </Col>
          </Row>
        </Modal.Header>
        <Modal.Body>
          {Object.keys(orderViewDetail).length ? (
            <Row>
              <Col md={8}>
                {orderViewDetail.courier && orderViewDetail.courier.trackingNo && (
                  <ListGroup variant='flush'>
                    <ListGroup.Item>
                      <h4>Tracking #:{orderViewDetail.courier.trackingNo}</h4>
                    </ListGroup.Item>
                  </ListGroup>
                )}

                <ListGroup variant='flush'>
                  <ListGroup.Item>
                    <h4>Shipping</h4>
                    <p>
                      <strong>Customer Name: </strong>{' '}
                      {`${orderViewDetail.firstName} ${orderViewDetail.lastName}`}
                    </p>
                    <p>
                      <strong>Phone: </strong>{' '}
                      <a href={`tel:${orderViewDetail.phone}`}>
                        {orderViewDetail.phone}
                      </a>
                    </p>
                    <p>
                      <strong>Email: </strong>{' '}
                      <a href={`mailto:${orderViewDetail.email}`}>
                        {orderViewDetail.email}
                      </a>
                    </p>
                    <p>
                      <strong>Address:</strong>{' '}
                      {orderViewDetail.shippingAddress.address},{' '}
                      {orderViewDetail.shippingAddress.city}{' '}
                      {orderViewDetail.shippingAddress.province},{' '}
                      {orderViewDetail.shippingAddress.postalCode},{' '}
                      {orderViewDetail.shippingAddress.country}
                    </p>
                    <p>
                      <strong>Landmark:</strong>{' '}
                      {orderViewDetail.shippingAddress.landMark}
                    </p>
                    <p>
                      <strong>Remarks:</strong> {orderViewDetail.orderRemarks}
                    </p>
                    {orderViewDetail.isDelivered ? (
                      <Message variant='success'>
                        Delivered on{' '}
                        {moment(orderViewDetail.deliveredAt).format(
                          'MM-DD-YYYY h:mmA'
                        )}
                      </Message>
                    ) : (
                      <Message variant='danger'>Not Delivered</Message>
                    )}
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <h4>Payment Method</h4>
                    <p>
                      <strong>Method: </strong>
                      {orderViewDetail.paymentMethod}
                    </p>
                    {orderViewDetail.isPaid ? (
                      <Message variant='success'>
                        Paid on{' '}
                        {moment(orderViewDetail.paidAt).format(
                          'MM-DD-YYYY h:mmA'
                        )}
                      </Message>
                    ) : (
                      orderViewDetail.paymentMethod.toLowerCase() !==
                        'cash on delivery' && (
                        <Message variant='danger'>Not Paid</Message>
                      )
                    )}
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <h4>Order Items</h4>
                    {orderViewDetail.orderItems.length === 0 ? (
                      <Message>Order is empty</Message>
                    ) : (
                      <ListGroup variant='flush'>
                        {orderViewDetail.orderItems.map((item, index) => (
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
                              <Col xs={4}>
                                <Link to={`/product/${item.product}`}>
                                  {item.name}
                                </Link>
                              </Col>
                              <Col xs={5} md={4}>
                                {item.qty} x{' '}
                                <span className='currency'>
                                  {Math.round(item.price).toFixed(2)}{' '}
                                </span>
                                {'='}
                                <span className='currency'>
                                  {Math.round(item.qty * item.price).toFixed(2)}{' '}
                                </span>
                              </Col>
                            </Row>
                          </ListGroup.Item>
                        ))}
                      </ListGroup>
                    )}
                  </ListGroup.Item>
                  {orderViewDetail.orderFrom === 'facebook' && (
                    <ListGroup.Item>
                      <h4>Invoice</h4>
                      <Image src={orderViewDetail.proofOfSale} fluid rounded />
                    </ListGroup.Item>
                  )}
                  {orderViewDetail.orderStatus.toLowerCase() ===
                    'cancelled' && (
                    <ListGroup.Item>
                      <h4>Cancellation Remarks</h4>
                      <p>{orderViewDetail.cancellationRemarks}</p>
                    </ListGroup.Item>
                  )}
                </ListGroup>
              </Col>
              <Col md={4}>
                <Card>
                  <ListGroup variant='flush'>
                    <ListGroup.Item>
                      <h4>Order Summary</h4>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Row>
                        <Col>Items</Col>
                        <Col>
                          <span>&#8369;</span>
                          {Math.round(
                            orderViewDetail.orderItems.reduce(
                              (acc, item) => acc + item.qty * item.price,
                              0
                            )
                          ).toFixed(2)}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Row>
                        <Col>Shipping</Col>
                        <Col>
                          {orderViewDetail.shippingPrice > 0 && (
                            <span>&#8369;</span>
                          )}
                          {orderViewDetail.shippingPrice === 0
                            ? 'Free'
                            : orderViewDetail.shippingPrice.toFixed(2)}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                    {/* <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>
                    <span>&#8369;</span>
                    {orderViewDetail.taxPrice}
                  </Col>
                </Row>
              </ListGroup.Item> */}
                    <ListGroup.Item>
                      <Row>
                        <Col>Total</Col>
                        <Col>
                          <span>&#8369;</span>
                          {orderViewDetail.totalPrice.toFixed(2)}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                    {orderViewDetail.orderStatus.toLowerCase() ===
                      'processing' && (
                      <ListGroup.Item>
                        <Button
                          type='button'
                          className='btn btn-block'
                          onClick={editOrderHandler}
                        >
                          <i className='fas fa-edit'></i> Edit Order
                        </Button>
                      </ListGroup.Item>
                    )}
                    {orderViewDetail.orderStatus.toLowerCase() ===
                      'pending' && (
                      <ListGroup.Item>
                        <Button
                          type='button'
                          className='btn btn-block'
                          onClick={editOrderHandler}
                        >
                          <i className='fas fa-edit'></i> Edit Order
                        </Button>
                      </ListGroup.Item>
                    )}

                    {orderViewDetail.orderStatus.toLowerCase() ===
                      'processing' && (
                      <ListGroup.Item>
                        <Button
                          type='button'
                          className='btn btn-block'
                          onClick={sendForShippingHandler}
                        >
                          <i className='fas fa-shipping-fast'></i> Send for
                          shipping
                        </Button>
                      </ListGroup.Item>
                    )}

                    {orderViewDetail.orderStatus === 'pending' &&
                      orderViewDetail.orderFrom === 'website' && (
                        <ListGroup.Item>
                          <Button
                            type='button'
                            className='btn btn-block'
                            onClick={confirmHandler}
                          >
                            {orderUpdateLoading ? (
                              <Spinner size='sm' animation='border'></Spinner>
                            ) : (
                              <i className='fas fa-clipboard-check'></i>
                            )}{' '}
                            Confirm Order
                          </Button>
                        </ListGroup.Item>
                      )}

                    {userInfo &&
                      userInfo.isAdmin &&
                      // userInfo.role.toLowerCase() === 'admin' &&
                      orderViewDetail.orderStatus.toLowerCase() ===
                        'to deliver' &&
                      !orderViewDetail.isDelivered && (
                        <ListGroup.Item>
                          <Button
                            type='button'
                            className='btn btn-block'
                            onClick={deliveredHandler}
                          >
                            {derliverLoading ? (
                              <Spinner size='sm' animation='border' />
                            ) : (
                              <i className='fas fa-truck'></i>
                            )}{' '}
                            Mark As Delivered
                          </Button>
                        </ListGroup.Item>
                      )}
                    {userInfo &&
                      userInfo.isAdmin &&
                      orderViewDetail.orderStatus.toLowerCase() !==
                        'to deliver' &&
                      orderViewDetail.orderStatus.toLowerCase() !==
                        'cancelled' &&
                      orderViewDetail.orderStatus.toLowerCase() !==
                        'returned' &&
                      !orderViewDetail.isDelivered &&
                      orderViewDetail.orderStatus.toLowerCase() !==
                        'completed' && (
                        <ListGroup.Item>
                          <Button
                            type='button'
                            className='btn btn-block'
                            size='md'
                            onClick={cancelHandler}
                          >
                            <i className='fas fa-times' /> Cancel Oder
                          </Button>
                        </ListGroup.Item>
                      )}

                    {userInfo &&
                      userInfo.isAdmin &&
                      // userInfo.role.toLowerCase() === 'admin' &&
                      orderViewDetail.orderStatus.toLowerCase() !== 'pending' &&
                      orderViewDetail.orderStatus.toLowerCase() !==
                        'processing' &&
                      orderViewDetail.orderStatus.toLowerCase() !==
                        'completed' &&
                      orderViewDetail.orderStatus.toLowerCase() !==
                        'cancelled' &&
                      orderViewDetail.orderStatus.toLowerCase() !==
                        'returned' && (
                        <>
                          {' '}
                          <ListGroup.Item>
                            <Button
                              type='button'
                              className='btn btn-block'
                              size='md'
                              onClick={returnHandler}
                            >
                              <i className='fas fa-undo-alt'></i> Return Oder
                            </Button>
                          </ListGroup.Item>
                        </>
                      )}
                    {userInfo &&
                      userInfo.isAdmin &&
                      userInfo.role.toLowerCase() === 'admin' &&
                      orderViewDetail.orderStatus.toLowerCase() !==
                        'completed' && (
                        <>
                          <ListGroup.Item>
                            <Button
                              type='button'
                              className='btn btn-block'
                              size='md'
                              onClick={removeHandler}
                            >
                              <i className='fas fa-trash'></i> Remove Order
                            </Button>
                          </ListGroup.Item>
                        </>
                      )}

                    {/* Modal Actions */}
                  </ListGroup>
                </Card>
              </Col>
            </Row>
          ) : (
            <></>
          )}
        </Modal.Body>
      </Modal>
      {/* Order View Modal END */}

      {/* Send For Shipping Modal START*/}
      <Modal
        //   {...props}
        show={shippingModal}
        size={'md'}
        aria-labelledby='contained-modal-title-vcenter'
        centered
        onHide={() => {
          setCourierName('')
          setCourierOrderNo('')
          setCourierOrderNo('')
          setCourierTrackingNo('')
          setCourierRate('')
          setProcessingRemarks('')
          setShippingModal(false)
        }}
      >
        <Modal.Header closeButton={true}>
          <Modal.Title id='contained-modal-title-vcenter'>
            <i className='fas fa-shipping-fast'></i> Courier Info
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={courierFormSubmit}>
            <Form.Group>
              <Form.Group controlId='exampleForm.ControlSelect1'>
                <Form.Label>Courier Name</Form.Label>
                <Form.Control
                  as='select'
                  onChange={(e) => setCourierName(e.target.value)}
                  required
                >
                  <option value=''>Choose a Courrier</option>
                  <option value='jnt'>JNT</option>
                </Form.Control>
              </Form.Group>
              {courierName && (
                <>
                  <Form.Group>
                    <Form.Label>Order No.</Form.Label>
                    <Form.Control
                      onChange={(e) => setCourierOrderNo(e.target.value)}
                      required
                      pattern='[0-9]+'
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Tracking No.</Form.Label>
                    <Form.Control
                      onChange={(e) => setCourierTrackingNo(e.target.value)}
                      required
                      pattern='\d{12,}'
                      minLength={12}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Shipment Rate</Form.Label>
                    <Form.Control
                      onChange={(e) => setCourierRate(e.target.value)}
                      required
                      pattern='\d{2,9}'
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Remarks</Form.Label>
                    <Form.Control
                      as='textarea'
                      onChange={(e) => setProcessingRemarks(e.target.value)}
                      required
                    />
                  </Form.Group>
                </>
              )}
            </Form.Group>
            {trackingError && (
              <Form.Group>
                <Message variant='danger'>{trackingErrorMessage}</Message>
              </Form.Group>
            )}

            {courierOrderNo && courierTrackingNo && (
              <>
                <Form.Group>
                  <Form.Text>
                    <strong>Note:</strong>
                    Saving Delivery info assumes that orders was successfuly
                    handed to selected courier and will automatically update the
                    invetory.
                  </Form.Text>
                </Form.Group>
                <Button type='submit' disabled={!courierRate}>
                  {orderUpdateLoading ? (
                    <Spinner size='sm' animation='border' />
                  ) : (
                    <i className='fas fa-truck-loading'></i>
                  )}{' '}
                  Save Delivery
                </Button>
              </>
            )}
          </Form>
        </Modal.Body>
      </Modal>
      {/* Send for Shipping Modal End */}

      {/* Cancellation Modal START*/}
      <Modal
        //   {...props}
        show={cancellationModal}
        size={'md'}
        aria-labelledby='contained-modal-title-vcenter'
        centered
        onHide={() => setCancellationModal(false)}
      >
        <Modal.Header closeButton={true}>
          <Modal.Title id='contained-modal-title-vcenter'>
            <i className='fas fa-times'></i> Order Cancellation
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={cancellationSubmit}>
            <Form.Group>
              <Form.Label>Remarks</Form.Label>
              <Form.Control
                as='textarea'
                onChange={(e) => setCancellationRemarks(e.target.value)}
                required
              />
            </Form.Group>

            {/* {trackingError && (
              <Form.Group>
                <Message variant='danger'>{trackingErrorMessage}</Message>
              </Form.Group>
            )} */}

            <Button type='submit'>
              {orderUpdateLoading ? (
                <Spinner size='sm' animation='border' />
              ) : (
                <i className='fas fa-save'></i>
              )}{' '}
              Save Cancellation Remarks
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
      {/* Send for Shipping Modal End */}

      {/* Returned Modal START*/}
      <Modal
        //   {...props}
        show={returnedModal}
        size={'md'}
        aria-labelledby='contained-modal-title-vcenter'
        centered
        onHide={() => setReturnedModal(false)}
      >
        <Modal.Header closeButton={true}>
          <Modal.Title id='contained-modal-title-vcenter'>
            <i className='fas fa-undo-alt'></i> Return to Seller
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={returnedSubmitHandler}>
            <Form.Group>
              <Form.Label>Remarks(Optional)</Form.Label>
              <Form.Control
                as='textarea'
                onChange={(e) => setReturnedRemarks(e.target.value)}
              />
            </Form.Group>

            <Button type='submit'>
              {orderUpdateLoading ? (
                <Spinner size='sm' animation='border' />
              ) : (
                <i className='fas fa-save'></i>
              )}{' '}
              Save Returned Remarks
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
      {/* Returned Modal END */}

      {/* Delete Modal START*/}
      <Modal
        //   {...props}
        show={deleteModal}
        size={'md'}
        aria-labelledby='contained-modal-title-vcenter'
        centered
        onHide={() => setDeleteModal(false)}
      >
        <Modal.Header closeButton={true}>
          <Modal.Title id='contained-modal-title-vcenter'>
            <i className='fas fa-trash'></i> Delete Order?
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <strong>ID:</strong> {orderViewDetail._id}
        </Modal.Body>
        <Modal.Footer>
          <Button variant='primary' onClick={removeConfirmationHandler}>
            {orderDeleteLoading ? (
              <Spinner size='sm' animation='border' />
            ) : (
              <i className='fas fa-check'></i>
            )}{' '}
          </Button>
        </Modal.Footer>
      </Modal>
      {/* Delete Modal END */}
    </>
  )
}

export default OrderListScreen
