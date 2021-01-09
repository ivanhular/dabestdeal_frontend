import React, { useState, useRef } from 'react'
import { Form, Button } from 'react-bootstrap'

const SearchBox = ({ history }) => {
  const [keyword, setKeyword] = useState('')
  const buttonRef = useRef(null)

  const submitHandler = (e) => {
    e.preventDefault()
    if (keyword.trim()) {
      history.push(`/search/${keyword}`)
    } else {
      history.push('/')
    }
  }

  const searchInputHandler = (e) => {
    if (e.key === 'Enter') {
      buttonRef.current.click()
    }
  }

  return (
    <div className='main-search-wrap'>
      <Form onSubmit={submitHandler} inline>
        <Form.Control
          type='text'
          name='q'
          onChange={(e) => setKeyword(e.target.value)}
          placeholder='Search Products...'
          onKeyDown={searchInputHandler}
          className='mr-sm-2 ml-sm-5'
        ></Form.Control>
        <Button
          ref={buttonRef}
          type='submit'
          variant='outline-success'
          className='p-2'
        >
          <i className='fas fa-search'></i>
        </Button>
      </Form>
    </div>
  )
}

export default SearchBox
