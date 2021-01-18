import React, { useState, useEffect, lazy, Suspense } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import moment from 'moment'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Image, ListGroup, Card, Button, Form } from 'react-bootstrap'
import Rating from '../components/Rating'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Meta from '../components/Meta'
import {
  listProductDetails,
  createProductReview,
} from '../actions/productActions'
// import { listMyOrders } from '../actions/orderActions'
import { PRODUCT_CREATE_REVIEW_RESET } from '../constants/productConstants'
import { SRLWrapper } from 'simple-react-lightbox'
import ReactImageMagnify from 'react-image-magnify'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import parse from 'html-react-parser'
// import Swiper from 'react-id-swiper'
// import 'swiper/swiper.scss'

const Messenger = lazy(() => import('../components/Messenger'))

const ProductScreen = ({ history, match }) => {
  const [qty, setQty] = useState(1)
  const [rating, setRating] = useState(0)
  const [name, setName] = useState('')
  const [comment, setComment] = useState('')
  const [files, setFiles] = useState({})
  // const [images, setImages] = useState([])
  const dispatch = useDispatch()

  const productDetails = useSelector((state) => state.productDetails)
  const { loading, error, product } = productDetails
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const productReviewCreate = useSelector((state) => state.productReviewCreate)
  const {
    success: successProductReview,
    loading: loadingProductReview,
    error: errorProductReview,
  } = productReviewCreate

  const images = product?.images.filter((image) => !image.isBannerImage)

  useEffect(() => {
    if (successProductReview) {
      setRating(0)
      setComment('')
      dispatch(listProductDetails(match.params.id))
    }
    if (!product?._id || product?._id !== match.params.id) {
      dispatch(listProductDetails(match.params.id))
      // dispatch(listMyOrders())
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET })
    }
  }, [dispatch, product._id, match, successProductReview])

  const addToCartHandler = () => {
    history.push(`/cart/${match.params.id}?qty=${qty}`)
  }

  const submitHandler = async (e) => {
    e.preventDefault()

    try {
      const config = {
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
      const formData = new FormData()
      formData.append('folder', 'reviews')
      formData.append('subFolder', product._id)
      formData.append('modelName', `product-${product._id}`)
      for (let i = 0; i <= Object.keys(files).length - 1; i++) {
        formData.append('images', files[i])
      }

      const { data: images } = await axios.post('/api/upload', formData, config)
      dispatch(
        createProductReview(match.params.id, {
          name,
          rating,
          comment,
          images,
        })
      )
    } catch (error) {
      console.log(error)
    }
  }
  const filePickerHandler = (e) => {
    setFiles(e.target.files)
    // console.log(e.target.files)
  }

  const settings = {
    customPaging: function (i) {
      return (
        <Button
          variant='link'
          style={{
            width: '100%',
            height: '100%',
          }}
        >
          <Image src={images[i].url} fluid />
        </Button>
      )
    },
    dots: true,
    dotsClass: 'slick-dots slick-thumb',
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  }

  const options = {
    replace: (domNode) => {
      if (domNode.attribs && domNode.attribs.class === 'remove') {
        return <></>
      }
      // if (domNode.name === 'li') {
      //   domNode.key = this.count + 1
      // }
      // console.log(domNode)
    },
  }

  return (
    <>
      <Suspense fallback={null}>
        <Messenger />
      </Suspense>
      <Link className='btn btn-light my-3' to='/'>
        <i className='fas fa-home'></i> Go Back
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Meta title={product.name} />
          <Row>
            <Col
              md={6}
              style={{ zIndex: '1' }}
              className='product-image-wrapper'
            >
              <Slider {...settings}>
                {/* {console.log(
                  product.images.filter((image) => !image.isBannerImage)
                )} */}
                {product?.images.length &&
                  product.images
                    .filter((image) => !image.isBannerImage)
                    .map((image, idx) => (
                      <div key={`slide_${idx}`}>
                        <ReactImageMagnify
                          {...{
                            smallImage: {
                              alt: product.name,
                              isFluidWidth: true,
                              src: image.url,
                            },
                            largeImage: {
                              src: image.url,
                              width: 800,
                              height: 1000,
                            },
                            lensStyle: { backgroundColor: 'rgba(0,0,0,.6)' },
                            shouldHideHintAfterFirstActivation: false,
                            enlargedImagePosition: 'over',
                            isHintEnabled: true,
                          }}
                        />
                        {/* <div
                          className='product-image'
                          style={{ backgroundImage: `url(${image.url})` }}
                        ></div> */}
                      </div>
                    ))}
              </Slider>

              {/* <Swiper
                onSwiper={setThumbsSwiper}
                watchSlidesVisibility
                watchSlidesProgress
              >
                {c.images.map((image) => (
                  <SwiperSlide key={image._id}>
                    <Image src={image.url} alt={product.name} fluid />
                  </SwiperSlide>
                ))}
              </Swiper> */}

              {/* <Image
                
                fluid
              /> */}
            </Col>
            <Col md={3}>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <h3>{product.name}</h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Rating
                    value={product.rating}
                    text={`${parseFloat(product.rating).toFixed(1)}  |  ${
                      product.numReviews
                    } reviews`}
                  />
                </ListGroup.Item>
                <ListGroup.Item>
                  Price: ₱{product?.price?.toFixed(2)}
                </ListGroup.Item>
                <ListGroup.Item>
                  Description:
                  {/* {product.description} */}
                  {parse(`${product.description}`, options)}
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={3}>
              <Card>
                <ListGroup variant='flush'>
                  <ListGroup.Item>
                    <Row>
                      <Col>Price:</Col>
                      <Col>
                        <strong>₱{product?.price?.toFixed(2)}</strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <Row>
                      <Col>Status:</Col>
                      <Col>
                        {product.countInStock > 0 ? 'In Stock' : 'Out Of Stock'}
                      </Col>
                    </Row>
                  </ListGroup.Item>

                  {product.countInStock > 0 && (
                    <ListGroup.Item>
                      <Row>
                        <Col>Qty</Col>
                        <Col>
                          <Form.Control
                            as='select'
                            value={qty}
                            onChange={(e) => setQty(e.target.value)}
                          >
                            {[...Array(product.countInStock).keys()].map(
                              (x) => (
                                <option key={x + 1} value={x + 1}>
                                  {x + 1}
                                </option>
                              )
                            )}
                          </Form.Control>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )}

                  <ListGroup.Item>
                    <Button
                      onClick={addToCartHandler}
                      className='btn-block'
                      type='button'
                      disabled={product.countInStock <= 0}
                    >
                      <i className='fas fa-cart-plus'></i> Add To Cart
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col md={6} className='reviews-wrap'>
              <h2>Reviews</h2>
              {product.reviews.length === 0 && <Message>No Reviews</Message>}
              <SRLWrapper>
                <ListGroup variant='flush'>
                  {product.reviews.map(
                    (review) =>
                      review.isReviewed && (
                        <ListGroup.Item key={review._id}>
                          <strong>{review.name}</strong>
                          <Rating value={review.rating} />
                          <p>
                            {moment(review.createdAt).format(
                              'MM-DD-YYYY h:mmA'
                            )}
                          </p>
                          <Row>
                            {review.images.map((image) => (
                              <Image
                                src={image}
                                fluid
                                style={{ maxWidth: ' 100px' }}
                              />
                            ))}
                          </Row>

                          <p>{review.comment}</p>
                        </ListGroup.Item>
                      )
                  )}

                  {(product?.isPurchased || userInfo?.isAdmin) && (
                    <ListGroup.Item>
                      <h2>Write a Customer Review</h2>
                      {successProductReview && (
                        <Message variant='success'>
                          Thank you for your feedback!
                        </Message>
                      )}
                      {loadingProductReview && <Loader />}
                      {errorProductReview && (
                        <Message variant='danger'>{errorProductReview}</Message>
                      )}
                      {userInfo ? (
                        <Form onSubmit={submitHandler}>
                          {userInfo.isAdmin && (
                            <Form.Group>
                              <Form.Label>Enter Name</Form.Label>
                              <Form.Control
                                onChange={(e) => {
                                  setName(e.target.value)
                                }}
                              ></Form.Control>
                            </Form.Group>
                          )}
                          <Form.Group controlId='rating'>
                            <Form.Label>Rating</Form.Label>
                            <Form.Control
                              as='select'
                              value={rating}
                              onChange={(e) => setRating(e.target.value)}
                              required
                            >
                              <option value=''>Select...</option>
                              <option value='1'>1 - Poor</option>
                              <option value='2'>2 - Fair</option>
                              <option value='3'>3 - Good</option>
                              <option value='4'>4 - Very Good</option>
                              <option value='5'>5 - Excellent</option>
                            </Form.Control>
                          </Form.Group>
                          <Form.Group controlId='comment'>
                            <Form.Label>Comment</Form.Label>
                            <Form.Control
                              as='textarea'
                              row='3'
                              value={comment}
                              required
                              onChange={(e) => setComment(e.target.value)}
                            ></Form.Control>
                          </Form.Group>
                          <Form.Group>
                            <Form.Label>Upload Photo</Form.Label>
                            <Form.File
                              id='image-file'
                              onChange={filePickerHandler}
                              multiple
                            ></Form.File>
                          </Form.Group>

                          <Button
                            disabled={loadingProductReview}
                            type='submit'
                            variant='primary'
                          >
                            Submit
                          </Button>
                        </Form>
                      ) : (
                        <Message>
                          Please <Link to='/login'>sign in</Link> to write a
                          review{' '}
                        </Message>
                      )}
                    </ListGroup.Item>
                  )}
                </ListGroup>
              </SRLWrapper>
            </Col>
          </Row>
        </>
      )}
    </>
  )
}

export default ProductScreen
