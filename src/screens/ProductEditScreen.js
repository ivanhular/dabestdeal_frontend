import axios from 'axios'
import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
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

  const segmentList = useSelector((state) => state.segmentList)

  const categoryList = useSelector((state) => state.categoryList)

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

  const [images, setImage] = useState([])
  const [newImages, setNewImage] = useState([])
  const [addUpload, setAddUpload] = useState([])
  const [currentId, setCurrentId] = useState(0)
  // const inputUrlEl = useRef([...new Array(3)].map(() => React.createRef()))
  const inputUrlEl = useRef([])
  const switchEl = useRef(null)
  const [status, setStatus] = useState()

  const [brand, setBrand] = useState('')
  const [segments, setSegments] = useState()
  const [segment, setSegment] = useState({})
  const [categories, setCategories] = useState()
  const [category, setCategory] = useState([])
  const [countInStock, setCountInStock] = useState(0)
  const [description, setDescription] = useState('')
  const [uploading, setUploading] = useState(false)

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
        setName(product.name)
        setPrice(product.price)
        setImage(product.images)
        setBrand(product.brand)
        setSegments(segmentList.segments)
        setSegment(product.segment)
        setCategories(categoryList.categories)
        setCategory(product.category)
        setStatus(product.status)
        setCategory(product.category)
        setCountInStock(product.countInStock)
        setDescription(product.description)
        // console.log(segment)
      }
    }
  }, [
    dispatch,
    history,
    segmentList.segments,
    categoryList.categories,
    productId,
    product,
    successUpdate,
  ])

  const cloneUploadFileHandler = async (e) => {
    const file = e.target.files[0]
    const formData = new FormData()
    formData.append('image', file)
    setUploading(true)

    // console.log(e.target.files)
    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }

      const { data } = await axios.post('/api/upload', formData, config)

      const newImageIndex = newImages[currentId]
      console.log(newImageIndex)
      if (newImageIndex) {
        const updateNewImages = [...newImages]
        updateNewImages[newImageIndex] = {
          ...newImages[newImageIndex],
          url: data,
        }
        setNewImage(updateNewImages)
        console.log('triggered')
      } else {
        setNewImage(newImages.concat({ url: data }))
      }

      setUploading(false)
      inputUrlEl.current[currentId].current.value = data // still getting the intial currentID
      // console.log(currentId)
    } catch (error) {
      console.error(error)
      setUploading(false)
    }
  }

  const UploadInput = ({ id }) => (
    <Form.Group controlId='image'>
      <Form.Control
        type='text'
        ref={inputUrlEl.current[id]}
        placeholder='Enter image url'
      ></Form.Control>
      <Form.File
        id={id}
        label='Choose File'
        custom
        onChange={cloneUploadFileHandler}
      ></Form.File>
    </Form.Group>
  )

  const checkOptions = (option) =>
    option
      ? option.name !== undefined && option._id !== undefined
        ? { name: option.name, id: option._id }
        : option
      : ''

  const submitHandler = (e) => {
    e.preventDefault()
    const checkSegment = checkOptions(segment)
    const checkCategory = checkOptions(category)

    if (checkSegment && checkCategory) {
      //check segment && category is defined before dispatch
      console.log('set')
      dispatch(addSegmentToCategory(checkCategory.id, checkSegment.id))
    }

    dispatch(
      updateProduct({
        _id: productId,
        name,
        price,
        images: images.concat(newImages),
        brand,
        segment: checkSegment,
        category: checkCategory,
        description,
        countInStock,
        status,
      })
    )

    // console.log({
    //   _id: productId,
    //   name,
    //   price,
    //   images: images.concat(newImages),
    //   brand,
    //   segment: checkSegment,
    //   category: checkCategory,
    //   description,
    //   countInStock,
    //   status,
    // })
  }

  // const clone = React.cloneElement(<UploadInput />, {})

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
            {/* {console.log(images.length)} */}

            {images.length > 0 && <Form.Label>Image</Form.Label>}
            {images.map((image) => (
              <Form.Group controlId='image' key={image._id}>
                <Form.Control
                  type='text'
                  placeholder='Enter image url'
                  value={
                    images[images.findIndex((i) => i._id === image._id)].url
                  }
                  onChange={
                    (e) => {
                      const index = images.findIndex((i) => i._id === image._id)
                      const updateImages = [...images]
                      updateImages[index] = {
                        ...updateImages[index],
                        url: e.target.value,
                      }
                      setImage(updateImages)
                      console.log(images)
                    }

                    // setImage((prevState) => {
                    //   const updatedValue = images[images.findIndex((i) => i._id === image._id)]
                    //   return [
                    //     ...prevState,
                    //    {
                    //       ...images[images.findIndex((i) => i._id === image._id)],
                    //       url: e.target.value
                    //     },
                    //   ]
                    // })
                  }
                ></Form.Control>
                <Form.File
                  id='image-file'
                  label='Choose File'
                  custom
                  onChange={cloneUploadFileHandler}
                ></Form.File>
              </Form.Group>
            ))}

            {/* {[...Array(addUpload).keys()].map((x) => {
              return clone
            })} */}
            {addUpload.map((input, i) => input)}

            {uploading && <Loader />}

            <Form.Group controlId='imageButton'>
              <Button
                type='button'
                variant='primary'
                size='sm'
                onClick={() => {
                  setAddUpload((prevAddButton) => [
                    ...prevAddButton,
                    <UploadInput id={currentId} key={currentId} />,
                  ])
                  inputUrlEl.current = inputUrlEl.current.concat(
                    React.createRef()
                  )
                  setCurrentId(currentId + 1)
                }}
              >
                Add Image
              </Button>
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
                {segments &&
                  segments.map((segment) => (
                    <option key={segment._id}>{segment.name}</option>
                  ))}
              </Form.Control>
            </Form.Group>

            <Form.Group controlId='categories'>
              <Form.Label>Category</Form.Label>
              <Form.Control
                as='select'
                value={
                  category
                    ? category.name !== undefined
                      ? category.name
                      : dispatch(listCategories())
                    : ''
                }
                onChange={(e) =>
                  setCategory(
                    categories.find(
                      (category) => category.name === e.target.value
                    )
                  )
                }
              >
                {categories &&
                  categories.length > 0 &&
                  categories.map((category) => (
                    <option key={category._id}>{category.name}</option>
                  ))}
              </Form.Control>
            </Form.Group>

            <Form.Group controlId='description'>
              <Form.Label>Description</Form.Label>
              <Form.Control
                as='textarea'
                rows={3}
                placeholder='Enter description'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
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
