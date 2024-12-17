'use client'

// React Imports
import React, { Fragment, useEffect, useState } from 'react'

// React-Bootstrap Imports
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

// Lottie Imports
import Lottie from 'lottie-react'

// Lottie Animation Data
import infoCircleAnimation from './animations/info-circle.json'
import checkCircleAnimation from './animations/check-circle.json'
import xCircleAnimation from './animations/x-circle.json'
import loadingAnimation from './animations/loading.json'

const ConfirmationDialog = ({ isOpen, isPending, setIsOpen, onConfirm }) => {
  // States
  const [isConfirm, setisConfirm] = useState(false)
  const [secondDialog, setSecondDialog] = useState(false)

  const handleSecondDialogClose = () => {
    setSecondDialog(false)
    onCancel()
  }

  const handleConfirmation = async (value) => {
    if (onConfirm && value) {
      onConfirm()
      setisConfirm(true)
    }

    onCancel()
  }

  useEffect(() => {
    if (!isPending && isConfirm) {
      // setUserInput(true)
      setSecondDialog(true)
    }
  }, [isPending, isConfirm])

  return (
    <>
      {/* Loading Dialog */}
      <Modal size='sm' show={isPending} centered>
        <Modal.Body className='d-flex flex-column align-items-center text-center'>
          <Lottie animationData={loadingAnimation} style={{ width: 150, height: 150 }} />
        </Modal.Body>
      </Modal>

      <Modal show={open} onHide={onCancel} centered>
        <Modal.Body className='d-flex flex-column align-items-center text-center'>
          <Lottie animationData={infoCircleAnimation} style={{ width: 200, height: 200 }} />
          <h4>
            {type === 'delete-account' && 'Are you sure you want to deactivate your account?'}
            {type === 'unsubscribe' && 'Could you send contact info?'}
          </h4>
        </Modal.Body>
        <Modal.Footer className='justify-content-center'>
          <Button variant='primary' onClick={() => handleConfirmation(true)}>
            Yes
          </Button>
          <Button
            variant='secondary'
            onClick={() => {
              handleConfirmation(false)
            }}
          >
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Second Dialog */}
      <Modal show={secondDialog} onHide={handleSecondDialogClose} centered>
        <Modal.Body className='d-flex flex-column align-items-center text-center'>
          <Lottie
            loop={false}
            animationData={userInput ? checkCircleAnimation : xCircleAnimation}
            style={{ width: 200, height: 200 }}
          />
          <h4 className='mt-3'>
            {userInput
              ? type === 'delete-account' ? 'Deactivated' : 'Success!'
              : 'Something went error'}
          </h4>
        </Modal.Body>
        <Modal.Footer className='justify-content-center'>
          <Button variant='success' onClick={handleSecondDialogClose}>
            Ok
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default ConfirmationDialog