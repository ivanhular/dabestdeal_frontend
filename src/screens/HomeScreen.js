import React, { useEffect, useState, lazy, Suspense } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col } from 'react-bootstrap'
// import Product from '../components/Product'
import Message from '../components/Message'
// import Loader from '../components/Loader'
import Paginate from '../components/Paginate'
import ProductCarousel from '../components/ProductCarousel'
// import ProductCarouselPlaceholder from '../components/ProductCarouselPlaceholder'
import ProductPlaceholder from '../components/ProductPlaceholder'
import Meta from '../components/Meta'
import { listProducts } from '../actions/productActions'
import ReactPixel from 'react-facebook-pixel'
import ReactGA from 'react-ga'

const Messenger = lazy(() => import('../components/Messenger'))
// const ProductCarousel = lazy(() => import('../components/ProductCarousel'))
const Product = lazy(() => import('../components/Product'))

const HomeScreen = ({ match, location }) => {
  const keyword = match.params.keyword

  const pageNumber = match.params.pageNumber || 1

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const dispatch = useDispatch()

  const productList = useSelector((state) => state.productList)

  const { error, products, page, pages } = productList

  const [isTrackingLoaded, setTrackingLoaded] = useState(false)

  const onPageView = location?.pathname.includes('page')

  useEffect(() => {
    let advancedMatching = {}
    if (userInfo) {
      let { email: em, phone: ph } = userInfo
      advancedMatching = { em, ph: ph.replace('0', '63') }
    }

    if (!isTrackingLoaded) {
      // ReactPixel.track('Search', {
      //   search_string: `${keyword}`,
      // })
      ReactGA.initialize(process.env.REACT_APP_GOOGLE_TRACKING_ID)
      ReactGA.pageview(window.location.pathname + window.location.search)

      const options = {
        autoConfig: true, // set pixel's autoConfig. More info: https://developers.facebook.com/docs/facebook-pixel/advanced/
        debug: true, // enable logs
      }
      ReactPixel.init(
        process.env.REACT_APP_FB_PIXEL_ID,
        advancedMatching,
        options
      )
      ReactPixel.pageView()

      if (keyword) {
        ReactPixel.trackSingle(process.env.REACT_APP_FB_PIXEL_ID, 'Search', {
          search_string: `${keyword}`,
        })
      }
      setTrackingLoaded(true)
    }
  }, [userInfo, isTrackingLoaded, keyword])

  useEffect(() => {
    // console.log(location?.pathname.includes('page'))
    dispatch(listProducts(keyword, pageNumber))
  }, [dispatch, keyword, isTrackingLoaded, pageNumber, location])

  return (
    <>
      <Suspense fallback={null}>
        <Messenger />
      </Suspense>
      <Meta />
      {!onPageView && !keyword ? (
        <div className='home__carousel'>
          {/* <Suspense fallback={<ProductCarouselPlaceholder />}> */}
          <ProductCarousel />
          {/* </Suspense> */}
        </div>
      ) : (
        <Link to='/' className='btn btn-light'>
          <i className='fas fa-store'></i> Go Back
        </Link>
      )}
      <div className='latest-product-wrap'>
        {error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <>
            <h1 className='heading'>
              {!keyword ? 'Latest Products' : 'Product Search'}
            </h1>
            {keyword && (
              <div style={{ textAlign: 'center' }}>
                <h5>
                  <strong>
                    {`(${products?.length}) Results for`}
                    <em>{`"${keyword}"`}</em>
                  </strong>
                </h5>
              </div>
            )}

            <Row>
              {products.map(
                (product) =>
                  product.status && (
                    <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                      <Suspense fallback={<ProductPlaceholder />}>
                        <Product product={product} />
                      </Suspense>
                    </Col>
                  )
              )}
            </Row>
            <Paginate
              pages={pages}
              page={page}
              keyword={keyword ? keyword : ''}
            />
          </>
        )}
      </div>
      {/* <ProductPlaceholder /> */}
    </>
  )
}

export default HomeScreen
