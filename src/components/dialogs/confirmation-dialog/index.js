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

import { useInquiry } from '../../../context/inquiryProvider'

const ConfirmationDialog = () => {
  // States
  const { inquiryState, setInquiryState } = useInquiry();

  useEffect(() => {

  }, [])

  return (
    <>
      <Modal show={inquiryState === "success"} centered>
        <Modal.Body className='d-flex flex-column align-items-center text-center'>
          <Lottie
            loop={false}
            animationData={checkCircleAnimation}
            style={{ width: 200, height: 200 }}
          />
          <h4 className='mt-3'>
            Successfully submitted.
          </h4>
        </Modal.Body>
        <Modal.Footer className='justify-content-center'>
          <Button variant='success' onClick={(evt) => setInquiryState("")}>
            Ok
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={inquiryState === "error"} centered>
        <Modal.Body className='d-flex flex-column align-items-center text-center'>
          <Lottie
            loop={false}
            animationData={xCircleAnimation}
            style={{ width: 200, height: 200 }}
          />
          <h4 className='mt-3'>
            Error occured. Please try again
          </h4>
        </Modal.Body>
        <Modal.Footer className='justify-content-center'>
          <Button variant='danger' onClick={(evt) => setInquiryState("")}>
            Ok
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default ConfirmationDialog