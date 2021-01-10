import React from 'react'
import { Accordion, Card, Image } from 'react-bootstrap'
import Step1 from '../assets/step_1_delete.jpg'
import Step2 from '../assets/step_2_delete.jpg'
import Step3 from '../assets/step_3_delete.jpg'

function HelpScreen() {
  return (
    <>
      <div>
        <h1 className='heading'>Help Centre</h1>
      </div>
      <Accordion>
        {/* <ListGroup variant='flush'> */}
        <Card className='help-item'>
          <Card.Header>
            <Accordion.Toggle as={'a'} eventKey='0'>
              <h2> How do I permanently delete my account?</h2>
            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey='0'>
            <Card.Body>
              <p>To permanently delete your account:</p>
              <ol>
                <li>Login to your account</li>
                <li>
                  Click <strong>Account name > Profile</strong>
                  <div>
                    <Image src={Step1} fluid />
                  </div>
                </li>
                <li>
                  Scroll on the bottom part of profile and{' '}
                  <strong>Click delete account button.</strong>
                  <div>
                    <Image src={Step2} fluid />
                  </div>
                </li>
                <li>
                  Confirmation box will pop and{' '}
                  <strong>Click Continue to Account Deletion.</strong>
                  <div>
                    <Image src={Step3} fluid />
                  </div>
                </li>
              </ol>
            </Card.Body>
          </Accordion.Collapse>
        </Card>

        {/* </ListGroup> */}
      </Accordion>
    </>
  )
}

export default HelpScreen
