import React from 'react'
import { Card, Image } from 'react-bootstrap'
import imagePlaceholder from '../assets/placeholder.jpg'

const ProductPlaceholder = () => {
  return (
    <Card className='my-3 p-3 rounded product-item '>
      <div className='product__image animated'>
        <Image src={imagePlaceholder} />
      </div>
      <Card.Body>
        <Card.Title as='div' className='product__name animated'></Card.Title>

        <Card.Text as='div' className='product__rating animated'></Card.Text>

        <Card.Text as='h3' className='product__price animated'></Card.Text>
      </Card.Body>
    </Card>
  )
}

export default ProductPlaceholder
