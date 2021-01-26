import React, { useEffect, lazy, Suspense } from 'react'
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

const Messenger = lazy(() => import('../components/Messenger'))
// const ProductCarousel = lazy(() => import('../components/ProductCarousel'))
const Product = lazy(() => import('../components/Product'))

const HomeScreen = ({ match }) => {
  const keyword = match.params.keyword

  const pageNumber = match.params.pageNumber || 1

  const dispatch = useDispatch()

  const productList = useSelector((state) => state.productList)
  const { error, products, page, pages } = productList

  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber))
  }, [dispatch, keyword, pageNumber])

  return (
    <>
      <Suspense fallback={null}>
        <Messenger />
      </Suspense>
      <Meta />
      {!keyword ? (
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
