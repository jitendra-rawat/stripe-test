"use client"

import StripeProvider from '@/app/components/StripeProvider'
import React from 'react'
import ThirdStep from '../components/ThirdStep'

const ThirdPage = () => {
  return (
   <StripeProvider>
    <ThirdStep />
   </StripeProvider>
  )
}

export default ThirdPage