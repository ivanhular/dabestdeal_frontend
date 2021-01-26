import React from 'react'
import { Image } from 'react-bootstrap'
import PlaceHolderImage from '../assets/placeholder-featured.jpg'

function ProductCarouselPlaceholder() {
  return (
    <>
      <Image src={PlaceHolderImage} className='animated' fluid />
      <div className='animated'></div>
    </>
  )
}

export default ProductCarouselPlaceholder
