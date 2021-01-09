import React from 'react'
import { Link } from 'react-router-dom'
import { Container, Row, Col, Image } from 'react-bootstrap'
import SocialList from './SocialList'
import jntLogo from '../assets/jnt.png'
import codLogo from '../assets/COD.png'
import visaMaster from '../assets/visa-master.png'
import paypalLogo from '../assets/paypal.png'

const Footer = () => {
  const date = new Date()
  return (
    <footer>
      <Container fluid='sm'>
        <div className='footer-top'>
          {/* <Row> */}
          {/* <Col>
              <h5>Customer Care</h5>
              <ul></ul>
            </Col>
            <Col>
              <h5>About us</h5>
              <ul></ul>
            </Col> */}
          <Col>
            <h5 className='footer-col-title'>Payment</h5>
            <ul className='payment-methods'>
              <li>
                <Image src={paypalLogo} />
              </li>
              <li>
                <Image src={visaMaster} />
              </li>
              <li>
                <Image src={codLogo} />
              </li>
            </ul>
          </Col>
          <Col>
            <h5 className='footer-col-title'>Logistics</h5>
            <ul>
              <li>
                <Image src={jntLogo} />
              </li>
            </ul>
          </Col>
          <Col>
            <h5 className='footer-col-title'>Follow Us</h5>
            <SocialList />
          </Col>
          {/* </Row> */}
        </div>
        <div className='footer-bottom'>
          <Col className='text-center py-3'>
            {date.getFullYear()} &copy; All Rights Reserved by{' '}
            <Link to='/'>dabestdeal.com</Link>
          </Col>
        </div>
      </Container>
    </footer>
  )
}

export default Footer
