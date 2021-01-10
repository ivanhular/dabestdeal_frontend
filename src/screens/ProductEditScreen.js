import axios from 'axios'
import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Card, Image, Col, Row, ListGroup } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import Rating from '../components/Rating'
import FormEditor from '../components/FormEditor'
import { listProductDetails, updateProduct } from '../actions/productActions'
import { listSegments } from '../actions/segmentActions'
import {
  listCategories,
  addSegmentToCategory,
} from '../actions/categoryActions'
import {
  PRODUCT_UPDATE_RESET,
  PRODUCT_DETAILS_RESET,
} from '../constants/productConstants'

const ProductEditScreen = ({ match, history }) => {
  const productId = match.params.id
  const dispatch = useDispatch()

  // const userLogin = useSelector((state) => state.userLogin)
  // const { userInfo } = userLogin

  const { segments } = useSelector((state) => state.segmentList)

  const { categories } = useSelector((state) => state.categoryList)

  const productDetails = useSelector((state) => state.productDetails)
  const { loading, error, product } = productDetails

  const productUpdate = useSelector((state) => state.productUpdate)
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = productUpdate

  const [name, setName] = useState('')
  const [price, setPrice] = useState(0)

  // const [newUploadedImages, setNewUploadedImage] = useState([])
  const [, setNewUploadedImage] = useState([])
  const [uploadedImages, setUploadedImages] = useState([]) //all from current uploaded images
  const [newImages, setNewImage] = useState([]) //Handles Image files from input generates blob

  // const inputUrlEl = useRef([...new Array(3)].map(() => React.createRef()))
  const switchEl = useRef(null)
  const switchElHomeFeatured = useRef(null)
  const [status, setStatus] = useState()
  const [isFeatured, setIsFeatured] = useState()

  const [brand, setBrand] = useState('')
  // const [segments, setSegments] = useState([])
  const [segment, setSegment] = useState({})
  // const [categories, setCategories] = useState([])
  const [category, setCategory] = useState([])
  const [countInStock, setCountInStock] = useState(0)
  const [description, setDescription] = useState('')
  const [reviews, setReviews] = useState([])
  const [dataLoaded, setDataLoaded] = useState(false)

  useEffect(() => {
    console.log(description)
  }, [description])
  useEffect(() => {
    dispatch(listSegments())
    dispatch(listCategories())
  }, [dispatch])

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET })
      dispatch({ type: PRODUCT_DETAILS_RESET })
      history.push('/admin/productlist')
    } else {
      if (!product || product._id !== productId) {
        dispatch(listProductDetails(productId))
      } else {
        if (!dataLoaded) {
          setName(product.name)
          setPrice(product.price)
          setBrand(product.brand)
          setUploadedImages(product.images)
          setSegment(product.segment)
          setCategory(product.category)
          setStatus(product.status)
          setIsFeatured(product.isFeatured)
          setCountInStock(product.countInStock)
          setDescription(product.description)
          setReviews(product.reviews)
          setDataLoaded(true)
        }
        // console.log(uploadedImages)
        // // if (product.images !== uploadedImages) {
        // //   console.log('not ')
        // // }
      }
    }
  }, [
    // uploadedImages,
    dataLoaded,
    dispatch,
    history,
    productId,
    product,
    successUpdate,
  ])

  const checkOptions = (option) =>
    option
      ? option.name !== undefined && option._id !== undefined
        ? { name: option.name, id: option._id }
        : option
      : ''

  const submitHandler = async (e) => {
    e.preventDefault()
    const checkSegment = checkOptions(segment)
    const checkCategory = checkOptions(category)

    const config = {
      withCredentials: true,
      headers: {
        'Content-Type': 'multipart/form-data',
        // Authorization: `Bearer ${userInfo.token}`,
      },
    }

    try {
      let uploaded = uploadedImages
      if (newImages.length) {
        const formData = new FormData()

        formData.append('folder', 'product')
        formData.append('subFolder', product._id)
        formData.append('modelName', `product-${product._id}`)
        for (let i = 0; i < newImages.length; i++) {
          formData.append('images', newImages[i].file)
        }

        const { data: newUploadImages } = await axios.post(
          '/api/upload',
          formData,
          config
        )

        setNewUploadedImage(
          uploadedImages.concat(
            newUploadImages.map((image, i) => ({
              url: image,
              isfeaturedImage: false,
            }))
          )
        )
        uploaded = uploadedImages.concat(
          newUploadImages.map((image) => ({
            url: image,
            isfeaturedImage: false,
          }))
        )
        console.log('setNewImages')
      }

      if (checkSegment && checkCategory) {
        //check segment && category is defined before dispatch
        dispatch(addSegmentToCategory(checkCategory.id, checkSegment.id))
      }

      dispatch(
        updateProduct({
          _id: productId,
          name,
          price,
          images: uploaded,
          brand,
          segment: checkSegment,
          category: checkCategory,
          description,
          countInStock,
          status,
          isFeatured,
          reviews,
        })
      )

      console.log({
        _id: productId,
        name,
        price,
        images: uploaded,
        brand,
        segment: checkSegment,
        category: checkCategory,
        description,
        countInStock,
        status,
        isFeatured,
      })
    } catch (error) {
      console.log(error.response.message)
    }
  }

  const filePickerHandler = async (e) => {
    const inputFiles = Object.keys(e.target.files).map((file) => ({
      file: e.target.files[file],
      blobUrl: window.URL.createObjectURL(e.target.files[file]),
    }))
    setNewImage(newImages.concat(inputFiles))
    // console.log(window.URL.createObjectURL(e.target.files[0]))
  }

  const removeImageHandler = (key, from) => {
    if (from === 'uploaded') {
      const uploaded = [...uploadedImages]
      uploaded.splice(key, 1)
      setUploadedImages(uploaded)
    } else {
      const newUpload = [...newImages]
      newUpload.splice(key, 1)
      setNewImage(newUpload)
    }
  }

  const setIsFeaturedImage = (key, from) => {
    if (from === 'uploaded') {
      const uploaded = [...uploadedImages]
      setUploadedImages(
        uploaded.map((x, i) =>
          i === key
            ? { ...x, isFeaturedImage: !x.isFeaturedImage }
            : { ...x, isFeaturedImage: false }
        )
      )
    }
  }
  const setIsBannerImage = (key, from) => {
    if (from === 'uploaded') {
      const uploaded = [...uploadedImages]
      setUploadedImages(
        uploaded.map((x, i) =>
          i === key
            ? { ...x, isBannerImage: !x.isBannerImage }
            : { ...x, isBannerImage: false }
        )
      )
    }
  }

  const setHtmlDesc = (html) => {
    setDescription(html)
  }
  return (
    <>
      <Link to='/admin/productlist' className='btn btn-light my-3'>
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit Product</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='name'>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Form.Label>Name</Form.Label>
                <Form.Check
                  ref={switchEl}
                  type='switch'
                  id='custom-switch'
                  label='Active'
                  defaultChecked={status}
                  onClick={(e) => {
                    setStatus(switchEl.current.checked)
                  }}
                />
              </div>
              <Form.Control
                type='name'
                placeholder='Enter name'
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='price'>
              <Form.Label>Price</Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter price'
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Check
                ref={switchElHomeFeatured}
                type='switch'
                id='switch-featured'
                label='Home Featured'
                defaultChecked={isFeatured}
                onClick={(e) => {
                  setIsFeatured(switchElHomeFeatured.current.checked)
                }}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Images</Form.Label>

              <Card>
                <Card.Body>
                  <Row className='images-wrap'>
                    {uploadedImages && uploadedImages.length
                      ? uploadedImages.map((image, i) => (
                          <Col md={3} key={i} className='product-image' id={i}>
                            <div className='product-image--actions'>
                              <Button
                                variant='light'
                                onClick={() =>
                                  removeImageHandler(i, 'uploaded')
                                }
                              >
                                X
                              </Button>{' '}
                            </div>
                            <Image src={image.url} fluid />
                            <div className='product-image__btm--actions'>
                              <Form.Check
                                value='isFeaturedImage'
                                label='Featured'
                                defaultChecked={image.isFeaturedImage}
                                onClick={(e) => {
                                  setIsFeaturedImage(i, 'uploaded')
                                }}
                              />
                              <Form.Check
                                label='Banner'
                                value='isBannerImage'
                                defaultChecked={image.isBannerImage}
                                onClick={(e) => {
                                  setIsBannerImage(i, 'uploaded')
                                }}
                              />
                            </div>
                          </Col>
                        ))
                      : ''}
                    {newImages.length
                      ? newImages.map((image, i) => (
                          <Col md={3} key={i} className='product-image'>
                            <div className='product-image--actions'>
                              <Button
                                variant='light'
                                onClick={() => removeImageHandler(i, 'new')}
                              >
                                X
                              </Button>{' '}
                            </div>
                            <Image src={image.blobUrl} fluid />
                          </Col>
                        ))
                      : ''}
                  </Row>
                </Card.Body>
                <Card.Body>
                  <Form.File
                    id='image-file'
                    onChange={filePickerHandler}
                    multiple
                  ></Form.File>
                </Card.Body>
              </Card>
            </Form.Group>

            <Form.Group controlId='brand'>
              <Form.Label>Brand</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter brand'
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='countInStock'>
              <Form.Label>Count In Stock</Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter countInStock'
                value={countInStock}
                onChange={(e) => setCountInStock(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='segments'>
              <Form.Label>Segment</Form.Label>
              <Form.Control
                as='select'
                // value={
                //   segment
                //     ? segment.name !== undefined
                //       ? segment.name
                //       : dispatch(listSegments())
                //     : ''
                // }
                value={segment && segment.name}
                onChange={(e) =>
                  setSegment(
                    segments.find((segment) => segment.name === e.target.value)
                  )
                }
              >
                {/* {console.log(segments)} */}
                {segments.length &&
                  segments.map((segment) => (
                    <option key={segment._id}>{segment.name}</option>
                  ))}
              </Form.Control>
            </Form.Group>

            <Form.Group controlId='categories'>
              <Form.Label>Category</Form.Label>
              <Form.Control
                as='select'
                // value={
                //   category
                //     ? category.name !== undefined
                //       ? category.name
                //       : dispatch(listCategories())
                //     : ''
                // }
                value={category.name}
                onChange={(e) =>
                  setCategory(
                    categories.find(
                      (category) => category.name === e.target.value
                    )
                  )
                }
              >
                {categories.length &&
                  categories.map((category) => (
                    <option key={category._id}>{category.name}</option>
                  ))}
              </Form.Control>
            </Form.Group>

            {/* <Form.Group controlId='description'>
              <Form.Label>Description</Form.Label>
              <Form.Control
                as='textarea'
                rows={3}
                placeholder='Enter description'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Group> */}
            <Form.Group>
              <Form.Label>Description</Form.Label>
              <FormEditor
                description={product?.description}
                setHtmlDesc={setHtmlDesc}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Reviews</Form.Label>
              <Card>
                <Card.Body>
                  <ListGroup variant='flush'>
                    {reviews.length > 0
                      ? reviews.map((review) => (
                          <ListGroup.Item
                            key={review._id}
                            className='review-list'
                          >
                            <Row>
                              <Col xs={4} style={{ display: 'inline-flex' }}>
                                {review.isReviewed && (
                                  <i
                                    className='fa fa-check'
                                    aria-hidden='true'
                                    style={{ color: 'green' }}
                                  />
                                )}
                                {<Rating value={review.rating} />}
                              </Col>
                              <Col>
                                <em>"{review.comment}"</em>
                              </Col>
                              <Col className='product-action-wrap'>
                                <Button variant='link'>
                                  <i
                                    className='fa fa-check'
                                    aria-hidden='true'
                                    style={{ color: 'green' }}
                                    onClick={(e) => {
                                      setReviews(
                                        reviews.map((r) =>
                                          r._id === review._id
                                            ? {
                                                ...r,
                                                isReviewed: !review.isReviewed,
                                              }
                                            : { ...r }
                                        )
                                      )
                                    }}
                                  />
                                </Button>
                                <Button
                                  variant='link'
                                  onClick={(e) =>
                                    setReviews(
                                      reviews.filter(
                                        (r) => r._id !== review._id
                                      )
                                    )
                                  }
                                >
                                  <i
                                    className='fa fa-trash'
                                    aria-hidden='true'
                                    style={{ color: 'red' }}
                                  />
                                </Button>
                              </Col>
                            </Row>
                          </ListGroup.Item>
                        ))
                      : 'No reviews yet'}
                  </ListGroup>
                </Card.Body>
              </Card>
            </Form.Group>

            <Button type='submit' variant='primary'>
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  )
}

export default ProductEditScreen
