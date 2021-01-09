import React from 'react'
import { Link } from 'react-router-dom'
import { Card } from 'react-bootstrap'
import Rating from './Rating'

const Product = ({ product }) => {
  return (
    <Card className='my-3 p-3 rounded product-item'>
      <Link to={`/product/${product._id}`}>
        <Card.Img
          src={product.images.find((image) => image.isFeaturedImage).url}
          variant='top'
        />
      </Link>

      <Card.Body>
        <Link to={`/product/${product._id}`}>
          <Card.Title as='div'>
            <strong>{product.name}</strong>
          </Card.Title>
        </Link>

        <Card.Text as='div'>
          <Rating
            value={product.rating}
            text={`${product.numReviews} reviews`}
          />
        </Card.Text>

        <Card.Text as='h3'>
          <span>&#8369;</span>
          {product.price}
        </Card.Text>
      </Card.Body>
    </Card>
  )
}

export default Product
