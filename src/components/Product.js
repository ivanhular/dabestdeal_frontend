import React from 'react'
import { Link } from 'react-router-dom'
import { Card } from 'react-bootstrap'
// import { LazyLoadImage } from 'react-lazy-load-image-component'
import Rating from './Rating'

const Product = ({ product }) => {
  const thumbnail = product?.images?.find((image) => image.isThumbnail)?.url
  const featureImage = product?.images?.find((image) => image.isFeaturedImage)
    ?.url
  return (
    <Card className='my-3 p-3 rounded product-item'>
      <Link to={`/product/${product._id}`}>
        <div
          className='product__list-image'
          style={{
            backgroundImage: `url(${thumbnail ? thumbnail : featureImage})`,
          }}
        >
          {/* <LazyLoadImage
            src={product.images.find((image) => image.isFeaturedImage).url}
          /> */}
          {/* <Card.Img
            src={product.images.find((image) => image.isFeaturedImage).url}
            variant='top'
          /> */}
        </div>
      </Link>

      <Card.Body>
        <Link to={`/product/${product._id}`}>
          <Card.Title as='div'>
            <strong>
              {product.name.length > 30
                ? `${product.name.substr(0, 30)}...`
                : product.name}
            </strong>
          </Card.Title>
        </Link>

        <Card.Text as='div'>
          <Rating
            value={product.rating}
            text={`${product.numReviews} reviews`}
          />
        </Card.Text>

        <Card.Text as='h4'>
          <span>&#8369;</span>
          {product.price.toFixed(2)}
        </Card.Text>
      </Card.Body>
    </Card>
  )
}

export default Product
