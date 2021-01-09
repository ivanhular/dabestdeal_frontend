import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Carousel, Image } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from './Loader'
import Message from './Message'
import { listFeaturedProducts } from '../actions/productActions'
import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore, { EffectFade } from 'swiper'
import 'swiper/swiper.scss'
import 'swiper/components/effect-fade/effect-fade.scss'

SwiperCore.use([EffectFade])

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
    <Swiper
      effect='fade'
      spaceBetween={50}
      slidesPerView={1}
      onSlideChange={() => console.log('slide change')}
      onSwiper={(swiper) => console.log(swiper)}
      autoplay={true}
      // loop={true}
    >
      {products.map(
        (product) =>
          product.isFeatured && (
            <SwiperSlide key={product._id}>
              <Link to={`/product/${product._id}`}>
                <Image
                  src={
                    product.images.find((image) => image.isBannerImage)
                      ? product.images.find((image) => image.isBannerImage).url
                      : ''
                  }
                  fluid
                />
                <div className='carousel-caption'>
                  <h2>
                    {product.name} (₱{product.price})
                  </h2>
                </div>
              </Link>
            </SwiperSlide>
          )
      )}
    </Swiper>
  )
}

export default ProductCarousel
