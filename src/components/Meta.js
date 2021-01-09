import React from 'react'
import { Helmet } from 'react-helmet'

const Meta = ({ title, description, keywords }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name='description' content={description} />
      <meta name='keyword' content={keywords} />
    </Helmet>
  )
}

Meta.defaultProps = {
  title: 'Welcome To dabestdeal.com',
  description:
    'dabestdeal.com is an ecommerce site and company that sells best and quality products for a great price. We also enables customers to post products and help them market it.',
  keywords:
    'Couple Accessories, Best Deal Gym Equipments, Space saver Household Supplies, General Merchandise',
}

export default Meta
