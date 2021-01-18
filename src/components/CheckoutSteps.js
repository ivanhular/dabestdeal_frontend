import React from 'react'
import { Nav } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
  return (
    <Nav className='justify-content-center mb-4 stepper'>
      <Nav.Item>
        {step1 ? (
          <LinkContainer to='/login'>
            <Nav.Link>
              <div className='step-no active'>1</div>
              <i className='fas fa-sign-in-alt'></i> Sign In
            </Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>
            <div className='step-no'>1</div>{' '}
            <i className='fas fa-sign-in-alt'></i> Sign In
          </Nav.Link>
        )}
      </Nav.Item>

      <Nav.Item>
        {step2 ? (
          <LinkContainer to='/shipping'>
            <Nav.Link>
              <div className='step-no active'>2</div>{' '}
              <i className='fas fa-shipping-fast'></i> Shipping
            </Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>
            <div className='step-no'>2</div>{' '}
            <i className='fas fa-shipping-fast'></i> Shipping
          </Nav.Link>
        )}
      </Nav.Item>

      <Nav.Item>
        {step3 ? (
          <LinkContainer to='/payment'>
            <Nav.Link>
              <div className='step-no active'>3</div>
              <i className='fas fa-money-bill-alt'></i> Payment
            </Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>
            <div className='step-no'>3</div>
            <i className='fas fa-money-bill-alt'></i> Payment
          </Nav.Link>
        )}
      </Nav.Item>

      <Nav.Item>
        {step4 ? (
          <LinkContainer to='/placeorder'>
            <Nav.Link>
              <div className='step-no active'>4</div>{' '}
              <i className='fas fa-clipboard-check'></i> Place Order
            </Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>
            <div className='step-no'>4</div>{' '}
            <i className='fas fa-clipboard-check'></i> Place Order
          </Nav.Link>
        )}
      </Nav.Item>
    </Nav>
  )
}

export default CheckoutSteps
