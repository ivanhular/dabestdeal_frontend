import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Carousel, Image } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from './Loader'
import Message from './Message'
import { listFeaturedProducts } from '../actions/productActions'

const ProductCarousel = () => {
  const dispatch = useDispatch()

  const productFeatured = useSelector((state) => state.productFeatured)
  const { loading, error, products } = productFeatured

  useEffect(() => {
    dispatch(listFeaturedProducts())
  }, [dispatch])

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant='danger'>{error}</Message>
  ) : (
    <Carousel pause='hover' className='bg-dark' fade>
      {products.map(
        (product) =>
          product.isFeatured && (
            <Carousel.Item key={product._id}>
              <Link to={`/product/${product._id}`}>
                <Image
                  src={
                    product.images.find((image) => image.isBannerImage)
                      ? product.images.find((image) => image.isBannerImage).url
                      : ''
                  }
                  style={{ margin: '0 0 20px 0' }}
                  fluid
                />
                <Carousel.Caption className='carousel-caption'>
                  <h2>
                    {product.name} (₱{product.price})
                  </h2>
                </Carousel.Caption>
              </Link>
            </Carousel.Item>
          )
      )}
    </Carousel>
  )
}

export default ProductCarousel
