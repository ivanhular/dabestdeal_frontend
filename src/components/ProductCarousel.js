import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Carousel } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { LazyLoadImage } from 'react-lazy-load-image-component'
// import Loader from './Loader'
import Message from './Message'
import { listFeaturedProducts } from '../actions/productActions'
import 'react-lazy-load-image-component/src/effects/opacity.css'
const ProductCarousel = () => {
  const dispatch = useDispatch()

  const productFeatured = useSelector((state) => state.productFeatured)
  const { error, products } = productFeatured

  useEffect(() => {
    dispatch(listFeaturedProducts())
  }, [dispatch])

  return error ? (
    <Message variant='danger'>{error}</Message>
  ) : (
    <Carousel pause='hover' className='bg-dark' fade>
      {products.map(
        (product) =>
          product.isFeatured && (
            <Carousel.Item key={product._id}>
              <Link to={`/product/${product._id}`}>
                {/* <Image
                  src={
                    product.images.find((image) => image.isBannerImage)
                      ? product.images.find((image) => image.isBannerImage).url
                      : ''
                  }
                  style={{ margin: '0 0 20px 0' }}
                  fluid
                /> */}

                <LazyLoadImage
                  effect='opacity'
                  src={
                    product.images.find((image) => image.isBannerImage)
                      ? product.images.find((image) => image.isBannerImage).url
                      : ''
                  }
                  style={{ margin: '0 0 20px 0', width: '100%' }}
                />
                <Carousel.Caption className='carousel-caption'>
                  <h2>
                    {product.name} (₱{product.price.toFixed(2)})
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
