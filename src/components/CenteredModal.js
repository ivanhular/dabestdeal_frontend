import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Modal from 'react-bootstrap/Modal'
import { Button } from 'react-bootstrap'
import { MODAL_CLOSE } from '../constants/appConstants'

const CenteredModal = ({
  size = 'lg',
  title,
  children,
  closeText = 'close',
  showClose,
  closeButton,
}) => {
  const dispatch = useDispatch()
  const { modal } = useSelector((state) => state.appSettings)
  const onHide = () => dispatch({ type: MODAL_CLOSE })
  return (
    <Modal
      //   {...props}
      show={modal}
      size={size}
      aria-labelledby='contained-modal-title-vcenter'
      centered
    >
      <Modal.Header closeButton={closeButton}>
        <Modal.Title id='contained-modal-title-vcenter'>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>
      <Modal.Footer>
        {showClose && <Button onClick={onHide}>{closeText}</Button>}
      </Modal.Footer>
    </Modal>
  )
}

export default CenteredModal
