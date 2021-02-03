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
  title:
    'dabestdeal | Ecommerce, retail and Marketing | Buy and Sell on Mobile or Online, Best Marketplace For You',
  description:
    'dabestdeal.com is an ecommerce site and company that sells best and quality products for a great price. We also enables customers to post products and help them market it.',
  keywords:
    'Best deal plants, Best deal Couple Accessories, Best Deal Gym Equipments, Space saver Household Supplies, General Merchandise',
}

export default Meta
